import * as React from 'react';
import { useState } from 'react';
import * as styles from '../styles/globalStyles.js';
import { Link } from 'gatsby';


const BoutonRepiouter = (props) => {
    const [isHover, setIsHover] = useState(false);

    const [isRP, setIsRP] = useState(props.isRP);

    const handleMouseEnter = () => {
       setIsHover(true);
    };
 
    const handleMouseLeave = () => {
       setIsHover(false);
    };

    const boutonStyle = {
        ...styles.buttonPiouStyle,
        backgroundColor: isHover ? '#67bc67' : (isRP ? '#82c882' : 'transparent'),
    }
    
    const handleClick = () => {
        if (isRP) return

        setIsRP(true)

        const form = new FormData()
        form.append("token", localStorage.getItem("token"))
        form.append("id-piou", props.idPiou)

        fetch("http://localhost:5000/repiouter", {
            method: "POST",
            body: form
        })
        .then(response => {
            if (response.status === 200) {
                console.log("Piou repiouté !")
            } else {
                alert("Erreur lors du repioutage du piou.")
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
        })
    }

    return (
        <Link style={boutonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick} to='.'>
            {isRP ? "Repiouté" : "Repiouter"}
        </Link>
        
    )
}

export default BoutonRepiouter



