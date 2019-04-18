#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Apr 18 13:43:24 2019

@author: antonshirokov
"""

from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np

def get_weights():
    colnames = ['target']
    colnames1 = ['days_in_business', 'yelp_review_count', 'yelp_rating', 'google_rating']
    
    df = pd.read_csv("/Users/antonshirokov/Downloads/target1.csv", names = colnames)
    df1 = pd.read_csv("/Users/antonshirokov/Downloads/features3.csv", names = colnames1)
        
    y = np.array(df.target.tolist())
    X = np.array(df1)
        
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4, random_state=0)
    logreg = LogisticRegression()
    logreg.fit(X_train, y_train)
        
    return logreg.coef_ # returns a matrix of weights (coefficients)

def main():
    print(get_weights())
  
if __name__== "__main__":
    main()       
