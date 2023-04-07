import json
from flask import jsonify, make_response
import api


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


def getSearchSujets(text):
    sujets = []
    for key in api.r_sujets.scan_iter("s-*"):
        if text in key.decode():
            sujets.append(key.decode()[2:])

    return make_response(jsonify(
        {"message": "Operation successfull !", "sujets": sujets}), 200)
