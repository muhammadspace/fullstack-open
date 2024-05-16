import { screen, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Note from "./Note.jsx"

test("Renders text to the screen", () => {
    const note = {
        content: "Component testing is done with react-testing-library",
        important: true
    }

    render(<Note note={note}/>)

    const element = screen.getByText(note.content)
    expect(element).toBeDefined()
})

test("Clicking the button calls the event handler once", async () => {
    const note = {
        content: "content of a note",
        important: true
    }

    const mockHandler = vi.fn()

    render(<Note note={note} toggleImportance={mockHandler}/>)

    const user = userEvent.setup()

    const toggleImportanceButton = screen.getByText("make not important")
    await user.click(toggleImportanceButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
})