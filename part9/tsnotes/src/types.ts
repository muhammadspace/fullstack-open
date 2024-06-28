export interface Note {
    content: string,
    id: number
}

export type NewNote = Omit<Note, "id">;