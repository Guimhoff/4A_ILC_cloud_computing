import * as React from 'react';
import { useState } from 'react';
import * as styles from '../styles/globalStyles.js';


const Piou = (props) => {
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
       setIsHover(true);
    };
 
    const handleMouseLeave = () => {
       setIsHover(false);
    };

    const piouStyle = {
        ...styles.piouBlockStyle,
        backgroundColor: isHover ? '#eff8ef' : '#ffffff'
    }
    
    return (
        <main style={piouStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
            <p style={styles.authorPiouStyle}>{props.author}</p>
            <p style={styles.textPiouStyle}>{props.text}</p>
        </main>
    )
}

export default Piou



