import * as React from 'react';
import { useState } from 'react';
import { Link } from 'gatsby';

const MenuButton = (props) => {
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
       setIsHover(true);
    };
 
    const handleMouseLeave = () => {
       setIsHover(false);
    };

    const buttonStyle = {
        backgroundColor: isHover? '#4CAF50' : (props.selected? '#7CDF80' : '#f2f2f2'),
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

