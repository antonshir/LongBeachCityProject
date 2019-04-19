from django.shortcuts import render
from .models import *
from rest_framework import viewsets, permissions, generics
from .serializers import *

from django.db.models import Count, Q

from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from django.core import serializers

from django.shortcuts import get_object_or_404


class SocialMediaScoreViewSet(viewsets.ModelViewSet):
    queryset = SocialMediaScore.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = SocialMediaScoreSerializer

    lookup_field = 'business'

    def retrieve(self, request, business=None):
        queryset = SocialMediaScore.objects.filter(
            business=business).order_by('date')[0]
        xd = SocialMediaScore.objects.filter(
            business=business).order_by('date')
        print(xd)
        serializer = SocialMediaScoreSerializer(queryset)
        return Response(serializer.data)


class BusinessViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = AllBusinessInfoSerializer


class ZipCodeRatioViewSet(viewsets.ModelViewSet):
    delinquent = Count('zipcode', filter=~Q(status='Active'))
    active = Count('zipcode', filter=Q(status='Active'))
    queryset = Business.objects.values('zipcode').annotate(
        business_count=Count('zipcode')).annotate(
            delinquent_count=delinquent).annotate(active_count=active)
    permission_classes = [permissions.AllowAny]
    serializer_class = ZipCodeRatioSerializer


class BusinessListViewSet(viewsets.ModelViewSet):
    queryset = SocialMediaScore.objects.all()
    serializer_class = SocialMediaScoreSerializer

    def get_queryset(self):
        req = self.request
        zipcode = req.query_params['zipcode']
        startindex = int(req.query_params['startindex'])
        endIndex = int(req.query_params['endindex'])
        self.queryset = SocialMediaScore.objects.filter(
            business__zipcode=zipcode).order_by(
                'score', 'date', 'business__employee_num')[startindex:endIndex]
        return self.queryset
