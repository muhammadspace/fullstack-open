import { screen, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm.jsx"

test("The event handler passed to the form is called and with the correct data", async () => {
    const mockHandler = vi.fn()
    const blog = {
        title: "Blog for testing",
        author: "Author for testing",
        url: "url://for.testing/"
    }

    render(<BlogForm createBlog={mockHandler} />)

    const user = userEvent.setup()
    const submitButton = screen.getByText("create")

    const title = screen.getByLabelText("title")
    const author = screen.getByLabelText("author")
    const url = screen.getByLabelText("url")

    await user.type(title, blog.title)
    await user.type(url, blog.url)
    await user.type(author, blog.author)

    await user.click(submitButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe(blog.title)
    expect(mockHandler.mock.calls[0][0].author).toBe(blog.author)
    expect(mockHandler.mock.calls[0][0].url).toBe(blog.url)
})