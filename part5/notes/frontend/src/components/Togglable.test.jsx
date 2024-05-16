import { screen, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Togglable from "./Togglable.jsx"

describe("<Togglable>", () => {
    let container

    beforeEach(() => {
        container = render(
            <Togglable buttonLabel="show">
                <div className="togglableContent">
                    content inside togglable
                </div>
            </Togglable>
        ).container
        screen.debug(container)
    })

    test("renders its children if toggled", async () => {
        const user = userEvent.setup()
        const toggleButton = screen.getByText("show")

        await user.click(toggleButton)
        await screen.findAllByText("content inside togglable")
    })

    test("content is initially hidden", async () => {
        const togglableContent = container.querySelector(".togglableContent")
        expect(togglableContent).toBeNull()
    })
})