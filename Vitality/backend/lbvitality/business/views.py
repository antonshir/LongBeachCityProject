from django.shortcuts import render
from .models import *
from rest_framework import viewsets, permissions, generics, status
from .serializers import *

from django.db.models import Count, Q
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.core import serializers
from django.contrib.auth.models import User

from django.shortcuts import get_object_or_404

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    #decorating method with extra values. detail(needs one specific comp)
    @action(detail=True, methods=['POST'])
    def rate_company(self, request, pk='id'):
        if 'stars' in request.data:
            comp = Company.objects.get(id=pk)
            stars = request.data['stars']
            user = request.user

            try:
                rating = CompanyRating.objects.get(user=user.id, comp=comp.id)
                rating.stars = stars
                rating.save()
                serializer = CompanyRatingSerializer(rating, many=False)
                response = {'message': 'Rating upated', 'result': serializer.data}
                return Response(response, status=status.HTTP_200_OK)
            except:
                rating = CompanyRating.objects.create(user=user, comp=comp, stars=stars)
                serializer = CompanyRatingSerializer(rating, many=False)
                response = {'message': 'Rating created', 'result': serializer.data}
                return Response(response, status=status.HTTP_200_OK)

        else:
            response = {'message': 'PROVIDE STARS'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

class CompanyRatingViewSet(viewsets.ModelViewSet):
    queryset = CompanyRating.objects.all()
    serializer_class = CompanyRatingSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    def update(self, *args, **kwargs):
        response = {'message': 'Update rating not possible!'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def create(self, *args, **kwargs):
        response = {'message': 'Create rating not possible!'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


class SocialMediaScoreViewSet(viewsets.ModelViewSet):
    queryset = SocialMediaScore.objects.all()[0:10]
    permission_classes = [permissions.AllowAny]
    serializer_class = SocialMediaScoreSerializer

    lookup_field = 'business'

    def retrieve(self, request, business=None):
        queryset = SocialMediaScore.objects.filter(
            business=business).order_by('date')[0]
        serializer = SocialMediaScoreSerializer(queryset)
        return Response(serializer.data)


class YelpHistoryViewSet(viewsets.ModelViewSet):
    queryset = YelpHistory.objects.all()[0:10]
    permission_classes = [permissions.AllowAny]
    serializer_class = YelpHistorySerializer

    lookup_field = 'yelp'

    def retrieve(self, request, yelp=None):
        queryset = YelpHistory.objects.filter(yelp=yelp).order_by('-date')[0]
        serializer = YelpHistorySerializer(queryset)
        return Response(serializer.data)


class GoogleHistoryViewSet(viewsets.ModelViewSet):
    queryset = GoogleHistory.objects.all()[0:10]
    permission_classes = [permissions.AllowAny]
    serializer_class = GoogleHistorySerializer

    lookup_field = 'google'

    def retrieve(self, request, google=None):
        queryset = GoogleHistory.objects.filter(
            google=google).order_by('-date')[0]
        serializer = GoogleHistorySerializer(queryset)
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

        # self.queryset = SocialMediaScore.objects.select_related(
        #     'business').filter(business__zipcode=zipcode).order_by(
        #         'score', '-date',
        #         'business__employee_num')[startindex:endIndex]
        self.queryset = SocialMediaScore.objects.select_related(
            'business').filter(business__zipcode=zipcode).exclude(
                business__yelp=None).order_by(
                    '-date', 'score',
                    '-business__start_date')[startindex:endIndex]
        return self.queryset
