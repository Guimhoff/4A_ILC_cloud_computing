from flask import make_response, jsonify
import time
import json
import os
import random as rd

import api
import api_pious


def get_phrases_list(file_path):
    # Get the absolute path of the script
    script_path = os.path.abspath(__file__)
    # Get the directory name of the script
    script_dir = os.path.dirname(script_path)
    # Get the absolute path of the file
    file_abs_path = os.path.join(script_dir, file_path)

    # Open the file in read mode and read the lines
    with open(file_abs_path, 'r') as f:
        phrases_list = f.readlines()

    # Strip the newlines from the end of each line
    phrases_list = [phrase.strip() for phrase in phrases_list]

    return phrases_list


# function to populate the database with some data
# this is used to test the API
def postDemo():
    # Check all databases are empty
    if api.r_pious.keys() or api.r_users.keys() or api.r_sujets.keys():
        return make_response(jsonify({"error": "Database not empty"}), 400)

    # Create users
    demo_users = ["Alice", "Bob", "Charlie", "David", "Emma", "Fred", "Grace",
                  "Henry", "Isabel", "Jack", "Kate", "Liam", "Mia", "Nathan",
                  "Olivia", "Peter", "Quinn", "Rachel", "Samuel", "Taylor",
                  "Ursula", "Victor", "Wendy", "Xavier", "Yara", "Zoe"]

    demo_user_inscription_dates = [
        time.time() - rd.randint(1000, 10000) * 1000 * 1000 * 1000
        for _ in range(0, len(demo_users))]

    for (i, x) in enumerate(demo_users):
        api.r_users.set("u-" + x, json.dumps({
            "pseudo": x,
            "inscription-date": demo_user_inscription_dates[i]
        }))
        api.r_users.set("p-" + x, "password")

    # Create pious
    demo_pious = get_phrases_list("./demo/pious.txt")

    for (i, x) in enumerate(demo_pious):
        id_piou = api_pious.get_new_piou_id()
        api.r_pious.set("p-" + str(id_piou), json.dumps({
            "id": id_piou,
            "text": x,
            "date": time.time_ns() - rd.randint(0, 1000) * 1000 * 1000 * 1000,
            "pseudo-user": demo_users[rd.randint(0, len(demo_users)-1)]
        }))

        for sujet in api_pious.get_subject_in_text(x):
            api.r_sujets.sadd("s-" + sujet, id_piou)

    # Create repious

    for _ in range(0, 10):
        idPiou = rd.randint(0, len(demo_pious)-1)
        pseudo = demo_users[rd.randint(0, len(demo_users)-1)]
        idRepiou = "p-" + str(idPiou) + "-rp-" + pseudo
        newPiouId = api_pious.get_new_piou_id()
        date = rd.randint(
            json.loads(
                api.r_pious.get("p-" + str(idPiou)).decode()
                ).get("date"),
            time.time_ns())
        api.r_pious.set(id_piou, json.dumps({
            "id": idRepiou,
            "id-quote": idPiou,
            "date": date,
            "pseudo-user": pseudo,
        }))

        api.r_pious.set("p-" + str(newPiouId), json.dumps({
            "id": newPiouId,
            "id-quote": idPiou,
            "date": date,
            "pseudo-user": pseudo,
        }))

    return make_response(jsonify({"message": "Operation successfull !"}), 200)
