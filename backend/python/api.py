from flask import Flask, request
import sys
import time
import redis
import uuid

app = Flask(__name__)



@app.route("/pious", methods=['GET'])
def getPious():
    return "TODO"


@app.route("/user/<username>/pious", methods=['GET'])
def getPiousByUser(username):
    return "TODO;" + username

@app.route("/sujets", methods=['GET'])
def getSujets():
    return "TODO"

@app.route("/sujet=<sujet>", methods=['GET'])
def getSujet(sujet):
    return "TODO;" + sujet


@app.route("/piouter", methods=['POST'])
def postPiouter():
    if request.form.get('token') == None or request.form.get('text') == None:
        return "ERROR;Missing argument"
    
    text = request.form.get('text') 
    token = request.form.get('token')
    return "TODO;" + text + ";" + token
        

@app.route("/repiouter", methods=['POST'])
def postRepiouter():
    if request.form.get('token') == None or request.form.get('id-piou') == None:
        return "ERROR;Missing argument"
    
    idPiou = request.form.get('id-piou')
    token = request.form.get('token')
    
    return "TODO;" + idPiou + ";" + token

def genToken():
    return uuid.uuid1(node=None, clock_seq=time.time_ns())

@app.route("/new-user", methods=['POST'])
def postNewUser():
    if request.form.get('pseudo') == None or request.form.get('password') == None:
        return "ERROR;Missing argument"
    
    pseudo = request.form.get('pseudo')
    password = request.form.get('password')

    return "TODO;" + pseudo + ";" + password

@app.route("/login", methods=['POST'])
def postLogin():
    if request.form.get('pseudo') == None or request.form.get('password') == None:
        return "ERROR;Missing argument"
    
    pseudo = request.form.get('pseudo')
    password = request.form.get('password')
        
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