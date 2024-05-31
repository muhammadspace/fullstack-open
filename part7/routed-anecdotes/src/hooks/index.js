import { useState } from "react"

export const useField = (name, type) => {
    const [value, setValue] = useState("")

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = () => {
        setValue("")
    }

    return {
        spread: { name, type, value, onChange },
        reset
    }
}