<h3 align="center">
    <img alt="Logo" title="#logo" width="500px" src="/assets/Magneto.jpeg">
    <br>
</h3>

# Mutant Recruiter

- [Purpose](#purpose)
- [Technologies](#techs)
- [Requirements](#reqs)
- [Architecture](#architecture)
- [Directories](#directories)
- [Local Configuration](#localconfig)
- [Testing](#testing)
- [Postman Doc](#postman)
- [Possible improvements](#improvements)

<a id="purpose"></a>
## Purpose

This system was created to make mutant recruitment easier. With it, you will be able to send DNA Sequences, and discover whether or not they belong to mutants.
It is also possible to fetch Statistics to check how many mutants were already found.

<a id="techs"></a>
## Technologies Used

- [NodeJS](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Tsyringe](https://github.com/microsoft/tsyringe) to manage dependency injection
- [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/) to connect and manage DB
- [Supertest](https://www.npmjs.com/package/supertest) and [Jest](https://jestjs.io/) for testing
- [Express](https://expressjs.com/) as Micro web framework
- [Docker](https://www.docker.com/) as container manager

<a id="reqs"></a>
## Requirements
- To run the application itself, Docker and docker-compose is all you need, all the dependecies with be loaded into the container.

<a id="architecture"></a>
## Architecture and technical Decisions

### MongoDB
- Given the possibility of having aggressive flow inside the **stats** api, I decided to use **MongoDB**, mainly due to its ease to scale horizontaly really quickly, if needed. We also don't have many complex relationships between different entities, making the use of **NoSQL** even better.

### Dna Analysis
- Since the analysis algorithms are not simple, I decided to **divide to conquer**. You will notice that there are different classes for different **search strategies**. My intention was to keep the code as understandable, and as maintainable as possible.

### Layer isolation
- I tried to isolate as much as possible the infrastructure from the **domain**, this way if we need to change the technologies on the edges, it will be way easier, without affecting the business logic itself.

<a id="directories"></a>
## Directories

```
Project
├── src
│   ├── domain: Domain of application, contains services with business rules, domain objects, and DTO to communicate with outside.
│   ├── dtos: Domain of application, contains services with business rules, domain objects, and DTO to communicate with outside.
│      ├── dtos: Communication objects between layers
│      ├── searchers: DNA search engines.     
│      ├── services: Core business rules
│   ├── infra: Database and http files
│      ├── database: Database configuration files and repositories
│      ├── http: Controllers, routes and middlewares (validation)
│   ├── shared: Shared files between layers.
│   ├── server.ts: Main app file.  

```
<a id="localconfig"></a>
## Local Configuration

- After cloning the project, installing docker and docker-compose, enter in the project root and run the following commands:
```sh
  ## Run docker-compose to start containers. It will start database, database-interface and the application server.
  $ docker-compose up --build
```
- By default application will be started at port 3333, but you can change it in .env file.
- Mongo-express (DB UI) will be loaded at port 8081. You will be able to manage several aspects of your mongo database with it.
- You can also use another Mongo SGBD, default Mongo URL is located in .env file.

<a id="testing"></a>
### Testing
- Unit and integrations tests, shall be ran in a separate container. Run the following commands to access it:
```sh
  ## During the first time, it will take longer than normal because container will download dependencies
  $ docker-compose -f docker-compose.test.yml up --build
```
- After the test finishes a folder called COVERAGE will be generated in project root.
- Open coverage/lcov-report/index.html file to check coverage visually.

<a id="postman"></a>
## Postman Documentation

I have prepared a postman documentation, in which you will be able to check in details each endpoint and possible Requests and responses.

Please access it by link below:

https://documenter.getpostman.com/view/4694407/UVRHh3KU

<a id="improvements"></a>
## Possible Improvements

A system is never perfect and there is always room for improvement. Here are some points that I would like to enhance if I had more time:

- Enhance a little bit more the Clean Code inside the project. 
- If the access to the API gets too intense, maybe a **Cache** layer could be helpful.

## Support

* If you have any query or doubt, please, feel free to contact me by e-mail.

