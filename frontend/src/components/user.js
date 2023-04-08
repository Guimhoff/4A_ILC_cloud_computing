import * as React from 'react';
import * as styles from '../styles/globalStyles.js';
import { Link } from 'gatsby';
import { useState } from 'react';

// Standard user display
const User = (props) => {

    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const userStyle = {
        ...styles.userStyle,
        backgroundColor: isHover ? '#eff8ef' : '#ffffff'
    }
    
    return (
        <Link to={"/profil/" + props.user.pseudo} style={userStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{props.user.pseudo}</Link>
    )
}

export default User

