import os
import random
import time
import json
from flask import Flask, render_template, request, redirect, jsonify
import pymongo
from pymongo import MongoClient

#MONGO_URI = "mongodb://heroku_x9wjh6t4:fn8rhjvkf83rbjkjaeqn62igjr@ds127982.mlab.com:27982/heroku_x9wjh6t4"
#client = MongoClient(MONGO_URI)
#db = client['heroku_x9wjh6t4']

client = MongoClient() # local database at default port
#db = client['shoutouts'] # Rothko
#db = client['shoutout_mitchell']
db = client['shoutout_poncet']
collection = db.shoutouts

app = Flask(__name__)
current_milli_time = lambda: int(round(time.time() * 1000))

@app.route("/", methods=['GET'])
def index():
    shouts = collection.find()
    return render_template('index.html', shouts=shouts)

@app.route("/all", methods=['GET'])
def all():
    shouts = collection.find()
    return render_template('all.html', shouts=shouts)

@app.route("/about", methods=['GET'])
def about():
    return render_template('about.html')

@app.route("/post", methods=['POST'])
def post():
    shout = {"name":request.form['name'], "message":request.form['message'],  "date": request.form['date'], "time": request.form['time'], "datetime": request.form['datetime']}
    shout_id = collection.insert(shout)
    return jsonify("")

@app.route("/random", methods=['GET'])
def random_response():
    shout = collection.find()[random.randrange(collection.count())]
    rtn = "NO_RESPONSE"
    while not shout[u'message']:
        shout = collection.find_one()
    message = shout[u'message']
    name = shout[u'name']
    date = shout[u'date']
    time = shout[u'time']
    shout = {"name": name, "message": message, "date": date, "time": time}

    return jsonify(shout)

@app.route("/random/<promptid>", methods=['GET'])
def random_response2(promptid):
    shout = collection.find()[random.randrange(collection.count())]
    rtn = "NO_RESPONSE"
    while not shout[u'message']:
        shout = collection.find({"promptid" : promptid}).find_one()
        #shout = collection.find_one()
    message = shout[u'message']
    name = shout[u'name']
    date = shout[u'date']
    time = shout[u'time']
    shout = {"name": name, "message": message, "date": date, "time": time}

    return jsonify(shout)

@app.route("/print", methods=['GET'])
def printer_on():
    ''' returns True if printer should start printing '''
    sorted_list = db.shoutouts.find().sort('datetime', -1)
    lastRecord = sorted_list[0]
    timediff = current_milli_time() - int(lastRecord[u'datetime'])
    printer_on = timediff <= 5000
    return jsonify(printer_on)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
