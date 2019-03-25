from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import test_create_new_superuser

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Location

from business.serializers import LocationSerializer


LOCATION_URL = reverse('business:location-list')


class PubliclocationApiTests(TestCase):
    """Test Accessible Location API"""

    def setUp(self):
        self.client = APIClient()

    #Requiring login at this end point always:Security
    def test_login_required(self):
        """Test Required Login In At Endpoint"""
        res = self.client.get(LOCATION_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)
