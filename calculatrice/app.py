from flask import Flask, request
import sys
import time
import redis
import uuid

app = Flask(__name__)


calculs = dict()


def genId():
    return uuid.uuid1(node=None, clock_seq=time.time_ns())

@app.route("/bonjour", methods=['GET'])
def bonjour():
    if request.method == 'GET':
        return "Bonjour"


@app.route("/addition=<val1>+<val2>", methods=['POST'])
def addition(val1, val2):
    id = str(genId())
    calculs[id] = str(float(val1) + float(val2))
    return id

@app.route("/resultat=<id>", methods=['GET'])
def resultat(id):
    return calculs[id]

if __name__ == '__main__':
    if len(sys.argv) > 1:
        if sys.argv[1] == "check_syntax":
            print("Build [ OK ]")
            exit(0)
        else:
            print("Passed argument not supported ! Supported argument : check_syntax")
            exit(1)
    app.run(debug=True)