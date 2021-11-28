import React, { useState} from "react"

const Toggable = ({ showVisibilityText, hiddenVisibilityText , children }) => {

    const [visibility, setvisibility] = useState(true)

    const toggleVisibility = () =>{
        setvisibility(!visibility)
    }

    const hiddenVisibilityTextStyle = { display: visibility?'none':'' }
    const showVisibilityTextStyle = { display: !visibility?'none':'' }

    return(
        <>
            <div style={showVisibilityTextStyle} >
                <button onClick={toggleVisibility} >{showVisibilityText}</button>
            </div>

            <div style={hiddenVisibilityTextStyle}>
                {children} <br />
                <button onClick={toggleVisibility}>{hiddenVisibilityText}</button>
            </div>
        </>
    )
}

export default Toggable