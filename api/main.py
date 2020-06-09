from flask import Flask, json


app = Flask(__name__)


@app.route("/tracker", methods=["POST"])
def get_recording():
    print("here")
    return app.response_class(response={'status': 'ok'}, status=200, mimetype='application/json')


if __name__ == "__main__":
    app.run()


