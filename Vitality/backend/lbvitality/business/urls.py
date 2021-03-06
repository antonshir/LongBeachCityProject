from rest_framework import routers
from .views import *
from django.urls import path

router = routers.DefaultRouter()
router.register('business', BusinessViewSet, 'business')
router.register('businesslist', BusinessListViewSet, 'businesslist')
router.register('zipcoderatio', ZipCodeRatioViewSet, 'zipcoderatio')
router.register('socialmediascore', SocialMediaScoreViewSet,
                'socialmediascore')
router.register('yelphistory', YelpHistoryViewSet, 'yelphistory')
router.register('googlehistory', GoogleHistoryViewSet, 'googlehistory')
router.register('users', UserViewSet)
router.register('companys', CompanyViewSet)
router.register('companyratings', CompanyRatingViewSet)


urlpatterns = router.urls
