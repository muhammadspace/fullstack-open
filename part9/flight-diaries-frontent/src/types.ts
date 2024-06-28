export interface DiaryEntry {
    id: number,
    date: string,
    weather: string,
    visibility: string,
    comment: string
}

export type NonSensetiveDiaryEntry = Omit<DiaryEntry, "comment">

export type NewDiaryEntry = Omit<DiaryEntry, "id">;