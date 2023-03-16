from flask import Flask, request
import sys
import time
import redis
import uuid

app = Flask(__name__)



def genToken():
    return uuid.uuid1(node=None, clock_seq=time.time_ns())

@app.route("/pious", methods=['GET'])
def getPious():
    if request.method == 'GET':
        return "TODO"


@app.route("/user/<username>/pious", methods=['GET'])
def getPiousByUser(username):
    if request.method == 'GET':
        return "TODO;" + username

@app.route("/sujets", methods=['GET'])
def getSujets():
    if request.method == 'GET':
        return "TODO"

@app.route("/sujets=<sujet>", methods=['GET'])
def getSujet(sujet):
    if request.method == 'GET':
        return "TODO;" + sujet


@app.route("/piouter", methods=['POST'])
def postPiouter():
    if request.method == 'POST':
        text = request.args.get('text')
        token = request.args.get('token')
        return "TODO;" + text + ";" + token

@app.route("/repiouter", methods=['POST'])
def postRepiouter():
    if request.method == 'POST':
        idPiou = request.args.get('id-piou')
        token = request.args.get('token')
        return "TODO;" + idPiou + ";" + token

@app.route("/new-user", methods=['POST'])
def postNewUser():
    if request.method == 'POST':
        pseudo = request.args.get('pseudo')
        password = request.args.get('password')
        return "TODO;" + pseudo + ";" + password

@app.route("/login", methods=['POST'])
def postLogin():
    if request.method == 'POST':
        pseudo = request.args.get('pseudo')
        password = request.args.get('password')
        return "TODO;" + pseudo + ";" + password



if __name__ == '__main__':
    if len(sys.argv) > 1:
        if sys.argv[1] == "check_syntax":
            print("Build [ OK ]")
            exit(0)
        else:
            print("Passed argument not supported ! Supported argument : check_syntax")
            exit(1)
    app.run(debug=True)