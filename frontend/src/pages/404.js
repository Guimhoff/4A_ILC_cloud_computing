import * as React from "react"
import { Link } from "gatsby"
import * as styles from "../styles/globalStyles.js"


// Page displayed when the user tries to access a page that doesn't exist
const NotFoundPage = () => {
    return (
        <main style={styles.pageStyles}>
            <h1 style={styles.notFoundHeadingStyle}>Page introuvable</h1>
            <p style={styles.notFoundTextStyle}>
                Désolé 😔, la page que vous cherchez n'existe pas.
            </p>
            <p style={styles.notFoundTextStyle}>
                <Link to="/accueil/">Retour à l'accueil.</Link>
            </p>
        </main>
    )
}

export default NotFoundPage

export const Head = () => <title>Page introuvable</title>
