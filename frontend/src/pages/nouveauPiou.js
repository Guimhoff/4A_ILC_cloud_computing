import * as React from 'react';
import * as styles from '../styles/globalStyles.js';
import GlobalLayout from '../components/globalLayout.js'
import ValidationButton from '../components/validationButton.js'


const NouveauPiou = () => {

    function sendPiou() {
        console.log("sendPiou")

        // Get the text from the textarea
        const text = document.getElementById("text").value

        // Check if the text is empty
        if (text === "") {
            alert("Le texte du Piou est vide.")
            return
        }

        // Get token
        const token = localStorage.getItem("token")

        // Create a FormData object
        let formData = new FormData()
        formData.append("text", text)
        formData.append("token", token)

        // Send the piou to the backend
        fetch("http://localhost:5000/piouter", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (response.status === 200) {
                console.log("Piou envoyé !")
                window.location.href = "/accueil"
            } else {
                alert("Erreur lors de l'envoi du Piou.")
            }
            return response.json()
        })
        .then(data => {
            if (data.error) {
                console.log(data.error)
            }
        })
    }


    return (
        <GlobalLayout title="💬 Nouveau Piou" nouveauPiouButton={false}>
            <main style={styles.nouveauPiouStyle}>
                <h1>Nouveau Piou</h1>
                <textarea style={styles.nouveauPiouTextStyle} name="text" id="text" ></textarea>
                <ValidationButton title="Piouter !" idBouton="sendPiou" onClickButton={sendPiou} />
            </main>
        </GlobalLayout>
    )
}

export default NouveauPiou
