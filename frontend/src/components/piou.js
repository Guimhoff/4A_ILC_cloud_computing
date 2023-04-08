import * as React from 'react';
import { useState } from 'react';
import { Link } from 'gatsby';
import * as styles from '../styles/globalStyles.js';
import BoutonRepiouter from './boutonRepiouter.js';

// Standard elemeent displaying a piou
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

    // convert date in ns to a string in the format "dd/mm/yyyy hh:mm"
    const date = new Date()
    date.setTime(props.piou.date / 1000000)
    const dateStr = date.toLocaleDateString() + " " + date.toLocaleTimeString()
    
    const pseudoUser = props.piou["pseudo-user"]

    // Display the piou with or without a quote depending on the presence of the quote property
    // Displays author, date, text and repiout button
    if (props.piou.quote === undefined) {
        return (
            <button style={piouStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                <div style={styles.firstLinePiouStyle}>
                    <Link to={"/profil/" + pseudoUser} style={styles.authorPiouStyle}>{pseudoUser}</Link>
                    <div style={styles.datePiouStyle}>{dateStr}</div>
                </div>
                <Link to={"/piou/" + props.piou.id} style={styles.textPiouStyle}>{props.piou.text}</Link>
                <BoutonRepiouter isRP={props.piou.repiouted} idPiou={props.piou.id} />
            </button>
        )
    } else {
        return (
            <div style={piouStyle} >
                <div>
                    <Link to={"/profil/" + pseudoUser} style={styles.authorRepiouStyle}>{pseudoUser}</Link> a repiouté
                </div>
                <Piou piou={props.piou.quote} />
            </div>
        )
    }
}

export default Piou



