import * as React from "react"
import { Link } from "gatsby"
import FormInput from "../components/formInput"
import ValidationButton from "../components/validationButton"
import {pageStyles, headingStyles, paragraphStyles, separatorStyles} from "../styles/globalStyles.js"


const ConnexionPage = () => {
  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>Connexion</h1>
      <p style={paragraphStyles}>
        Bienvenue sur Piouteur ! Veuillez vous connecter pour accéder au site web.
      </p>

      <hr style={separatorStyles}/>
      
      <section>

        <FormInput title="Nom d'utilisateur" id='username' name='Nom' />
        <FormInput title="Mot de passe" id='password' name='Mot de passe' type='password' />

        <ValidationButton title="Connexion !" />
      </section>

      <hr style={separatorStyles}/>

      <p>
        Vous n'avez pas encore de compte ? <Link to="/nouveau-compte">Créez-en un !</Link>
      </p>
    </main>
  )
}

export default ConnexionPage

export const Head = () => <title>Connexion Piouteur</title>
