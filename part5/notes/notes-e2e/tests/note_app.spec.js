const { describe, expect, test, beforeEach } = require("@playwright/test")
const helper = require("./helper.js")

describe("Note app", () => {
    beforeEach(async ({ page, request }) => {
        await request.post("/api/testing/reset")
        await request.post("/api/users", { data: {
            username: "mluukkai",
            password: "salainen",
            name: "Matti Luukkainen"
        }})

        await page.goto("/")
    })

    test("front page can be opened", async ({ page }) => {
        const title = await page.getByRole("heading", { name: "Notes" })
        const footer = await page.getByText("Note app, Department of Computer Science, University of Helsinki 2023")

        await expect(title).toBeVisible()
        await expect(footer).toBeVisible()
    })

    test("login form can be opened", async ({ page }) => {
        await helper.loginWith(page, "mluukkai", "salainen")
        await expect(page.getByText("Matti Luukkainen logged in")).toBeVisible()
    })

    test("login fails with the wrong password", async ({ page }) => {
        await helper.loginWith(page, "mluukkai", "123")

        await expect(page.locator(".error")).toBeVisible()
    })

    describe("when logged in", () => {
        beforeEach(async ({ page }) => {
            await helper.loginWith(page, "mluukkai", "salainen")
        })

        test("a new note can be created", async ({ page }) => {
            const content = "a new note from playerwright"
            await helper.createNote(page, content)
            await expect(page.getByText(content)).toBeVisible()
        })

        describe("and a note exists", async () => {
            beforeEach(async ({ page }) => {
                await helper.createNote(page, "1st note")
                await helper.createNote(page, "2nd note")
                await helper.createNote(page, "3rd note")
            })

            test("importance can be toggled", async ({ page }) => {
                const buttons = await page.getByRole("button", { name: "make not important" }).all()
                await buttons[2].click()

                await expect(page.getByRole("button", { name: "make important" })).toBeVisible()
            })
        })
    })
})