import * as React from "react"
import { Link } from "gatsby"
import FormInput from "../components/formInput"
import ValidationButton from "../components/validationButton"

import {pageStyles, headingStyles, paragraphStyles, separatorStyles} from "../styles/globalStyles.js"


const CreateAccount = (username, password, password_confirm) => {
  if (password !== password_confirm) {
    alert("Les mots de passe ne correspondent pas.")
    return
  }

  if (username.length < 3) {
    alert("Le nom d'utilisateur doit faire au moins 3 caractères.")
    return
  }

  if (password.length < 4) {
    alert("Le mot de passe doit faire au moins 4 caractères.")
    return
  }

  let accountCreated = false

  const formData = new FormData();
  formData.append('pseudo', username);
  formData.append('password', password);

  fetch("http://localhost:5000/new-user", {
    method: "POST",
    body: formData
  })
  .then(response => {
    if (response.status === 200) {
      accountCreated = true
      alert("Compte créé !")
    } else {
      alert("Erreur lors de la création du compte.")
    }
    return response.json()
  })
  .then(data => {
    console.log(data.error)
  })

  if (accountCreated) {
    window.location.assign('https://localhost:8000/connexion');
  }
}

const NouveauComptePage = () => {
  return (
    <main style={pageStyles}>
        <h1 style={headingStyles}>Nouveau compte</h1>
        <p style={paragraphStyles}>
          Bienvenue sur Piouteur ! Veuillez créer un compte pour accéder au site web.
        </p>

        <hr style={separatorStyles}/>

        <section>

          <FormInput title="Nom d'utilisateur" id='username' name='Nom' />
          <FormInput title="Mot de passe" id='password' name='Mot de passe' type='password' />
          <FormInput title="Confirmer le mot de passe" id='password_confirm' name='Confirmation mot de passe' type='password' />

          <ValidationButton title="Créer mon compte !" id="createAccount" />
        </section>

        <hr style={separatorStyles}/>

        <p>
          Vous avez déjà un compte ? <Link to="/connexion">Connectez-vous</Link>.
        </p>
    </main>
  )
}

export default NouveauComptePage

export const Head = () => <title>Nouveau compte</title>

window.addEventListener("load", () => {
  document.getElementById("createAccount").addEventListener("click", () => {
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    let password_confirm = document.getElementById("password_confirm").value
    CreateAccount(username, password, password_confirm)
  })
});