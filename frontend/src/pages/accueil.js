import * as React from 'react'
import GlobalLayout from '../components/globalLayout.js'
import * as styles from '../styles/globalStyles.js'
import PiouList from '../components/piouList.js'
import { accueilTitle } from '../globalVar/windowTitles.js'

const Accueil = () => {


    // Get all pious from the backend
    const [pious, setPious] = React.useState(null)
    React.useEffect(() => {
        const form = new FormData()
        form.append("token", localStorage.getItem("token"))

        fetch("http://localhost:5000/pious", {
            method: "POST",
            body: form
        })
        .then(response => {
            if (response.status === 200) {
                console.log("Piou récupérés !")
            } else {
                alert("Erreur lors de la récupération des piou.")
            }
            return response.json()
        })
        .then(data => {
            setPious(data.pious)
            console.log(data)
        })
    }, [])

    return (
        <GlobalLayout title={accueilTitle}>
            {pious ? <PiouList pious={pious}></PiouList> : <p style={styles.paragraphStyles}>Chargement...</p>}
        </GlobalLayout>
    );
}

export default Accueil;


