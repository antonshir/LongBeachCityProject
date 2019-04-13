from django.db import models


class Business(models.Model):

    license_num = models.CharField(primary_key=True, max_length=100)
    name = models.CharField(max_length=100, blank=True)
    dba_name = models.CharField(max_length=100, blank=True)
    license_type = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=100, blank=True)
    processed_date = models.DateField(max_length=100, blank=True)
    start_date = models.DateField(max_length=100, blank=True)
    expire_date = models.DateField(max_length=100, blank=True)
    employee_num = models.IntegerField(default=0, blank=True)
    company_type = models.CharField(max_length=100, blank=True)
    business_type = models.CharField(max_length=100, blank=True)
    property_type = models.CharField(max_length=100, blank=True)
    address = models.CharField(max_length=100, blank=True)
    zipcode = models.IntegerField(default=0, blank=True)

    def __str__(self):
        return self.license_num


class SocialMedia(models.Model):
    date = models.DateField(max_length=100)
    score = models.IntegerField(default=0)
    has_yelp = models.BooleanField(default=False, blank=True)
    has_google = models.BooleanField(default=False, blank=True)

    business = models.ForeignKey('Business', on_delete=models.CASCADE)

    class Meta:
        unique_together = (('business', 'date'), )


class Yelp(models.Model):

    license_num = models.CharField(max_length=100)
    date = models.DateField(max_length=100)

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
    price = models.CharField(max_length=100)
    rating = models.FloatField(max_length=100)
    review_count = models.IntegerField(default=0)
    transactions = models.CharField(max_length=100)
    url = models.CharField(max_length=1000)

    class Meta:
        unique_together = (('license_num', 'date'), )


class Google(models.Model):
    license_num = models.CharField(max_length=100)
    date = models.DateField(max_length=100)

    google_name = models.CharField(max_length=100)
    google_id = models.CharField(max_length=100)
    formatted_address = models.CharField(max_length=1000)
    latitude = models.CharField(max_length=100)
    longtitude = models.CharField(max_length=100)
    price = models.CharField(max_length=100)
    rating = models.FloatField(max_length=100)

    class Meta:
        unique_together = (('license_num', 'date'), )
