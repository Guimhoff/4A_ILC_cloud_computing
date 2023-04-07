import * as React from 'react';
import { useState } from 'react';
import { Link } from 'gatsby';
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
    
    const pseudoUser = props.piou["pseudo-user"]

    return (
        <main style={piouStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
            <Link to={"/profil/" + pseudoUser} style={styles.authorPiouStyle}>{pseudoUser}</Link>
            <Link to={"/piou/" + props.piou.id} style={styles.textPiouStyle}>{props.piou.text}</Link>
        </main>
    )
}

export default Piou



