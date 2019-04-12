from django.shortcuts import render
from .models import Business
from rest_framework import viewsets, permissions
from .serializers import *

from django.db.models import Count, Q


class BusinessViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = BusinessSerializer


class DelinquentActiveZipCodeRatioViewSet(viewsets.ModelViewSet):
    delinquent = Count('zipcode', filter=~Q(status='Active'))
    active = Count('zipcode', filter=Q(status='Active'))
    queryset = Business.objects.values('zipcode').annotate(
        businessCount=Count('zipcode')).annotate(
            delinquentCount=delinquent).annotate(activeCount=active)
    permission_classes = [permissions.AllowAny]
    serializer_class = DelinquentActiveZipCodeRatioSerializer


class ZipCodeBusinessListViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = BusinessSerializer