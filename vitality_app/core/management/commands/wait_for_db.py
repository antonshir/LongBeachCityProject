import time

from  django.db import connections
from django.db.utils import OperationalError
from django.core.management.base import BaseCommand

#Creating a new command class for custom user model
class Command(BaseCommand):
    """DJango Command To Buffer Until DB"""

    def handle(self, *args, **options):
        self.stdout.write('Waiting for DB beep boop beep bop...')
        db_conn = None
        #wait for DB to be available for security
        while not db_conn:
            try:
                db_conn = connections['default']
            except OperationalError:
                self.stdout.write('DB currently unavailable, standing by 1 sec')
                time.sleep(1)

        self.stdout.write(self.style.SUCCESS('DB Free to Use'))
        
