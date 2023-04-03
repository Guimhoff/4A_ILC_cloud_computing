from flask import request, jsonify, make_response
import json
import hashlib
import uuid
import time
import api
import logging


def genToken():
    token = str(uuid.uuid1(node=None, clock_seq=time.time_ns()))
    while api.r_users.get("t-" + token) != None:
        token = str(uuid.uuid1(node=None, clock_seq=time.time_ns()))
    return token

def checkToken(token):
    if api.r_users.get("t-" + token) == None:
        return False

    token = json.loads(api.r_users.get("t-" + token).decode())

    # Stay logged
    if token["stay-logged"]:
        return True
    
    # 2 days since last login
    if time.time_ns() - token["login-date"] > 2 * 24 * 60 * 60 * 1000000000:
        api.r_users.delete("t-" + token)
        return False

    if api.r_users.get("u-" + token["pseudo"]) == None:
        api.r_users.delete("t-" + token)
        return False

    return True


def postNewUser():
    if request.form.get('pseudo') == None or request.form.get('password') == None:
        return make_response(jsonify({"error": "Missing argument"}), 400)
    
    if api.r_users.get("u-" + request.form.get('pseudo')) != None:
        return make_response(jsonify({"error": "User already exist"}), 409)

    pseudo = request.form.get('pseudo')
    password = request.form.get('password')

    api.r_users.set("u-" + pseudo, json.dumps({"pseudo": pseudo, "date-inscription": time.time_ns()}))
    api.r_users.set("p-" + pseudo, hashlib.sha256(password.encode()).hexdigest())

    return make_response(jsonify({"message": "Operation successfull !"}), 200)

def checkPassword(pseudo, password):
    if api.r_users.get("u-" + pseudo) == None:
        return False
    
    if  api.r_users.get("p-" + pseudo) == None:
        return False
    
    if api.r_users.get("p-" + pseudo).decode() != hashlib.sha256(password.encode()).hexdigest():
        return False
    
    return True


def postLogin():
    if request.form.get('pseudo') == None or request.form.get('password') == None:
        return make_response(jsonify({"error": "Missing argument"}), 400)
    
    pseudo = request.form.get('pseudo')
    password = request.form.get('password')
    
    if not checkPassword(pseudo, password):
        return make_response(jsonify({"error": "User or password incorrect"}), 401)
    
    token = genToken()

    api.r_users.set("t-" + token, json.dumps({"pseudo": pseudo, "login-date": time.time_ns(), "stay-logged": False}))

    return make_response(jsonify({"token": token}), 200)


def postLogout():
    if request.form.get('token') == None:
        return make_response(jsonify({"error": "Missing argument"}), 400)
    
    token = request.form.get('token')

    if api.r_users.get("t-" + token) == None:
        return make_response(jsonify({"error": "Token not found"}), 401)

    api.r_users.delete("t-" + token)

    return make_response(jsonify({"message": "Operation successfull !"}), 200)


def deleteUser():
    if request.form.get('token') == None or request.form.get('password') == None:
        return make_response(jsonify({"error": "Missing argument"}), 400)
    
    token = request.form.get('token')

    if not checkToken(token):
        return make_response(jsonify({"error": "Invalid token"}), 401)

    pseudo = json.loads(api.r_users.get("t-" + token).decode())["pseudo"]
    password = request.form.get('password')

    if api.r_users.get("u-" + pseudo) == None:
        return make_response(jsonify({"error": "User not found"}), 404)
    
    if api.r_users.get("p-" + pseudo).decode() != hashlib.sha256(password.encode()).hexdigest():
        return make_response(jsonify({"error": "Password incorrect"}), 401)
    
    api.r_users.delete("u-" + pseudo)
    api.r_users.delete("p-" + pseudo)

    # Supprime les pious de l'utilisateur
    for key in api.r_pious.scan_iter("p-*"):
        if json.loads(api.r_pious.get(key).decode())["pseudo-user"] == pseudo:
            api.r_pious.delete(key)
    
    # Supprime les tokens de l'utilisateur
    for key in api.r_users.keys():
        if json.loads(api.r_users.get(key).decode())["pseudo"] == pseudo:
            api.r_users.delete(key)

    return make_response(jsonify({"message": "Operation successfull !"}), 200)


def adminDeleteUser():
    if request.form.get('pseudo') == None:
        return make_response(jsonify({"error": "Missing argument"}), 400)
    
    pseudo = request.form.get('pseudo')

    if api.r_users.get("u-" + pseudo) == None:
        return make_response(jsonify({"error": "User not found"}), 404)
    
    api.r_users.delete("u-" + pseudo)
    api.r_users.delete("p-" + pseudo)

    # TODO: Create admin token and check if token is admin

    return make_response(jsonify({"message": "Operation successfull !"}), 200)


def adminGetUsers():
    users = []
    for key in api.r_users.scan_iter("u-*"):
        users.append(json.loads(api.r_users.get(key).decode()))

    return make_response(jsonify({"users": users}), 200)