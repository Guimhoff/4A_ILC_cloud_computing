# 4A_ILC_cloud_computing

Projet de  Cloud Computing de 4A-ILC

## Membres du groupe

* [**@Guimhoff**](https://github.com/Guimhoff) : Guillaume IMHOFF

Et... c'est tout

## Langages et technologies

Les langages et technologies utilisés sont les suivants :

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Gatsby](https://img.shields.io/badge/Gatsby-663399?style=for-the-badge&logo=gatsby&logoColor=white)

## Résultats des CIs

[![Vérification de l'intégrité du frontend](https://github.com/Guimhoff/4A_ILC_cloud_computing/actions/workflows/actionCheckFront.yml/badge.svg)](https://github.com/Guimhoff/4A_ILC_cloud_computing/actions/workflows/actionCheckFront.yml)
[![Vérification de la syntaxe et de l'intégrité de l'API](https://github.com/Guimhoff/4A_ILC_cloud_computing/actions/workflows/actionCheckAPI.yml/badge.svg)](https://github.com/Guimhoff/4A_ILC_cloud_computing/actions/workflows/actionCheckAPI.yml)

## Procédures de lancement

Ouvrir un terminal (cmd ou powershell) et se placer dans le dossier du projet.
Exécuter l'une **ou** l'autre des commandes suivante :

> `.\cmd\demo.ps1`  
(Va construire et monter les conteneurs en remplissant la base de données de données de démo)

> `.\cmd\build_and_mount_all.ps1`  
(Va construire et monter les conteneurs sans remplir la base de données)

Ouvrir sur le navigateur de votre choix l'adresse suivante :

> <http://localhost/>

**C'est parti !**

## Commandes cmd / powershell

* Construire et monter tous les conteneurs :
    > `.\cmd\build_and_mount_all.ps1`

* Construire et monter tous les conteneurs en mode démo :
    > `.\cmd\demo.ps1`

* Démarrer tous les conteneurs :
    > `.\cmd\start_all.ps1`

* Arrêter tous les conteneurs :
    > `.\cmd\stop_all.ps1`

* Supprimer tous les conteneurs :
    > `.\cmd\rm_all.ps1`

## Déroulé du projet

* J'ai commencé le projet par la définition des différentes routes de l'API, puis par la création des différents modèles de données (organisation des 3 bases Redis). Ces modèles ont par la suite subi quelques modifications pour s'adapter à la réalité du projet, mais ils sont restés dans les grandes lignes les mêmes. Cela m'a permis d'avoir un cadre dans lequel développer l'API, et de pouvoir l'implémenter en sachant ce que je voulais obtenir.
* J'ai ensuite commencé à développer l'API. J'ai commencé par la création des routes, puis par l'implémentation des requêtes liées aux utilisateurs (création, suppression, récupération d'un token, etc).
Une fois cela fait, j'ai implémenté les requêtes liées aux pious (envoie, récupération des pious, repious), pour finir par les sujets. La taille du ficher `api.py` étant de plus en plus élevée, j'ai décidé de scinder le fichier en plusieurs fichiers, afin de rendre le code plus lisible et plus facile à maintenir.
* Une fois arrivé à une API fonctionnelle, j'ai commencé à développer le frontend. J'ai tout d'abord créé les pages de connexion et d'incription, afin de pouvoir tester les pages suivantes aisément, en ayant la possibilité de changer facilement d'utilisateur.
J'ai ensuite développé le `globalLayout`, qui est le layout qui est utilisé sur toutes les pages. Il contient le menu de navigation, et recevra plus tard un test (qui est ainsi commun à toutes les pages) qui renvoie un utilisateur non connecté vers la page de connexion.
J'ai ensuite développé l'accueil, qui affiche tous les pious, la liste des sujets, qui affiche tous les sujets, la vue d'un sujet, qui affiche tous les pious qui y sont liés, la vue du profil d'un utilisateur, qui affiche tous les pious qu'il a posté, la page de nouveau Piou, qui permet de piouter, et enfin le menu de recherche, qui permet de rechercher parmi les pious, les sujets et les utilisateurs.
J'ai en parallèle développé les différents composants, au fur et à mesure qu'ils m'étaient nécessaires.
J'ai, lors du développement de l'affichage des repious, ajouté des requêtes à l'API pour permettre d'obtenir les pious du point de vue de l'utilisateur connecté (ie en spécifiant ceux qu'il a déjà repiouté).

## Conclusion

Je suis très satisfait de ce projet, qui m'a été je pense très enrichissant. J'ai pu mettre en place une API ainsi qu'un Frontend, tous deux développés entièrement par moi-même.  
Ce projet était clairement plus adapté pour être fait à deux, mais je suis tout de même content de l'avoir réalisé seul, car cela m'a permis de monter en compétences sur plusieurs points que j'aurais forcément partagé si j'avais eu un binôme (utilisation de Github, développement d'API, de frontend utilisant REACT, fonctionnement des containers et de Docker..). Les 3 jours supplémentaires m'ont toutefois été vraiment nécessaires, je n'aurais jamais pu finir dans les temps car j'avais légèrement sous-estimé la quantité totale de travail.  
Je tiens à remercier M. [Massard](https://github.com/JeromeMSD) pour ses cours intéressant et de qualité, ainsi que pour les TD et TP qui ont suivis, qui, bien que parfois un peu chronophages, semblent ancrés dans le réel et donnent envie d'être réalisés.
