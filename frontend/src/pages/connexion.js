import * as React from "react"
import { Link } from "gatsby"
import FormInput from "../components/formInput"
import ValidationButton from "../components/validationButton"
import * as styles from "../styles/globalStyles.js"

// Page to log the user in, including a form to enter his username and password, and a check "remebmer me"
const ConnexionPage = () => {
	if (typeof window === "undefined") return null;

	// If the user is already logged in, redirect him to the home page
	if (localStorage.getItem("token")) {
		window.location.href = "/accueil"
	}

	// Function to log the user in
	function connexion() {
		let username = document.getElementById("username").value
		let password = document.getElementById("password").value

		// Send the data to the backend
		const formData = new FormData();
		formData.append('pseudo', username);
		formData.append('password', password);
		formData.append('rememberMe', document.getElementById("rememberMe").checked);

		fetch("http://localhost:5000/login", {
			method: "POST",
			body: formData
		})
		.then(response => {
			if (response.status === 200) {
				console.log("Connecté !")
			} else {
				alert("Erreur lors de la connexion.")
			}
			return response.json()
		})
		.then(data => {
			if (data.token) {
				// Save the token and the username in the local storage and redirect the user to the home page
				localStorage.setItem('token', data.token)
				localStorage.setItem('username', username)
				window.location.href = '/accueil'
			}
			if (data.error) {
				console.error(data.error)
			}
		})

	}

	// Display the connexion page with a form to enter the username and password, and a check "remember me"
	return (
		<main style={styles.loginPageStyles}>
			<h1 style={styles.headingStyles}>Connexion</h1>
			<p style={styles.paragraphStyles}>
				Bienvenue sur Piouteur ! Veuillez vous connecter pour accéder au site web.
			</p>
			<hr style={styles.separatorStyles}/>
			<section>
				<FormInput title="Nom d'utilisateur" id='username' name='Nom' />
				<FormInput title="Mot de passe" id='password' name='Mot de passe' type='password' />
				
				<label style={styles.labelStyles}>
					<input type="checkbox" id="rememberMe" name="rememberMe" value="rememberMe" />
					Se souvenir de moi
				</label>

				<ValidationButton title="Connexion !" idBouton="loginIn" onClickButton={connexion} />
			</section>
			<hr style={styles.separatorStyles}/>
			<p>
				Vous n'avez pas encore de compte ? <Link to="/nouveau-compte">Créez-en un !</Link>
			</p>
		</main>
	)
}

export default ConnexionPage

export const Head = () => <title>Connexion Piouteur</title>

