# JSON Server + JsonWebToken & Cookies Authentication

A Fake REST API for test a login page using json-server with JWT or JsonWebToken and Cookies authentication

## Install

```bash
$ npm install
$ npm start
```

```
$ yarn install
$ yarn start
```

### Generate mook data

```
$ node generatedata.js > db.json
```

## Database Structure

```
{
  "users": [
    {
      "id": 1,
      "username": "bruno",
      "email": "bruno@email.com",
      "password": "bruno"
    }
  ]
}
```

## Routes

### Login

```
POST    http://localhost:3002/auth/login
```

and send request along with body

```
{
	"username": "bruno",
	"password": "bruno"
}
```

PS. You can use `username` or `email` what ever you want.

When You make login request you will get message `login successful` and Cookies `access_token: JWT_SiGN`.
You can use JWT verify and use in your backend with req.cookies.acces_token.
To learn more about [JWT click](https://github.com/auth0/node-jsonwebtoken)

### Register

```
POST http://localhost:3002/auth/register
```

send request along with

````
{
      "username": "bruno",
      "email": "bruno@email.com",
      "password": "bruno"
}
````
this will create user automatically in db.json
