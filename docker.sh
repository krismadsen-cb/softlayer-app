#!/bin/sh

docker run --name softlayer-web-app -p 3000:3000 --network=isolated_nw --ip=172.25.3.4 -v "$PWD":/usr/src/app -w /usr/src/app -it softlayer-web-app
