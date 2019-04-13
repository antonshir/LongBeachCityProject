from rest_framework import routers
from .views import *
from django.urls import path

router = routers.DefaultRouter()
router.register('business', BusinessViewSet, 'business')
router.register('businesslist', BusinessListViewSet, 'businesslist')
router.register('zipcoderatio', ZipCodeRatioViewSet, 'zipcoderatio')

urlpatterns = router.urls
