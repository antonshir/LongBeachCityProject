import csv
import psycopg2
import os
import datetime
import time
import django
from psycopg2 import IntegrityError
import sys
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
        cur.execute(
            """INSERT INTO business_company ("name", "id") \
            VALUES (%s,%s)""", (row[1],row[0]))




conn.commit()
