import json
from flask import jsonify, make_response, request
import api
import api_users
import api_pious


def getSujets():
    sujets = []
    for key in api.r_sujets.scan_iter("s-*"):
        sujets.append(key.decode()[2:])
    return make_response(jsonify(
        {"message": "Operation successfull !", "sujets": sujets}), 200)


def getSujet(sujet):
    pious = []
    for key in api.r_sujets.smembers("s-" + sujet):
        if api.r_pious.exists("p-" + key.decode()):
            pious.append(
                json.loads(api.r_pious.get("p-" + key.decode()).decode()))

    return make_response(jsonify(
        {"message": "Operation successfull !", "pious": pious}), 200)


# Post method to get pious by sujet and specify if they had been repiouted by
# the user additionnaly, if a piou is a repiou, it will have the original piou
# in it
def postSujet(sujet):
    if request.form.get('token') is None:
        return make_response(jsonify({"error": "Missing argument"}), 400)

    token = request.form.get('token')

    if not api_users.checkToken(token):
        return make_response(jsonify({"error": "Invalid token"}), 401)

    pseudo = json.loads(api.r_users.get("t-" + token).decode())["pseudo"]

    pious = []
    for key in api.r_sujets.smembers("s-" + sujet):
        if api.r_pious.exists("p-" + key.decode()):
            piou = json.loads(api.r_pious.get("p-" + key.decode()).decode())
            if "id-quote" in piou:
                piou["quote"] = api_pious.buildQuote(piou["id-quote"], pseudo)
            piou["repiouted"] = api.r_pious.get(
                "p-" + str(piou["id"]) + "-rp-" + pseudo) is not None
            pious.append(piou)

    return make_response(jsonify(
        {"message": "Operation successfull !", "pious": pious}), 200)


def getSearchSujets(text):
    sujets = []
    for key in api.r_sujets.scan_iter("s-*"):
        if text in key.decode():
            sujets.append(key.decode()[2:])

    return make_response(jsonify(
        {"message": "Operation successfull !", "sujets": sujets}), 200)
