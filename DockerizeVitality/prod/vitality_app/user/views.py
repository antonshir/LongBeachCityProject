from rest_framework import generics, authentication, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings

#managing user api
from user.serializers import UserSerializer, AuthTokenSerializer

#Using django rest framework premade create api view
#makes object in DB
class CreateUserView(generics.CreateAPIView):
    """Create New User In System"""
    serializer_class = UserSerializer
#creating a authentication view
class CreateTokenView(ObtainAuthToken):
    """Create New User Auth Token"""
    #doing this to make http request fast
    serializer_class = AuthTokenSerializer
    #DEFAULT REN CLAS in case we ever change render class
    #for browser api
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES
#creating managed user view for endpoint
class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manage Auth User"""
    serializer_class = UserSerializer
    #mechanism by authentication
    #token auth for levels of access a user may have.
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """Retrieve and Return Auth User"""
        #authentication_class already has authenticated user
        #from django out of the box
        return self.request.user
