# Frontend

Frontend du projet de Cloud Computing (Développée en React Gatsby)

> **Attention !** Il semblerait que parfois le routage dynamique ne fonctionne pas immédiatement après le lancement du serveur. Il faut dans ce cas attendre quelques minutes avant de pouvoir accéder aux pages dynamiques (par exemeple /profil/\<nom-du-profil>) ou tenter de relancer le container avec la commande powershell `.\cmd\build_and_mount_front_no_cache.ps1`.

## Langages et technologies

Les langages et technologies utilisés sont les suivants :

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Gatsby](https://img.shields.io/badge/Gatsby-663399?style=for-the-badge&logo=gatsby&logoColor=white)

## Pages

* Index :
    > /

Cette page va automatiquement rediriger l'utilisateur vers la page d'accueil s'il est connecté, ou vers la page de connexion s'il n'est pas connecté.

### Page "non connecté"

* Page d'inscription :
    > /nouveau-compte

Cette page permet de créer un nouveau compte utilisateur. L'utilisateur doit renseigner un pseudo et un mot de passe. Le mot de passe doit contenir au moins 4 caractères, et être confirmé par une deuxième saisie.
Cette page est inaccessible si l'utilisateur est déjà connecté.

* Page de connexion :
    > /connexion

Cette page permet de se connecter à un compte utilisateur. L'utilisateur doit renseigner un pseudo et un mot de passe. Il doit enfin indiquer s'il souhaite que le site se souvienne de lui (cela va empêcher le token d'expirer). Si l'utilisateur est déjà connecté, il est redirigé vers la page d'accueil.

### Page "connecté"

Les pages suivantes disposent d'un menu de navigation commun en haut de page. Ce menu permet de naviguer entre les différentes pages du site. Elles ne sont accessibles que si l'utilisateur est connecté. Dans le cas contraire, l'utilisateur est redirigé vers la page de connexion.

À chaque fois qu'un piou est affiché, il est accompagné d'un bouton "repiouter" qui permet de repiouter le piou.

* Page d'accueil :
    > /accueil

Cette page affiche les pious et  les repious de tous les utilisateurs.

* Page de nouveau piou :
    > /nouveauPiou

Cette page permet de créer un nouveau piou. L'utilisateur doit renseigner un contenu et valider. Le contenu doit contenir au moins 1 caractère.

* Page de piou :
    > /piou/\<id-piou>/

Cette page affiche le piou correspondant à l'id passé en paramètre.

* Page de profil :
    > /profil/\<user>/

Cette page affiche le profil de l'utilisateur passé en paramètre. Elle affiche les pious et les repious de l'utilisateur.

* Page des sujets :
    > /sujets

Cette page affiche la liste des sujets disponibles.

* Page d'un sujet :
    > /sujet/\<sujet>/

Cette page affiche les pious du sujet passé en paramètre.

* Page de recherche :
    > /recherche

Cette page permet de rechercher des pious, des utilisateurs ou des sujets. L'utilisateur doit renseigner un terme de recherche et valider. Le terme de recherche doit contenir au moins 1 caractère. L'utilisateur peut choisir de rechercher des pious, des utilisateurs ou des sujets à l'aide de 3 boutons.

## Vidéo

Une image vallant mille mots, et une vidéo mille images, voici une vidéo de démonstration du site :

[![Vidéo de démonstration](https://img.youtube.com/vi/uxNJtbnHAMY/0.jpg)](https://youtu.be/uxNJtbnHAMY)

## Commandes cmd / powershell

* Construire et monter le container avec le cache :
    > `.\cmd\build_and_mount_front.ps1`

* Construire et lancer le container sans le cache :
    > `.\cmd\build_and_mount_front_no_cache.ps1`

* Lancer le container :
    > `.\cmd\start_front.ps1`

* Arrêter le container :
    > `.\cmd\stop_front.ps1`

* Supprimer le container :
    > `.\cmd\rm_front.ps1`
