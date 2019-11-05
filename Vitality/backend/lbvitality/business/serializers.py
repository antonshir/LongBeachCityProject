from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

#extra_kwargs for hiding password and only allows user to send passwd but never send in api
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ( 'id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    #overwrite:validate user
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = ('license_num', 'dba_name', 'license_type', 'status',
                  'processed_date', 'start_date', 'expire_date',
                  'employee_num', 'company_type', 'business_type',
                  'property_type', 'address', 'zipcode', 'name_id')

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ( 'name', 'id', 'no_of_ratings', 'avg_rating')

class CompanyRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyRating
        fields = ('id', 'user', 'comp', 'stars')

class YelpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Yelp
        fields = '__all__'


class GoogleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Google
        fields = '__all__'


class YelpHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = YelpHistory
        fields = '__all__'


class GoogleHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GoogleHistory
        fields = '__all__'


class ZipCodeRatioSerializer(serializers.ModelSerializer):
    business_count = serializers.IntegerField(read_only=True)
    delinquent_count = serializers.IntegerField(read_only=True)
    active_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Business
        fields = ('zipcode', 'business_count', 'delinquent_count',
                  'active_count')


class AllBusinessInfoSerializer(serializers.ModelSerializer):
    yelp = YelpSerializer()
    google = GoogleSerializer()

    class Meta:
        model = Business
        fields = ('license_num', 'name', 'dba_name', 'license_type', 'status',
                  'processed_date', 'start_date', 'expire_date',
                  'employee_num', 'company_type', 'business_type',
                  'property_type', 'address', 'zipcode', 'yelp', 'google')


class SocialMediaScoreSerializer(serializers.ModelSerializer):
    business = AllBusinessInfoSerializer()

    class Meta:
        model = SocialMediaScore
        fields = ('date', 'score', 'business')
        lookup_field = 'business'
        extra_kwargs = {'url': {'lookup_field': 'business'}}
