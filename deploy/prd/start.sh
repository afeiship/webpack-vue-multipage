#!/bin/bash

## for production env

## reload
docker-compose -f ./docker-compose.yml down
docker-compose -f ./docker-compose.yml up -d