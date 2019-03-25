from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Tag
#serializer to make sure unit test passes
from business.serializers import TagSerializer

TAGS_URL = reverse('business:tag-list')

#makig public API tests
class PublicTagsApiTests(TestCase):
    """Test Public Tags API"""

    def setUp(self):
        self.client = APIClient()

    def test_login_required(self):
        """Test Login Requirement To Yeild Tags"""
        res = self.client.get(TAGS_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)
class PrivateTagsApiTests(TestCase):
    """Test Authorized User Tags API"""

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            'andreology_test@vitality.com',
            'password123'
        )
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_retrieve_tags(self):
        """Test Tag Retrieval"""
        Tag.objects.create(user=self.user, name='Tupac')
        Tag.objects.create(user=self.user, name='Music Label')
        #http request which should return vitality user tags integrated earlier
        res = self.client.get(TAGS_URL)
        #ensuring tags are returned in alph order, reverse order based off name.
        tags = Tag.objects.all().order_by('-name')
        serializer = TagSerializer(tags, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        #res.data-> from http must equate to serializer data passed in
        self.assertEqual(res.data, serializer.data)

    def test_tags_limited_to_user(self):
        """Test Returned Tags Are For Current User"""
        user2 = get_user_model().objects.create_user(
            'other@vitality.com',
            'testpass'
        )
        Tag.objects.create(user=user2, name='Residentual Business')
        tag = Tag.objects.create(user=self.user, name='Industrial Business')

        res = self.client.get(TAGS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        #verifying API is limited results to authenticated user.
        self.assertEqual(res.data[0]['name'], tag.name)

    def test_create_tag_successful(self):
        """New Tag Creation Test"""
        payload = {'name': 'Test tag'}
        self.client.post(TAGS_URL, payload)

        exists = Tag.objects.filter(
         user=self.user,
        name=payload['name']
        ).exists()
        self.assertTrue(exists)
        #blank string error test

    def test_create_tag_invalid(self):
        """New Tag Creation Using Invalid Payload"""
        payload = {'name': ''}
        res = self.client.post(TAGS_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
