FROM node:8.10.0

ENV NODE_ENV development

# Set /app as workdir
RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install -g nodemon --quiet
RUN npm install --quiet

COPY . .

RUN chmod 777 scripts/start.sh
CMD bash scripts/start.sh