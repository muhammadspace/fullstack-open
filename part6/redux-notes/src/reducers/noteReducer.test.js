import { describe, expect, test } from "vitest"
import noteReducer from "./noteReducer"
import deepFreeze from "deep-freeze"

describe("noteReducer", () => {
    test("NEW_NOTE action returns a new state", () => {
        const action = {
            type: "NEW_NOTE",
            payload: {
                title: "1rd note",
                important: false,
                id: 1
            }
        }
        const state = []

        deepFreeze(state)
        const newState = noteReducer(state, action)

        expect(newState).toHaveLength(1)
        expect(newState).toContainEqual(action.payload)
    })

    test("TOGGLE_IMPORTANCE action returns a new state", () => {
        const action = {
            type: "TOGGLE_IMPORTANCE",
            payload: {
                id: 2
            }
        }
        const state = [
            {
                title: "1st note",
                important: true,
                id: 1
            },
            {
                title: "2nd note",
                important: true,
                id: 2
            }
        ]

        deepFreeze(state)
        const newState = noteReducer(state, action)

        expect(newState).toContainEqual(state[0])
        expect(newState).toContainEqual({ ...state[1], important: !state[1].important })
    })
})