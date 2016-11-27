#!/usr/bin/env python

import requests
import sys
import json

#import database as db    # see below

subreddit = "politics+shittyadviceanimals+shittyfoodporn"

url_list = []

def main():
#    db.init()    # Important! It will connect to the DB.

    r = requests.get('http://www.reddit.com/r/{sr}/.json?limit=20'.format(sr=subreddit))
    d = r.json()
    children = d["data"]["children"]
    for e in children:
        if("data" in e):
                url = e["data"]["url"]
                if("preview" in e["data"]):
                        preview = e["data"]["preview"]["images"][0]["source"]["url"]
                        if(".jpg" in url or ".png" in url):
                                url_list.append(url)
#                               print url
#                       print preview
                        url_list.append(preview)
    print(json.dumps(url_list));
    sys.stdout.flush()


if __name__ == "__main__":
    main()
