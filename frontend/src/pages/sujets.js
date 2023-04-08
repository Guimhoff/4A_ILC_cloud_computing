import React from 'react';
import GlobalLayout from '../components/globalLayout.js'
import * as styles from '../styles/globalStyles.js'
import SujetListe from '../components/sujetListe.js'
import { sujetsTitle } from '../globalVar/windowTitles.js'

// Page that displays the list of sujets and allows to look at the list of pious in each sujet
const Sujets = () => {

    let [sujets, setSujets] = React.useState(null)

    // Get the list of sujets from the backend
    React.useEffect(() => {
        fetch("http://localhost:5000/sujets")
        .then(response => {
            if (response.status === 200) {
                console.log("Sujets récupérés !")
            } else {
                alert("Erreur lors de la récupération des sujets.")
            }
            return response.json()
        })
        .then(data => {
            if (data.sujets)
            {
                console.log(data.sujets)
                setSujets(data.sujets)
            }
            if (data.error) {
                console.log(data.error)
            }
        })
    }, [])

    // Display the list of sujets and global layout
    return (
        <GlobalLayout title={sujetsTitle}>
            {sujets ? <SujetListe sujets={sujets}></SujetListe> : <p style={styles.paragraphStyles}>Chargement...</p>}
        </GlobalLayout>
    );
}

export default Sujets;


