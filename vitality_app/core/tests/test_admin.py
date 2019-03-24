#storing all vitality  admin unit test here
#client to make test requests.
from django.test import TestCase, Client
from django.contrib.auth import get_user_model
#generate urls for django admin page
from django.urls import reverse

class AdminSiteTests(TestCase):

    def setUp(self):
        self.client = Client()
        self.admin_user = get_user_model().objects.create_superuser(
            email= 'andreology_admin@vitality.com',
            password="password123'"
        )
        #using client helper function to avoid manually loggin user in
        self.client.force_login(self.admin_user)
        self.user = get_user_model().objects.create_user(
            email='test@vitality.com',
            password='password123',
            name='Test User Full Name'
        )

    def test_user_listed(self):
        """Test Users Are Listed on User Page"""
        url = reverse('admin:core_user_changelist')
        res = self.client.get(url)
        #assert are django checks on http request is 200
        self.assertContains(res, self.user.name)
        self.assertContains(res, self.user.email)

    def test_user_page_change_page(self):
        """Test User Edit Page Functioning"""
        url = reverse('admin:core_user_change', args=[self.user.id])
        # houw args workd
        # admin/core/usre/
        res = self.client.get(url)
        #checking response for 200 ok page works
        self.assertEqual(res.status_code, 200)
    def test_create_user_page(self):
        """Test Create Page User Is Working"""
        url = reverse('admin:core_user_add')
        res = self.client.get(url)

        self.assertEqual(res.status_code, 200)
