import * as React from 'react';
import * as styles from '../../styles/globalStyles.js';
import PiouList from '../../components/piouList.js';
import GlobalLayout from '../../components/globalLayout.js';



const DynamicSujetPiousPage = (req, res) => {

    const [pious, setPious] = React.useState(null)

    React.useEffect(() => {
        fetch("http://localhost:5000/sujet=" + req.params.sujetName)
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
        <GlobalLayout title={req.params.sujetName}>
            <h1>#{req.params.sujetName}</h1>
            {pious ? <PiouList pious={pious}></PiouList> : <p style={styles.paragraphStyles}>Chargement...</p>}
        </GlobalLayout>
    );
}

export default DynamicSujetPiousPage

