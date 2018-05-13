#!/bin/bash

## pull latest
git pull

## build
docker run -it -v $PWD:/work -w /work node /work/build.sh

## reload
docker-compose down
docker-compose up -d