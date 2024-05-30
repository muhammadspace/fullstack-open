import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getNotes, createNote, toggleImportance as toggleImportanceSrvc } from "./requests"

const App = () => {
    const queryClient = useQueryClient()

    const result = useQuery({
        queryKey: ["notes"],
        queryFn: getNotes,
        refetchOnWindowFocus: false
    })

    const newNoteMutation = useMutation({ 
        mutationFn: createNote,
        onSuccess: (newNote) => {
            const notes = queryClient.getQueryData(["notes"])
            queryClient.setQueryData(["notes"], notes.concat(newNote))
        }
    })

    const toggleImportanceMutation = useMutation({
        mutationFn: toggleImportanceSrvc,
        onSuccess: (updatedNote) => {
            const notes = queryClient.getQueryData(["notes"])
            queryClient.setQueryData(["notes"], notes.map(note => note.id === updatedNote.id ? updatedNote : note))
        }
    })   

    const addNote = async (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        newNoteMutation.mutate({ content, important: false })
    }

    const toggleImportance = (note) => {
        toggleImportanceMutation.mutate({ ...note, important: !note.important })
    }

    const notes = result.data

    if (result.isLoading)
        return <h1>Loading...</h1>

    return(
        <div>
            <h2>Notes app</h2>
            <form onSubmit={addNote}>
                <input name="note" />
                <button type="submit">add</button>
            </form>
            {notes.map(note =>
                <li key={note.id} onClick={() => toggleImportance(note)}>
                    {note.content} 
                    <strong> {note.important ? 'important' : ''}</strong>
                </li>
            )}
        </div>
    )
}

export default App