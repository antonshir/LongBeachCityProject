from rest_framework import serializers
from .models import *


class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = '__all__'


class SocialMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMedia
        fields = '__all__'


class YelpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Yelp
        fields = '__all__'


class ZipCodeRatioSerializer(serializers.ModelSerializer):
    business_count = serializers.IntegerField(read_only=True)
    delinquent_count = serializers.IntegerField(read_only=True)
    active_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Business
        fields = ('zipcode', 'business_count', 'delinquent_count',
                  'active_count')
