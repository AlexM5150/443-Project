# cecs443-project

Authors: Dylan Huynh, Deric Chen, Alex Melford, Dening Zhang, David Aphing Kouassi, Carlos Alberto Thomas Frangeard

install docker: https://docs.docker.com/get-docker/
install postman: https://www.postman.com/downloads/
  
.env example
```py
apps/api    .env
PORT=8080

DB_NAME='cecs443'
DB_URL='mongodb://localhost:27017'
DB_USER='user'
DB_PASSWORD='password'

JWT_KEY=00dtJhGDtu14YaXLuAzbqt+HdlFeUt5eYiyCYkm/LAxKrCmZyRVcIwXHMzIZIYy6
ENCRYPTION_KEY=110155b4eb4821d394b9daa0954861a534d3f61724a8da7281976044dddda82b
IV_KEY=65dcc4b5e53cc29d7b61d8e689438c98

apps/web    .env
REACT_APP_SERVER_URL='http://localhost:8080'

.env (outside of apps folder)
MONGO_INITDB_ROOT_USERNAME='user'
MONGO_INITDB_ROOT_PASSWORD='password'

ME_CONFIG_MONGODB_URL='mongodb://user:password@mongo:27017'
```

To launch the project (at root):

```
npm install
npm run web (to run client side application)
npm run api (to run server side application)
docker-compose up -d (to run the docker-compose for the database)
```
