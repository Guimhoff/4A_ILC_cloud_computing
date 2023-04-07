import React from 'react';
import GlobalLayout from '../components/globalLayout.js'
import * as styles from '../styles/globalStyles.js'
import SujetListe from '../components/sujetListe.js'


export const sujetsTitle = "📚 Sujets"

const Sujets = () => {

    let [sujets, setSujets] = React.useState(null)

    // Get the list of topics
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


    return (
        <GlobalLayout title={sujetsTitle}>
            {sujets ? <SujetListe sujets={sujets}></SujetListe> : <p style={styles.paragraphStyles}>Chargement...</p>}
        </GlobalLayout>
    );
}

export default Sujets;


