#adds business from yelpToGoogle.csv to postgres database
import csv
import psycopg2
import os
import django
import sys

sys.path.append(
    "/Users/AppleSauce/Documents/GitHub/Aprilproject/Vitality/backend/lbvitality"
)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lbvitality.settings')
django.setup()

from business.models import *

with open(
        '/'.join(
            (os.path.dirname(os.path.abspath(__file__)) + '').split('/')[0:-5])
        + '/Data/social_media/yelpToGoogle.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)  # Skip the header row.

    for row in reader:
        business = Business.objects.get(license_num=row[0])
        # print(business)
        google = Google(google_name=row[2],
                        google_id=row[3],
                        formatted_address=row[4],
                        latitude=row[5],
                        longtitude=row[6],
                        business=business)
        # print(google)
        google.save()

        google_history = GoogleHistory(date=row[1],
                                       price=row[7],
                                       rating=row[8],
                                       google=google)
        print(google_history)
        google_history.save()

#     for row in reader:
#         cur.execute(
#             """INSERT INTO business_google ("license_um","date","google_name","google_id","formatted_address","latitude","longtitude", \
#             "price","rating") \
#             VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
#             (row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7],
#              row[8]))
# conn.commit()
