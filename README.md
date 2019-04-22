# Small Business Vitality

This project analyzes data in city of Long Beach to provide more insights to local businesses. 
Make sure you have python 3.7 or higher.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for production debuging and testing purposes. See deployment for notes on how to deploy the project on a live system for a developement environment.

### Prerequisites

OS may be a;

```
Windows Pro
```
```
Windows Education 
```

### Installing

Please visit Docker Hub for full installation instructions specific to your OS. 

```
Docker Hub
```

## Running the tests

Unit Test may be run on the system to verify system functionality and deployement. 


## Deployment

Run the Docker Engine terminal or a git bash and enter the root directory of the project. 

Install requirements for the project.
```
docker build . 
```

Compile the container image 
```
docker-compose build 
```

Run unit tests on system to verify environment and application functionality. 
```
docker-compose run --rm sh -c "python manage.py test"
```

Bring down any running containers
```
docker-compose down 
```

Spin up the container
```
docker-compose up 
```
## Built With
 
 ```
 Docker 
 Nginx 
 Gunicorn
 Python 
 Django
 Postgres
 ``` 
 

