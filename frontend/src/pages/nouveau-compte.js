import * as React from "react"
import { Link } from "gatsby"
import FormInput from "../components/formInput"

const pageStyles = {
  color: "#232129",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}

const paragraphStyles = {
  marginBottom: 48,
}
const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
}

const NouveauComptePage = () => {
  return (
    <main style={pageStyles}>
        <h1 style={headingStyles}>Nouveau compte</h1>
        <p style={paragraphStyles}>
          Bienvenue sur Piouteur ! Veuillez créer un compte pour accéder au site web.
        

          <section>

            <FormInput title="Nom d'utilisateur" id='username' name='Nom' />
            <FormInput title="Mot de passe" id='password' name='Mot de passe' />
            <FormInput title="Confirmer le mot de passe" id='password_confirm' name='Confirmation mot de passe' />

          </section>
        </p>

        <p>
          Vous avez déjà un compte ? <Link to="/connexion">Connectez-vous</Link>.
        </p>
    </main>
  )
}

export default NouveauComptePage

export const Head = () => <title>Nouveau compte</title>
