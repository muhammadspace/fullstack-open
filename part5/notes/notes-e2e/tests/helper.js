const loginWith = async (page, username, password) => {
    await page.getByRole("button", { name: "log in" }).click()
    await page.getByTestId("username").fill(username)
    await page.getByTestId("password").fill(password)
    await page.getByRole("button", { name: "log in" }).click()
}

const createNote = async (page, content) => {
    await page.getByRole("button", { name: "create" }).click()
    await page.getByRole("textbox").fill(content)
    await page.getByRole("button", { name: "save" }).click()
    await page.getByText(content).waitFor()
}

module.exports = {
    loginWith,
    createNote
}