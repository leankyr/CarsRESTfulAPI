# CarsRESTfulAPI
This is the backend and a db for a web app that keeps track of cars and their drivers. The backend is written in Node and for the database I used PostgreSQL.

To build the node image use:

` docker build -t leankyr/node-app .`

To launch the whole app use:

` docker compose up `

This command will pull the oficial PostgreSQL image and create the database CarsDB. 
Then migrations will run two tables will be created and the database will be ready for use.
A persistent volume is also used so that if you restart the app you will not lose your data.

Next I offer a [Postman collection](https://www.getpostman.com/collections/6ab539b1cd95f9a3353f) of the API endpoints.  
Import it and you should be good to go.
 


