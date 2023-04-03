import json
import redis
from flask import Flask, request, jsonify, make_response
import api


def getSujets():
    sujets = []
    for key in api.r_sujets.scan_iter("s-*"):
        sujets.append(key.decode()[2:])
    return make_response(jsonify({"message": "Operation successfull !", "sujets":sujets}), 200)


def getSujet(sujet):
    pious = []
    for key in api.r_sujets.smembers("s-" + sujet):
        pious.append(json.loads(api.r_pious.get("p-" + key.decode()).decode()))
    return make_response(jsonify({"message": "Operation successfull !", "pious":pious}), 200)