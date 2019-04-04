# ADEVA REST API DOCKER INSTRUCTIONS

## System Requirement
* Docker Engine Community Client
* Docker Engine Community Server
* https://www.docker.com/products/docker-desktop


## Getting Started 
* Open the project directory /adeva-task
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


# Start Server 
* Use "docker-compose up" comment to clone & install related docker repos from dockerhub 


