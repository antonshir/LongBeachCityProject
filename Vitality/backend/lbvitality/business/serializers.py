from rest_framework import serializers
from .models import Business

from django.db.models import F

class BusinessSerializer (serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = '__all__'

class DelinquentActiveZipCodeRatioSerializer (serializers.ModelSerializer):
    businessCount = serializers.IntegerField(read_only=True)
    delinquentCount = serializers.IntegerField(read_only=True)
    activeCount = serializers.IntegerField(read_only=True)
    class Meta:
        model = Business
        fields = ('zipcode','businessCount','delinquentCount', 'activeCount')   