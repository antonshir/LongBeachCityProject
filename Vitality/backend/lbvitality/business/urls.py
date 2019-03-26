from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register('businesses', BusinessViewSet, 'Business')
router.register('zipcoderatio', DelinquentActiveZipCodeRatioViewSet, 'Business')

urlpatterns = router.urls