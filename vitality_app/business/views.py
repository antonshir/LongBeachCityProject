from rest_framework import viewsets, mixins
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Tag, Location

from business import serializers

#creating new base class which holds comman modules from tags and view sets
#both will be based off the base class
class BaseLocationAttrViewSet(viewsets.GenericViewSet,
                              mixins.ListModelMixin,
                              mixins.CreateModelMixin):
     """User Location Attribute Base Viewset"""
     authentication_classes = (TokenAuthentication,)
     permission_classes = (IsAuthenticated,)

     def get_queryset(self):
         """Return Auth User Saved Objects"""
         return self.queryset.filter(user=self.request.user).order_by('-name')

     def perform_create(self, serializer):
        """New Object Creation"""
        serializer.save(user=self.request.user)

class TagViewSet(BaseLocationAttrViewSet):
    """DB Tag Management"""
    # authentication_classes = (TokenAuthentication,) !!!Now in base class!!!
    # permission_classes = (IsAuthenticated,)
    queryset = Tag.objects.all()
    serializer_class = serializers.TagSerializer
    #custom filtering for the for API displaying
#     def get_queryset(self):
#         """Return Objects For Currrent Valid Session User"""
#         #by this point in execution, User Should be authenticated with permission
#         #otherwise they unauthenticated request error would prompt user
#         return self.queryset.filter(user=self.request.user).order_by('-name')
# #based of generic view set but with mixmodel mix in
# #in order to pull different parts of a view set for vitality application
#     def perform_create(self, serializer):
#          """New Tag Generated"""
#          serializer.save(user=self.request.user)
         #overriding function to customize modifications to alter create object
class LocationViewSet(BaseLocationAttrViewSet):
    #mixin to support listing Locations
    """Order Locations In DB"""
    #class variables set up( now in base class)
    #authentication_classes = (TokenAuthentication,)
    #permission_classes = (IsAuthenticated,)
    queryset = Location.objects.all()
    serializer_class = serializers.LocationSerializer
    #filter by objects assigned to user auth and order by name
    # def get_queryset(self):
    #     """Auth User Return Objects"""
    #     return self.queryset.filter(user=self.request.user).order_by('-name')
    #
    # def perform_create(self, serializer):
    #     """New Location Creation"""
    #     serializer.save(user=self.request.user)
