from django.db import models


class Business(models.Model):

    id = models.AutoField(primary_key=True)

    licenseNum = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    DBAName = models.CharField(max_length=100)
    licenseType = models.CharField(max_length=100)
    status = models.CharField(max_length=100)

    processedDate = models.CharField(max_length=100)
    startDate = models.CharField(max_length=100)
    expireDate = models.CharField(max_length=100)

    employeeNum = models.IntegerField(default=0)
    companyType = models.CharField(max_length=100)
    businessType = models.CharField(max_length=100)
    propertyType = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    zipcode = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Yelp(models.Model):

    id = models.CharField(max_length=100, primary_key=True)

    date = models.CharField(max_length=100)
    yelp_name = models.CharField(max_length=100)
    yelp_id = models.CharField(max_length=100)
    image_url = models.CharField(max_length=1000)
    is_claimed = models.CharField(max_length=100)

    is_closed = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=100)

    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=100)
    price = models.CharField(max_length=100)
    rating = models.CharField(max_length=100)
    review_count = models.CharField(max_length=10000)
    transactions = models.CharField(max_length=100)
    url = models.CharField(max_length=1000)
