# **Football Project**
This is the *Back-end* portion of the **football web application**.

--------------------------

## Authors:
1. Miguel Vivanco
1. Cristian Plascencia
1. Erick Bardo
1. Héctor Soto

---------------------------

## Endpoints:

<table>
    <tr>
        <th>Interaction</th>
        <th>Endpoint</th>
        <th>HTTP Method</th>
    </tr>
    <tr>
        <td>Sign Up</td>
        <td>/api/user</td>
        <td>POST</td>
    </tr>
    <tr>
        <td>Log In</td>
        <td>/api/user/login</td>
        <td>POST</td>
    </tr>
    <tr>
        <td>Get Teams</td>
        <td>/api/teams</td>
        <td>GET</td>
    </tr>
    <tr>
        <td>Get Team</td>
        <td>/api/teams/:id</td>
        <td>GET</td>
    </tr>
    <tr>
        <td>Get Image</td>
        <td>/api/teams/logo/:img</td>
        <td>GET</td>
    </tr>
    <tr>
        <td>Edit Team</td>
        <td>/api/teams/:id</td>
        <td>PUT</td>
    </tr>
</table>

-------------------------------

## Request formats:

### Sign up

```json
"signUp": {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "password": "string",
    "validatePassword": "string"
}
```
#### Validator schema

```js
{
  description: 'Validation for new sign up',
  properties: {
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
    },
    validatePassword: {
      type: 'string',
    },
  },
  additionalProperties: false,
  required: [
    'firstName',
    'lastName',
    'email',
    'password',
    'validatePassword',
  ],
}
```

### Log in

```json
"login": {
    "email": "string",
    "password": "string"
}
```
#### Validator schema
```js
{
  description: 'Validation for login',
  properties: {
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
  additionalProperties: false,
  required: [
    'email',
    'password',
  ],
}
```

### Edit team

```json
"editTeam": {
    "logo": "string",
    "name": "string",
    "location": "string",
    "stadium": "string",
    "position": "number",
    "points": "number",
    "games_played": "number",
    "games_won": "number",
    "games_tied": "number",
    "games_lost": "number",
    "goals_in_favor": "number",
    "goals_against": "number",
    "goal_difference": "number"
}
```

#### Validator schema
```js
```

--------------------------

## Responses format:

### Generic successful response

```json
{
    "status": "success",
    "message": "",
    "data": [] | {}
}
```

### Generic error response

```json
{
    "status": "failure",
    "message": "",
    "data": [] | {}
}
```

+ The message field in the response contains an informative message that describes the interaction of the successful or error response.
+ The data field in the response contains the result obtained of the request. It's all information requested and presented in an object type.