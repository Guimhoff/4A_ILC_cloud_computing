import * as React from 'react';
import { useState } from 'react';
import { Link } from 'gatsby';
import * as styles from '../styles/globalStyles.js';


// Standard menu button
const MenuButton = (props) => {
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
       setIsHover(true);
    };
 
    const handleMouseLeave = () => {
       setIsHover(false);
    };

    const buttonStyle = {
        ...styles.menuButtonStyle,
        backgroundColor: isHover? '#4CAF50' : (props.selected? '#7CDF80' : '#f2f2f2'),
        color: isHover? 'white' : 'black',
    }

    return (
        <main>
        <Link type="button" style={buttonStyle} 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            id={props.idBouton}
            onClick={props.onClickButton}
            to={props.link}>
                {props.title}
            </Link>
        </main>
    )
}

export default MenuButton

