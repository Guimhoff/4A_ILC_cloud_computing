import * as React from "react"
import MenuButton from "./menuButton.js"
import * as styles from "../styles/globalStyles.js"
import NouveauPiouButton from "./nouveauPiouButton.js"
import { sujetsTitle } from '../pages/sujets.js';
import { accueilTitle } from '../pages/accueil.js';

const GlobalLayout = ({ title, children , nouveauPiouButton=true }) => {

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
    }

    const username = localStorage.getItem("username")


    const profilTitle = "👤 " + username
    const rechercheTitle = "🔍 Rechercher"
    const deconnexionTitle = "🚪 Déconnexion"


    return (
    <main style={styles.pageStyles}>
        <title>{title}</title>
        <nav style={styles.navStyle}>
        <MenuButton title={profilTitle} link={"/profil/" + username} selected={title===profilTitle} />
        <MenuButton title={accueilTitle} link="/accueil" selected={title===accueilTitle} />
        <MenuButton title={sujetsTitle} link="/sujets" selected={title===sujetsTitle} />
        <MenuButton title={rechercheTitle} link="/rechercher" selected={title===rechercheTitle} />
        <MenuButton title={deconnexionTitle} onClickButton={deconnexion} link="/connexion" selected={title===deconnexionTitle} />
        </nav>
        <hr style={styles.separatorStyles}/>
        {children}
        {nouveauPiouButton ? <NouveauPiouButton /> : null }
    </main>
    )
}

export default GlobalLayout













