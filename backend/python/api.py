from flask import Flask, request, make_response, jsonify
import sys
import time
import redis
import uuid
import json
import hashlib
import re
from flask_cors import CORS

import api_pious

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

    api_pious.setRedisPious(r_pious)
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
    sujets = []
    for key in r_sujets.scan_iter("s-*"):
        sujets.append(key.decode()[2:])
    return make_response(jsonify({"message": "Operation successfull !", "sujets":sujets}), 200)

@app.route("/sujet=<sujet>", methods=['GET'])
def getSujet(sujet):
    pious = []
    for key in r_sujets.smembers("s-" + sujet):
        pious.append(json.loads(r_pious.get("p-" + key.decode()).decode()))
    return make_response(jsonify({"message": "Operation successfull !", "pious":pious}), 200)

# Gestions users

def genToken():
    token = str(uuid.uuid1(node=None, clock_seq=time.time_ns()))
    while r_users.get("t-" + token) != None:
        token = str(uuid.uuid1(node=None, clock_seq=time.time_ns()))
    return token

def checkToken(token):
    if r_users.get("t-" + token) == None:
        return False

    token = json.loads(r_users.get("t-" + token).decode())

    # Stay logged
    if token["stay-logged"]:
        return True
    
    # 2 days since last login
    if time.time_ns() - token["login-date"] > 2 * 24 * 60 * 60 * 1000000000:
        r_users.delete("t-" + token)
        return False

    return True

@app.route("/new-user", methods=['POST'])
def postNewUser():
    if request.form.get('pseudo') == None or request.form.get('password') == None:
        return make_response(jsonify({"error": "Missing argument"}), 400)
    
    if r_users.get("u-" + request.form.get('pseudo')) != None:
        return make_response(jsonify({"error": "User already exist"}), 409)

    pseudo = request.form.get('pseudo')
    password = request.form.get('password')

    r_users.set("u-" + pseudo, json.dumps({"pseudo": pseudo, "date-inscription": time.time_ns()}))
    r_users.set("u-" + pseudo + "-password", hashlib.sha256(password.encode()).hexdigest())

    return make_response(jsonify({"message": "Operation successfull !"}), 200)

def checkPassword(pseudo, password):
    if r_users.get("u-" + pseudo) == None:
        return False
    
    if  r_users.get("u-" + pseudo + "-password") == None:
        return False
    
    if r_users.get("u-" + pseudo + "-password").decode() != hashlib.sha256(password.encode()).hexdigest():
        return False
    
    return True

@app.route("/login", methods=['POST'])
def postLogin():
    if request.form.get('pseudo') == None or request.form.get('password') == None:
        return make_response(jsonify({"error": "Missing argument"}), 400)
    
    pseudo = request.form.get('pseudo')
    password = request.form.get('password')
    
    if not checkPassword(pseudo, password):
        return make_response(jsonify({"error": "User or password incorrect"}), 401)
    
    token = genToken()

    r_users.set("t-" + token, json.dumps({"pseudo": pseudo, "login-date": time.time_ns(), "stay-logged": False}))

    return make_response(jsonify({"token": token}), 200)

@app.route("/logout", methods=['POST'])
def postLogout():
    if request.form.get('token') == None:
        return make_response(jsonify({"error": "Missing argument"}), 400)
    
    token = request.form.get('token')

    if r_users.get("t-" + token) == None:
        return make_response(jsonify({"error": "Token not found"}), 401)

    r_users.delete("t-" + token)

    return make_response(jsonify({"message": "Operation successfull !"}), 200)

@app.route("/delete-user", methods=['DELETE'])
def deleteUser():
    if request.form.get('pseudo') == None or request.form.get('password') == None:
        return make_response(jsonify({"error": "Missing argument"}), 400)
    
    token = request.form.get('token')

    if not checkToken(token):
        return make_response(jsonify({"error": "Invalid token"}), 401)

    pseudo = json.loads(r_users.get("t-" + token).decode())["pseudo"]
    password = request.form.get('password')

    if r_users.get("u-" + pseudo) == None:
        return make_response(jsonify({"error": "User not found"}), 404)
    
    if r_users.get("u-" + pseudo + "-password").decode() != hashlib.sha256(password.encode()).hexdigest():
        return make_response(jsonify({"error": "Password incorrect"}), 401)
    
    r_users.delete("u-" + pseudo)
    r_users.delete("u-" + pseudo + "-password")

    # Supprime les pious de l'utilisateur
    for key in r_pious.keys():
        if json.loads(r_pious.get(key).decode())["pseudo-user"] == pseudo:
            r_pious.delete(key)
    
    # Supprime les tokens de l'utilisateur
    for key in r_users.keys():
        if json.loads(r_users.get(key).decode())["pseudo"] == pseudo:
            r_users.delete(key)

    return make_response(jsonify({"message": "Operation successfull !"}), 200)

@app.route("/admin-delete-user", methods=['DELETE'])
def adminDeleteUser():
    if request.form.get('pseudo') == None:
        return make_response(jsonify({"error": "Missing argument"}), 400)
    
    pseudo = request.form.get('pseudo')

    if r_users.get("u-" + pseudo) == None:
        return make_response(jsonify({"error": "User not found"}), 404)
    
    r_users.delete("u-" + pseudo)
    r_users.delete("u-" + pseudo + "-password")

    # TODO: Create admin token and check if token is admin

    return make_response(jsonify({"message": "Operation successfull !"}), 200)

if __name__ == '__main__':
    if len(sys.argv) > 1:
        if sys.argv[1] == "check_syntax":
            print("Build [ OK ]")
            exit(0)
        else:
            print("Passed argument not supported ! Supported argument : check_syntax")
            exit(1)
    app.run(debug=True)