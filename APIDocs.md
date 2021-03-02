# FANCY TODO APPS

## API Documentations

This app has:
1. RESTful endpoints 
2. CRUD operation
2. JSON formatted sessions

This app has dependency:
1. Express JS Framework
2. PostgreSQL
3. Sequelize ORM
4. JSON Web Tokens JS
5. Bcrypt JS

EndPonints list:
1. GET /todos
2. POST /todos
3. GET /todos/:id
4. PUT /todos/:id
5. PATCH /todos/:id
6. DELETE /todos/:id
7. POST /login
8. POST /register

## RESTful Endpoints
### GET /todos
Get all Todo list

- Request Header
```JSON
    {
        "access_token": "<your access token>"        
    }
```

- Request body
```JSON
    not needed
```

- Response (200) Ok
```JSON
    [
        {
            "id": 1,
            "title": "menggambar web",
            "description": "melakukan desain front end",
            "status": "available",
            "due_date": "2021-03-07",
            "createdAt": "2021-03-01T07:15:12.149Z",
            "updatedAt": "2021-03-01T07:15:12.149Z",
        },
        {
            "id": 2,
            "title": "membuat backend",
            "description": "melakukan desain back end",
            "status": "available",
            "due_date": "2021-03-06",
            "createdAt": "2021-03-01T07:15:12.149Z",
            "updatedAt": "2021-03-01T07:15:12.149Z",
        }
    ]
```

### POST /todos
Submit new Todo list

- Request Header
```JSON
    {
        "access_token": "<your access token>"        
    }
```

- Request body
```JSON
    {
        "title": "membuat REST API",
        "description": "melakukan desain REST API",
        "status": "available",
        "due_date": "2021-03-02",
    }
```

- Response (201) Created
```JSON
    {
        "id": 3,
        "title": "membuat REST API",
        "description": "melakukan desain REST API",
        "status": "available",
        "due_date": "2021-03-02",
        "createdAt": "2021-03-01T07:15:12.149Z",
        "updatedAt": "2021-03-01T07:15:12.149Z",
    }
```

- Response (400) Bad Request
``` JSON
    [
        {
            "message": "Title wajib diisi"
        },
        {
            "message": "Description wajib diisi"
        },
        {
            "message": "Due date wajib diisi"
        },
    ]
```

### GET /todos/:id
Show data Todo to update the data

- Request Header
```JSON
    {
        "access_token": "<your access token>"        
    }
```

- Request body
```JSON
    not needed
```

- Response (200) Ok
```JSON
    {
        "id": 1
        "title": "<title todo>",
        "description": "<description todo>",
        "status": "available",
        "due_date": "<date>",
    }
```

- Response (404) Not Found
``` JSON
    [
        {
            "message": "Todo tidak ditemukan"
        }
    ]
```

### PUT /todos/:id
Edit all data Todo 

- Request Header
```JSON
    {
        "access_token": "<your access token>"        
    }
```

- Request body
```JSON
    {
        "title": "menggambar Front End",
        "description": "melakukan desain front end",
        "status": "available",
        "due_date": "2021-03-07",
    },
```

- Response (200) Ok
```JSON
    {
        "id": 1,
        "title": "menggambar Front End",
        "description": "melakukan desain front end",
        "status": "available",
        "due_date": "2021-03-07",
        "createdAt": "2021-03-02T07:15:12.149Z",
        "updatedAt": "2021-03-02T07:15:12.149Z",
    },
```

- Response (400) Bad Request
``` JSON
    [
        {
            "message": "Title wajib diisi"
        },
        {
            "message": "Description wajib diisi"
        },
        {
            "message": "Due date wajib diisi"
        },
    ]
```

- Response (404) Not Found
``` JSON
    [
        {
            "message": "Todo tidak ditemukan"
        }
    ]
```

### PATCH /todos/:id
Changes some data Todo

- Request Header
```JSON
    {
        "access_token": "<your access token>"        
    }
```

- Request body
```JSON
    {
        "status": "closed",
    },
```

- Response (200)
```JSON
    {
        "id": 1,
        "title": "menggambar Front End",
        "description": "melakukan desain front end",
        "status": "closed",
        "due_date": "2021-03-07",
        "createdAt": "2021-03-02T07:15:12.149Z",
        "updatedAt": "2021-03-02T07:15:12.149Z",
    },
```

- Response (400) Bad Request
``` JSON
    [
        {
            "message": "Title wajib diisi"
        },
        {
            "message": "Description wajib diisi"
        },
        {
            "message": "Due date wajib diisi"
        },
    ]
```

- Response (404) Not Found
``` JSON
    [
        {
            "message": "Todo tidak ditemukan"
        }
    ]
```

### DELETE /todos/:id
Changes some data Todo

- Request Header
```JSON
    {
        "access_token": "<your access token>"        
    }
```

- Request body
```JSON
    not needed
```

- Response (200)
```JSON
    {
        "message": "todo success to delete"
    },
```

- Response (404) Not Found
``` JSON
    [
        {
            "message": "Todo tidak ditemukan"
        }
    ]
```

### POST /login
Submit form login

- Request Header
```JSON
    not needed        
```

- Request body
```JSON
    {
        "email": "email",
        "password": "password",
    }
```

- Response (200) Ok
```JSON
    {
        "access_token": "<your access token>"
    }
```

- Response (400) Bad Request
``` JSON
    [
        {
            "message": "Invalid Username / Password"
        },
    ]
```

### POST /register
Submit form login

- Request Header
```JSON
    not needed        
```

- Request body
```JSON
    {
        "email": "email",
        "password": "password",
    }
```

- Response (201) Created
```JSON
    {
        "email": "email",
        "password": "password",
    }
```

- Response (400) Bad Request
``` JSON
    [
        {
            "message": "Username dan Password wajib diisi"
        },
    ]
```


## Global Response

- Response (500) Internal server Error
``` JSON
    {
        "message": "Internal Server Error"
    }
```