import * as React from "react"
import MenuButton from "./menuButton.js"
import * as styles from "../styles/globalStyles.js"
import NouveauPiouButton from "./nouveauPiouButton.js"
import { accueilTitle, sujetsTitle, rechercheTitle, deconnexionTitle } from "../globalVar/windowTitles.js"

const GlobalLayout = ({ title, children , nouveauPiouButton=true }) => {

    // Check if the user is logged in
    if (!localStorage.getItem("token")) {
        console.log("Pas de token.")
        localStorage.removeItem('username')
        window.location.href = "/connexion"
    }

    // Check if the token is valid
    const formData = new FormData();
    formData.append('token', localStorage.getItem("token"));

    fetch("http://localhost:5000/test-token", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (response.status === 200) {
            console.log("Token valide !")
        } else {
            console.log("Token invalide.")
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            window.location.href = '/connexion'
        }
        return response.json()
    })
    .then(data => {
        if (data.error) {
            console.log(data.error)
        }
    })

    // Function to log out
    function deconnexion() {
        console.log("Déconnexion")

        // Tell the backend to delete the token
        const formData = new FormData();
        formData.append('token', localStorage.getItem("token"));
        
        fetch("http://localhost:5000/logout", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (response.status === 200) {
                console.log("Déconnecté !")
            } else {
                alert("Erreur lors de la déconnexion.")
            }
            return response.json()
        })
        .then(data => {
            if (data.error) {
                console.log(data.error)
            }
        })

        // Delete the token from the local storage
        localStorage.removeItem('token')
        localStorage.removeItem('username')
    }

    const username = localStorage.getItem("username")


    const profilTitle = "👤 " + username


    return (
    <main style={styles.pageStyles}>
        <title>Piouteur - {title}</title>
        <nav style={styles.navStyle}>
        <MenuButton title={profilTitle} link={"/profil/" + username} selected={title===profilTitle} />
        <MenuButton title={accueilTitle} link="/accueil" selected={title===accueilTitle} />
        <MenuButton title={sujetsTitle} link="/sujets" selected={title===sujetsTitle} />
        <MenuButton title={rechercheTitle} link="/rechercher" selected={title===rechercheTitle} />
        <MenuButton title={deconnexionTitle} onClickButton={deconnexion} link="/connexion" selected={false} />
        </nav>
        <hr style={styles.separatorStyles}/>
        {children}
        {nouveauPiouButton ? <NouveauPiouButton /> : null }
    </main>
    )
}

export default GlobalLayout













