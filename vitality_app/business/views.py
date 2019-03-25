from rest_framework import viewsets, mixins
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Tag

from business import serializers


class TagViewSet(viewsets.GenericViewSet,
                 mixins.ListModelMixin,
                 mixins.CreateModelMixin):
    """DB Tag Management"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Tag.objects.all()
    serializer_class = serializers.TagSerializer
    #custom filtering for the for API displaying
    def get_queryset(self):
        """Return Objects For Currrent Valid Session User"""
        #by this point in execution, User Should be authenticated with permission
        #otherwise they unauthenticated request error would prompt user
        return self.queryset.filter(user=self.request.user).order_by('-name')
#based of generic view set but with mixmodel mix in
#in order to pull different parts of a view set for vitality application
    def perform_create(self, serializer):
         """New Tag Generated"""
         serializer.save(user=self.request.user)
         #overriding function to customize modifications to alter create object
