import os
from flask import Flask, render_template, request, redirect
import pymongo
from pymongo import MongoClient

MONGO_URI = "mongodb://heroku_x9wjh6t4:fn8rhjvkf83rbjkjaeqn62igjr@ds127982.mlab.com:27982/heroku_x9wjh6t4"
client = MongoClient(MONGO_URI)
db = client['heroku_x9wjh6t4']
collection = db.shoutouts

app = Flask(__name__)

@app.route("/", methods=['GET'])
def index():
    shouts = collection.find()
    return render_template('index.html', shouts=shouts)

@app.route("/all", methods=['GET'])
def all():
    shouts = collection.find()
    return render_template('all.html', shouts=shouts)

@app.route("/post", methods=['POST'])
def post():
    shout = {"name":request.form['name'], "message":request.form['message']}
    shout_id = collection.insert(shout)
    return redirect('/')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
