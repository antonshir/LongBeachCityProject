import csv
import psycopg2
import os
import django
import sys

sys.path.append(
    "/Users/David/Documents/GitHub/LongBeachCityProject/Vitality/backend/lbvitality"
)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lbvitality.settings')
django.setup()

from business.models import *

# conn = psycopg2.connect(
#     "host=127.0.0.1 dbname=businessdb user=postgres password=admin")
# cur = conn.cursor()

with open(
        '/'.join(
            (os.path.dirname(os.path.abspath(__file__)) + '').split('/')[0:-5])
        + '/Data/social_media/dummy_score.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)  # Skip the header row.
    for row in reader:
        business = Business.objects.get(license_num=row[0])
        print(business)
        social = SocialMedia(date=row[1],
                             score=row[2],
                             has_yelp=False,
                             has_google=False,
                             business=business)
        print(social)
        social.save()
    # for row in reader:
    #     cur.execute(
    #         """INSERT INTO business_socialmedia ("licenseNum","date","score","hasYelp","hasGoogle") \
    #         VALUES (%s,%s,%s,%s,%s)""", (row[0], row[3], row[2], False, False))
# conn.commit()
