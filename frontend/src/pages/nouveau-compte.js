import * as React from "react"
import { Link } from "gatsby"

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
            <br />
            {process.env.NODE_ENV === "development" ? (
            <>
                <br />
                Try creating a page in <code style={codeStyles}>src/pages/</code>.
                <br />
            </>
            ) : null}
            <br />
            Vous avez déjà un compte ? <Link to="/connexion">Connectez-vous</Link>.
        </p>
    </main>
  )
}

export default NouveauComptePage

export const Head = () => <title>Nouveau compte</title>
