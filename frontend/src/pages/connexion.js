import * as React from "react"
import { Link } from "gatsby"
import FormInput from "../components/formInput"
import ValidationButton from "../components/validationButton"
import * as styles from "../styles/globalStyles.js"


const ConnexionPage = () => {

  function connexion() {
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    const formData = new FormData();
    formData.append('pseudo', username);
    formData.append('password', password);

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
        console.log(data.token)
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', username)
        window.location.href = 'http://localhost:8000/accueil'
      }
      if (data.error) {
        console.log(data.error)
      }
    })

  }

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

