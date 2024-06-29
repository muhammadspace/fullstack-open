import { useState } from "react";

export const useField = <T>(initialValue: T) => {
    const [value, setValue] = useState<T>(initialValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value as T);
    };

    return { value, setValue, onChange };
};