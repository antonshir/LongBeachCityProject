from .models import Business
from rest_framework import viewsets, permissions
from .serializers import BusinessSerializer

class BusinessViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all()
    permission_classes  = [
        permissions.AllowAny
    ]
    serializer_class = BusinessSerializer