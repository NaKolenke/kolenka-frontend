#!/bin/sh

vue-cli-service build
npm version $1 -m "$2" 
git push && git push --tags