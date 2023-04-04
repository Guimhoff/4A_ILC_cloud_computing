import * as React from "react"
import { Link } from "gatsby"
import FormInput from "../components/formInput"
import ValidationButton from "../components/validationButton"

import {pageStyles, headingStyles, paragraphStyles, separatorStyles} from "../styles/globalStyles.js"




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

          <ValidationButton title="Créer mon compte !" />
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
