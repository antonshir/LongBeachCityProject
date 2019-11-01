import csv
import psycopg2
import os
import datetime
import sys
import time
import django

sys.path.append('{filepath}')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lbvitality.settings')
django.setup()

from business.models import *
conn = psycopg2.connect(
    "host=127.0.0.1 dbname=businessdb user=postgres password={password}")
cur = conn.cursor()
#Read in active licenses
with open('{filepath}', 'r') as f:
    reader = csv.reader(f)
    next(reader)  # Skip the header row.
    for row in reader:
        p_date = time.strftime('%Y-%m-%d')
        s_date = time.strftime('%Y-%m-%d')
        e_date = None
        data = Company.objects.get(name=row[1])
        dataName = data.id
        try:
            e_date = time.strftime('%Y-%m-%d')
        except:
            e_date = None

        cur.execute(
            """INSERT INTO business_business ("license_num","dba_name","license_type","status","processed_date","start_date", \
            "expire_date","employee_num","company_type","business_type","property_type","address","zipcode","name_id") \
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
            (row[0], row[2], row[3], row[5], p_date, s_date, e_date,
             row[17], row[16], row[22], row[13], row[14], row[15], dataName))

#Read in delinquent licenses
with open('C:\\Users\\baraj\\Desktop\\csulb.fall19\\cs491b\\LongBeachCityProject\\Data\\delinquent.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)  # Skip the header row.
    for row in reader:
        p_date = time.strftime('%Y-%m-%d')
        s_date = time.strftime('%Y-%m-%d')
        e_date = None
        name = Company.objects.get(name=row[1])
        dataName = data.id
        try:
            e_date = time.strftime('%Y-%m-%d')
        except:
            e_date = None
        cur.execute(
            """INSERT INTO business_business ("license_num","dba_name","license_type","status","processed_date","start_date", \
            "expire_date","employee_num","company_type","business_type","property_type","address","zipcode","name_id") \
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
            (row[0], row[2], row[3], row[5], p_date, s_date, e_date,
             row[17], row[16], row[22], row[13], row[14], row[15], dataName))

conn.commit()
