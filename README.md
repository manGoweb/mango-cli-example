# Mango-cli project example

A starter project for [mango-cli](https://github.com/manGoweb/mango-cli) devstack.

## Prerequisite

1. [Node.js](https://nodejs.org)
2. [Mango-cli](https://github.com/manGoweb/mango-cli) (`npm install -g mango-cli`)

### Mango-cli-example specific

- `npm install`

## Development

- `npm start`

## Production build

- `npm run build`

## Heroku deployment

1. Create a new app: `heroku create`
2. Set config to install devDependencies: `heroku config:set NPM_CONFIG_PRODUCTION=false`
3. Deploy the app: `git push heroku`

## Current build preview

https://mango-cli-example.herokuapp.com/
