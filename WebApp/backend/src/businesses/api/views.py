from rest_framework.generics import ListAPIView, RetrieveAPIView


from businesses.models import Business
from .serializers import BusinessSerializer


class BusinessListView(ListAPIView):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer

class BusinessDetailView(RetrieveAPIView):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer