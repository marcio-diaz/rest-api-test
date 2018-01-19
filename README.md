## User API Test

### Context

RESTful API that can `get/create/update/delete` user data from a persistence database

### User Model

All fields are required except for the creation date.
The name field works as user id, it should be unique.

```
{
    "name": "Marcio",                // user name
    "date_of_birth": "1900-10-02",   // date of birth
    "address": "cosenza 1986",       // user address
    "description": "Mi descripcion", // user description
    "createdAt": ""                  // user created date
}
```

#### Dependencies:
- Node.js
- MongoDB

#### Start Server:
```shell
npm start
```

#### Test
```shell
npm test
```

#### API

| Method | URI                     | Description          |
| :----: | :---------------------- | :--------------------|
|  GET   | /users                  | Get list of users.   |
|  GET   | /users/:name            | Get user by name.    |
|  POST  | /users                  | Create a new user.   |
|  PUT   | /users/:name            | Update an user.      |
| DELETE | /users/:name            | Delete user by name. |
