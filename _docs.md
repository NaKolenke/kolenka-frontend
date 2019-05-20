## API

##### `/api`

### Authentication

##### POST `/users/login`

Request:
```json
{
  "username": <string>,
  "password": <string>
}
```

Response:
```json
{
  "access_token": {
    "token": <string>,
    "valid_until": <number:datetime>
  },
  "refresh_token": {
    "token": <string>,
    "valid_until": <number:datetime>
  },
  "success": 1
}
```

##### POST `/users/register`

Request:
```json
{
  "username": <string>,
  "email": <string>,
  "name": <string>,
  "password": <string>
}
```

### Token

##### `/tokens/validate`

##### `/tokens/refresh`

### Users

##### GET `/users/self/`

**headers**

  - Authorization: `string:token`

Response:
```json
{  
  "success": 1,
  "user": {  
    "about": <string:html>,
    "avatar": {  
      "id": <number>,
      "path": <string:url>,
      "user": <number>
    },
    "birthday": <string:date>,
    "email": <string>,
    "id": <number>,
    "is_admin": <boolean>,
    "last_active_date": <number:datetime>,
    "name": <string>,
    "registration_date": <number:datetime>,
    "username": <string>
  }
}
```

##### POST `/users/self/`

**headers**

  - Authorization: `string:token`

Request:
```json
{
  "username": <string>,
  "email": <string>,
  "name": <string>,
  "password": <string>
}
```

Response:
```
<object:user>
```

##### POST `/users/self/`

**headers**

  - Authorization: `string:token`

Request:
```json
{
  "avatar": <number:id>
}
```

Response:
```
<object:user>
```

##### GET `/users/`

**params**

  - page: `number`

Response:
```json
{  
  "meta":{  
    "page_count": <number>
  },
  "success": 1,
  "users": [
    <object:user>,
    ...
  ]
}
```

##### GET `/users/<username>/`

Response:
```json

```

### Blogs

##### GET `/blogs/`

**params**

  - page: `number`

Response:
```json
{
  "blogs":[
    {  
      "blog_type": <number>,
      "created_date": <number:datetime>,
      "creator": <object:user>,
      "description": <string>,
      "id": <number>,
      "image": <string/null>,
      "readers": <number>,
      "title": <string>,
      "updated_date": <number:datetime>,
      "url": <string>
    },
    ...
  ],
  "meta": {  
    "page_count": <number>
  },
  "success": 1
}
```