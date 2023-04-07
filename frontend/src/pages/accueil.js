import * as React from 'react'
import GlobalLayout from '../components/globalLayout.js'
import * as styles from '../styles/globalStyles.js'
import PiouList from '../components/piouList.js'


const Accueil = () => {


    // Get all pious from the backend
    const [pious, setPious] = React.useState(null)
    React.useEffect(() => {
        fetch("http://localhost:5000/pious")
        .then(response => response.json())
        .then(data => {
            setPious(data.pious)
            console.log(data)
        })
    }, [])

    return (
        <GlobalLayout title="Accueil">
            {pious ? <PiouList pious={pious}></PiouList> : <p style={styles.paragraphStyles}>Chargement...</p>}
        </GlobalLayout>
    );
}

export default Accueil;


