# API Documentation: E-COMMERCE

## **USERS / PRODUCTS**

| Method | Route                 | Description                                               |
| ------ | ----------------------| --------------------------------------------------------- |
| POST   | /users/login          | Log a `User` in                                           |
| GET    | /products/            | Display all available `Product`                           |
| GET    | /products/:id         | Display one `Product` based on its ID                     |
| POST   | /products/            | Create a new `Product`                                    |
| PUT    | /products/:id         | Update all fields/columns of a `Product` based on its ID  |
| DELETE | /products/:id         | Delete a `Product` based on its ID                        |

<br>
============

### **USERS > LOGIN**
Log a `User` in.

* **URL**  `/users/login`
* **METHOD**  `POST`
* **URL PARAMS**  none
* **DATA PARAMS**

```json
  {
    "email": "<user email> required",
    "password": "<user password> required"
  }
```

* **SUCCESS RESPONSE**

    - Code: `200`<br/>
    Content:

    ```json
        {
            "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyMkBlbWFpbC5jb20iLCJpYXQiOjE2MjM4MTcwMTZ9.sU2L6-jUNnftuN5RBAloD7z7zQQLZoByQxKZ4lOpHr0"
        }
    ```

* **ERROR RESPONSE**

    - Code: `401`<br/>
    Content:

    ```json

        {
            "message": "Email/password incorrect"
        }

    ```
    
    - Code: `500`<br/>
    Content:

    ```json

        {
            "message": "Internal server error"
        }

    ```
<br>
============

### **PRODUCTS > DISPLAY ALL PRODUCTS**
Display all `Product` available.

* **URL**  `/product/`
* **METHOD**  `GET`
* **URL PARAMS**  none
* **DATA PARAMS** none

* **SUCCESS RESPONSE**

    - Code: `200`<br/>
    Content:

    ```json
        {
            "products": [
                {
                    "id": 1,
                    "name": "Jeruk",
                    "image_url": "http://www.image.com/1",
                    "price": 1000,
                    "stock": 20,
                    "createdAt": "2021-06-15T10:45:56.955Z",
                    "updatedAt": "2021-06-15T12:46:31.148Z"
                },
                {
                    "id": 2,
                    "name": "Nanas",
                    "image_url": "http://www.image.com/2",
                    "price": 5000,
                    "stock": 26,
                    "createdAt": "2021-06-15T10:45:56.955Z",
                    "updatedAt": "2021-06-15T12:46:31.148Z"
                },
                {
                    "id": 3,
                    "name": "Manggis",
                    "image_url": "http://www.image.com/3",
                    "price": 500,
                    "stock": 19,
                    "createdAt": "2021-06-15T10:45:56.955Z",
                    "updatedAt": "2021-06-15T12:46:31.148Z"
                }
            ]
        }
    ```

* **ERROR RESPONSE**

    - Code: `401`<br/>
    Content:

    ```json

    {
        "error": "JsonWebTokenError" {
            "name": "JsonWebTokenError",
            "message": "jwt malformed"
        }
    }

    ```

    - Code: `500`<br/>
    Content:

    ```json

        {
            "message": "Internal server error"
        }

    ```
<br>
============

### **PRODUCTS > DISPLAY ONE PRODUCT**
Display one `Product` based on its ID  .

* **URL**  `/products/`
* **METHOD**  `GET`
* **URL PARAMS**  Required: `id=[integer]`
* **DATA PARAMS** none

* **SUCCESS RESPONSE**

    - Code: `200`<br/>
    Content:

    ```json
        {
            "product": {
                "id": 1,
                "name": "Jeruk",
                "image_url": "http://www.image.com/1",
                "price": 1000,
                "stock": 20,
                "createdAt": "2021-07-02T07:45:54.583Z",
                "updatedAt": "2021-07-02T07:45:54.583Z"
            }
        }
    ```

* **ERROR RESPONSE**

    - Code: `401`<br/>
    Content:

    ```json

    {
        "error": "JsonWebTokenError" {
            "name": "JsonWebTokenError",
            "message": "jwt malformed"
        }
    }

    ```

    - Code: `404`<br/>
    Content:

    ```json

    { "error": { "name": "Not Found" } }

    ```

    - Code: `500`<br/>
    Content:

    ```json

        {
            "message": "Internal server error"
        }

    ```
<br>
============

### **PRODUCTS > CREATE NEW PRODUCT**
Create a new `Product`.

* **URL**  `/products/`
* **METHOD**  `POST`
* **URL PARAMS**  none
* **DATA PARAMS**

```json
    {
        "name": "Durian",
        "image_url": "http://www.image.com/4",
        "price": 250000,
        "stock": 6,
        "createdAt": "2021-07-02T07:53:00.324Z",
        "updatedAt": "2021-07-02T07:53:00.324Z"
    }
```

* **SUCCESS RESPONSE**

    - Code: `201`<br/>
    Content:

    ```json
        {
            "task": {
                "id": 41,
                "name": "Durian",
                "image_url": "http://www.image.com/4",
                "price": 250000,
                "stock": 6,
                "createdAt": "2021-07-02T07:53:00.324Z",
                "updatedAt": "2021-07-02T07:53:00.324Z"
            }
        }
    ```

* **ERROR RESPONSE**

    - Code: `401`<br/>
    Content:

    ```json

        {
            "error": "JsonWebTokenError" {
                "name": "JsonWebTokenError",
                "message": "jwt malformed"
            }
        }

    ```

    - Code: `400`<br/>
    Content:

    ```json

        {
            "errors": [
                "ValidationErrorItem" {
                "message": "Product name cannot be empty",
                "type": "Validation error",
                "path": "name",
                "value": "",
                "origin": "FUNCTION",
                "instance": "[Product]",
                "validatorKey": "notEmpty",
                "validatorName": "notEmpty",
                "validatorArgs": "[Array]",
                "original": "[Error]"
        }

    ```

    - Code: `500`<br/>
    Content:

    ```json

        {
            "message": "Internal server error"
        }

    ```
<br>
============

### **PRODUCTS > EDIT ALL COLUMNS OF A PRODUCT**
Update all fields/columns of a `Task` based on its ID.

* **URL**  `/products/`
* **METHOD**  `PUT`
* **URL PARAMS** Required: `id=[integer]`
* **DATA PARAMS**

    ```json
        {
            "name": "Rambutan",
            "image_url": "http://www.image.com/1",
            "price": 18900,
            "stock": 24
        }
    ```

* **SUCCESS RESPONSE**

    - Code: `200`<br/>
    Content:

    ```json
        {
            "product": "Product with ID 1 has been updated",
            "updated_product": [
                {
                    "id": 1,
                    "name": "Rambutan",
                    "image_url": "http://www.image.com/1",
                    "price": 18900,
                    "stock": 24,
                    "createdAt": "2021-07-02T08:02:55.762Z",
                    "updatedAt": "2021-07-02T08:02:55.826Z"
                }
            ]
        }
    ```

* **ERROR RESPONSE**

    - Code: `401`<br/>
    Content:

    ```json

        {
            "error": "JsonWebTokenError" {
                "name": "JsonWebTokenError",
                "message": "jwt malformed"
            }
        }

    ```

    - Code: `404`<br/>
    Content:

    ```json

        { "error": { "name": "Not Found" } }

    ```

    - Code: `500`<br/>
    Content:

    ```json

        {
            "message": "Internal server error"
        }

    ```
<br>
============

### **PRODUCTS > DELETE A PRODUCT**
Delete a `Product` based on its ID.

* **URL**  `/products/`
* **METHOD**  `DELETE`
* **URL PARAMS** Required: `id=[integer]`
* **DATA PARAMS** none

* **SUCCESS RESPONSE**

    - Code: `200`<br/>
    Content:

    ```json
        {
            "success": "Product with ID 1 has been deleted"
        }
    ```

* **ERROR RESPONSE**

    - Code: `401`<br/>
    Content:

    ```json

        {
            "error": "JsonWebTokenError" {
                "name": "JsonWebTokenError",
                "message": "jwt malformed"
            }
        }

    ```

    - Code: `404`<br/>
    Content:

    ```json

        { "error": { "name": "Not Found" } }

    ```

    - Code: `500`<br/>
    Content:

    ```json

        {
            "message": "Internal server error"
        }

    ```
<br>
============
