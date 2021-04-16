FROM node:14.5-alpine

# RUN apk add --no-cache \
#   android-tools \
#   --repository=http://dl-cdn.alpinelinux.org/alpine/edge/testing

# Hack to make adb connect through host
# RUN mv /usr/bin/adb /usr/bin/adb-real && \
#     echo -e "#!/bin/sh\n/usr/bin/adb-real -H host.docker.internal \$@" > /usr/bin/adb && \
#     chmod +x /usr/bin/adb

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm -g install expo-cli && \
    npm install

COPY . .

CMD [ "npm", "run", "start:prod" ]
