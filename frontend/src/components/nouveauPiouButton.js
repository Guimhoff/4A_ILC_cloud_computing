import * as React from 'react';
import { useState } from 'react';
import { Link } from 'gatsby';
import * as styles from '../styles/globalStyles.js';


const NouveauPiouButton = (props) => {
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
       setIsHover(true);
    };
 
    const handleMouseLeave = () => {
       setIsHover(false);
    };

    const buttonStyle = {
        ...styles.nouveauPiouButtonStyle,
        backgroundColor: isHover ? '#4CAF50' : '#7CDF80',
        color: isHover ? 'white' : 'black'
    }
    
    return (
        <Link to="/nouveauPiou" style={buttonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >💬 Nouveau Piou</Link>
    )
}

export default NouveauPiouButton

