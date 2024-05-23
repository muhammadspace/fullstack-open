import { useDispatch } from "react-redux"
import { filterAC } from "../reducers/filterReducer.js"

const Filter = () => {
    const dispatch = useDispatch()

    const handleFilter = (e) => {
        e.preventDefault()

        const filter = e.target.value
        dispatch(filterAC(filter))
    }

    return (
        <div>
            <label name="filter" id="filter" htmlFor="filter">filter</label>
            <input type="text" name="filter" onChange={handleFilter}/>
        </div>
    )
}

export default Filter