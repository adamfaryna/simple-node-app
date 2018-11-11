# Simple Node.js app

Data is loaded to database by BaseMongoConnection.loadData(). This is abstract class, with has 2 implementations: MongoConnection and MemoryMongoConnection (in-memory implementation for test purposes).

## To build

Using yarn

```
yarn install
```

using npm

```
npm install
```

## To run tests

Using yarn

```
yarn test
```

using npm

```
npm test
```

## To start development server

Using yarn

```
yarn run dev
```

or

```
yarn start
```

Using npm

```npm run dev```

or

```npm start```

## To start production server [PM2](http://pm2.keymetrics.io)

Using yarn

```
yarn run prod
```

using npm

```
npm run prod
```

## To call API

```
curl -G http://localhost:3000/api/net
```

## Enjoy!