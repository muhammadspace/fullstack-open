const loginWith = async (page, username, password) => {
    await page.getByRole("button", { name: "log in" }).click()
    await page.getByTestId("username").fill(username)
    await page.getByTestId("password").fill(password)
    await page.getByRole("button", { name: "login" }).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole("button", { name: "create new blog" }).click()
    await page.getByLabel("title").fill(title)
    await page.getByLabel("author").fill(author)
    await page.getByLabel("url").fill(url)
    await page.getByRole("button", { name: "create" }).click()
    await page.getByText(`${title} ${author}`).waitFor()
}

const getBlogAndViewIt = async (page, title, author) => {
    const element = await page.getByText(`${title} ${author}`).locator("..")
    const view = await element.getByRole("button", { name: "view" })
    await view.click()
    const like = await element.getByRole("button", { name: "like" })
    const likeText = await element.locator(".likes").textContent()
    const nLikes = Number.parseInt(likeText.replace(" likes", ""))

    return {
        element,
        view,
        like,
        nLikes
    }
}

module.exports = {
    loginWith,
    createBlog,
    getBlogAndViewIt
}