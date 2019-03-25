#Storing serializers for user
from django.contrib.auth import get_user_model, authenticate
#using lazy_as for messsages to translate future implementation of language support
from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers

#creating new serializer for custom user
class UserSerializer(serializers.ModelSerializer):
    """Serializer For Users Object"""

    class Meta:
        model = get_user_model()
        #fields included and converted to and from json in http calls
        #making accessible for w/r in API
        fields = ('email', 'password', 'name')
        #configuring extra setting in model serializer
        #to ensure passwd is write only and min character length is 5 Characters
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}

    #create function for new objects for key authentication
    def create(self, validated_data):
        """Create New User With Encrypted Passwd and Return"""
        #verifying encryption occurred for authentication
        return get_user_model().objects.create_user(**validated_data)
    #Serializer based off django's standard serial.
    #using it for authentication
class AuthTokenSerializer(serializers.Serializer):
    """Serializer For User Authenication Object"""
    email = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )
    #validation for chars, password character fills and authenticaiton cred are correctly
    def validate(self, attrs):
        """Validate and Authenticate User"""
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password
        )
        if not user:
            msg = ('Error: Unable to Authenticate. Please, Retry')
            raise serializers.ValidationError(msg, code='authentication')

        attrs['user'] = user
        return attrs
