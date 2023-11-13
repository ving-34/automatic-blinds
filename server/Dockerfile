FROM python:3.8

RUN mkdir -p /usr/src/server
RUN mkdir -p /usr/src/server/src
WORKDIR /usr/src/server

COPY ./src /usr/src/server/src
COPY ./src /usr/src/server/src
COPY ./requirements.txt /usr/src/server/

EXPOSE 80

RUN pip install -r ./requirements.txt

CMD [ "python", "./src/__main__.py" ]