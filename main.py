import os
from flask import Flask, render_template, request, redirect
import pymongo
from pymongo import MongoClient

#MONGO_URL = os.environ.get('MONGOHQ_URL')
MONGO_URL = "mongodb://heroku_x9wjh6t4:fn8rhjvkf83rbjkjaeqn62igjr@ds127982.mlab.com:27982"
client = MongoClient(MONGO_URL)

app = Flask(__name__)
db = client.heroku_x9wjh6t4
database_user = "heroku_x9wjh6t4"
database_pass = "fn8rhjvkf83rbjkjaeqn62igjr"
db.authenticate(database_user, database_pass)
collection = db.shoutouts

#app = Flask(name)

@app.route("/", methods=['GET'])
def index():
    shouts = collection.find()
    return render_template('index.html', shouts=shouts)

@app.route("/post", methods=['POST'])
def post():
    shout = {"name":request.form['name'], "message":request.form['message']}
    shout_id = collection.insert(shout)
    return redirect('/')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
