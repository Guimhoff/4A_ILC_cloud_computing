import * as React from 'react'
import { useState } from 'react'



const FormInput = (props) => {
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
       setIsHover(true);
    };
 
    const handleMouseLeave = () => {
       setIsHover(false);
    };

    const buttonStyle = {
        backgroundColor: isHover? '#4CAF50' : '#f2f2f2',
        border: 'none',
        color: isHover? 'white' : 'black',
        padding: '15px 32px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        cursor: 'pointer',
        transition: 'background-color 0.1s ease-in-out, color 0.1s ease-in-out',
        borderRadius: '4px',
    }

    return (
        <main>
        <button type="button" style={buttonStyle} 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            id={props.id}>{props.title}</button>
        </main>
    )
}

export default FormInput