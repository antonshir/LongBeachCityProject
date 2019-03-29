from __future__ import print_function

import argparse
import json
import pprint
import requests
import sys
import urllib

from urllib.error import HTTPError
from urllib.parse import quote
from urllib.parse import urlencode

import psycopg2
import csv

#put in your own yelp api key
# API_KEY= 'DJHBNSxYY_E981Oi1l1zlzfCeHkGKjM8tpIX5lpt-0j3VCiXuQ1A8CcN7Wftj1RYHJlTAc6Mctn8TNZR6mvpMlBGexxHXdkcxaBoklzbhiaziSOu686-Pg1nXSidXHYx'
API_KEY = 'u6m_IknP8m6UDXU-ANhM_JLm8QDlejrpScT3BAlSDF0VWaSNkRwcKL_0k23cpOUntg8YcK5BTqw8E0V7x-QnUnknKiw8VQA_mxmKTCvqm_nxfirTsN2VvgvD5ZaeXHYx'


# API constants, you shouldn't have to change these.
API_HOST = 'https://api.yelp.com'
SEARCH_PATH = '/v3/businesses/search'
MATCH_PATH = '/v3/businesses/matches'
BUSINESS_PATH = '/v3/businesses/'  # Business ID will come after slash.


# Defaults for our simple example.
DEFAULT_TERM = 'dinner'
DEFAULT_LOCATION = 'San Francisco, CA'
SEARCH_LIMIT = 3


def request(host, path, api_key, url_params=None):
    """Given your API_KEY, send a GET request to the API.
    Args:
        host (str): The domain host of the API.
        path (str): The path of the API after the domain.
        API_KEY (str): Your API Key.
        url_params (dict): An optional set of query parameters in the request.
    Returns:
        dict: The JSON response from the request.
    Raises:
        HTTPError: An error occurs from the HTTP request.
    """
    url_params = url_params or {}
    url = '{0}{1}'.format(host, quote(path.encode('utf8')))
    headers = {
        'Authorization': 'Bearer %s' % api_key,
    }

    # print(u'Querying {0} ...'.format(url))

    response = requests.request('GET', url, headers=headers, params=url_params)

    return response.json()


def search(api_key, term, location):
    """Query the Search API by a search term and location.
    Args:
        term (str): The search term passed to the API.
        location (str): The search location passed to the API.
    Returns:
        dict: The JSON response from the request.
    """

    url_params = {
        'name': term.replace(' ', '+'),
        'address1': location.replace(' ', '+'),
        'city': 'Long Beach',
        'state': 'US',
        'country': 'US',
        'limit': SEARCH_LIMIT
    }
    return request(API_HOST, MATCH_PATH, api_key, url_params=url_params)


def get_business(api_key, business_id):
    """Query the Business API by a business ID.
    Args:
        business_id (str): The ID of the business to query.
    Returns:
        dict: The JSON response from the request.
    """
    business_path = BUSINESS_PATH + business_id

    return request(API_HOST, business_path, api_key)


def query_api(term, location):
    """Queries the API by the input values from the user.
    Args:
        term (str): The search term to query.
        location (str): The location of the business to query.
    """
    response = search(API_KEY, term, location)

    businesses = response.get('businesses')

    if not businesses:
        print(u'No businesses for {0} in {1} found.'.format(term, location))
        return

    business_id = businesses[0]['id']

    # print(u'{0} businesses found, querying business info ' \
    #     'for the top result "{1}" ...'.format(
    #         len(businesses), business_id))
    response = get_business(API_KEY, business_id)

    # print(u'Result for business "{0}" found:'.format(business_id))
    pprint.pprint(response, indent=2)


def main():
    parser = argparse.ArgumentParser()

    parser.add_argument('-q', '--term', dest='term', default=DEFAULT_TERM,
                        type=str, help='Search term (default: %(default)s)')
    parser.add_argument('-l', '--location', dest='location',
                        default=DEFAULT_LOCATION, type=str,
                        help='Search location (default: %(default)s)')

    input_values = parser.parse_args()

    try:
        query_api(input_values.term, input_values.location)
    except HTTPError as error:
        sys.exit(
            'Encountered HTTP error {0} on {1}:\n {2}\nAbort program.'.format(
                error.code,
                error.url,
                error.read(),
            )
        )


if __name__ == '__main__':
    # main()
    conn = psycopg2.connect("host=127.0.0.1 dbname=businessdb user=postgres password=admin")
    cur = conn.cursor()

    postgreSQL_select_Query = "select * from business_business"
    cur.execute(postgreSQL_select_Query)
    # print("Selecting rows from mobile table using cursor.fetchall")
    businesses = cur.fetchall() 

    with open('/Users/David/Desktop/yelp2.csv','w') as appendFile:
        writer = csv.writer(appendFile)
        header = ['yelp_name','yelp_id', 'image_url','is_claimed','is_closed','address','city','state','country','zip_code', 'price', 'rating', 'review_count','transactions','url']
        writer.writerow(header)

        count = 0
        for row in businesses:
            # print(business)
            if count >= 200:
                break

            business = search(API_KEY, row[2], row[-2])


            try:
                if len(business['businesses']) != 0:
                    count = count +1
                    print(count)
                    info = get_business(API_KEY,business['businesses'][0]['id'])
                    # pprint.pprint(info)
                    row = []
                    try:
                        row.append(info['name'])
                    except:
                        row.append('')
                    try:
                        row.append(info['id'])
                    except:
                        row.append('')
                    try:
                        row.append(info['image_url'])
                    except:
                        row.append('')
                    try:
                        row.append(info['is_claimed'])
                    except:
                        row.append('')
                    try:
                        row.append(info['is_closed'])
                    except:
                        row.append('')
                    try:
                        row.append(info['location']['address1'])
                    except:
                        row.append('')
                    try:
                        row.append(info['location']['city'])
                    except:
                        row.append('')
                    try:
                        row.append(info['location']['state'])
                    except:
                        row.append('')
                    try:
                        row.append(info['location']['country'])
                    except:
                        row.append('')
                    try:
                        row.append(info['location']['zip_code'])
                    except:
                        row.append('')
                    try:
                        row.append(info['price'])
                    except:
                        row.append('')
                    try:
                        row.append(info['rating'])
                    except:
                        row.append('')
                    try:
                        row.append(info['review_count'])
                    except:
                        row.append('')
                    try:
                        row.append(info['transactions'])
                    except:
                        row.append('')
                    try:
                        row.append(info['url'])
                    except:
                        row.append('')

                    writer.writerow(row)
            except:
                print(business)
    appendFile.close()


      # if row[2] == 'CLANCY\'S':
            #     business = search(API_KEY, row[2], row[-2])
            #     pprint.pprint(business,indent=2)
            #     print(business['businesses'][0]['id'])
            #     print(business['businesses'][0]['location'])
            #     print(business['businesses'][0]['name'])
            #     xd = get_business(API_KEY,business['businesses'][0]['id'])
            #     pprint.pprint(xd,indent=2)
    
