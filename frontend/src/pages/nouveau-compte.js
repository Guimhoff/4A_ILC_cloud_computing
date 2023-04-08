import * as React from "react"
import { Link } from "gatsby"
import FormInput from "../components/formInput"
import ValidationButton from "../components/validationButton"
import * as styles from "../styles/globalStyles.js"


// Page to create a new account
const NouveauComptePage = () => {

	// If the user is already logged in, redirect him to the home page
	if (localStorage.getItem("token")) {
		window.location.href = "http://localhost:8000/accueil"
	}

	// Function to create a new account
	function createAccount() {
		let username = document.getElementById("username").value
		let password = document.getElementById("password").value
		let password_confirm = document.getElementById("password_confirm").value
		
		// Check if the passwords match
		if (password !== password_confirm) {
		alert("Les mots de passe ne correspondent pas.")
		return
		}

		// Check if the username and password are long enough
		if (username.length < 3) {
		alert("Le nom d'utilisateur doit faire au moins 3 caractères.")
		return
		}

		if (password.length < 4) {
		alert("Le mot de passe doit faire au moins 4 caractères.")
		return
		}

		// Send the data to the backend
		const formData = new FormData();
		formData.append('pseudo', username);
		formData.append('password', password);

		fetch("http://localhost:5000/new-user", {
		method: "POST",
		body: formData
		})
		.then(response => {
		if (response.status === 200) {
			alert("Compte créé !")
			window.location.href = 'http://localhost:8000/connexion'
		} else {
			alert("Erreur lors de la création du compte.")
		}
		return response.json()
		})
		.then(data => {
		console.log(data.error)
		})

	}

	// Display mainly a form to create a new account (username, password and password confirmation)
	return (
		<main style={styles.loginPageStyles}>
			<h1 style={styles.headingStyles}>Nouveau compte</h1>
			<p style={styles.paragraphStyles}>
			Bienvenue sur Piouteur ! Veuillez créer un compte pour accéder au site web.
			</p>

			<hr style={styles.separatorStyles}/>

			<section>

			<FormInput title="Nom d'utilisateur" id='username' name='Nom' />
			<FormInput title="Mot de passe" id='password' name='Mot de passe' type='password' />
			<FormInput title="Confirmer le mot de passe" id='password_confirm' name='Confirmation mot de passe' type='password' />

			<ValidationButton title="Créer mon compte !" idBouton="createAccount" onClickButton={createAccount} />
			</section>

			<hr style={styles.separatorStyles}/>

			<p>
			Vous avez déjà un compte ? <Link to="/connexion">Connectez-vous</Link>.
			</p>
		</main>
	)
}

export default NouveauComptePage

export const Head = () => <title>Nouveau compte</title>

