FROM python:3.7-alpine
MAINTAINER andreology

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt
RUN apk update && \
    apk add --update --no-cache postgresql-dev
RUN apk update && \
    apk add --update --no-cache --virtual .tmp-build-deps \
         gcc libc-dev linux-headers python-dev musl-dev

RUN pip install -r /requirements.txt
RUN apk del .tmp-build-deps

RUN mkdir /vitality_app
WORKDIR /vitality_app
COPY ./vitality_app /vitality_app


RUN adduser -D user
USER user
