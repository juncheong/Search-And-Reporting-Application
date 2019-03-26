# The web app is deployed at:
https://cs355sara.herokuapp.com/

## Heroku CLI Installation:
```https://devcenter.heroku.com/articles/heroku-cli```

## Node Installation:
```https://nodejs.org/en/download/```

### Development guide
The app can be started locally with nodemon (to immediately view changes) by going to the app directory and typing into a CLI

```nodemon app.js```

This will make the app live at localhost:3000 and nodemon will immediately make **most** edits available with a refresh
Somethings might require you to restart the server

#### Deploying to Heroku
After you've made changes, it'll be a good idea to deploy it to heroku.
To do that, make sure the heroku repo is linked locally:

```heroku git:remote -a cs355sara```

then you can create a commit and deploy to heroku using this command:

```git push heroku yourbranchnamehere:master```

Make sure you create an account on Heroku and let Jun know so you can be added as a collaborator!

The app can be opened via the URL or by typing this into the CLI:

```heroku open```

#### Misc
scripts and stylesheets are in '/public/' but the link to them in the html files can simply be 
```href="/css/example.css"```
```src="/javascripts/example.js"```

## Using Docker

### Installation / Set Up

https://hub.docker.com/editions/community/docker-ce-desktop-windows
https://hub.docker.com/editions/community/docker-ce-desktop-mac


Once installed, go into the directory of the app using a CLI and build the Docker image (make sure to include the '.' at the end)

```docker build -t sara .```

To verify, run

```docker images```

### Starting a container

```docker run -p 3000:3000 -d sara```

### Stopping the running container

```
docker ps
docker stop <CONTAINER ID or NAME of the container here>
```

Alternatively, one can stop all running containers with this command

```docker stop $(docker ps -a -q)```