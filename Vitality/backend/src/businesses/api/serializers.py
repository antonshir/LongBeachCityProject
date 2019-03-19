from rest_framework import serializers


from businesses.models import Business


class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = ('name', 'licenseNum')


