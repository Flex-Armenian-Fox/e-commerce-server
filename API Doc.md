# E-Commerce API Official Documentation

### List of Endpoints:
| HTTP METHOD | URL                 | DESKRIPSI          |
| ----------- | ------------------- | ------------------ |
| **POST**    | /api/users/login | Login User |
| **POST** | /api/users/register | Register New User |
| **GET** | /api/products | Mendapatkan list seluruh product |
| **GET** | /api/products/`:id` | Mendapatkan product berdasarkan param `id` |
| **POST** | /api/products | Membuat product baru |
| **PUT** | /api/products/`:id` | Mengupdate product berdasarkan param `id` |
| **DELETE** | /api/products/`:id` | Menghapus product berdasarkan param `id` |
| **GET** | /api/categories | Mendapatkan list seluruh category |
| **GET** | /api/categories/`:id` | Mendapatkan category by id |
| **POST** | /api/categories | Membuat category baru |
| **PUT** | /api/categories/`:id` | Mengupdate category berdasarkan param `id` |
| **DELETE** | /api/categories/`:id` | Menghapus category berdasarkan param `id` |
| **POST** | /api/carts | Menambahkan item ke cart |
| **GET** | /api/carts | Mendapatkan list seluruh item di cart |
| **PATCH** | /api/carts/`:id` | Mengupdate total quantity di cart |
| **DELETE** | /api/carts/`:id` | Menghapus item di cart berdasarkan param `id` |
| **DELETE** | /api/carts | Menghapus seluruh item di cart berdasarkan user yang login |

---
## Login User
- HTTP Method : `POST`
- URL : `/api/users/login`
- Request Body : `json`
- Request Params : *none*
- Request Headers : *none*
- Response : `json`

#### Request Body Example
```json
{
    "email": "admin@mail.com",
    "password": "1234"
}
```
#### Response Success Status : `200`
```json
{
    "message": "success",
    "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbnRvbkBtYWlsLmNvbSIsImlhdCI6MTYyMzc1NzAwNn0.dJ4HBb54ZTg_RzuQF3r5SLKqtsU7dzjzuWEeW4_HmVM"
    }
}
```
#### Response Error Status : `401`
```json
{
    "message": "error",
    "error": {
        "name": "Unauthorized",
        "message": "Invalid username or password"
    }
}
```
#### Response Error Status : `400`
```json
{
    "message": "error",
    "error": {
        "name": "BadRequest",
        "message": "Please provide username or password"
    }
}
```
#### Response Error Status : `500`
```json
{
    "message": "error",
    "error": {
        "name": "UncaughtException",
        "message": "mail is not defined"
    }
}
```
---
## Register New User
- HTTP Method : `POST`
- URL : `/api/users/register`
- Request Body : `json`
- Request Params : *none*
- Request Headers : *none*
- Response : `json`

#### Request Body Example
```json
{
    "email": "anton@mail.com",
    "password": "1234"
}
```
#### Response Success Status : `201`
```json
{
    "message": "success",
    "data": {
        "id": 1,
        "email": "anton@mail.com",
        "createdAt": "2021-06-20T17:21:11.000Z",
        "updatedAt": "2021-06-20T17:21:11.000Z"
    }
}
```
#### Response Error Status : `400`
```json
{
    "message": "error",
    "error": {
        "name": "BadRequest",
        "message": "Please provide username or password"
    }
}
```
#### Response Error Status : `500`
```json
{
    "message": "error",
    "error": {
        "name": "UncaughtException",
        "message": "mail is not defined"
    }
}
```

---
## Mendapatkan list seluruh product
- HTTP Method : `GET`
- URL : `/api/products`
- Request Body : *none*
- Request Params : *none*
- Request Headers : `access_token`
- Response : `json`

#### Response Success Status : `200`
```json
{
    "message": "success",
    "data": [
        {
            "id": 1,
            "name": "Motor Ducati",
            "image_url": "https://imgcdn.oto.com/medium/gallery/exterior/69/954/ducati-monster-51785.jpg",
            "price": 2000000,
            "stock": 5,
            "Category": {
                "id": 1,
                "category_name": "Sports Bike"
            },
            "createdAt": "2021-06-20T17:21:11.000Z",
            "updatedAt": "2021-06-20T17:21:11.000Z"
        },
        {
            "id": 2,
            "name": "Motor Ninja",
            "image_url": "https://imgcdn.oto.com/medium/gallery/exterior/69/954/ducati-monster-51785.jpg",
            "price": 1500000,
            "stock": 6,
            "Category": {
                "id": 1,
                "category_name": "Sports Bike"
            },
            "createdAt": "2021-06-20T17:21:11.000Z",
            "updatedAt": "2021-06-20T17:21:11.000Z"
        },
        {
            "id": 3,
            "name": "Motor Astrea",
            "image_url": "https://asset.kompas.com/crops/LGB09w6xcsqdV9lfO9DzoBX_Sug=/0x0:900x600/750x500/data/photo/2018/03/15/2383742749.jpg",
            "price": 3000000,
            "stock": 2,
            "Category": {
                "id": 1,
                "category_name": "Sports Bike"
            },
            "createdAt": "2021-06-20T17:21:11.000Z",
            "updatedAt": "2021-06-20T17:21:11.000Z"
        }
    ]    
}
```
#### Response Error Status : `401`
```json
{
    "message": "error",
    "error": {
        "name": "JsonWebTokenError",
        "message": "Invalid Signature"
    }
}
```
#### Response Error Status : `500`
```json
{
    "message": "error",
    "error": {
        "name": "UncaughtException",
        "message": "mail is not defined"
    }
}
```
---
## Mendapatkan product berdasarkan param `id`
- HTTP Method : `GET`
- URL : `/api/products/:id`
- Request Body : *none*
- Request Params : `id`
- Request Headers : `access_token`
- Response : `json`

#### Response Success Status : `200`
```json
{
    "message": "success",
    "data": {
        "id": 1,
        "name": "Motor Ducati",
        "image_url": "https://imgcdn.oto.com/medium/gallery/exterior/69/954/ducati-monster-51785.jpg",
        "price": 2000000,
        "stock": 5,
        "Category": {
            "id": 1,
            "category_name": "Sports Bike"
        },
        "createdAt": "2021-06-20T17:21:11.000Z",
        "updatedAt": "2021-06-20T17:21:11.000Z"
    }
}
```
#### Response Error Status : `401`
```json
{
    "message": "error",
    "error": {
        "name": "JsonWebTokenError",
        "message": "Invalid Signature"
    }
}
```
#### Response Error Status : `404`
```json
{
    "message": "error",
    "error": {
        "name": "NotFound",
        "message": "Product with Id <id> was not found"
    }
}
```
#### Response Error Status : `500`
```json
{
    "message": "error",
    "error": {
        "name": "UncaughtException",
        "message": "mail is not defined"
    }
}
```
---
## Membuat product baru
- HTTP Method : `POST`
- URL : `/api/products`
- Request Body : `json`
- Request Params : *none*
- Request Headers : `access_token`
- Response : `json`

#### Request Body Example
```json
{
    "name": "Motor Ducati",
    "image_url": "https://imgcdn.oto.com/medium/gallery/exterior/69/954/ducati-monster-51785.jpg",
    "price": 2000000,
    "stock": 5,
    "category_id": 1
}
```
#### Response Success Status : `201`
```json
{
    "message": "success",
    "data": {
        "id": 5,
        "name": "Motor Ducati",
        "image_url": "https://imgcdn.oto.com/medium/gallery/exterior/69/954/ducati-monster-51785.jpg",
        "price": 2000000,
        "stock": 5,
        "category_id": 1,
        "createdAt": "2021-06-20T17:21:11.000Z",
        "updatedAt": "2021-06-20T17:21:11.000Z"
    }    
}
```
#### Response Error Status : `400`
```json
{
    "message": "error",
    "error": {
        "name": "SequelizeValidationError",
        "message": "Validation error: Please Provide Product name"
    }
}
```
#### Response Error Status : `401`
```json
{
    "message": "error",
    "error": {
        "name": "Unauthorized",
        "message": "You are not authorized"
    }
}
```
#### Response Error Status : `500`
```json
{
    "message": "error",
    "error": {
        "name": "UncaughtException",
        "message": "mail is not defined"
    }
}
```
---
## Mengupdate product berdasarkan param `id`
- HTTP Method : `PUT`
- URL : `/api/products/:id`
- Request Body : `json`
- Request Params : `id`
- Request Headers : `access_token`
- Response : `json`

#### Request Body Example
```json
{
    "name": "Motor Yamaha",
    "image_url": "https://imgcdn.oto.com/medium/gallery/exterior/69/954/ducati-monster-51785.jpg",
    "price": 15000000,
    "stock": 10,
    "category_id": 1
}
```
#### Response Success Status : `200`
```json
{
    "message": "update success",
    "data": [
        {
            "id": 5,
            "name": "Motor Yamaha",
            "image_url": "https://imgcdn.oto.com/medium/gallery/exterior/69/954/ducati-monster-51785.jpg",
            "price": 15000000,
            "stock": 10,
            "category_id": 1,
            "createdAt": "2021-06-20T17:21:11.000Z",
            "updatedAt": "2021-06-20T17:21:11.000Z"
        }    
    ]
}
```
#### Response Error Status : `400`
```json
{
    "message": "error",
    "error": {
        "name": "SequelizeValidationError",
        "message": "Validation error: Please Provide Product name"
    }
}
```
#### Response Error Status : `401`
```json
{
    "message": "error",
    "error": {
        "name": "Unauthorized",
        "message": "You are not authorized"
    }
}
```
#### Response Error Status : `404`
```json
{
    "message": "error",
    "error": {
        "name": "NotFound",
        "message": "Product with id <id> was not found"
    }
}
```
#### Response Error Status : `500`
```json
{
    "message": "error",
    "error": {
        "name": "UncaughtException",
        "message": "mail is not defined"
    }
}
```
---
## Menghapus product berdasarkan param `id`
- HTTP Method : `DELETE`
- URL : `/api/products/:id`
- Request Body : *none*
- Request Params : `id`
- Request Headers : `access_token`
- Response : `json`

#### Response Success Status : `200`
```json
{
    "message": "delete success",
    "data": null
}
```
#### Response Error Status : `401`
```json
{
    "message": "error",
    "error": {
        "name": "Unauthorized",
        "message": "You are not authorized"
    }
}
```
#### Response Error Status : `404`
```json
{
    "message": "error",
    "error": {
        "name": "NotFound",
        "message": "Product with id <id> was not found"
    }
}
```
#### Response Error Status : `500`
```json
{
    "message": "error",
    "error": {
        "name": "UncaughtException",
        "message": "mail is not defined"
    }
}
```
---
## Mendapatkan list seluruh category
- HTTP Method : `GET`
- URL : `/api/categories`
- Request Body : *none*
- Request Params : *none*
- Request Headers : `access_token`
- Response : `json`

#### Response Success Status : `200`
```json
{
    "message": "success",
    "data": [
        {
            "id": 1,
            "category_name": "Sport Bike",
            "category_description": "Real Man ride sports bike!",
            "createdAt": "2021-06-20T17:21:11.000Z",
            "updatedAt": "2021-06-20T17:21:11.000Z"
        },
        {
            "id": 2,
            "category_name": "Naked Bike",
            "category_description": null,
            "createdAt": "2021-06-20T17:21:11.000Z",
            "updatedAt": "2021-06-20T17:21:11.000Z"
        }
    ]    
}
```
#### Response Error Status : `401`
```json
{
    "message": "error",
    "error": {
        "name": "Unauthorized",
        "message": "You are not authorized"
    }
}
```
#### Response Error Status : `500`
```json
{
    "message": "error",
    "error": {
        "name": "UncaughtException",
        "message": "mail is not defined"
    }
}
```
---
## Mendapatkan category by id
- HTTP Method : `GET`
- URL : `/api/categories/:id`
- Request Body : *none*
- Request Params : `id`
- Request Headers : `access_token`
- Response : `json`

#### Response Success Status : `200`
```json
{
    "message": "success",
    "data": {
        "id": 1,
        "category_name": "Sport Bike",
        "category_description": "Real Man ride sports bike!",
        "createdAt": "2021-06-20T17:21:11.000Z",
        "updatedAt": "2021-06-20T17:21:11.000Z"
    }
}
```
#### Response Error Status : `401`
```json
{
    "message": "error",
    "error": {
        "name": "Unauthorized",
        "message": "You are not authorized"
    }
}
```
#### Response Error Status : `404`
```json
{
    "message": "error",
    "error": {
        "name": "NotFound",
        "message": "Category with Id <id> was not found"
    }
}
```
#### Response Error Status : `500`
```json
{
    "message": "error",
    "error": {
        "name": "UncaughtException",
        "message": "mail is not defined"
    }
}
```
---
## Membuat category baru
- HTTP Method : `POST`
- URL : `/api/categories`
- Request Body : `JSON`
- Request Params : *none*
- Request Headers : `access_token`
- Response : `json`

#### Request Body Example
```json
{
    "category_name": "Touring Bike",
    "category_description": "This is real man!"
}
```
#### Response Success Status : `201`
```json
{
    "message": "success",
    "data": {
        "id": 1,
        "category_name": "Sport Bike",
        "category_description": "Real Man ride sports bike!",
        "createdAt": "2021-06-20T17:21:11.000Z",
        "updatedAt": "2021-06-20T17:21:11.000Z"
    }
}
```
#### Response Error Status : `401`
```json
{
    "message": "error",
    "error": {
        "name": "Unauthorized",
        "message": "You are not authorized"
    }
}
```
#### Response Error Status : `400`
```json
{
    "message": "error",
    "error": {
        "name": "SequelizeValidationError",
        "message": "Validation error: Please Provide category name"
    }
}
```
#### Response Error Status : `500`
```json
{
    "message": "error",
    "error": {
        "name": "UncaughtException",
        "message": "mail is not defined"
    }
}
```
---
## Mengupdate category berdasarkan param `id`
- HTTP Method : `PUT`
- URL : `/api/categories`
- Request Body : `JSON`
- Request Params : `id`
- Request Headers : `access_token`
- Response : `json`

#### Request Body Example
```json
{
    "category_name": "Touring Bike",
    "category_description": "This is real man!"
}
```
#### Response Success Status : `200`
```json
{
    "message": "update success",
    "data": [
        {
            "id": 1,
            "category_name": "Sport Bike",
            "category_description": "Real Man ride sports bike!",
            "createdAt": "2021-06-20T17:21:11.000Z",
            "updatedAt": "2021-06-20T17:21:11.000Z"
        }
    ]
}
```
#### Response Error Status : `401`
```json
{
    "message": "error",
    "error": {
        "name": "Unauthorized",
        "message": "You are not authorized"
    }
}
```
#### Response Error Status : `400`
```json
{
    "message": "error",
    "error": {
        "name": "SequelizeValidationError",
        "message": "Validation error: Please Provide category name"
    }
}
```
#### Response Error Status : `404`
```json
{
    "message": "error",
    "error": {
        "name": "NotFound",
        "message": "Category with id <id> was not found"
    }
}
```
#### Response Error Status : `500`
```json
{
    "message": "error",
    "error": {
        "name": "UncaughtException",
        "message": "mail is not defined"
    }
}
```
---
## Menghapus category berdasarkan param `id`
- HTTP Method : `DELETE`
- URL : `/api/categories`
- Request Body : *none*
- Request Params : `id`
- Request Headers : `access_token`
- Response : `json`

#### Response Success Status : `200`
```json
{
    "message": "category deleted successfully",
    "data": null
}
```
#### Response Error Status : `401`
```json
{
    "message": "error",
    "error": {
        "name": "Unauthorized",
        "message": "You are not authorized"
    }
}
```
#### Response Error Status : `404`
```json
{
    "message": "error",
    "error": {
        "name": "NotFound",
        "message": "Category with id <id> was not found"
    }
}
```
#### Response Error Status : `500`
```json
{
    "message": "error",
    "error": {
        "name": "UncaughtException",
        "message": "mail is not defined"
    }
}
```
---
## Menambahkan item ke cart
- HTTP Method : `POST`
- URL : `/api/carts`
- Request Body : `json`
- Request Params : *none*
- Request Headers : `access_token`
- Response : `json`

#### Request Body Example
```json
{
    "product_id": 13,
    "total_quantity": 4
}
```
#### Response Success Status : `201`
```json
{
    "message": "success",
    "data": {
        "product_id": 13,
        "user_id": 2,
        "total_quantity": 4
    }
}
```
#### Response Error Status : `401`
```json
{
    "message": "error",
    "error": {
        "name": "Unauthorized",
        "message": "You are not authorized"
    }
}
```
#### Response Error Status : `400`
```json
{
    "message": "error",
    "error": {
        "name": "BadRequest",
        "message": "Total quantity cannot more than product stock"
    }
}
```
#### Response Error Status : `500`
```json
{
    "message": "error",
    "error": {
        "name": "UncaughtException",
        "message": "mail is not defined"
    }
}
```
---
## Mendapatkan list seluruh item di cart
- HTTP Method : `GET`
- URL : `/api/carts`
- Request Body : *none*
- Request Params : *none*
- Request Headers : `access_token`
- Response : `json`

#### Response Success Status : `200`
```json
[
    {
        "id": 4,
        "user_id": 2,
        "product_id": 13,
        "total_quantity": 1,
        "createdAt": "2021-07-14T17:17:32.084Z",
        "updatedAt": "2021-07-14T17:17:32.084Z",
        "User": {
            "id": 2,
            "email": "anton@mail.com",
            "role": "customer"
        },
        "Product": {
            "id": 13,
            "name": "Ducati Evo 1198",
            "image_url": "https://i.pinimg.com/originals/49/99/5e/49995e51efd8fa0a73cb9fd03cacd874.jpg",
            "price": 279000000,
            "stock": 3
        }
    }
]
```
#### Response Error Status : `401`
```json
{
    "message": "error",
    "error": {
        "name": "Unauthorized",
        "message": "You are not authorized"
    }
}
```
#### Response Error Status : `500`
```json
{
    "message": "error",
    "error": {
        "name": "UncaughtException",
        "message": "mail is not defined"
    }
}
```
---
## Mengupdate total quantity di cart
- HTTP Method : `PATCH`
- URL : `/api/carts/:id`
- Request Body : `json`
- Request Params : `id`
- Request Headers : `access_token`
- Response : `json`

#### Request Body Example:
```json
{
    "total_quantity": 2
}
```

#### Response Success Status : `200`
```json
{
    "message": "success",
    "data": [
        {
            "user_id": 2,
            "product_id": 27,
            "total_quantity": 2,
            "createdAt": "2021-07-14T17:32:57.912Z",
            "updatedAt": "2021-07-14T17:42:43.295Z"
        }
    ]
}
```
#### Response Error Status : `401`
```json
{
    "message": "error",
    "error": {
        "name": "Unauthorized",
        "message": "You are not authorized"
    }
}
```
#### Response Error Status : `400`
```json
{
    "message": "error",
    "error": {
        "name": "BadRequest",
        "message": "Total quantity cannot more than product stock"
    }
}
```
#### Response Error Status : `500`
```json
{
    "message": "error",
    "error": {
        "name": "UncaughtException",
        "message": "mail is not defined"
    }
}
```
---
## Menghapus item di cart berdasarkan param `id`
- HTTP Method : `DELETE`
- URL : `/api/carts/:id`
- Request Body : *none*
- Request Params : `id`
- Request Headers : `access_token`
- Response : `json`


#### Response Success Status : `200`
```json
{
    "message": "success delete cart with id: 7",
    "data": null
}
```
#### Response Error Status : `401`
```json
{
    "message": "error",
    "error": {
        "name": "Unauthorized",
        "message": "You are not authorized"
    }
}
```
#### Response Error Status : `404`
```json
{
    "message": "error",
    "error": {
        "name": "NotFound",
        "message": "Cart with id <id> not found"
    }
}
```
#### Response Error Status : `500`
```json
{
    "message": "error",
    "error": {
        "name": "UncaughtException",
        "message": "mail is not defined"
    }
}
```
---
## Menghapus seluruh item di cart berdasarkan user yang login
- HTTP Method : `DELETE`
- URL : `/api/carts`
- Request Body : *none*
- Request Params : *none*
- Request Headers : `access_token`
- Response : `json`


#### Response Success Status : `200`
```json
{
    "message": "success delete all carts!",
    "data": null
}
```
#### Response Error Status : `401`
```json
{
    "message": "error",
    "error": {
        "name": "Unauthorized",
        "message": "You are not authorized"
    }
}
```
#### Response Error Status : `500`
```json
{
    "message": "error",
    "error": {
        "name": "UncaughtException",
        "message": "mail is not defined"
    }
}
```