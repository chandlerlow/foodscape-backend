#!/bin/bash

eval "$(ssh-agent -s)" # Start ssh-agent cache
chmod 600 ../.travis/id_rsa # Allow read access to the private key
ssh-add ../.travis/id_rsa # Add the private key to SSH
echo -e "Host $IP\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config

git config --global push.default matching
git remote add deploy ssh://git@$IP:$PORT$DEPLOY_DIR
git push deploy master

# Skip this command if you don't need to execute any additional commands after deploying.
ssh git@$IP -p $PORT <<EOF
  cd $DEPLOY_DIR
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml build web
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --no-deps -d web
EOF