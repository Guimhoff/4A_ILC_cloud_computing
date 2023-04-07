import * as React from "react"
import MenuButton from "./menuButton.js"
import * as styles from "../styles/globalStyles.js"

const GlobalLayout = ({ title, children }) => {

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

    return (
    <main style={styles.pageStyles}>
        <title>{title}</title>
        <nav style={styles.navStyle}>
        <MenuButton title={"👤 " + username} link={"/profil/" + username} selected={title==="👤 " + username} />
        <MenuButton title="Accueil" link="/accueil" selected={title==="Accueil"} />
        <MenuButton title="Sujets" link="/sujets" selected={title==="Sujets"} />
        <MenuButton title="Rechercher" link="/rechercher" selected={title==="Rechercher"} />
        <MenuButton title="Déconnexion" onClickButton={deconnexion} link="/connexion" selected={title==="Déconnexion"} />
        </nav>
        <hr style={styles.separatorStyles}/>
        {children}
    </main>
    )
}

export default GlobalLayout













