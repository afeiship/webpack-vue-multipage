#!/bin/bash

## for production env

## reload
docker-compose -f ./deploy/prd/docker-compose.yml down
docker-compose -f ./deploy/prd/docker-compose.yml up -d