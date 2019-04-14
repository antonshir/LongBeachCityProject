#adds business from yelp.csv to postgres database
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

#yelp.csv
with open(
        '/'.join(
            (os.path.dirname(os.path.abspath(__file__)) + '').split('/')[0:-5])
        + '/Data/social_media/yelp.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)  # Skip the header row.

    for row in reader:
        business = Business.objects.get(license_num=row[0])
        # print(business)
        yelp = Yelp(yelp_name=row[2],
                    yelp_id=row[3],
                    image_url=row[4],
                    is_claimed=row[5],
                    is_closed=row[6],
                    address=row[7],
                    city=row[8],
                    state=row[9],
                    country=row[10],
                    zipcode=row[11],
                    transactions=row[15],
                    url=row[16],
                    business=business)
        # print(yelp)
        yelp.save()

        yelp_history = YelpHistory(date=row[1],
                                   price=row[12],
                                   rating=row[13],
                                   review_count=row[14],
                                   yelp=yelp)
        print(yelp_history)
        yelp_history.save()

#     for row in reader:
#         cur.execute(
#             """INSERT INTO business_yelp ("license_num","date","yelp_name","yelp_id","image_url","is_claimed","is_closed", \
#             "address","city","state","country","zip_code","price","rating","review_count","transactions","url") \
#             VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
#             (row[0], row[3], row[2], row[3], row[4], row[5], row[6], row[7],
#              row[8], row[9], row[10], row[11], row[12], row[13], row[14],
#              row[15], row[16]))
# conn.commit()

# select rating from business_business inner join business_yelp on business_business."licenseNum" = business_yelp."licenseNum" order by rating desc;