# The web app is deployed at:
https://cs355sara.herokuapp.com/

# Development guide
## Using Docker
## Installation / Set Up
https://hub.docker.com/editions/community/docker-ce-desktop-windows
https://hub.docker.com/editions/community/docker-ce-desktop-mac

* Once installed, go into the directory of the app using a CLI and build the Docker image (make sure to include the '.' at the end)

```docker build -t sara .```

* To verify, run

```docker images```

## Running the app
* Now, the app and everything else you might need for development can be started with one simple code in the project directory!

```docker-compose up```

## Closing the app 
* The app can be stopped with CTRL + C (Or whatever appropriate command on your OS) then just run the code below to stop the containers

```docker-compose down```

## Jenkins configuration
* Once docker-compose up has finished and Jenkins is up and running, go to `localhost:8080` and you'll be asked for a password
* The password was output into the terminal where you ran `docker-compose up`
* When you're in `install suggested plugins` and when it's finished, create a login and you're done!

* **At the moment, these steps will have to be repeated whenever the containers are removed. Normal docker-compose down will not affect this**

## Heroku CLI Installation:
```https://devcenter.heroku.com/articles/heroku-cli```
## Deploying to Heroku
* After you've made changes, it'll be a good idea to deploy it to heroku.
* To do that, make sure the heroku repo is linked locally:

```heroku git:remote -a cs355sara```

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

# Misc
* scripts and stylesheets are in '/public/' but the link to them in the html files can simply be 
```href="/css/example.css"```
```src="/javascripts/example.js"```


# Deprecated
## Node Installation:
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
