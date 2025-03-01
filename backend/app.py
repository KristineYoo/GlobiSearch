from flask import Flask
from scripts import search

# create main flask app (no templates)
app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def index():
    return "hello, codefest"


@app.route("/search", methods=["GET", "POST"])
def search_page():
    return "main page"





# runs the flask app
if __name__ == "__main__":
    app.run(debug=True)