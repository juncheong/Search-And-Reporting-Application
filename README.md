# The web app is deployed at
https://maccabeam.herokuapp.com/

# Developers
* Jun Cheong     -  Backend & DevOps
* Rachel Hirmes  -  Frontend
* Daniel Rand    -  Frontend

# Getting started
## Using Docker
## Installation
https://hub.docker.com/editions/community/docker-ce-desktop-windows
https://hub.docker.com/editions/community/docker-ce-desktop-mac

## Running the app
* Now, the app and everything else you might need for development can be started with one simple command line code in the project directory!

```docker-compose up```

## Closing the app 
* The app can be stopped with CTRL + C (Or whatever appropriate command on your OS) then just run the code below to stop and remove the other containers if desired

```docker-compose down```

## Jenkins configuration (Not in use yet. Refer to Heroku instructions below)
* Once docker-compose up has finished and Jenkins is up and running, go to `localhost:8080` and you'll be asked for a password
* The password was output into the terminal where you ran `docker-compose up`
* When you're in `install suggested plugins` and when it's finished, create a login and you're done!

* **At the moment, these steps above for Jenkins will have to be repeated whenever the images are rebuilt. Normal docker-compose down will not affect this**

## Heroku CLI Installation:
```https://devcenter.heroku.com/articles/heroku-cli```
## Deploying to Heroku
* After you've made changes, it'll be a good idea to deploy it to heroku.
* To do that, make sure the heroku repo is linked locally:

```heroku git:remote -a maccabeam```

* then you can create a commit and deploy to heroku using this command:

```git push heroku yourbranchnamehere:master```

* Make sure you create an account on Heroku and let Jun know so you can be added as a collaborator!

* The app can be opened via the URL or by typing this into the CLI:

```heroku open```

## Accessing the MySQL database running locally
* Accessing the running MySQL container is simple if you have the MySQL workbench.
* Simply open workbench and create a new connection with these credentials (which can also be found in the docker-compose.yml file)

```
Host name: 127.0.0.1
port: 3308
username: root
password: password
```

# Misc development info
## Accessing scripts and stylesheets
* scripts and stylesheets are in '/public/' but the link to them in the html files can simply be 
```href="/css/example.css"```
```src="/javascripts/example.js"```

## HTTP requests
* GET /api/pageWord/:searchWord/:partialMatch/:caseInsensitive

Displays all indexed pages & words
Replace the ':searchWord' ':partialMatch' ':caseInsensitive' in the url with the appropriate values

```ex: /api/pageWord/testword/true/false```

* GET /api/search 

Gets all searches

* POST /api/search

Send a JSON object in the body with these fields

```terms```
```count```
```searchDate```
```timeToSearch```

Note that searchDate is a timestamp in MySQL so you should create a new Date() and pass that
Note that timeToSearch is an int in MySQL meaning that it's in milliseconds. You should record start time & end time and pass the difference 


* POST /api/indexing (crawling)

Send a JSON object in the body with this one field

```url```

## Database Schemas
### Page table columns
```url, description, title, lastModified, lastIndexed```
### Word table columns
```word```

## Production environment variables
* Environment variables used for production should NEVER be committed.
* Many of these are specified in Heroku under `config vars`

# Deprecated

## Node Installation
```https://nodejs.org/en/download/```

## Starting app with nodemon
* The app can be started locally with nodemon (to immediately view changes) by going to the app directory and typing into a CLI

```nodemon app.js```

* This will make the app live at localhost:3000 and nodemon will immediately make **most** edits available with a refresh
* Somethings might require you to restart the server

## Starting a Docker container
```docker run -p 3000:3000 -d sara```

## Stopping a Docker running container
```
docker ps
docker stop <CONTAINER ID or NAME of the container here>
```

Alternatively, one can stop all running containers with this command

```docker stop $(docker ps -a -q)```


## Migrating and seeding the database

* Make sure knex is installed globally with
```npm install knex --global```

* Then in the directory of the app, type the following into a CLI while the MySQL container is running
```knex migrate:latest```
```knex seed:run```

* Migrations can be undone with
```knex migrate:rollback```
