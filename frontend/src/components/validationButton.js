import * as React from 'react'
import { useState } from 'react'
import * as styles from '../styles/globalStyles.js'


// Standard button that can be used in the app
const FormInput = (props) => {
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
       setIsHover(true);
    };
 
    const handleMouseLeave = () => {
       setIsHover(false);
    };

    // Style of the button depending on its state
    const buttonStyle = {
        ...styles.validationButtonStyle,
        backgroundColor: isHover? '#4CAF50' : '#f2f2f2',
        color: isHover? 'white' : 'black',
    }

    // Display the button
    return (
        <main>
        <button type="button" style={buttonStyle} 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            id={props.idBouton}
            onClick={props.onClickButton}>
                {props.title}
            </button>
        </main>
    )
}

export default FormInput