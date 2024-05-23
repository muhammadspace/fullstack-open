import { useDispatch } from "react-redux"
import { filterAC } from "../reducers/filterReducer.js"

const Filter = () => {
    const dispatch = useDispatch()

    const handleFilter = (filter) => {
        dispatch(filterAC(filter))
    }

    return (
        <div>
            <input type="radio" onChange={() => handleFilter("ALL")} name="filter"/>         all             
            <input type="radio" onChange={() => handleFilter("IMPORTANT")} name="filter"/>   important       
            <input type="radio" onChange={() => handleFilter("NONIMPORTANT")} name="filter"/>nonimportant    
        </div>
    )
}

export default Filter