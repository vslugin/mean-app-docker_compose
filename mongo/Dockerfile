FROM ubuntu:20.04
MAINTAINER svg52 <v.slugin@nntc.nnov.ru>

# envs
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update \
    && apt-get install -y mongodb

RUN mkdir /srv/data

CMD /usr/bin/mongod --bind_ip 0.0.0.0 --dbpath=/srv/data