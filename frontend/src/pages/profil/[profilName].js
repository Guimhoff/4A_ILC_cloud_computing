import * as React from 'react';
import * as styles from '../../styles/globalStyles.js';
import PiouList from '../../components/piouList.js';
import GlobalLayout from '../../components/globalLayout.js';


const DynamicProfilPiousPage = (req, res) => {

    const [pious, setPious] = React.useState(null)

    console.log(req.params.profilName)

    React.useEffect(() => {

        const form = new FormData()
        form.append("token", localStorage.getItem("token"))

        fetch("http://localhost:5000/user/" + req.params.profilName + "/pious", {
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
    }, [req.params.profilName])
    
    return (
        <GlobalLayout title={"👤 " + req.params.profilName}>
            <h1>👤 {req.params.profilName}</h1>
            {pious ? <PiouList pious={pious}></PiouList> : <p style={styles.paragraphStyles}>Chargement...</p>}
        </GlobalLayout>
    );
}

export default DynamicProfilPiousPage

