# API Documentation: E-COMMERCE

## **USERS | PRODUCTS | CARTS**

| Method | Route                 | Description                                               |
| ------ | ----------------------| --------------------------------------------------------- |
| POST   | /users/register       | Register a `User`                                         |
| POST   | /users/login          | Log a `User` in                                           |
| GET    | /products/            | Display all available `Product`                           |
| GET    | /products/:id         | Display one `Product` based on its ID                     |
| POST   | /products/            | Create a new `Product`                                    |
| PUT    | /products/:id         | Update all fields/columns of a `Product` based on its ID  |
| DELETE | /products/:id         | Delete a `Product` based on its ID                        |
| POST   | /cart/:productId      | Add a `Product` to a `Cart`                               |
| GET    | /cart                 | Display all `Cart`                                        |
| PATCH  | /cart/:cartId         | Edit the quantity in a `Cart` based on its ID             |
| DELETE | /cart/:cartId         | Delete a `Cart` based on its ID                           |

<br>
============

### **USERS > REGISTER**
Register a `User`.

* **URL**  `/users/register`
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
            "message": "User user4@email.com has been registered!",
            "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJ1c2VyNEBlbWFpbC5jb20iLCJpYXQiOjE2MjYyNzQ3OTd9.xthX2Osaom_47RC4PEKMVacOpF0BQe-hj5jr2m4McPM"
        }
    ```

* **ERROR RESPONSE**

    - Code: `409`<br/>
    Content:

    ```json

        {
            "error": {
                "name": "Conflicted",
                "message": "User with email user6@email.com already exists"
            }
        }

    ```

    - Code: `400`<br/>
    Content:

    ```json

        {
            "error": {
                "name": "SequelizeValidationError",
                "errors": [
                    {
                        "message": "Password cannot be empty",
                        "type": "Validation error",
                        "path": "password",
                        "value": "",
                        "origin": "FUNCTION",
                        "instance": {
                            "id": null,
                            "email": "user7@email.com",
                            "password": "",
                            "updatedAt": "2021-07-15T06:12:30.068Z",
                            "createdAt": "2021-07-15T06:12:30.068Z"
                        },
                        "validatorKey": "notEmpty",
                        "validatorName": "notEmpty",
                        "validatorArgs": [
                            true
                        ],
                        "original": {
                            "validatorName": "notEmpty",
                            "validatorArgs": [
                                true
                            ]
                        }
                    },
                    {
                        "message": "Password length must be between 5-30 characters",
                        "type": "Validation error",
                        "path": "password",
                        "value": "",
                        "origin": "FUNCTION",
                        "instance": {
                            "id": null,
                            "email": "user7@email.com",
                            "password": "",
                            "updatedAt": "2021-07-15T06:12:30.068Z",
                            "createdAt": "2021-07-15T06:12:30.068Z"
                        },
                        "validatorKey": "len",
                        "validatorName": "len",
                        "validatorArgs": [
                            5,
                            30
                        ],
                        "original": {
                            "validatorName": "len",
                            "validatorArgs": [
                                5,
                                30
                            ]
                        }
                    }
                ]
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
* **HEADER PARAMS** 

    ```json
        {
            "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbjFAZW1haWwuY29tIiwiaWF0IjoxNjI1Mzg3NDUxfQ.YGkBqBHHiCYzti8qplqBQb7rkyy-7Z8LW1ZdyYukiMQ"
        }
    ```

* **DATA PARAMS**

    ```json
        {
            "name": "<product name> required",
            "image_url": "<product image_url> required",
            "price": "<product price> required",
            "stock": "<product stock> required"
        }
    ```

* **SUCCESS RESPONSE**

    - Code: `201`<br/>
    Content:

    ```json
        {
            "product": {
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
            "error": {
                "name": "JsonWebTokenError",
                "message": "jwt must be provided"
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
Update all fields/columns of a `Product` based on its ID.

* **URL**  `/products/`
* **METHOD**  `PUT`
* **URL PARAMS** Required: `id=[integer]`
* **HEADER PARAMS** 

    ```json
        {
            "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbjFAZW1haWwuY29tIiwiaWF0IjoxNjI1Mzg3NDUxfQ.YGkBqBHHiCYzti8qplqBQb7rkyy-7Z8LW1ZdyYukiMQ"
        }
    ```

* **DATA PARAMS**

    ```json
        {
            "name": "<product new name> required",
            "image_url": "<product new image_url> required",
            "price": "<product new price> required",
            "stock": "<product new stock> required"
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
            "error": {
                "name": "JsonWebTokenError",
                "message": "jwt must be provided"
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
* **HEADER PARAMS** 

    ```json
        {
            "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbjFAZW1haWwuY29tIiwiaWF0IjoxNjI1Mzg3NDUxfQ.YGkBqBHHiCYzti8qplqBQb7rkyy-7Z8LW1ZdyYukiMQ"
        }
    ```

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
            "error": {
                "name": "JsonWebTokenError",
                "message": "jwt must be provided"
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

### **CARTS > CREATE A CART**
Add a `Product` to a `Cart`.

* **URL**  `/cart/:productId`
* **METHOD**  `POST`
* **URL PARAMS** Required: `productId=[integer]`
* **HEADER PARAMS** 

    ```json
        {
            "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbjFAZW1haWwuY29tIiwiaWF0IjoxNjI1Mzg3NDUxfQ.YGkBqBHHiCYzti8qplqBQb7rkyy-7Z8LW1ZdyYukiMQ"
        }
    ```

* **DATA PARAMS**

    ```json
        {
            "quantity": "<product quantity> required"
        }
    ```

* **SUCCESS RESPONSE**

    - Code: `201`<br/>
    Content:

    ```json
        {
            "message": "2 Apel Malang added to cart"
        }
    ```

* **ERROR RESPONSE**

    - Code: `401`<br/>
    Content:

    ```json

        {
            "error": {
                "name": "JsonWebTokenError",
                "message": "jwt must be provided"
            }
        }

    ```

    - Code: `404`<br/>
    Content:

    ```json

        {
            "error": {
                "name": "Not Found",
                "message": "Product not found"
            }
        }

    ```

    - Code: `409`<br/>
    Content:

    ```json

        {
            "error": {
                "name": "Conflicted",
                "message": "Not enough stock"
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

### **CARTS > DISPLAY CARTS**
Display all `Cart`.

* **URL**  `/cart`
* **METHOD**  `GET`
* **URL PARAMS** none
* **HEADER PARAMS** 

    ```json
        {
            "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbjFAZW1haWwuY29tIiwiaWF0IjoxNjI1Mzg3NDUxfQ.YGkBqBHHiCYzti8qplqBQb7rkyy-7Z8LW1ZdyYukiMQ"
        }
    ```

* **DATA PARAMS** none
* **SUCCESS RESPONSE**

    - Code: `200`<br/>
    Content:

    ```json
        {
            "cart": [
                {
                    "id": 1,
                    "UserId": 2,
                    "ProductId": 1,
                    "quantity": 3,
                    "createdAt": "2021-07-14T08:20:16.474Z",
                    "updatedAt": "2021-07-14T08:20:16.474Z",
                    "Product": {
                        "id": 1,
                        "name": "Apel Malang",
                        "image_url": "https://ecommerce-fruits-bucket.s3.ap-southeast-1.amazonaws.com/apelmalang.png",
                        "price": 5000,
                        "stock": 47,
                        "createdAt": "2021-07-14T08:19:16.952Z",
                        "updatedAt": "2021-07-14T08:20:16.487Z"
                    },
                    "User": {
                        "id": 2,
                        "email": "user1@email.com",
                        "password": "$2a$08$gmQU4T4ecGHAgw0j4xwMsOPS6zEA.81W.AVmApNdO8RcJsUcI2Ztq",
                        "role": "customer",
                        "createdAt": "2021-07-14T08:19:16.923Z",
                        "updatedAt": "2021-07-14T08:19:16.923Z"
                    }
                },
                {
                    "id": 2,
                    "UserId": 2,
                    "ProductId": 3,
                    "quantity": 2,
                    "createdAt": "2021-07-14T08:20:40.758Z",
                    "updatedAt": "2021-07-14T08:20:40.758Z",
                    "Product": {
                        "id": 3,
                        "name": "Pisang Cavendish",
                        "image_url": "https://ecommerce-fruits-bucket.s3.ap-southeast-1.amazonaws.com/pisang.jpeg",
                        "price": 25000,
                        "stock": 84,
                        "createdAt": "2021-07-14T08:19:16.952Z",
                        "updatedAt": "2021-07-14T08:21:36.908Z"
                    },
                    "User": {
                        "id": 2,
                        "email": "user1@email.com",
                        "password": "$2a$08$gmQU4T4ecGHAgw0j4xwMsOPS6zEA.81W.AVmApNdO8RcJsUcI2Ztq",
                        "role": "customer",
                        "createdAt": "2021-07-14T08:19:16.923Z",
                        "updatedAt": "2021-07-14T08:19:16.923Z"
                    }
                }
            ]
        }
    ```

* **ERROR RESPONSE**

    - Code: `401`<br/>
    Content:

    ```json

        {
            "error": {
                "name": "JsonWebTokenError",
                "message": "jwt must be provided"
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

### **CARTS > EDIT CART**
Edit the quantity in a `Cart` based on its ID.

* **URL**  `/cart/:cartId `
* **METHOD**  `PATCH`
* **URL PARAMS** Required: `cartId=[integer]`
* **HEADER PARAMS** 

    ```json
        {
            "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbjFAZW1haWwuY29tIiwiaWF0IjoxNjI1Mzg3NDUxfQ.YGkBqBHHiCYzti8qplqBQb7rkyy-7Z8LW1ZdyYukiMQ"
        }
    ```

* **DATA PARAMS**

    ```json
        {
            "newQuantity": "<product new quantity> required"
        }
    ```

* **SUCCESS RESPONSE**

    - Code: `200`<br/>
    Content:

    ```json
        {
            "message": "Quantity updated to 17"
        }
    ```

* **ERROR RESPONSE**

    - Code: `401`<br/>
    Content:

    ```json

        {
            "error": {
                "name": "JsonWebTokenError",
                "message": "jwt must be provided"
            }
        }

    ```

    - Code: `401`<br/>
    Content:

    ```json

        {
            "error": {
                "name": "Not Authorised",
                "message": "You do not have permission"
            }
        }

    ```

    - Code: `404`<br/>
    Content:

    ```json

        {
            "error": {
                "name": "Not Found",
                "message": "Cart not found"
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

### **CARTS > DELETE CART**
Delete a `Cart` based on its ID.

* **URL**  `/cart/:cartId `
* **METHOD**  `DELETE`
* **URL PARAMS** Required: `cartId=[integer]`
* **HEADER PARAMS** 

    ```json
        {
            "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbjFAZW1haWwuY29tIiwiaWF0IjoxNjI1Mzg3NDUxfQ.YGkBqBHHiCYzti8qplqBQb7rkyy-7Z8LW1ZdyYukiMQ"
        }
    ```

* **DATA PARAMS** none
* **SUCCESS RESPONSE**

    - Code: `200`<br/>
    Content:

    ```json
        {
            "message": "Successfully deleted"
        }
    ```

* **ERROR RESPONSE**

    - Code: `401`<br/>
    Content:

    ```json

        {
            "error": {
                "name": "JsonWebTokenError",
                "message": "jwt must be provided"
            }
        }

    ```

    - Code: `401`<br/>
    Content:

    ```json

        {
            "error": {
                "name": "Not Authorised",
                "message": "You do not have permission"
            }
        }

    ```

    - Code: `404`<br/>
    Content:

    ```json

        {
            "error": {
                "name": "Not Found",
                "message": "Cart not found"
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
