#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Apr 18 14:28:17 2019

@author: antonshirokov
"""
import numpy as np

def get_target(features, weights):
    
    max = 0
    target = 0
    
    for i in range(len(weights)):
        dot_prod = np.dot(weights[i],features)
        if dot_prod > max:
            max = dot_prod
            target = i
            
    return target

def main():
    
    # features is an array that consists of num of days business has been
    # in business, the number of yelp review, yelp rating, and google rating   
    features = []
    
    # array of arrays that contains weights for every class
    weights = []
    
    # the features array needs to be in numpy format
    features = np.array(features)
    # the weights array needs to be in numpy format
    weights = np.array(weights)
    
    #target 3 classes
    # 0 = bad
    # 1 = mediocre
    # 2 = good
    
    print(get_target(features, weights))
  
if __name__== "__main__":
    main()    