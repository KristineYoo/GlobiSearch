import random
import time
import sys
from selenium import webdriver
from selenium_stealth import stealth
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.common.by import By

def driver_wait():
    """Perform short pause"""
    time.sleep(random.uniform(2, 5))

def start_driver():
    """
    ### Automatically config and start a web driver through google chrome 
    - Configed to not close browser automatically
    - Attaches to chrome and returns driver Selenium Object
    - Use undetected_chromedriver instead to further refine webdriver to be more 
    'human' like
    - use selenium_stealth to avoid all selenium detections
    """
    # this is a workaround to stop Selenium from identifying itself
    import undetected_chromedriver as uc
    # chrome_options = webdriver.ChromeOptions()
    options = uc.ChromeOptions()

    # Add language and other browser fingerprinting aspects
    options.add_argument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
    options.add_argument("--lang=en-US,en;q=0.9")
    options.add_argument("--disable-blink-features=AutomationControlled")

    # stop window from closing automatically
    # options.add_experimental_option("detach", True)
    # chrome_options.add_experimental_option("detach", True)

    # create the driver based off all of the configuration
    driver = uc.Chrome(options=options)

    # apply the 'stealth' features to driver
    stealth(driver,
            languages=["en-US", "en"],
            vendor="Google Inc.",
            platform="Win32",
            webgl_vendor="Intel Inc.",
            renderer="Intel Iris OpenGL Engine",
            fix_hairline=True
            )

    
    return driver

def search_user_language(user_search: str):
    """
    ### Search user's google search in their regular language 
    - This performs their a 'regular' google search
    - Will use this to compare the results of the different language
    - Assume each search is in google and simply add user's question to google
    - Use this function to mainly AVOID reCaptcha
    link
    """
    driver = start_driver()

    # go to google first -> select searchbox -> search
    driver.get("https://google.com")
    driver_wait()

    # change viewport to random size to avoid suspicious activity 
    width = random.randint(1050, 1200)
    height = random.randint(700, 800)
    driver.set_window_size(width, height)

    # we wait 4 seconds until we see the searchbox element fully load in; click to mimic human
    search_bar = WebDriverWait(driver, timeout=4).until(
        expected_conditions.presence_of_element_located((By.NAME, "q"))
    )
    # click to imitate real search
    search_bar.click()

    search_bar.send_keys(user_search)
    search_bar.send_keys(Keys.ENTER)


    # command key to quit driver: MANUALLY (terminal)
    input("Press Enter to close browser...")
    driver.quit()



search_user_language(user_search="how to make horchata")



stop = sys.stdin.read()
