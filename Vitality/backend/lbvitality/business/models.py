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
    zipcode = models.CharField(max_length = 100)





    #licenseNum = models.CharField(max_length = 20)
    #name = models.CharField(max_length = 100)
    #licenseType = models.CharField(max_length = 20)
    #tatus = models.CharField(max_length = 20)
    
    #processedDate = models.CharField(max_length = 40)
    #startDate = models.CharField(max_length = 40)
    #expireDate = models.CharField(max_length = 40)
    #processedDate = models.DateField()
    #startDate = models.DateField()
    #expireDate = models.DateField()

    #employeeNum = models.IntegerField(default = 0)
    #companyType = models.CharField(max_length = 20)
    #businessType = models.CharField(max_length = 60)
    #propertyType = models.CharField(max_length = 20)
    #ipcode = models.CharField(max_length = 5)



    def __str__(self):
        return self.name

