from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np
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


def get_weights():
    colnames = ['target']
    colnames1 = [
        'days_in_business', 'yelp_review_count', 'yelp_rating', 'google_rating'
    ]

    df = pd.read_csv('/'.join(
        (os.path.dirname(os.path.abspath(__file__)) + '').split('/')[0:-5]) +
                     '/LogReg/target1.csv',
                     names=colnames)
    df1 = pd.read_csv('/'.join(
        (os.path.dirname(os.path.abspath(__file__)) + '').split('/')[0:-5]) +
                      '/LogReg/features3.csv',
                      names=colnames1)

    y = np.array(df.target.tolist())
    X = np.array(df1)

    X_train, X_test, y_train, y_test = train_test_split(X,
                                                        y,
                                                        test_size=0.4,
                                                        random_state=0)
    logreg = LogisticRegression()
    logreg.fit(X_train, y_train)

    return logreg.coef_  # returns a matrix of weights (coefficients)


def get_target(features, weights):

    max = 0
    target = 0

    for i in range(len(weights)):
        dot_prod = np.dot(weights[i], features)
        if dot_prod > max:
            max = dot_prod
            target = i

    return target


def predict(features, weights):
    # features is an array that consists of num of days business has been
    # in business, the number of yelp review, yelp rating, and google rating

    # features = []

    # array of arrays that contains weights for every class
    # weights = []

    # the features array needs to be in numpy format
    features = np.array(features)
    # the weights array needs to be in numpy format
    weights = np.array(weights)

    #target 3 classes
    # 0 = bad
    # 1 = mediocre
    # 2 = good

    score = get_target(features, weights)
    print(score)
    return score


if __name__ == "__main__":
    # get the weights
    weights = get_weights()

    #find the latest date in database based on yellp
    yelp = YelpHistory.objects.latest('date')
    date = yelp.date

    #find all the yelp histories on that date
    yelps_history = YelpHistory.objects.filter(date=date)

    #for each yelp data, find the google data
    for i in yelps_history:
        temp_business = i.yelp.business

        # change days in business after it is fixed
        # google ratings for that business
        try:
            google_history = GoogleHistory.objects.get(
                date=date, google__business=temp_business)
            features = [10000, i.review_count, i.rating, google_history.rating]
            score = predict(features, weights)
            social_media_score = SocialMediaScore(score=score,
                                                  date=date,
                                                  business=temp_business)
            print(social_media_score)
            print(score)
            social_media_score.save()

        # no google ratings for that business
        except:
            features = [10000, i.review_count, i.rating, 0]
            score = predict(features, weights)
            social_media_score = SocialMediaScore(score=score,
                                                  date=date,
                                                  business=temp_business)
            print(social_media_score)
            print(score)
            social_media_score.save()
