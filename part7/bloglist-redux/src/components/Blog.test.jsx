import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog.jsx"

describe("<Blog>", () => {
    let container
    let mockHandler
    beforeEach(() => {
        mockHandler = vi.fn()

        const user = {
            name: "name for testing",
            username: "usernamefortesting",
            id: "1234"
        }
        const blog = {
            title: "Blog for testing",
            author: "Author for testing",
            likes: "13",
            user
        }


        container = render(<Blog blog={blog} user={user} setBlogs={mockHandler}/>).container
    })

    test("Only title and author are rendered by default", () => {
        const title = container.querySelector(".title")
        const author = container.querySelector(".author")

        const likes = container.querySelector(".likes")
        const url = container.querySelector(".url")
        const user_name = container.querySelector(".user-name")

        expect(title).toBeDefined()
        expect(author).toBeDefined()
        expect(likes).toBeNull()
        expect(url).toBeNull()
        expect(user_name).toBeNull()
    })

    test("URL, likes, and user name are displayed when the view button is clicked", async () => {
        const user = userEvent.setup()
        const viewButton = screen.getByText("view")

        await user.click(viewButton)

        const likes = container.querySelector(".likes")
        const url = container.querySelector(".url")
        const user_name  = container.querySelector(".user-name")

        expect(likes).toBeTruthy()
        expect(url).toBeTruthy()
        expect(user_name).toBeTruthy()
    })

    /*      doesn't work for now; the functionality for liking a blog uses the database     */
    // test("The event handler is called twice if the like button is clicked twice", async () => {
    //     const user = userEvent.setup()
    //     const viewButton = screen.getByText("view")

    //     await user.click(viewButton)

    //     const likeButton = screen.getByText("like")

    //     await user.click(likeButton)
    //     await user.click(likeButton)

    //     expect(mockHandler.mock.calls).toHaveLength(2)
    // })
})