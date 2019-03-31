#adds business from yelp.csv to postgres database
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
        + '/Data/social_media/yelp.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)  # Skip the header row.
    for row in reader:
        cur.execute(
            """INSERT INTO business_yelp ("id","date","yelp_name","yelp_id","image_url","is_claimed","is_closed", \
            "address","city","state","country","zip_code","price","rating","review_count","transactions","url") \
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
            (row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7],
             row[8], row[9], row[10], row[11], row[12], row[13], row[14],
             row[15], row[16]))
conn.commit()
