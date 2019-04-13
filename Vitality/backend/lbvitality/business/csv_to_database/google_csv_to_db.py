#adds business from yelpToGoogle.csv to postgres database
import csv
import psycopg2
import os

conn = psycopg2.connect(
    "host=127.0.0.1 dbname=businessdb user=postgres password=admin")
cur = conn.cursor()

#yelp.csv
with open(
        '/'.join(
            (os.path.dirname(os.path.abspath(__file__)) + '').split('/')[0:-5])
        + '/Data/social_media/yelpToGoogle.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)  # Skip the header row.
    for row in reader:
        cur.execute(
            """INSERT INTO business_google ("license_um","date","google_name","google_id","formatted_address","latitude","longtitude", \
            "price","rating") \
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
            (row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7],
             row[8]))
conn.commit()
