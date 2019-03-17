from django.db import models


class Business(models.Model):
    licenseNum = models.CharField(max_length = 20)
    name = models.CharField(max_length = 100)
    licenseType = models.CharField(max_length = 20)
    status = models.CharField(max_length = 20)
    processedDate = models.CharField(max_length = 40)
    startDate = models.CharField(max_length = 40)
    expireDate = models.CharField(max_length = 40)
    employeeNum = models.IntegerField(default = 0)
    companyType = models.CharField(max_length = 20)
    businessType = models.CharField(max_length = 60)
    propertyType = models.CharField(max_length = 20)
    zipcode = models.CharField(max_length = 5)

