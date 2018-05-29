import os
import random
import time
import json
from flask import Flask, render_template, request, redirect, jsonify
import pymongo
from pymongo import MongoClient

MONGO_URI = "mongodb://heroku_x9wjh6t4:fn8rhjvkf83rbjkjaeqn62igjr@ds127982.mlab.com:27982/heroku_x9wjh6t4"
client = MongoClient(MONGO_URI)
db = client['heroku_x9wjh6t4']
#client = MongoClient() # local database at default port
#db = client['fbfeed']
collection = db.posts

app = Flask(__name__)
current_milli_time = lambda: int(round(time.time() * 1000))

@app.route("/", methods=['GET'])
def index():
    shouts = collection.find()
    return render_template('index.html', shouts=shouts)

@app.route("/post", methods=['POST'])
def post():
    data = request.data
    post = {
        "name" : data.name,
        "content" : data.content,
    }
    collection.insert(post)
    return jsonify("")

@app.route("/get", methods=['GET'])
def get():
    posts = list(collection.find())
    data = [serial(item) for item in posts]
    return jsonify(data)

def serial(dct):
    rtn = {}
    rtn["name"] = dct["name"]
    rtn["content"] = dct["content"]
    return rtn

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
