from flask import request, make_response, jsonify
import time
import redis
import uuid
import json
import hashlib
import re
import api


r_pious = None

def setRedisPious(redis_pious):
    global r_pious
    r_pious = redis_pious
    return


def getPious():
    pious = []
    for key in r_pious.scan_iter("p-*"):
        pious.append(json.loads(r_pious.get(key).decode()))
        
    return make_response(jsonify({"message": "Operation successfull !", "pious":pious}), 200)


def getPiou(id):
    piou = json.loads(r_pious.get("p-" + id).decode())
    return make_response(jsonify({"message": "Operation successfull !", "piou":piou}), 200)


def getPiousByUser(username):
    pious = []
    for key in r_pious.scan_iter("p-*"):
        piou = json.loads(r_pious.get(key).decode())
        if piou["pseudo-user"] == username:
            pious.append(piou)
    
    return make_response(jsonify({"message": "Operation successfull !", "pious":pious}), 200)



def get_new_piou_id():
     return r_pious.incr("next-id")

def get_subject_in_text(text):
    pattern = r"#(\w+)"
    return re.findall(pattern, text)


def postPiouter():
    if request.form.get('token') == None or request.form.get('text') == None:
        return make_response(jsonify({"error": "Missing argument"}), 400)
    
    text = request.form.get('text') 
    token = request.form.get('token')

    if not api.checkToken(token):
        return make_response(jsonify({"error": "Invalid token"}), 401)
    
    pseudo = json.loads(api.r_users.get("t-" + token).decode())["pseudo"]
    id = get_new_piou_id()

    r_pious.set("p-" + str(id), json.dumps({"id": id, "text": text, "date":time.time_ns(), "pseudo-user":pseudo}))

    for sujet in get_subject_in_text(text):
        api.r_sujets.sadd("s-" + sujet, id)

    return make_response(jsonify({"message": "Operation successfull !", "id-piou":id}), 200)
        


def postRepiouter():
    if request.form.get('token') == None or request.form.get('id-piou') == None:
        return make_response(jsonify({"error": "Missing argument"}), 400)
    
    idPiou = request.form.get('id-piou')
    token = request.form.get('token')

    if not api.checkToken(token):
        return make_response(jsonify({"error": "Invalid token"}), 401)
    
    if r_pious.get("p-" + idPiou) == None:
        return make_response(jsonify({"error": "Id-piou not found"}), 404)

    pseudo = json.loads(api.r_users.get("t-" + token).decode())["pseudo"]
    id = get_new_piou_id()

    r_pious.set("p-" + str(id), json.dumps({"id": id, "id-quote": idPiou, "date":time.time_ns(), "pseudo-user":pseudo}))
    
    text = json.loads(r_pious.get("p-" + idPiou).decode())["text"]
    for sujet in get_subject_in_text(text):
        api.r_sujets.sadd("s-" + sujet, id)

    return make_response(jsonify({"message": "Operation successfull !", "id-piou":id}), 200)
