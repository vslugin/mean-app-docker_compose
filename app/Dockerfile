FROM ubuntu:20.04
MAINTAINER svg52 <v.slugin@nntc.nnov.ru>

# envs
ENV DEBIAN_FRONTEND noninteractive
ENV USER ubuntu
ENV HOME /home/$USER

# install lts node platform
COPY nodejs.xz /opt
RUN apt-get update \
	&& apt-get install -y curl xz-utils \
    && cd /opt \
    && tar xf nodejs.xz \
    && ln -s node-v14.15.2-linux-x64 nodejs \
    && ln -s /opt/nodejs/bin/* /usr/sbin/

# add user and startup script
RUN adduser $USER --disabled-password

# install modules with npm
RUN cd /home/ubuntu/app \
	&& npm install

COPY startup.sh $HOME

# set default cmd
CMD $HOME/startup.sh