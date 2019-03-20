from rest_framework import routers
from .api import BusinessViewSet

router = routers.DefaultRouter()
router.register('businesses', BusinessViewSet, 'Business')

urlpatterns = router.urls