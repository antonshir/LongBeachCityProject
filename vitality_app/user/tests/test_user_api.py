from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
#api client
from rest_framework.test import APIClient
from rest_framework import status


#constant for urls
CREATE_USER_URL = reverse('user:create')
#http post requst for token
TOKEN_URL = reverse('user:token')
#helper function for user TestCase
def create_user(**params):
    return get_user_model().objects.create_user(**params)

class PublicUserApiTests(TestCase):
    """Test Users API Public Version"""

    def setUp(self):
        self.client = APIClient()
        #check object is created correctly
    def test_create_valid_user_success(self):
        """Test User Payload is Successful"""
        payload = {
            'email': 'test@vitality.com',
            'password': 'testpass',
            'name': 'Test name'
        }
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        #unwinding response from return object in api
        user = get_user_model().objects.get(**res.data)
        self.assertTrue(user.check_password(payload['password']))
        #verify passwd is not returned for security
        self.assertNotIn('password', res.data)

    def test_user_exists(self):
        """Test User Already Exists Check"""
        payload = {'email': 'test@vitality.com', 'password': 'testpass'}
        create_user(**payload)

        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
    #test to verify passwd length
    def test_password_too_short(self):
        """Test Passwd Length: Must be More Than 5 Characters"""
        payload = {'email': 'test@vitality.com', 'password': 'pw'}
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        user_exists = get_user_model().objects.filter(
            email=payload['email']
        ).exists()
        self.assertFalse(user_exists)
    def test_create_token_for_user(self):
        """Test Token Generation For User"""
        payload = {'email': 'test@vitality.com', 'password': 'testpass'}
        create_user(**payload)
        res = self.client.post(TOKEN_URL, payload)

        self.assertIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_create_token_invalid_credentials(self):
        """Test Token isn't Created With Invalid Creds"""
        create_user(email='test@vitality.com', password="testpass")
        payload = {'email': 'test@vitality.com', 'password': 'wrong'}
        res = self.client.post(TOKEN_URL, payload)

        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_token_no_user(self):
        """Test Token Isn't Created If User Exists"""
        payload = {'email': 'test@vitality.com', 'password': 'testpass'}
        res = self.client.post(TOKEN_URL, payload)

        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        #Exausted ideas for test cases consult with your
        #system administrator for more.
    def test_create_token_missing_field(self):
        """Test Email and Passwd Are Required"""
        res = self.client.post(TOKEN_URL, {'email': 'one', 'password': ''})
        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
