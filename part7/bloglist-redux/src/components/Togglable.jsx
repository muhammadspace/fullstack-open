import { useState, useImperativeHandle, forwardRef } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Button = styled.button`
    border: 3px solid gray;
    background-color: black;
    color: white;
    font-weight: bold;
`

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
                    <Button onClick={toggleVisibility}>cancel</Button>
                </div>
                :   <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
            }
        </>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = "Togglable"

export default Togglable