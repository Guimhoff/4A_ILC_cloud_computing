from flask import Flask
import sys
import redis
from flask_cors import CORS
import logging

logging.basicConfig(level=logging.DEBUG, handlers=[logging.StreamHandler(sys.stdout)])

import api_pious
import api_sujets
import api_users

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
        redis.Redis(host=host, port=6379, db=0).ping()
    except:
        host = "localhost"
        redis.Redis(host=host, port=6379, db=0).ping()
    
    r_users = redis.Redis(host=host, port=6379, db=0)
    r_pious = redis.Redis(host=host, port=6379, db=1)
    r_sujets = redis.Redis(host=host, port=6379, db=2)

    return

findHost()

# Gestions pious

@app.route("/pious", methods=['GET'])
def getPious():
    return api_pious.getPious()

@app.route("/piou=<id>", methods=['GET'])
def getPiou(id):
    return api_pious.getPiou(id)

@app.route("/user/<username>/pious", methods=['GET'])
def getPiousByUser(username):
    return api_pious.getPiousByUser(username)

@app.route("/piouter", methods=['POST'])
def postPiouter():
    return api_pious.postPiouter()        

@app.route("/repiouter", methods=['POST'])
def postRepiouter():
    return api_pious.postRepiouter()

# Gestions sujets

@app.route("/sujets", methods=['GET'])
def getSujets():
    return api_sujets.getSujets()

@app.route("/sujet=<sujet>", methods=['GET'])
def getSujet(sujet):
    return api_sujets.getSujet(sujet)

# Gestions users

@app.route("/new-user", methods=['POST'])
def postNewUser():
    return api_users.postNewUser()

@app.route("/login", methods=['POST'])
def postLogin():
    return api_users.postLogin()

@app.route("/logout", methods=['POST'])
def postLogout():
    return api_users.postLogout()

@app.route("/delete-user", methods=['DELETE'])
def deleteUser():
    return api_users.deleteUser()

@app.route("/admin-delete-user", methods=['DELETE'])
def adminDeleteUser():
    return api_users.adminDeleteUser()

@app.route("/admin-get-users", methods=['POST'])
def adminGetUsers():
    return api_users.adminGetUsers()

if __name__ == '__main__':
    if len(sys.argv) > 1:
        if sys.argv[1] == "check_syntax":
            print("Build [ OK ]")
            exit(0)
        else:
            print("Passed argument not supported ! Supported argument : check_syntax")
            exit(1)
    app.run(debug=True)