FROM python:3.8

RUN apt-get update
RUN apt-get install python3-pip -y
RUN pip install flask
RUN pip install flask-cors
RUN pip install redis

COPY . .

ENV FLASK_APP=python/api.py
ENV FLASK_DEBUG=True

EXPOSE 5000

CMD ["flask", "run", "--host", "0.0.0.0"]