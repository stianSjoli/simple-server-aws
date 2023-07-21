FROM node:latest as buildFrontend

COPY package-lock.json package.json src/
COPY dist/index.html src/dist/index.html
COPY dist/style.css src/dist/style.css
COPY webpack.config.js src/webpack.config.js
COPY .babelrc src/
COPY src src/src
WORKDIR src/
RUN npm ci --legacy-peer-deps 
RUN npm run build

#FROM ubuntu:latest as hash
#RUN apt-get update && apt-get upgrade
#RUN apt install build-essential checkinstall zlib1g-dev -y
#RUN apt-get install wget -y
#RUN wget https://www.openssl.org/source/openssl-1.1.1c.tar.gz
#RUN tar -xf openssl-1.1.1c.tar.gz
#RUN cd openssl-1.1.1c && ./config --prefix=/usr/local/ssl --openssldir=/usr/local/ssl shared zlib
#COPY nginx.conf /src/nginx.conf
#COPY dist/index.html /src/index.html
#WORKDIR src
#RUN openssl dgst -sha256 index.html > test.txt

FROM nginx:1.23.3-alpine
COPY nginx.conf /etc/nginx/nginx.conf
RUN  apk update && apk add apparmor
USER 0
COPY --from=buildFrontend /src/dist/index.html /app/build/index.html
COPY --from=buildFrontend /src/dist/style.css /app/build/style.css
COPY --from=buildFrontend /src/dist/index.js /app/build/index.js
