#!/bin/bash

if [ "$NODE_ENV" == "production" ] ; then
  npm run start
elif [ "$NODE_ENV" == "test" ] ; then
  # Don't do anything, leaving CI pipeline to execute test script directly
else
  npm run dev
fi