# milkroad-backend

## Development Instructions

Docker is used for development in order to remove the overhead of having to manage PostgreSQL and Node.js locally. 

To do the initial setup, run `docker-compose build` followed by `docker-compose up -d` to start the server in detached mode.

Any modifications to your local code will automatically be transferred to the server while it is running. Database scripts can be run as instructed below. Use `docker-compose down` to stop the server.

### Database Scripts

To run all pending migrations: `docker-compose exec web /bin/sh -c 'npm run db:migrate'`

To undo all migrations: `docker-compose exec web /bin/sh -c 'npm run db:migrate:undo'`

To run all seeders: `docker-compose exec web /bin/sh -c 'npm run db:seed'`

To undo all seeders: `docker-compose exec web /bin/sh -c 'npm run db:seed:undo'`
