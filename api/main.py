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


@app.route("/tracker", methods=["POST"])
def get_recording():
    data = request.files['audio_data']
    user_id = request.form['user']
    print(user_id)
    users = firestore.client().collection('users').where(u'uid', u'==', user_id).stream()
    for user in users:
        print(user.to_dict()['code'])
    post_recoding()
    data.save('record.wav')
    result = model.main()
    result.update({'status': 'ok'})
    print(result)
    return app.response_class(response=result, status=200, mimetype='application/json')


def post_recoding():
    pass


if __name__ == "__main__":
    app.run()


