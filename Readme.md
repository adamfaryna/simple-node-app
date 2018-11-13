# Simple Server/Client with UTP discovery service

Data is loaded to database by BaseMongoConnection.loadData(). This is abstract class, with has 2 implementations: MongoConnection and MemoryMongoConnection (in-memory implementation for test purposes).

## Requirements

Node.js 6.14.4+
Mongodb 3+

-------------------------------------------------------------------------------

## To build

Using yarn

```
yarn install
```

using npm

```
npm install
```

-------------------------------------------------------------------------------

## To run tests

Using yarn

```
yarn test
```

using npm

```
npm test
```

-------------------------------------------------------------------------------

## To start development server

Using yarn

```
yarn run server:dev
```

or

```
yarn run server:dev
```

Using npm

```
npm run server:dev
```

or

```
npm run server:dev
```

-------------------------------------------------------------------------------

## To start production server [PM2](http://pm2.keymetrics.io)

Using yarn

```
yarn run server:prod
```

using npm

```
npm run server:prod
```

-------------------------------------------------------------------------------

## To start development client

Using yarn

```
yarn run client:dev
```

using npm

```
npm run client:dev
```

-------------------------------------------------------------------------------

## To start production client

Using yarn

```
yarn run client:prod
```

using npm

```
npm run client:prod
```

-------------------------------------------------------------------------------

## Enjoy!
