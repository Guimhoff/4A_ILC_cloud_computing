import * as React from 'react';
import { useState } from 'react';
import * as styles from '../styles/globalStyles.js';
import { Link } from 'gatsby';


const Sujet = (props) => {
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
       setIsHover(true);
    };
 
    const handleMouseLeave = () => {
       setIsHover(false);
    };

    const sujetStyle = {
        ...styles.sujetStyle,
        backgroundColor: isHover ? '#eff8ef' : '#ffffff'
    }
    
    return (
        <Link to={props.to} style={sujetStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >{"#" + props.sujet}</Link>
    )
}

export default Sujet



