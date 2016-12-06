#!/usr/bin/env python

import requests
import sys
import json
from random import randint
#import database as db    # see below

subreddits =["politics","shittyfoodporn","shittyadviceanimals"]
subreddit = subreddits[randint(0,len(subreddits)-1)]

url_list = []

def main():

    while(not url_list):
        r = requests.get('http://www.reddit.com/r/{sr}/.json?limit=20'.format(sr=subreddit))
        d = r.json()
        if("data" in d):
            children = d["data"]["children"]
            for e in children:
                if("data" in e):
                        url = e["data"]["url"]
                        if("preview" in e["data"]):
                                preview = e["data"]["preview"]["images"][0]["source"]["url"]
                                if(".jpg" in url or ".png" in url):
                                        url_list.append(url)

                                url_list.append(preview)
    print(json.dumps(url_list[randint(0,len(url_list)-1)]))
    sys.stdout.flush()


if __name__ == "__main__":
    main()
