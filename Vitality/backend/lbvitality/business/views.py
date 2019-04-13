from django.shortcuts import render
from .models import *
from rest_framework import viewsets, permissions, generics
from .serializers import *

from django.db.models import Count, Q

from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from django.core import serializers


class BusinessViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = BusinessSerializer


class ZipCodeRatioViewSet(viewsets.ModelViewSet):
    delinquent = Count('zipcode', filter=~Q(status='Active'))
    active = Count('zipcode', filter=Q(status='Active'))
    queryset = Business.objects.values('zipcode').annotate(
        business_count=Count('zipcode')).annotate(
            delinquent_count=delinquent).annotate(active_count=active)
    permission_classes = [permissions.AllowAny]
    serializer_class = ZipCodeRatioSerializer


class BusinessListViewSet(viewsets.ModelViewSet):
    queryset = SocialMedia.objects.all()
    serializer_class = SocialMediaSerializer

    def get_queryset(self):
        req = self.request
        zipcode = req.query_params['zipcode']
        startindex = int(req.query_params['startindex'])
        endIndex = int(req.query_params['endindex'])
        self.queryset = SocialMedia.objects.filter(
            business__zipcode=zipcode).order_by('score',
                                                'date')[startindex:endIndex]
        return self.queryset
