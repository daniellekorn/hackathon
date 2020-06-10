import os
from flask import Flask, json, request
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore
from firebase import firebase
from model import model

app = Flask(__name__)
load_dotenv()

# authentication for database
cred = credentials.Certificate("./db-config.json")
firebase_admin.initialize_app(cred)

# how to create instance of collection
users = firestore.client().collection('users').get()
print(users)


@app.route("/tracker", methods=["POST"])
def get_recording():
    data = request.files['audio_data']
    user_id = request.form['user']
    post_recoding()
    data.save('record.wav')
    result = model.main()
    return app.response_class(response={'status': 'ok'}, status=200, mimetype='application/json')


def post_recoding():
    pass


if __name__ == "__main__":
    app.run()


