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
        print(dot_prod)
        if dot_prod > max:
            max = dot_prod
            target = i
            
    return target

def main():
    
    #[-0.08891868192070199, -0.40222156749876115, 0.4959717996353581, 0.3372726257774364]
    
    # features is an array that consists of num of days business has been
    # in business, the number of yelp review, yelp rating, and google rating   
    features = [-0.08891868192070199, -0.40222156749876115, 0.4959717996353581, 0.3372726257774364]
    
    # array of arrays that contains weights for every class
    weights = [[-0.31100321, -1.03409677, -0.21570674, -1.34527927],
                [-0.0177847,  -0.39417183, -0.188612, 0.56687008],
                [ 0.25757663,  0.94934301,  0.61091065, 1.16592459]]
    
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