from flask import Flask


# create main flask app (no templates)
app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def index():
    pass


@app.route("/search", methods=["GET", "POST"])
def search_page():
    pass





# runs the flask app
if __name__ == "__main__":
    app.run(debug=True)