from rest_framework import serializers

from core.models import Tag

#Creating a Model Serializer linked to tag model pulling id and name values for Vitality app
class TagSerializer(serializers.ModelSerializer):
    """Tag Objects Serializer"""

    class Meta:
        model = Tag
        fields = ('id', 'name')
        read_only_fields = ('id',)
