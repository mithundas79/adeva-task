# ADEVA TEST - REST API

## Overview

This is A Test Api based on the docs provided by Adeva.

## Getting Started

### Development Environment

#### System Requirement

* Node version >=8.15.0
* NPM version >=6.4.1
* Yarn version >=1.13.0
* Mongodb version >=4.0.1 (Please change **env/development.js** - Not required if using docker)

#### Clone the repo: 
```sh 
git clone git@github.com:mithundas79/adeva-task.git && cd adeva-task 
```

#### Install dependencies:
```sh
yarn
```

#### Start server:
```sh
# Start server
yarn start

# Selectively set DEBUG env var to get logs
DEBUG=adeva-task:* yarn start
```
Refer [debug](https://www.npmjs.com/package/debug) to know how to selectively turn on logs.

#### Test

```sh
# Run tests written in ES6 
yarn test

# Run test along with code coverage
yarn test:coverage

# Run tests on file change
yarn test:watch

# Run tests enforcing code coverage (configured via .istanbul.yml)
yarn test:check-coverage
```

#### Lint:
```sh
# Lint code with ESLint
yarn lint

# Run lint on any file change
yarn lint:watch

# Run lint on any file change and try to fix problems
yarn lint:fix
```

#### Other gulp tasks:
```sh
# Wipe out dist and coverage directory
gulp clean

# Default task: Wipes out dist and coverage directory. Compiles using babel.
gulp
```

### Production Environment

For Production Environment you can use Docker or YARN method as written below

#### Docker

##### System Requirement
Get your docker from https://www.docker.com/products/docker-engine
Choose your version, you can find installation instruction for each versions

* Windows Installation - https://docs.docker.com/docker-for-windows/install/
* IOS Installation - https://docs.docker.com/docker-for-mac/install/
* Ubuntu Installation - https://docs.docker.com/install/linux/docker-ce/ubuntu/

We will need following

* Docker Engine Community Client
* Docker Engine Community Server


##### Clone the repo: 
```sh 
git clone git@github.com:mithundas79/adeva-task.git && cd adeva-task 
```


##### Docker details

* Dockerfile -> We are starting docker virtual server by instructions in Dockerfile 
* Dockerfile script installs everything about our project
    * Installs the latest version of Node which is 11
    * Creates /usr/src/app directories
    * Copies local package.json file to remote docker virtual instance into /usr/src/app directory
    * Installs node modules with npm package manager
    * Copies local project directories and files into remote project directory /usr/src/app
    * Exposes remote instance port as 3000
    * Starts project with npm start
* docker-compose.yaml
    * Docker-compose configures our application's services and runs multiple containers in as a single service. 
    * In our project, we have nodejs project and mongodb so docker-compose links these service each other. 


##### Start Server 
The steps assumes you have installed docker successfully

```sh 
docker-compose up 
``` 

#### YARN

```sh
# compile to ES5
1. yarn build

# upload dist/ to your server
2. scp -rp dist/ user@dest:/path

# install production dependencies only
3. yarn --production

# Use any process manager to start your services
4. pm2 start dist/index.js
```

### API logging
Logs detailed info about each api request to console during development.


### Error logging
Logs stacktrace of error to console along with other details. 
