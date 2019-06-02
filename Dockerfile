FROM node:10.16.0

ENV NODE_ENV development

# Set /app as workdir
RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install -g nodemon sequelize-cli --quiet
RUN npm install --quiet

COPY . .

RUN chmod 777 scripts/start.sh
CMD bash scripts/start.sh
