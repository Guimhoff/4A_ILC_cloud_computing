FROM python:3.11

RUN pip install flask
RUN pip install flask-cors
RUN pip install redis

COPY . .

ENV FLASK_APP=python/api.py
ENV FLASK_DEBUG=True

ENV PATH="${PATH}:/usr/local/bin"

EXPOSE 5000

CMD ["flask", "run", "--host", "0.0.0.0"]