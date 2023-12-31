# Boilerplate-Typescript-Node-Express-Postgres
This application uses node and postgres images to spin up the containers and set up the database connection.

# Features
- Postgres repository to interact with the DB.
- Generic database service which can adapt any kind of DB i-e Mongo,Postgres, etc
- Integration tests, unit tests, db connection already setup
- Separation of concerns between, controllers, services, and repositories
- Easy to extend the existing functionality
- API documentation using swagger

# How To Start?
1) open terminal at the root of this project directory
2) Run docker-compose build
3) Run docker-compose up

# Main Features
- Generic database service which can be used for any type of database mongo, postgres, etc
- Separate domain logic from infra
- Decoration and Injection of services using type-di package
- Unit and integration tests already setup
- API documentation 
