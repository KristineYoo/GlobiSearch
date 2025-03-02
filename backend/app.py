import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from scripts import search
from scripts.search import search_dif_languages
from scripts.rank import add_embeddings, get_score, get_top_results

# create main flask app (no templates)
app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET", "POST"])
def index():
    return "hello, codefest"


@app.route("/search", methods=["GET", "POST"])
def search_page():
    return "main page"

# takes the text prompt and returns json of top search reslts
@app.route("/api/get-search-result", methods=["GET", "POST"])
def get_search_results():
    input = request.get_json()
    search_query=input["search_query"]
    languages=input["languages"]

    # validate
    if not isinstance(search_query, str):
        return jsonify({"message": "Invalid item"}), 400
    
    # search the user prompt and get result data
    results = search_dif_languages(search_query, languages)
    # # add embeddings and rank data
    # add_embeddings(results)
    # get_score(results)
    # return top 5 results
    return jsonify({'top-results':results[:5]})



# runs the flask app
if __name__ == "__main__":
    app.run(debug=True)