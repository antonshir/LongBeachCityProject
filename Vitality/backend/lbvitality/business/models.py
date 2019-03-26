from django.db import models


class Business(models.Model):
    licenseNum = models.CharField(max_length = 100, primary_key=True)
    name = models.CharField(max_length = 100)
    licenseType = models.CharField(max_length = 100)
    status = models.CharField(max_length = 100)
    
    processedDate = models.CharField(max_length = 100)
    startDate = models.CharField(max_length = 100)
    expireDate = models.CharField(max_length = 100)

    employeeNum = models.IntegerField(default = 0)
    companyType = models.CharField(max_length = 100)
    businessType = models.CharField(max_length = 100)
    propertyType = models.CharField(max_length = 100)
    zipcode = models.IntegerField(default=0)

    def __str__(self):
        return self.name

