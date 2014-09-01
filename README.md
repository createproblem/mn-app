Movie Nightmare
===============

Movie Nightmare is a playground for MEAN application.

Requirements
------------

* [Nodejs][1]
* [MongoDB][2]

Development
-----------

Install grunt and bower
```
npm install -g grunt-cli bower
```

Install dependencies
```
npm install
bower install
```

Generate all necessary config files
```
grunt config
```

Edit the file `config/config.env.json` for your needs
```json
{
  "add": {
    "NODE_ENV": "development",
    "DATABASE_DSN": "mongodb://localhost:27017/my-db",
    "GITHUB_CLIENT_ID": "my-client-id",
    "GITHUB_CLIENT_SECRET": "my-client-secret",
    "API_TMDB_API_KEY": "my-api-key"
  }
}
```

Start the application with
```
grunt
```

[1]: http://nodejs.org/
[2]: http://mongodb.org/
