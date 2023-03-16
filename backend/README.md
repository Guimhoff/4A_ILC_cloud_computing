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

* Enregistrer un piou dans Redis :

> [POST] /new-piou
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
>> Arguments : pseudo (str), password (str)

## Redis

### Base 1 : utilisateurs

```none
clés :  u-<pseudo-user> valeur : {pseudo, date-inscription}
```

* Correspondance utilisateur mot de passe :

```none
clés :  u-<pseudo-user>-password valeur : <password>
```

### Base 2 : pious

```none
clés :  p-<id-piou> valeur : {id, id-quote, text, date, pseudo-user}
```

### Base 3 : sujets

```none
clés :  s-<sujet> valeur : [id-pious]
```