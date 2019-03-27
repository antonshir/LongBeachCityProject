from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase
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
#Testing listing locations
class PrivateLocationApiTest(TestCase):
    """Test Private Location API"""
         #setting up
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
        'test@vitality.com',
        'testpass'
        )
         #auth with
        self.client.force_authenticate(self.user)
    #location query test
    def test_retrieve_location_list(self):
        """Test Received List Location"""
        Location.objects.create(user=self.user, name='90801')
        Location.objects.create(user=self.user, name='90808')

        #make request
        res = self.client.get(LOCATION_URL)

        locations = Location.objects.all().order_by('-name')
        serializer = LocationSerializer(locations, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)
        #test locations are capped to auth end user
    def test_locations_limited_to_user(self):
        """Test Auth User Received Locations"""
        user2 = get_user_model().objects.create_user(
        'other@vitality.com',
        'testpass'
        )
        Location.objects.create(user=user2, name='90801')
        location = Location.objects.create(user=self.user, name='90808')

        res = self.client.get(LOCATION_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['name'], location.name)
    #testing support for creating locations and an invalid location for exception handling.
    def test_create_location_successful(self):
        """Test New Location Creation"""
        payload = {'name': '90805'}
        self.client.post(LOCATION_URL, payload)

        exists = Location.objects.filter(
            user=self.user,
            name=payload['name'],
        ).exists()
        self.assertTrue(exists)

    def test_create_location_invalid(self):
        """Test Invalid Location Exception"""
        payload = {'name': ''}
        res = self.client.post(LOCATION_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
