# cecs443-project

Authors: Dylan Huynh, Deric Chen, Alex Melford, Dening Zhang, David Aphing Kouassi, Carlos Alberto Thomas Frangeard

--api .env
PORT=8080

DB_NAME=cecs443
DB_URL=mongodb://localhost:27017
DB_USER=user
DB_PASSWORD=password

JWT_KEY=a_random_jwt_key
ENCRYPTION_KEY=a_random_encryption_key
IV_KEY=a_random_iv_key

--web .env
REACT_APP_SERVER_URL=http://localhost:8080

--docker .env 
MONGO_INITDB_ROOT_USERNAME=user
MONGO_INITDB_ROOT_PASSWORD=password

ME_CONFIG_MONGODB_URL='mongodb://user:password@mongo:27017'
