import csv
import psycopg2
import os
import datetime
import time 

conn = psycopg2.connect(
    "host=127.0.0.1 dbname=businessdb user=postgres password=password")
cur = conn.cursor()
#Read in active licenses
with open('C:\\Users\\baraj\\Desktop\\csulb.fall19\\cs491b\\LongBeachCityProject\\Data\\active.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)  # Skip the header row.
    for row in reader:
        p_date = time.strftime('%Y-%m-%d')
        s_date = time.strftime('%Y-%m-%d')
        e_date = None
        try:
            e_date = time.strftime('%Y-%m-%d')
        except:
            e_date = None

        cur.execute(
            """INSERT INTO business_business ("license_num","name","dba_name","license_type","status","processed_date","start_date", \
            "expire_date","employee_num","company_type","business_type","property_type","address","zipcode") \
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
            (row[0], row[1], row[2], row[3], row[5], p_date, s_date, e_date,
             row[17], row[16], row[22], row[13], row[14], row[15]))

#Read in delinquent licenses
with open('C:\\Users\\baraj\\Desktop\\csulb.fall19\\cs491b\\LongBeachCityProject\\Data\\delinquent.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)  # Skip the header row.
    for row in reader:
        p_date = time.strftime('%Y-%m-%d')
        s_date = time.strftime('%Y-%m-%d')
        e_date = None
        try:
            e_date = time.strftime('%Y-%m-%d')
        except:
            e_date = None
        cur.execute(
            """INSERT INTO business_business ("license_num","name","dba_name","license_type","status","processed_date","start_date", \
            "expire_date","employee_num","company_type","business_type","property_type","address","zipcode") \
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
            (row[0], row[1], row[2], row[3], row[5], p_date, s_date, e_date,
             row[17], row[16], row[22], row[13], row[14], row[15]))

conn.commit()
