#adds business from yelp.csv to postgres database
import csv
import os
import django
import sys

sys.path.append('/'.join((os.path.dirname(os.path.abspath(__file__)) +
                          '').split('/')[0:-5]) +
                '/Vitality/backend/lbvitality')
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
        yelp.save()
        yelp_history = YelpHistory(date=row[1],
                                   price=row[12],
                                   rating=row[13],
                                   review_count=row[14],
                                   yelp=yelp)
        print(yelp_history)
        yelp_history.save()