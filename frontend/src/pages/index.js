import * as React from "react"
import { pageStyles } from "../styles/globalStyles"

const IndexPage = () => {

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
      console.log(data.error)
    }
  })
  
  return (
    <main style={pageStyles}>
      Redirection en cours...
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Piouteur</title>
