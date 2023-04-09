import * as React from "react"
import * as styles from "../styles/globalStyles.js"
import { rechercheTitle } from "../globalVar/windowTitles.js"
import GlobalLayout from "../components/globalLayout.js"
import PiouList from "../components/piouList.js"
import SujetListe from "../components/sujetListe.js"
import UserList from "../components/userList.js"

// Page which allows to search for either users, topics or pious (including 3 buttons to switch between the 3)
const Rechercher = () => {
    if (typeof window === "undefined") return null;

    const [searchType, setSearchType] = React.useState("users")
    
    const [userResults, setUserResults] = React.useState(null)
    const [topicResults, setTopicResults] = React.useState(null)
    const [piouResults, setPiouResults] = React.useState(null)

    // Get the list of users from the backend
    function searchUsers() {
        const searchInput = document.getElementById("searchInput").value

        fetch("http://localhost:5000/search-users=" + searchInput)
        .then(response => {
            if (response.status === 200) {
                console.log("Utilisateurs récupérés !")
            } else {
                alert("Erreur lors de la récupération des utilisateurs.")
            }
            return response.json()
        })
        .then(data => {
            setUserResults(data.users)
            if (data.error) {
                console.error(data.error)
            }
        })
    }

    // Get the list of sujets from the backend
    function searchTopics() {
        const searchInput = document.getElementById("searchInput").value

        fetch("http://localhost:5000/search-sujets=" + searchInput)
        .then(response => {
            if (response.status === 200) {
                console.log("Sujets récupérés !")
            } else {
                alert("Erreur lors de la récupération des sujets.")
            }
            return response.json()
        })
        .then(data => {
            setTopicResults(data.sujets)
            if (data.error) {
                console.error(data.error)
            }
        })
    }

    // Get the list of pious from the backend
    function searchPious() {
        const searchInput = document.getElementById("searchInput").value

        const form = new FormData()
        form.append("token", localStorage.getItem("token"))

        fetch("http://localhost:5000/search-pious=" + searchInput, {
            method: "POST",
            body: form
        })
        .then(response => {
            if (response.status === 200) {
                console.log("Piou récupérés !")
            } else {
                alert("Erreur lors de la récupération des piou.")
            }
            return response.json()
        })
        .then(data => {
            setPiouResults(data.pious)
            if (data.error) {
                console.error(data.error)
            }
        })
    }

    // Search for users, topics and pious
    function search() {
        if (document.getElementById("searchInput").value === "") {
            setUserResults(null)
            setTopicResults(null)
            setPiouResults(null)
            return
        }

        searchUsers()
        searchTopics()
        searchPious()
        return
    }
    
    // Displays the searchbar, the buttons, and the results depending on the search type
    return (
        <GlobalLayout title={rechercheTitle}>
            <input style={styles.rechercheBar} type="text" placeholder="Rechercher..." onChange={search} id="searchInput"></input>
            <div>
                <button style={searchType === "users" ? styles.rechercheTypeButtonSelected : styles.rechercheTypeButton} onClick={() => setSearchType("users")}>Utilisateurs</button>
                <button style={searchType === "sujets" ? styles.rechercheTypeButtonSelected : styles.rechercheTypeButton} onClick={() => setSearchType("sujets")}>Sujets</button>
                <button style={searchType === "pious" ? styles.rechercheTypeButtonSelected : styles.rechercheTypeButton} onClick={() => setSearchType("pious")}>Piou</button>
            </div>
            {searchType === "users" ? (userResults? <UserList users={userResults}></UserList> : null) : null}
            {searchType === "sujets" ? (topicResults? <SujetListe sujets={topicResults}></SujetListe> : null) : null}
            {searchType === "pious" ? (piouResults? <PiouList pious={piouResults}></PiouList> : null) : null}
        </GlobalLayout>
    );
}


export default Rechercher;


