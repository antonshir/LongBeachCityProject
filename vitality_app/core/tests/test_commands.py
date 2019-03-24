#mocking behavoir of django get function
#simulating the db being available
from unittest.mock import patch

from django.core.management import call_command
from django.db.utils import OperationalError
from django.test import TestCase


class CommandTests(TestCase):
    def test_wait_for_db_ready(self):
        """Test Simulation of Available DB"""
        #overriding behavior of connection handler
        #I needed the default db via the connection ConnectionHandler
        #found in git hub source code db library __getitem
        with patch('django.db.utils.ConnectionHandler.__getitem__') as gi:
            #monitoring calls
            gi.return_value = True
            call_command('wait_for_db')
            self.assertEqual(gi.call_count, 1)
    #patch decorador for mocking a wait time to speed up test execution
    @patch('time.sleep', return_value=True)
    def test_wait_for_db(self, ts):
        """Test Standing By for DB"""
        with patch('django.db.utils.ConnectionHandler.__getitem__') as gi:
            gi.side_effect = [OperationalError] * 5 + [True]
            call_command('wait_for_db')
            self.assertEqual(gi.call_count, 6)
