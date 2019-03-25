# The web app is deployed at:
# https://cs355sara.herokuapp.com/

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
To do that,:
```heroku git:remote -a cs355sara```
then add and create a commit then do:
```git push heroku yourbranchnamehere:master```

Make sure you create an account on Heroku and let Jun know so you can be added as a collaborator!


scripts and stylesheets are in '/public/' but the link to them in the html files can simply be 
```href="/css/example.css"```
```src="/javascripts/example.js"```

