# milkroad-backend

## Development Instructions

Docker is used for development in order to remove the overhead of having to manage
PostgreSQL and Node.js locally. 

To do the initial setup, run `docker-compose build`. Then, run the migrations on 
the database by running `docker-compose exec web /bin/sh -c 'npm run db:migrate'`. 

Once set up, you must manually start the web server after every change to test
the server by running `docker-compose build && docker-compose run`. Migrations can be ran as instructed above.

