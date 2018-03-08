`mango-cli` project example
===========================

A starter project for [mango-cli](https://github.com/manGoweb/mango-cli) devstack.


Init your project
-----------------

Run command `mango init your-project-directory-name`.

Oh, that's it? Go to that directory, run `mango dev` and your browser should start up.


Heroku deployment
-----------------

1. Create a new app: `heroku create`
2. Set config to install devDependencies: `heroku config:set NPM_CONFIG_PRODUCTION=false`
3. Deploy the app: `git push heroku`


Current build preview:
----------------------

https://mango-cli-example.herokuapp.com/
