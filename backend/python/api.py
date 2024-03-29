from flask import Flask
import sys
import redis
from flask_cors import CORS
import logging
import api_pious
import api_sujets
import api_users
import api_demo


logging.basicConfig(level=logging.DEBUG,
                    handlers=[logging.StreamHandler(sys.stdout)])


app = Flask(__name__)
CORS(app)


r_users = None
r_pious = None
r_sujets = None


def findHost():
    # On vérifie si le host est bien gateway.docker.internal ou localhost
    global r_users, r_pious, r_sujets

    host = "gateway.docker.internal"
    try:
        temp = redis.Redis(host=host, port=6379, db=0)
        temp.ping()
        temp.close()
    except redis.exceptions.ConnectionError:
        host = "localhost"

    r_users = redis.Redis(host=host, port=6379, db=0)
    r_pious = redis.Redis(host=host, port=6379, db=1)
    r_sujets = redis.Redis(host=host, port=6379, db=2)

    return


def reviveHost():
    global r_users, r_pious, r_sujets

    try:
        r_users.ping()
        r_pious.ping()
        r_sujets.ping()
    except redis.exceptions.ConnectionError:
        reviveHost()

    return


findHost()


@app.before_request
def before_request():
    # Méthode un peu bourrin qui va avec un peu de chance
    # empêcher les erreurs intempestives de connexion à redis
    global r_users, r_pious, r_sujets

    reviveHost()

# Gestions pious


@app.route("/pious", methods=['GET'])
def getPious():
    return api_pious.getPious()


@app.route("/pious", methods=['POST'])
def postPious():
    return api_pious.postPious()


@app.route("/piou=<id>", methods=['GET'])
def getPiou(id):
    return api_pious.getPiou(id)


@app.route("/piou=<id>", methods=['POST'])
def postPiou(id):
    return api_pious.postPiou(id)


@app.route("/user/<username>/pious", methods=['GET'])
def getPiousByUser(username):
    return api_pious.getPiousByUser(username)


@app.route("/user/<username>/pious", methods=['POST'])
def postPiousByUser(username):
    return api_pious.postPiousByUser(username)


@app.route("/piouter", methods=['POST'])
def postPiouter():
    return api_pious.postPiouter()


@app.route("/repiouter", methods=['POST'])
def postRepiouter():
    return api_pious.postRepiouter()


@app.route("/search-pious=<text>", methods=['GET'])
def getSearchPious(text):
    return api_pious.getSearchPious(text)


@app.route("/search-pious=<text>", methods=['POST'])
def postSearchPious(text):
    return api_pious.postSearchPious(text)


# Gestions sujets


@app.route("/sujets", methods=['GET'])
def getSujets():
    return api_sujets.getSujets()


@app.route("/sujet=<sujet>", methods=['GET'])
def getSujet(sujet):
    return api_sujets.getSujet(sujet)


@app.route("/sujet=<sujet>", methods=['POST'])
def postSujet(sujet):
    return api_sujets.postSujet(sujet)


@app.route("/search-sujets=<text>", methods=['GET'])
def getSearchSujets(text):
    return api_sujets.getSearchSujets(text)


# Gestions users


@app.route("/search-users=<text>", methods=['GET'])
def getSearchUsers(text):
    return api_users.getSearchUsers(text)


@app.route("/new-user", methods=['POST'])
def postNewUser():
    return api_users.postNewUser()


@app.route("/login", methods=['POST'])
def postLogin():
    return api_users.postLogin()


@app.route("/logout", methods=['POST'])
def postLogout():
    return api_users.postLogout()


@app.route("/test-token", methods=['POST'])
def postTestToken():
    return api_users.postTestToken()


@app.route("/delete-user", methods=['DELETE'])
def deleteUser():
    return api_users.deleteUser()


@app.route("/admin-delete-user", methods=['DELETE'])
def adminDeleteUser():
    return api_users.adminDeleteUser()


@app.route("/admin-get-users", methods=['POST'])
def adminGetUsers():
    return api_users.adminGetUsers()


@app.route("/demo", methods=['POST'])
def postDemo():
    return api_demo.postDemo()


if __name__ == '__main__':
    if len(sys.argv) > 1:
        if sys.argv[1] == "check_syntax":
            print("Build [ OK ]")
            exit(0)
        else:
            print(
                """Passed argument not supported !
                 Supported argument : check_syntax""")
            exit(1)
    app.run(debug=True)
