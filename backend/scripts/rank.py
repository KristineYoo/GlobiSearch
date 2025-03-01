"""
Ranking the Search results based on embeddings
"""
from sentence_transformers import SentenceTransformer
import regex as re
from collections import Counter
from scipy.spatial.distance import cosine

""" Model """
model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')

"""Test data"""

test_data = {'en':["query", [[{'title':"hello", 'snippet':"stuff"}, "embedding", None], [{"title":"hello", 'snippet':"stuff"}, "embedding", None]]], \
                'fr':["query", [[{'title':"hello", 'snippet':"stuff"}, "embedding", None], [{"title":"hello", 'snippet':"stuff"}, "embedding", None]]], \
                'es':["query", [[{'title':"hello", 'snippet':"stuff"}, "embedding", None], [{"title":"hello", 'snippet':"stuff"}, "embedding", None]]]}

"""Pre-Processing for Embedding"""

def clean_for_embedding(to_clean):
    text = to_clean
    # Remove special characters that don't add meaning
    text = re.sub(r'[^\w\s.,;:!?()-]', ' ', text)
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    # Remove common filler phrases that don't add semantic value
    fillers = ["click here", "read more", "learn more", "cookies", "privacy policy"]
    for filler in fillers:
        text = text.replace(filler, "")

    return text

# From Claude:
def extract_keywords(text, top_n=5):
    # Simple keyword extraction by frequency
    words = re.findall(r'\b[a-zA-Z]{3,15}\b', text.lower())
    common_words = ["the", "and", "for", "this", "that", "with", "from"]
    filtered = [w for w in words if w not in common_words]
    return [word for word, _ in Counter(filtered).most_common(top_n)]

# From Claude:
def add_keywords(text):
    keywords = extract_keywords(text)
    return f"{text} ; {', '.join(keywords)}"

def stringify(result):
    string_rep = f"{result['title']}. {result['title']}. {result['snippet']}"
    string_rep = clean_for_embedding(string_rep)
    string_rep = add_keywords(string_rep)
    return string_rep
        
"""CREATE EMBEDDINGS
[ Dictionary[] ] -> [ Dictionary[] ]
Description:
Adds embeddings to each search result dictionary
"""
def add_embeddings(results):
    # results is a dictionary
        # key: language code
        # value: a List
            # [0] search query in given language
            # [1] list of lists
                # [0] List
                    # [0] Dictionnary
                        # keys: title, link, snippet
                        # values: those values from google
                    # [1] Embedding
                    # [2] Score
    
    #iterate over languages
    for lang in results.values():
        #iterate over result objects
        for result in lang[1]:
            #create the string to embed
            string_rep = stringify(result[0])
            #to the end of the list, append the embedding
            result[1] = model.encode(string_rep)
        
""" Ranking """

"""SCORING FUNCTION
[ Data ] -> [ Data ]
Description:
Populates all of the ranking scores in the dictionary
"""
def get_score(data):
    # get prompt embedding
    prompt_embedding = model.encode(data['en'][0]) # which is original?
    # iterate through data
    for language in data.values():
        for result in language[1]:
            res_embedding = result[1]
            # compute cosine similarity between prompt and result
            cos_sim = 1-cosine(prompt_embedding, res_embedding)
            # optional: compute another metric (maybe LLM?)
            # compute score
            result[2] = float(cos_sim)

"""TOP RESULTS
[ Data ] -> [ Result[] ]
Description:
Returns the top n results based on the score attributes in the format:
{
    'title':
    'snippet':
    'link':
    'lang':
}
"""
def get_top_results(data, n):
    ranked = []
    # for each search result, add its info to the ranked list
    for lang in data:
        for result in data[lang][1]:
            return_obj = result[0]
            return_obj['lang'] = lang
            return_obj['temp'] = result[2]
            
            ranked.append(return_obj)
    
    #sort ranked
    ranked = sorted(ranked, key=lambda x: x['temp'], reverse=True)
    #remove temp
    for i in ranked:
        i.pop('temp')

    return ranked if n > len(ranked) else ranked[:n]

""" Debugging """

if __name__ == "__main__":
    
    add_embeddings(test_data)
    get_score(test_data)
    print(get_top_results(test_data, 5))
    