---
# Cine Magic - Cinema Ticket Booking System

Cine Magic is the backend of a web-based Cinema Ticket Booking System, offering robust server-side logic and API support for the frontend application. This backend system is developed using a variety of cutting-edge technologies and tools to ensure a seamless, efficient, and secure experience for both cinema operators and customers.

## Technologies Used

### Backend Framework

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

### Programming Language

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine, ideal for building fast and scalable network applications.
- **TypeScript**: A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

### Database

- **MongoDB**: A NoSQL database designed for high performance, high availability, and easy scalability.
- **Mongoose**: An elegant MongoDB object modeling tool designed to work in an asynchronous environment.

### Authentication

- **JWT (JSON Web Tokens)**: A compact, URL-safe means of representing claims to be transferred between two parties.

### Communication

- **Web Socket**: Enables real-time, bidirectional and event-based communication between the browser and the server.
- **Email Integration**: Using Gmail SMTP for reliable email delivery.
- **Nodemailer**: An easy-to-use module to send emails using Node.js.

### Templating

- **.hbs (Handlebars)**: A simple templating language used for creating email templates.
- **Juice**: Inlines CSS stylesheets for HTML emails to ensure consistent styling.

### Payment Integration

- **PayPal Sandbox**: A test environment that provides a safe space for testing the payment integration without involving real money.

### API & Documentation

- **RestAPIs**: Architectural style for designing networked applications.
- **Swagger**: A tool for documenting APIs in a precise, readable, and user-friendly format.

### Scheduling

- **NodeCron**: A task scheduler in Node.js using full cron syntax for running scheduled jobs.

### Testing

- **Jest**: A delightful JavaScript Testing Framework with a focus on simplicity.

### External APIs

- **OMDB API**: Used for fetching movie data to enrich the application's content.

### Environment Management

- **.env**: A module for loading environment variables from a .env file into `process.env`.

### Logging and Context Management

- **Nest cls**: Contextual logging system for maintaining request-specific data throughout the lifecycle of a request.

### DevOps and CI/CD

- **Docker**: A platform for developing, shipping, and running applications in containers.
- **GitHub Actions**: Automates workflows, CI/CD, testing, and deployment.

### Validation

- **Joi**: A powerful schema description language and data validator for JavaScript.

---

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Getting Started

To get started with the Cine Magic backend on your local machine, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/DFanso/cine-magic-backend.git


2. Navigate to the project directory:

   ```bash
   cd cine-magic-backend

3. Install dependencies:

   ```bash
   npm install

4. Set up environment variables:

  - Create a .env file based on the provided .env.example file.
  - Configure database and other environment variables as needed.

5. Start the development server:

   ```bash
   npm start

6. The backend API will be accessible at http://localhost:3000.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).

## Contact

If you have any questions or need further assistance, please feel free to contact us.
