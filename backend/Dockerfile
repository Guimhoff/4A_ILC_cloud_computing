FROM python:3.11

RUN apt-get update
RUN apt-get install python3-pip -y
RUN pip install flask
RUN pip install flask-cors
RUN pip install redis
RUN pip install flake8

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV FLASK_APP=python/api.py
ENV FLASK_DEBUG=True

ENV PATH="${PATH}:/usr/local/bin"

EXPOSE 5000

CMD ["flask", "run", "--host", "0.0.0.0"]