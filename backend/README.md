# Backend

Backend du projet de Cloud Computing

## Langages et technologies

Les langages et technologies utilisés sont les suivants :

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white)

## Routes

* Afficher tous les pious :

> [GET] /pious

* Afficher un piou :

> [GET] /piou=\<id-piou>

* Enregistrer un piou dans Redis :

> [POST] /piouter
>> Arguments : text (str), token (str)

* Afficher les pious attribués à une personne :

> [GET] /user/\<user>/pious

* Retweeter :

> [POST] /repiouter
>> Arguments : id-piou (int), token (str)

* Afficher les sujets :

> [GET] /sujets

* Afficher les tweets liés à un sujet :

> [GET] /sujet=\<sujet>

* Créer un utilisateur :

> [POST] /new-user
>> Arguments : pseudo (str), password (str)

* Se connecter en tant qu'utilisateur :

> [POST] /login
>> Arguments : pseudo (str), password (str), stay-logged (bool)

* Se déconnecter en tant qu'utilisateur :

> [POST] /logout
>> Arguments : token (str)

* Supprimer un utilisateur :

> [DELETE] /delete-user
>> Arguments : token (str), password (str)

* Supprimer un utilisateur par un admin :

> [DELETE] /admin-delete-user
>> Arguments : token (str), pseudo (str)

## Redis

### Base 1 : utilisateurs

```none
clés :  u-<pseudo-user> valeur : {pseudo, date-inscription}
```

* Correspondance utilisateur mot de passe :

```none
clés :  u-<pseudo-user>-password valeur : <password>
```

* Correspondance token utilisateur :

```none
clés :  t-<token> valeur : {pseudo, login-date, stay-logged}
```

### Base 2 : pious

* Pious :

```none
clés :  p-<id-piou> valeur : {id, id-quote, text, date, pseudo-user}
```

* Nombre de pious :

```none
clés :  next-id valeur : <int>
```

### Base 3 : sujets

```none
clés :  s-<sujet> valeur : [id-pious]
```

Note : requête curl pour tester les routes :

## Commandes cmd / Powershell

### Commandes automatisées

* Lancer le script de montage et démarrage des conteneurs

> .\cmd\build_and_run_all.ps1

* Lancer le script de démarrage des conteneurs

> .\cmd\run_all.ps1

* Lancer le script d'arrêt des conteneurs

> .\cmd\stop_all.ps1

* Lancer le script de suppression des conteneurs

> .\cmd\rm_all.ps1

* Lancer le script de réinitialisation de la base de données

> .\cmd\clean_redis.ps1

* Lancer le script de montage et démarrage de l'API (avec suppression d'une ancienne API si nécessaire)

> .\cmd\build_and_run_api.ps1

### Commandes manuelles

* Lancer Reddis

> docker run --name piouteur-redis -p 6379:6379 -d redis

* Construire l'image de l'API

> docker build -t piouteur-api .

* Lancer le conteneur de l'API

> docker run --name piouteur-api -p 5000:5000 -d piouteur-api

## Exemples de requêtes

> curl -X POST <http://localhost:5000/new-user> -d "pseudo=Mindeufair&password=1234"  
> curl -X POST <http://localhost:5000/login> -d "pseudo=Mindeufair&password=1234"  
> curl -X POST <http://localhost:5000/piouter> -d "token=\<token>&text=Salut c'est Guillaume ! #Bonjour"  
> curl -X POST <http://localhost:5000/repiouter> -d "token=\<token>&id-piou=1"  
> curl -X GET <http://localhost:5000/pious>  
> curl -X GET <http://localhost:5000/piou=1>  
> curl -X GET <http://localhost:5000/piou=2>  
> curl -X GET <http://localhost:5000/sujets>  
> curl -X GET <http://localhost:5000/sujet=Bonjour>  
> curl -X GET <http://localhost:5000/user/Mindeufair/pious>  
