#!/bin/bash

## define variables:
PACKAGE_NAME='webpack-vue-multipage';

## pull latest
git pull

## build
docker run -it -v $PWD:/work -w /work node /work/build.sh

## package for prd env
rm -rf $PACKAGE_NAME.tar.gz
tar zcf $PACKAGE_NAME.tar.gz ./dist start.sh docker-compose.yml ./deploy

## reload
docker-compose down
docker-compose up -d