import csv
import psycopg2
import os


conn = psycopg2.connect("host=127.0.0.1 dbname=businessdb user=postgres password=admin")
cur = conn.cursor()


#Read in active licenses
with open('/'.join((os.path.dirname(os.path.abspath(__file__))+'').split('/')[0:-4]) + '/Data/active.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)  # Skip the header row.
    for row in reader:
        cur.execute(
            """INSERT INTO business_business ("licenseNum","name","licenseType","status","processedDate","startDate", \
            "expireDate","employeeNum","companyType","businessType","propertyType","zipcode") \
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""", (row[0],row[1],row[3],row[5],row[6],row[7],row[8],row[17],row[16],row[22],row[13],row[15])
        )

#Read in delinquent licenses
with open('/'.join((os.path.dirname(os.path.abspath(__file__))+'').split('/')[0:-4]) + '/Data/delinquent.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)  # Skip the header row.
    for row in reader:
        cur.execute(
            """INSERT INTO business_business ("licenseNum","name","licenseType","status","processedDate","startDate", \
            "expireDate","employeeNum","companyType","businessType","propertyType","zipcode") \
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""", (row[0],row[1],row[3],row[5],row[6],row[7],row[8],row[17],row[16],row[22],row[13],row[15])
        )

conn.commit()

