# WELCOME TO MY FIRST GITHUB REPOSITORY

This is a basic CRUD representation, but i has implemented an JWT to authentication and authorization.

The first endpoint is 
- CREATE

POST /api/user/register HTTP/1.1

Content-Type: application/json

{"name": "Jhon Jhonny", "username": "jhonys0001", "email": "example@example.com","password": "12345"}

using MongoDB and Mongoose library to store credentials setting a id from function gen_id() in src/routes/middlewares/utils.js.

The second endpoint is
- READ

POST /api/user/login HTTP/1.1
Content-Type: application/json

{"username": "jhonys0001","password": "12345"}, 

using MongoDB and Mongoose library to check credentials existence and validate.
Before validate credentials, the jsonwebtoken module generate an JWT.
The userController module verify the token to authorize user action through application, denying access if not token or invalid. 

The third endpoint is
- READ
GET /api/user/info HTTP/1.1
Content-Type: application/json
Authorization: Bearer {TOKEN}

Find user data and return them

The fourth endpoint is
- UPDATE

PUT /api/user/update HTTP/1.1

Content-Type: application/json
Authorization: Bearer {TOKEN}

{"name": "Jhon Jhonny", "username": "jhonys0001", "email": "example@example.com","password": "12345"}

The fifth and last endpoint is

DELETE /api/user/delete HTTP/1.1
Content-Type: application/json
Authorization: Bearer {TOKEN}

Delete / Exclude profile

