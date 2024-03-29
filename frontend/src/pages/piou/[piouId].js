import * as React from 'react';
import * as styles from '../../styles/globalStyles.js';
import Piou from '../../components/piou.js';
import GlobalLayout from '../../components/globalLayout.js';

// Page that displays the given piou and the global layout
const DynamicPiouPage = (req, res) => {
    if (typeof window === "undefined") return null;
    
    const [piou, setPious] = React.useState(null)

    // Get the piou from the backend
    React.useEffect(() => {
        const form = new FormData()
        form.append("token", localStorage.getItem("token"))

        fetch("http://localhost:5000/piou=" + req.params.piouId, {
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
            setPious(data.piou)
            if (data.error) {
                console.error(data.error)
            }
        })
    }, [req.params.piouId])
    
    // Display the piou and global layout
    return (
        <GlobalLayout title={"Piou " + req.params.piouId}>
            <h1>Piou {req.params.piouId}</h1>
            {piou ? <Piou piou={piou} ></Piou> : <p style={styles.paragraphStyles}>Chargement...</p>}
        </GlobalLayout>
    );
}

export default DynamicPiouPage

