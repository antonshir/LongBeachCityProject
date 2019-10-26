from django.urls import path, include
#drouter is the feature in rest framework to auto generate urls for vitality app view sets.
from rest_framework.routers import DefaultRouter

from business import views
router = DefaultRouter()
router.register('tags', views.TagViewSet)
router.register('location', views.LocationViewSet)

app_name = 'business'

urlpatterns = [
    path('', include(router.urls))
]
