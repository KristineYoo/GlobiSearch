import os
import openai
import numpy as np
import requests
from openai import OpenAI
from bs4 import BeautifulSoup
from google.cloud import translate
from google.cloud import translate_v2 as translate
from dotenv import load_dotenv
from googleapiclient.discovery import build

# load env variables and openAI client
load_dotenv()
client = OpenAI()
client.api_key = os.environ.get("OPENAI_API_KEY")

GOOGLE_API = os.environ.get('GOOGLE_API')
SEARCH_ENGINE_ID = os.environ.get('SEARCH_ENGINE_ID')
PROJECT_ID = os.environ.get('PROJECT_ID')
PARENT = f"projects/{PROJECT_ID}"


def search_user_language(user_search: str, language_code: str="en") -> list[dict]:
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


def generate_chatgpt_description(potential_descriptions: str, want_response_obj: bool=False) -> str:
    """
    ### Use chatgpt-4o-mini API to generate in a different language 
    website summary/description
    prompt already hardcoded since we will want the to keep generating a
    specific format for a website's summary/description.

    #### args:
    potential_descriptions : the parsed html code of the website
    that could give the model an idea of what to summarize

    want_response_obj : return full response object from the model's
    response (default false)
    """

    prompt = f"""
            Can you go through the html code of this specific web page 
            (which maybe in ANY language) and then find the absolute best 
            description of this web page? Give me the best description with your own 
            added summary of what this webpage is about in the language of the web page!
            Make this description/summary always in context of the web page (by keeping
            the page's terminology and specifics etc..) and 
            keep it a paragraph's length at max always. Retain 
            the most important information
            and give it backed in a nice formatted short 
            paragraph. here is the html code.
            

            {potential_descriptions}
        """
    
    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You're a helpful assistant trying to generate a description based off a web page in a specific language"},
            {"role": "user", "content": prompt},
        ],
        temperature=0.3,
        max_tokens=200,
    )

    # response_obj -> choices entry -> first entry in choices list (choice obj)-> messages entry
    chat_response = response.choices[0].message.content

    if want_response_obj:
       print(f"Response Object: {response}")
    
    # return the model's text response
    return chat_response


def find_search_differences(multilang_search_info: list[ list[dict, np.array, float,] ]) -> str:
    """
    ### Find the differences between the top ranked searches 
    Use ChatGPT API to find the differences between searches

    Hardcode the prompt since we're just checking out differences
    between searches

    #### args:
    multilang_search_info: the multilang_search_info is a dict where
    - key = language_code

    - value = 
    translated_prompt,
    list that contains multiple lists w/ each list containing
    [ structured_dict, embeddings, score ]
    """
    
    multilang_results = []

    for language_code, prompt_info in multilang_search_info.items():
        # we grab first index since the 0th index is the prompt; search_info is list of lists
        search_info = prompt_info[1]

        # for each list in search_info (lists)
        for list in search_info:
           
           # append the info and exclude the embedding and score from the rest of the list
           multilang_results.append(list[0])
           



    prompt = f"""
    I will give you multiple searches all being the same prompt but in different languages.
    Each search has differences because of the change in language despite being the same prompt.
    Take a look at the top 5 hits for each language's search and see if there is any notable
    thing that is different or interesting, keep the maximum length of your response 
    to one paragraph. Here is the data of each search which is in list format, please parse through this.


        {multilang_results}
    """

    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You're a helpful assistant trying to find differences between the same google search in different languages"},
            {"role": "user", "content": prompt},
        ],
        temperature=0.6,
        max_tokens=200,
    )

    # response_obj -> choices entry -> first entry in choices list (choice obj)-> messages entry
    chat_response = response.choices[0].message.content

    # return the model's text response
    return chat_response



def get_website_description(url: str) -> str | None:
    """
    ### finds a better description for a webpage:
    uses bs4 to go parse through a web page's html code
    to get paragraph tags specifically after the instance of an 
    image to get a a better description of what

    uses chatgpt to parse through the entire website page
    in the specific language and find a specific entry that provides
    the clearest description of the website

    try to parse through a link with beautiful soup,
    if it fails then simply return 'None' indicating no link could be found
    """

    try:
        response = requests.get(url)
        page_html = response.text
        
        # this will fail if its specific file format that won't work
        soup = BeautifulSoup(page_html, "html.parser")
      
        potential_descriptions = str(page_html)

        # generate chatgpt description 
        best_description = generate_chatgpt_description(potential_descriptions)

        return best_description
    
    except:
       None


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
        search_data[lang_code] = [
            translated_text, 
            [translated_search_info, None, None]
        ]
        for key, list in search_data.items():
            # get the original description of web hit
            # og_description = list[0]
            pass
    return search_data



search_info = search_user_language("I want to make pizza")


translated_text = translate_text("es", "good morning how do you do")

# testing for codes
language_codes = ["es", "fr", "ja"]
multilang_search_info = search_dif_languages(user_search="I want to make pizza", languages=language_codes)

for mystery, language in multilang_search_info.items():
    print(f"\nmystery: {mystery} another mystery: {language}\n")
    for entry in language: # with prompt=es 
        # item is first (prompt) and second list of dict
        print(f"what is this and why is it here: {entry}\n\n")

# testing chatgpt response
example_link = "https://www.myplate.gov/es/recipes/pizza-facil-y-rapida"
web_description = str(get_website_description(example_link))

print(f"\n\nweb-desc:\n{web_description}\nweb-link:{example_link}")




