import * as React from "react"
import * as styles from "../styles/globalStyles"

// Redirect to login page if no token, else redirect to accueil page
const IndexPage = () => {
	if (typeof window === "undefined") return null;

	// If no token, redirect to login page
	if (!localStorage.getItem("token")) {
		window.location.href = "/connexion"
	}

	// Else, test it
	const formData = new FormData();
	formData.append('token', localStorage.getItem("token"));

	fetch("http://localhost:5000/test-token", {
		method: "POST",
		body: formData
	})
	.then(response => {
		if (response.status === 200) {
			console.log("Connecté !")
			window.location.href = '/accueil'
		} else {
			console.log("Token invalide.")
			window.location.href = '/connexion'
		}
		return response.json()
	})
	.then(data => {
		if (data.error) {
		    console.error(data.error)
    	}
  	})
  
 	 return (
		<main style={styles.redirectPageStyles}>
			Redirection en cours...
		</main>
	)
}

export default IndexPage

export const Head = () => <title>Piouteur</title>
