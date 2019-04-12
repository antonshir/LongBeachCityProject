from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register('businesses', BusinessViewSet)
router.register('zipcodebusinesslist', ZipCodeBusinessListViewSet)
# router.register('zipcoderatio', DelinquentActiveZipCodeRatioViewSet)

urlpatterns = router.urls