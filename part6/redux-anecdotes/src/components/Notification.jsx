import { useSelector } from "react-redux"

const Notification = () => {
    const state = useSelector(state => state.notification)

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    return (
        <div style={style}>
            { state.message }
        </div>
    )
}

export default Notification