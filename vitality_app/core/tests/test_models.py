from django.test import TestCase
from django.contrib.auth import get_user_model


class ModelTests(TestCase):

    def test_create_user_with_email_successful(self):
        """Test creating new user with an email was successful"""
        email = 'andreology_test@vitality.com'
        password = 'Testpass123'
        user = get_user_model().objects.create_user(
        email=email,
        password=password
        )

        self.assertEqual(user.email, email)
        #passwd is now encrypted which may only be check with the following module
        self.assertTrue(user.check_password(password))

    def test_new_user_email_normalized(self):
        """Test Email From User Input: check normalizaed"""
        email = 'andreology_test@VITALITY.COM'
        user = get_user_model().objects.create_user(email, 'test123')

        self.assertEqual(user.email, email.lower())

    def test_new_user_invalid_email(self):
        """Test Email From User Input: raise error"""
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user(None, 'test123')

    def test_create_new_superuser(self):
        """Test Creating New Super User"""
        user = get_user_model().objects.create_superuser(
            'andreology_test@vitality.com',
            'test123'
        )
        #is_superuser wont be in model. Its included in mix in extra
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)
