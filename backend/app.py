from flask import Flask, jsonify, request
import json
from scripts import search
from scripts.search import search_dif_languages, change_top_descriptions
from scripts.rank import add_embeddings, get_score, get_top_results

# create main flask app (no templates)
app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def index():
    return "hello, codefest"


@app.route("/api/get-enhanced-descriptions", methods=["GET", "POST"])
def get_enhanced_descriptions():
    input = request.get_json()
    links = list(input['links'])
    # gets enhanced descriptions as a list in the order the links were sent in
    return jsonify({'new-desc':change_top_descriptions(links)})


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