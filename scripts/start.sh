#!/bin/bash

if [ "$NODE_ENV" == "production" ] ; then
  sequelize db:migrate
  npm run start
else
  npm run dev
fi