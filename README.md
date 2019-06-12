# milkroad-backend

## Development Instructions

Docker is used for development in order to remove the overhead of having to manage PostgreSQL and Node.js locally. 

To do the initial setup, run `docker-compose build` followed by `docker-compose up -d` to start the server in detached mode.

Any modifications to your local code will automatically be transferred to the server while it is running. Database scripts can be run as instructed below. Use `docker-compose down` to stop the server.

To see Docker logs, run `docker-compose logs -f` while the server is running.

### Database Scripts

To run all pending migrations: `docker-compose exec web /bin/sh -c 'npm run db:migrate'`

To undo all migrations: `docker-compose exec web /bin/sh -c 'npm run db:migrate:undo'`

To run all seeders: `docker-compose exec web /bin/sh -c 'npm run db:seed'`

To undo all seeders: `docker-compose exec web /bin/sh -c 'npm run db:seed:undo'`

## Authentication

Authentication works using [JSON Web Tokens](https://jwt.io/introduction/) (JWT). As iOS/Android apps
are not typically browsers, [cookies cannot be used](https://auth0.com/docs/design/web-apps-vs-web-apis-cookies-vs-tokens)
to store user sessions. Instead, the server generates a JWT token, which contains a `userId` payload,
identifying the authenticated user to track the user's sessions.

The flow is as follows:

1. The client obtains the JWT token by sending the user's username and password to `/auth/login`
2. The server authenticates the user, creates and encrypts the token, including the `userId` in the 
token payload
3. The client passes the token in the `Authorization: Bearer [token]` header in subsequent requests
    - Note that the client cannot decrypt the token or generate a new token with a spoofed/malicious
    `userId` as the client does not have the server's secret key needed to encrypt/decrypt the JWT token
4. For every requested requiring authentication, the server validates and decrypts the token using
the server's secret key, populating the `req.user` object in the Express controllers with the `User`
object for the given `userId`

Note the default secret (for testing) is `milkroad`, however, **in production** the secret must be changed
to a long, random string and added to `.env` as `JWT_SECRET=[secret]`.

Note that JWT tokens are designed to **expire over a (typically short) period of time** to mitigate tokens being stolen
(just like how companies usually force you to reset passwords every year). As a result, clients need
to handle the case of JWT tokens expiring. 

### Testing with Authentication

Of course, it would be cumbersome to manually call `/auth/login` every time you want to authenticate,
so you can actually generate a JWT token [here](https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcklkIjoyLCJpYXQiOjE1MTYyMzkwMjJ9.UiDumKsj8gsN4LsbKI5a5K0nqiHVt2BhlzQXuuq29f8).
Replace `userId` with the desired user ID, and `milkroad` with your environment's secret if you have manually
set the `JWT_SECRET` environment variable. Then, use [Postman](https://www.getpostman.com/downloads/)
with the token as shown:

![Postman demonstration](https://i.imgur.com/ZLYL1Fz.png)
