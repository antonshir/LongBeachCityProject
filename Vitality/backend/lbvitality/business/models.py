from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


class Company(models.Model):
    name = models.CharField(max_length=100, blank=True)
    id = models.IntegerField(primary_key=True)

    def no_of_ratings(self):
        ratings = CompanyRating.objects.filter(comp=self)
        return len(ratings)

    def avg_rating(self):
        sum = 0
        ratings = CompanyRating.objects.filter(comp=self)
        for rating in ratings:
            sum += rating.stars

        if len(ratings) > 0:
            return sum / len(ratings)
        else:
            return 0

    def get_comp_businesses(self):
        comp_bus_list = Business.objects.filter(name=self)
        return comp_bus_list

    def __str__(self):
        return self.name

class Business(models.Model):

    license_num = models.CharField(primary_key=True, max_length=100)
    name = models.ForeignKey(Company, on_delete=models.CASCADE, max_length=100, blank=True)
    dba_name = models.CharField(max_length=100, blank=True)
    license_type = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=100, blank=True)
    processed_date = models.DateField(null=True, blank=True)
    start_date = models.DateField(null=True, blank=True)
    expire_date = models.DateField(null=True, blank=True)
    employee_num = models.IntegerField(default=0, blank=True)
    company_type = models.CharField(max_length=100, blank=True)
    business_type = models.CharField(max_length=100, blank=True)
    property_type = models.CharField(max_length=100, blank=True)
    address = models.CharField(max_length=100, blank=True)
    zipcode = models.IntegerField(default=0, blank=True)



#    class Meta:
#        unique_together = (('comp', 'address'))

    def __str__(self):
        return self.license_num


class CompanyRating(models.Model):
    comp = models.ForeignKey(Company, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stars  = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])

    class Meta:
        unique_together = (('user', 'comp'),)
        index_together = (('user', 'comp'),)

class SocialMediaScore(models.Model):
    score = models.IntegerField(default=0)
    date = models.DateField()

    business = models.ForeignKey(
        'Business',
        on_delete=models.CASCADE,
    )

    class Meta:
        unique_together = (('date', 'business'), )


class Yelp(models.Model):

    yelp_name = models.CharField(max_length=100)
    yelp_id = models.CharField(max_length=100)
    image_url = models.CharField(max_length=1000)
    is_claimed = models.BooleanField(max_length=100)
    is_closed = models.BooleanField(max_length=100)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    zipcode = models.CharField(max_length=5)
    transactions = models.CharField(max_length=1000)
    url = models.CharField(max_length=1000)
    categories = models.CharField(max_length=1000)

    business = models.OneToOneField('Business', on_delete=models.CASCADE)


class YelpHistory(models.Model):
    date = models.DateField()

    price = models.CharField(max_length=100)
    rating = models.FloatField(max_length=100)
    review_count = models.IntegerField(default=0)

    yelp = models.ForeignKey('Yelp', on_delete=models.CASCADE)

    class Meta:
        unique_together = (('yelp', 'date'), )


class Google(models.Model):

    google_name = models.CharField(max_length=100)
    google_id = models.CharField(max_length=100, primary_key=True)
    formatted_address = models.CharField(max_length=1000)
    latitude = models.CharField(max_length=100)
    longtitude = models.CharField(max_length=100)

    business = models.OneToOneField('Business', on_delete=models.CASCADE)


class GoogleHistory(models.Model):
    date = models.DateField()

    price = models.CharField(max_length=100)
    rating = models.FloatField(max_length=100)
    google = models.ForeignKey('Google', on_delete=models.CASCADE)

    class Meta:
        unique_together = (('google', 'date'), )
