from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, \
                                        PermissionsMixin
from django.conf import settings
#libraries required to extend the django user model while
#making use of some out of the box features of django-user models
#*******ATTENTION**********
#After making changes to models, run migrations.
#Ask your system administrator if this is not clear.

#create user manager class for helper functions

class UserManager(BaseUserManager):
#extra fields add additional fields if we need it: flexibility
    def create_user(self, email, password=None, **extra_fields):
        """Creates and Saves a New User"""
        if not email:
            raise ValueError('Error: Users Must Have Email For Security')
        user = self.model(email=self.normalize_email(email), **extra_fields)
#avoiding encrypting the password in clear text so made a new definition
        user.set_password(password)
#Leave the _db in case we switch database, its required for some db's
        user.save(using=self._db)

        return user
    #For command line use only, do not remove this module.
    #if you don't understand consult your system administrator
    def create_superuser(self, email, password):
        """Create Then Saves New Super User"""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user
#building model on top of built in django user model

class User(AbstractBaseUser, PermissionsMixin):
    """Custom User Model Supports Emails Not Username"""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()
#usually its username: customizing this
    USERNAME_FIELD = 'email'


#using best practice django auth setting from settings
class Tag(models.Model):
    """Tag Utilized In Business"""
    name = models.CharField(max_length=255)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name
