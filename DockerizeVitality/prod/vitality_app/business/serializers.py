from rest_framework import serializers

from core.models import Tag, Location

#Creating a Model Serializer linked to tag model pulling id and name values for Vitality app
class TagSerializer(serializers.ModelSerializer):
    """Tag Objects Serializer"""

    class Meta:
        model = Tag
        fields = ('id', 'name')
        read_only_fields = ('id',)
#for location endpoint
class LocationSerializer(serializers.ModelSerializer):
    """Serializer To Location Object"""

    class Meta:
        model = Location
        fields = ('id', 'name')
        read_only_fields = ('id',)
