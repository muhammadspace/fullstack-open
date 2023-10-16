import { useState, useImperativeHandle, forwardRef } from "react"
import PropTypes from "prop-types"

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => { setVisible(!visible) }

    useImperativeHandle(ref, () => {
        return { toggleVisibility }
    })

    return (
        <>
            { visible 
                ?   <div>
                        {props.children}
                        <button onClick={toggleVisibility}>cancel</button>
                    </div>
                :   <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            }
        </>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable