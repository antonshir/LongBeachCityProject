import csv
import os
import sqlite3

my_list = []

dbPath = '/'.join((os.path.dirname(__file__)+'').split('/')[0:-1]) + '/db.sqlite3'

db = sqlite3.connect(dbPath)
cursor = db.cursor()

with open(os.path.abspath(os.path.dirname(__file__)) + '/data/business.csv', 'r') as csvFile:
    next(csvFile)
    reader = csv.reader(csvFile)
    for row in reader:
        cursor.execute('''INSERT INTO businesses_business (licenseNum,name,licenseType,status,processedDate,startDate,
            expireDate,employeeNum,companyType,businessType,propertyType,zipcode) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)''', 
            (row[0],row[1],row[3],row[5],row[6],row[7],row[8],row[17],row[16],row[22],row[13],row[15]))
        
db.commit()



print('DONE')
   