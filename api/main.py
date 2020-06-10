import os
from flask import Flask, json, request
from dotenv import load_dotenv
from firebase import firebase

app = Flask(__name__)
load_dotenv()

authentication = firebase.FirebaseAuthentication(os.getenv("MY_SECRET"), '', extra={'id': 123})
fireapp = firebase.FirebaseApplication(os.getenv('DATABASE_URL'),  authentication=authentication)


@app.route("/tracker", methods=["POST"])
def get_recording():
    data = request.files['audio_data']
    user_id = request.form['user']
    # post_recoding()
    print(data)
    return app.response_class(response={'status': 'ok'}, status=200, mimetype='application/json')


def post_recoding():
    result = fireapp.get('/users', None)
    print(result)


if __name__ == "__main__":
    app.run()


