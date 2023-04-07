from flask import request, make_response, jsonify
import time
import json
import re

import api
import api_users


def getPious():
    pious = []
    for key in api.r_pious.scan_iter("p-*"):
        pious.append(json.loads(api.r_pious.get(key).decode()))

    return make_response(jsonify(
        {"message": "Operation successfull !", "pious": pious}), 200)


# Post method to get pious and specify if they had been repiouted by the user
# additionnaly, if a piou is a repiou, it will have the original piou in it
def postPious():
    if request.form.get('token') is None:
        return make_response(jsonify({"error": "Missing argument"}), 400)

    token = request.form.get('token')

    if not api_users.checkToken(token):
        return make_response(jsonify({"error": "Invalid token"}), 401)

    pseudo = json.loads(api.r_users.get("t-" + token).decode())["pseudo"]

    pious = []
    for id in range(int(api.r_pious.get("next-id").decode()), 0, -1):
        if not api.r_pious.exists("p-" + str(id)):
            continue

        piou = json.loads(api.r_pious.get("p-" + str(id)).decode())
        if "id-quote" in piou:
            piou["quote"] = json.loads(api.r_pious.get(
                "p-" + str(piou["id-quote"])).decode())
        piou["repiouted"] = api.r_pious.get(
            "p-" + str(piou["id"]) + "-rp-" + pseudo) is not None
        pious.append(piou)

    return make_response(jsonify(
        {"message": "Operation successfull !", "pious": pious}), 200)


def getPiou(id):
    if not api.r_pious.exists("p-" + id):
        return make_response(jsonify({"error": "Piou not found"}), 404)

    piou = json.loads(api.r_pious.get("p-" + id).decode())
    return make_response(jsonify(
        {"message": "Operation successfull !", "piou": piou}), 200)


# Same as postPiou but only for a specific piou
def postPiou(id):
    if request.form.get('token') is None:
        return make_response(jsonify({"error": "Missing argument"}), 400)

    token = request.form.get('token')

    if not api_users.checkToken(token):
        return make_response(jsonify({"error": "Invalid token"}), 401)

    pseudo = json.loads(api.r_users.get("t-" + token).decode())["pseudo"]

    if not api.r_pious.exists("p-" + id):
        return make_response(jsonify({"error": "Piou not found"}), 404)

    piou = json.loads(api.r_pious.get("p-" + id).decode())
    if "id-quote" in piou:
        piou["quote"] = json.loads(api.r_pious.get(
            "p-" + str(piou["id-quote"])).decode())
    piou["repiouted"] = api.r_pious.get(
        "p-" + str(piou["id"]) + "-rp-" + pseudo) is not None

    return make_response(jsonify(
        {"message": "Operation successfull !", "piou": piou}), 200)


def getPiousByUser(username):
    pious = []
    for key in api.r_pious.scan_iter("p-*"):
        piou = json.loads(api.r_pious.get(key).decode())
        if piou["pseudo-user"] == username:
            pious.append(piou)

    return make_response(jsonify(
        {"message": "Operation successfull !", "pious": pious}), 200)


# Same as postPious but only for a specific user
def postPiousByUser(username):
    if request.form.get('token') is None:
        return make_response(jsonify({"error": "Missing argument"}), 400)

    token = request.form.get('token')

    if not api_users.checkToken(token):
        return make_response(jsonify({"error": "Invalid token"}), 401)

    pseudo = json.loads(api.r_users.get("t-" + token).decode())["pseudo"]

    pious = []
    for id in range(int(api.r_pious.get("next-id").decode()), 0, -1):
        if not api.r_pious.exists("p-" + str(id)):
            continue

        piou = json.loads(api.r_pious.get("p-" + str(id)).decode())
        if piou["pseudo-user"] == username:
            if "id-quote" in piou:
                piou["quote"] = json.loads(api.r_pious.get(
                    "p-" + str(piou["id-quote"])).decode())
            piou["repiouted"] = api.r_pious.get(
                "p-" + str(piou["id"]) + "-rp-" + pseudo) is not None
            pious.append(piou)

    return make_response(jsonify(
        {"message": "Operation successfull !", "pious": pious}), 200)


def get_new_piou_id():
    return api.r_pious.incr("next-id")


def get_subject_in_text(text):
    pattern = r"#(\w+)"
    return re.findall(pattern, text)


def postPiouter():
    if request.form.get('token') is None or request.form.get('text') is None:
        return make_response(jsonify({"error": "Missing argument"}), 400)

    text = request.form.get('text')
    token = request.form.get('token')

    if not api_users.checkToken(token):
        return make_response(jsonify({"error": "Invalid token"}), 401)

    pseudo = json.loads(api.r_users.get("t-" + token).decode())["pseudo"]
    id = get_new_piou_id()

    api.r_pious.set("p-" + str(id), json.dumps(
        {"id": id, "text": text, "date": time.time_ns(),
         "pseudo-user": pseudo}))

    for sujet in get_subject_in_text(text):
        api.r_sujets.sadd("s-" + sujet, id)

    return make_response(jsonify(
        {"message": "Operation successfull !", "id-piou": id}), 200)


def postRepiouter():
    if (request.form.get('token') is None
            or request.form.get('id-piou') is None):
        return make_response(jsonify({"error": "Missing argument"}), 400)

    idPiou = request.form.get('id-piou')
    token = request.form.get('token')
    pseudo = json.loads(api.r_users.get("t-" + token).decode())["pseudo"]

    if not api_users.checkToken(token):
        return make_response(jsonify({"error": "Invalid token"}), 401)

    if api.r_pious.get("p-" + idPiou) is None:
        return make_response(jsonify({"error": "Id-piou not found"}), 404)

    idRepiou = "p-" + idPiou + "-rp-" + pseudo
    newPiouId = get_new_piou_id()

    if api.r_pious.get(idRepiou) is not None:
        return make_response(jsonify({"error": "Already repiouted"}), 409)

    api.r_pious.set(idRepiou, json.dumps(
        {"id": idRepiou, "id-quote": idPiou,
         "date": time.time_ns(),
         "pseudo-user": pseudo}))

    api.r_pious.set("p-" + str(newPiouId), json.dumps(
        {"id": newPiouId, "id-quote": idPiou,
         "date": time.time_ns(),
         "pseudo-user": pseudo}))

    text = json.loads(api.r_pious.get("p-" + idPiou).decode())["text"]
    for sujet in get_subject_in_text(text):
        api.r_sujets.sadd("s-" + sujet, idRepiou)

    return make_response(jsonify(
        {"message": "Operation successfull !", "id-piou": idRepiou}), 200)


def getSearchPious(text):
    pious = []
    for key in api.r_pious.scan_iter("p-*"):
        piou = json.loads(api.r_pious.get(key).decode())
        if text in piou["text"]:
            pious.append(piou)

    return make_response(jsonify(
        {"message": "Operation successfull !", "pious": pious}), 200)


# Same as postPious but for searchPious
def postSearchPious(text):
    if request.form.get('token') is None:
        return make_response(jsonify({"error": "Missing argument"}), 400)

    token = request.form.get('token')

    if not api_users.checkToken(token):
        return make_response(jsonify({"error": "Invalid token"}), 401)

    pseudo = json.loads(api.r_users.get("t-" + token).decode())["pseudo"]

    pious = []
    for key in api.r_pious.scan_iter("p-*"):
        piou = json.loads(api.r_pious.get(key).decode())
        if text in piou["text"]:
            if "id-quote" in piou:
                piou["quote"] = json.loads(api.r_pious.get(
                    "p-" + str(piou["id-quote"])).decode())
            piou["repiouted"] = api.r_pious.get(
                "p-" + str(piou["id"]) + "-rp-" + pseudo) is not None
            pious.append(piou)

    return make_response(jsonify(
        {"message": "Operation successfull !", "pious": pious}), 200)
