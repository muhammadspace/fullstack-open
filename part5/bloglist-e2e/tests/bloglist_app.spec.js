const { describe, test, beforeEach, expect } = require("@playwright/test")
const helper = require("./helper.js")

describe("Blog app", () => {
    beforeEach(async ({ page, request }) => {
        await request.post("/api/testing/reset")
        await request.post("/api/users/", { data: {
            username: "tester",
            name: "tester",
            password: "test",
        }})

        await page.goto("/")
    })

    test("users are initially asked to log in", async ({ page }) => {
        await expect(page.getByRole("button", { name: "log in" })).toBeVisible()
    })

    describe("Login", () => {
        test("works with correct credentials", async ({ page }) => {
            const username = "tester"
            await helper.loginWith(page, username, "test")
            await expect(page.getByText(`${username} logged in`)).toBeVisible()
        })

        test("fails with incorrect credentials", async ({ page }) => {
            const username = "teetetete"
            await helper.loginWith(page, username, "randomincorrectpassword")
            await expect(page.getByText(`${username} logged in`)).not.toBeVisible()
        })
    })

    describe("When logged in", () => {
        beforeEach(async ({ page }) => {
            await helper.loginWith(page, "tester", "test")
        })

        test("a new blog can be created", async ({ page }) => {
            const title = "test title"
            const author = "test author"
            const url = "test://url.com"
            await helper.createBlog(page, title, author, url)
            await expect(page.getByText(`${title} ${author}`)).toBeVisible()
        })

        describe("when there is at least one blog", () => {
            beforeEach(async ({ page }) => {
                const title = "test title"
                const author = "test author"
                const url = "test://url.com"
                await helper.createBlog(page, title, author, url)
            })

            test("a blog can be edited (liked)", async ({ page }) => {
                await page.getByRole("button", { name: "view" }).click()
                const likeText = await page.locator(".likes").textContent()
                const nLikes = Number.parseInt(likeText.replace(" likes", ""))
                await page.getByRole("button", { name: "like" }).click()
                await page.getByText(`${nLikes + 1} likes`).waitFor()

                await expect(page.getByText(`${nLikes + 1} likes`)).toBeVisible()
            })

            test("the user who created a blog can delete it", async ({ page }) => {
                page.on("dialog", dialog => dialog.accept())
                await page.getByRole("button", { name: "view" }).click()
                const blog = page.locator(".blog")
                await blog.getByRole("button", { name: "remove" }).click()

                await expect(blog).not.toBeVisible()               
            })

            test("only the user who created the blog can see its delete button", async ({ page, request }) => {
                await request.post("/api/users/", { data: {
                    username: "tester2",
                    name: "tester2",
                    password: "test",
                }})

                await page.getByRole("button", { name: "logout" }).click()
                await helper.loginWith(page, "tester2", "test")
                
                await page.getByRole("button", { name: "view" }).click()

                await expect(page.getByRole("button", { name: "remove" })).not.toBeVisible()
            })

            test("blogs are sorted by number of likes", async ({ page }) => {
                await helper.createBlog(page, "blog2", "author2", "url2")

                const firstBlogTitleBefore = await page.locator(".blog").first().locator(".title").textContent()
                console.log(firstBlogTitleBefore)
                await expect(firstBlogTitleBefore).toContain("test title")

                const blog2 = await helper.getBlogAndViewIt(page, "blog2", "author2")
                for (let i = 0; i < 20; i++)
                {
                    await blog2.like.click()
                    await blog2.element.getByText(`${blog2.nLikes + 1} likes`).waitFor()
                    blog2.nLikes++;
                }

                const firstBlogTitleAfter = await page.locator(".blog").first().locator(".title").textContent()
                await expect(firstBlogTitleAfter).toContain("blog2")
            })
        })
    })
})