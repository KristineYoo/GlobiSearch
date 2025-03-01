import os
from google.cloud import translate
from google.cloud import translate_v2 as translate
from dotenv import load_dotenv
from googleapiclient.discovery import build

# load env variables
load_dotenv()

GOOGLE_API = os.environ.get('GOOGLE_API')
SEARCH_ENGINE_ID = os.environ.get('SEARCH_ENGINE_ID')
PROJECT_ID = os.environ.get('PROJECT_ID')
PARENT = f"projects/{PROJECT_ID}"

def search_user_language(user_search: str, language_code: str="eng") -> list[dict]:
    """
    ### Search user's google search in their regular language 
    - This performs their a 'regular' google search
    - Will use this to compare the results of the different language
    - Assume each search is in google and simply add user's question to google
    - Default lang is english but can be changed..
    - Gives back most important info from result in a structured dictionary
    """

    engine = build("customsearch", "v1", developerKey=GOOGLE_API)

    # result stores the google search; chain execute method to make google search
    search_result = engine.cse().list(
        q=user_search,
        cx=SEARCH_ENGINE_ID,
        hl=language_code 
    ).execute()


    # structure the search results info into a dict
    search_info = []

    for item in search_result.get("items"):

        # item is the how google stores the top results
        search_info.append({
            "title": item["title"],
            "link": item["link"],
            "snippet": item["snippet"],
        })

    return search_info


def translate_text(target: str, text: str) -> dict:
    """Translates text into the target language.

    Target must be an ISO 639-1 language code.
    See https://g.co/cloud/translate/v2/translate-reference#supported_languages
    """

    translate_client = translate.Client()

    if isinstance(text, bytes):
        text = text.decode("utf-8")

    # Text can also be a sequence of strings, in which case this method
    # will return a sequence of results for each text.
    result = translate_client.translate(text, target_language=target)

    return result

    
def search_dif_languages(user_search: str, languages: list) -> dict:
    """
    ### translate user's original google search to different language and get results
    - takes in input of a list of language codes to search up same result
    - languages in list must be part of googles 'language' codes
    - performs search with a for loop performing one search at a time
    - stores each search result in a dict, with each dict's key being a lang
    code and the value storing the prompt in its requested language and tuple
    with the structured dict returned from 'search_user_language' and the embedding
    """

    search_data = {}

    for lang_code in languages:
        translated_search_dict = translate_text(target=lang_code, text=user_search)

        # get actual translated search prompt from the dict
        translated_text = translated_search_dict["translatedText"]
        translated_search_info = search_user_language(user_search=translated_text, language_code=lang_code)


        # stores info by making new dict key-value pair; None placeholder for embedding
        search_data[lang_code] = {
            translated_text:
                (translated_search_info, None)
        }
    return search_data

        

language_codes = ["es", "fr", "ja"] # testing 
search_info = search_user_language("I want to make pizza")
translated_text = translate_text("es", "good morning how do you do")

print(search_dif_languages(user_search="I want to make pizza", languages=language_codes))



