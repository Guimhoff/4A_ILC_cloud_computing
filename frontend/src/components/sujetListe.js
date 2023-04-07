import * as React from 'react';
import * as styles from '../styles/globalStyles.js';
import Sujet from './sujet.js'




const SujetListe = (prompt) => {

    const sujets = prompt.sujets

    function drawSujets() {
        const sujetList = []
        for (let i = 0; i < sujets.length; i++) {
            const sujet = sujets[i]
            sujetList.push(<Sujet to={"/sujet/" + sujet} key={i} sujet={sujet} />)
        }
        return sujetList
    }

    return (
        <ul style={styles.sujetListeStyle}>{drawSujets()}</ul>
    );
}

export default SujetListe