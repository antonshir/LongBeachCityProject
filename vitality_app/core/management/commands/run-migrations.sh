!/bin/#!/bin/sh

echo "Collecting Static assets"
python manage.py collectstatic --no-input


echo "Apply database migrations"
python manage.py migrate

exit 0
