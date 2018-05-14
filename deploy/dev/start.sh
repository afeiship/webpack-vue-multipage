#!/bin/bash

PACKAGE_NAME='webpack-vue-multipage';

## pull latest
git pull

## build
docker run -it -v $PWD:/work -w /work node /work/deploy/dev/build.sh

## package for prd env
rm -rf $PACKAGE_NAME.tar.gz
tar zcf $PACKAGE_NAME.tar.gz ./dist ./deploy

## reload
docker-compose -f ./deploy/dev/docker-compose.yml down
docker-compose -f ./deploy/dev/docker-compose.yml up -d