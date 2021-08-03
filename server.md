# Login

Used to collect a Token for a registered User.

**URL** : `/login/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "email": "[valid email address]",
    "password": "[password in plain text]"
}
```

## Success Response

**Code** : `200`

**Content example**

```json
{
    "access_token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```

## Error Response

**Condition** : If 'email' is not registered.

**Code** : `404`
```json
```
**Condition** : If 'email' or 'password' is empty.

**Code** : `400`

**Json** :
```json
    {"message":"No username or password"}
```

**Condition** : If 'password' is wrong.

**Code** : `401`

**Json** :
```json
    {"message":"Wrong password"}
```

# Register

Used to register a user.

**URL** : `/register/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "email": "[valid email address]",
    "password": "[password in plain text]"
}
```

## Success Response

**Code** : `201`

**Content example**

```json
{
    "message": "registration success"
}
```

## Error Response

**Condition** : If 'email' is already registered.

**Code** : `400`
```json
{
    "message": "email is already taken"
}
```
**Condition** : If 'email' or 'password' is empty.

**Code** : `400`

**Json** :
```json
    {"message":"No username or password"}
```

**Condition** : If 'email' is not in email format.

**Code** : `400`

**Json** :
```json
    {"message":"Please use proper email format"}
```

# Google login

Used to collect a Token for a registered User.

**URL** : `/glogin/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
     "access_token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```

## Success Response

**Code** : `200`

**Content example**

```json
{
    "message": "registration success"
}
```

## Error Response


# GET Product

Used to GET all existing product.

**URL** : `/products/:id`

**Method** : `GET`

**Auth required** : NO

**Data constraints**

```json

```

## Success Response

**Code** : `200`

**Content example**

```json
[
    {
        "id": 2,
        "name": "pin",
        "image_url": "https://cdn.discordapp.com/attachments/583880464784424960/851801875392757810/image0.jpg",
        "price": 101,
        "stock": 88,
        "createdAt": "2021-07-05T15:08:09.452Z",
        "updatedAt": "2021-07-16T03:13:49.028Z",
        "Tags": [
            {
                "id": 1,
                "name": "teg",
                "createdAt": "2021-07-06T01:54:48.664Z",
                "updatedAt": "2021-07-06T01:54:48.664Z",
                "TagList": {
                    "id": 3
                }
            },
            {
                "id": 13,
                "name": "gambar",
                "createdAt": "2021-07-15T13:49:04.598Z",
                "updatedAt": "2021-07-15T13:49:04.598Z",
                "TagList": {
                    "id": 7
                }
            }
        ],
        "Carts": [
            {
                "UserId": 5,
                "ProductId": 2,
                "toBuy": 7,
                "createdAt": "2021-07-16T03:14:17.190Z",
                "updatedAt": "2021-07-16T03:24:16.616Z"
            }
        ]
    },
    {
        "id": 4,
        "name": "sigil",
        "image_url": "https://cdn.discordapp.com/attachments/583880464784424960/851801538586607636/image0.png",
        "price": 2,
        "stock": 0,
        "createdAt": "2021-07-06T14:33:49.998Z",
        "updatedAt": "2021-07-16T03:13:19.593Z",
        "Tags": [
            {
                "id": 3,
                "name": "tog",
                "createdAt": "2021-07-06T01:55:00.102Z",
                "updatedAt": "2021-07-06T01:55:00.102Z",
                "TagList": {
                    "id": 5
                }
            }
        ],
        "Carts": []
    },
    {
        "id": 1,
        "name": "icon",
        "image_url": "https://cdn.discordapp.com/attachments/583880464784424960/851801611738415164/image0.jpg",
        "price": 100,
        "stock": 100,
        "createdAt": "2021-07-05T15:08:01.962Z",
        "updatedAt": "2021-07-07T11:34:38.980Z",
        "Tags": [
            {
                "id": 13,
                "name": "gambar",
                "createdAt": "2021-07-15T13:49:04.598Z",
                "updatedAt": "2021-07-15T13:49:04.598Z",
                "TagList": {
                    "id": 6
                }
            }
        ],
        "Carts": [
            {
                "UserId": 5,
                "ProductId": 1,
                "toBuy": 4,
                "createdAt": "2021-07-16T03:24:26.315Z",
                "updatedAt": "2021-07-16T03:24:26.315Z"
            }
        ]
    },
    {
        "id": 8,
        "name": "barang baru",
        "image_url": "",
        "price": 30,
        "stock": 20,
        "createdAt": "2021-07-08T08:32:22.606Z",
        "updatedAt": "2021-07-08T08:32:22.606Z",
        "Tags": [],
        "Carts": []
    }
]
```

# Post Product

Used to register a new product.

**URL** : `/products/`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

```json
{
    "name": "[name]",
    "image_url": "[image_url]",
    "stock": "[stock]",
    "price": "[price]"
}
```

## Success Response

**Code** : `201`

**Content example**

```json
    {"message": "create success"}
```

## Error Response

**Condition** : If credential is wrong

**Code** : `401`
```json
```
**Condition** : If name is empty, price is less than 0, or stock is less than 0.

**Code** : `400`

**Json** :
```json
    {"message":"Price cannot be negative, Stock cannot be negative, Product name cannot be empty"}
```

# PUT Product

Used to edit an existing product.

**URL** : `/products/:id`

**Method** : `PUT`

**Auth required** : YES

**Data constraints**

```json
{
    "name" (optional): "[name]",
    "image_url" (optional): "[image_url]",
    "stock" (optional): "[stock]",
    "price" (optional): "[price]"
}
```

## Success Response

**Code** : `200`

**Content example**

```json
    {"message": "update success"}
```

## Error Response

**Condition** : If credential is wrong

**Code** : `401`
```json
```
**Condition** : If name is empty, price is less than 0, or stock is less than 0.

**Code** : `400`

**Json** :
```json
    {"message":"Price cannot be negative, Stock cannot be negative, Product name cannot be empty"}
```
**Condition** : If the id params does not correspond to a product id

**Code** : `404`

**Json** :
```json
    {"message":"Product not found"}
```

# DELETE Product

Used to delete an existing product.

**URL** : `/products/:id`

**Method** : `DELETE`

**Auth required** : YES

**Data constraints**

```json

```

## Success Response

**Code** : `200`

**Content example**

```json
    {"Message": "Item deleted"}
```

## Error Response

**Condition** : If credential is wrong

**Code** : `401`
```json
```

**Condition** : If the id params does not correspond to a product id

**Code** : `404`

**Json** :
```json
    {"message":"Product not found"}
```


## Error Response

**Condition** : If credential is wrong

**Code** : `401`
```json
```

**Condition** : no product is found

**Code** : `404`

**Json** :
```json
    {"message":"Products not found"}
```

# Post tag

Used to register a new tag.

**URL** : `/tags/`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

```json
{
    "name": "[name]",
}
```

## Success Response

**Code** : `201`

**Content example**

```json
    {"message": "tag created"}
```

## Error Response

**Condition** : If credential is wrong

**Code** : `401`
```json
```
**Condition** : If name is empty

**Code** : `400`

**Json** :
```json
    {"message":"Tag name may not be empty"}
```
**Condition** : If name is taken

**Code** : `400`

**Json** :
```json
```

# PUT Tag

Used to edit an existing tag.

**URL** : `/tags/:id`

**Method** : `PUT`

**Auth required** : YES

**Data constraints**

```json
{
    "name": "[name]",
}
```

## Success Response

**Code** : `200`

**Content example**

```json
    {"message": "tag edited"}
```

## Error Response

**Condition** : If credential is wrong

**Code** : `401`
```json
```
**Condition** : If name is empty

**Code** : `400`

**Json** :
```json
    {"message":"Tag name cannot be empty"}
```
**Condition** : If name is taken

**Code** : `400`

**Json** :
```json
```
**Condition** : If the id params does not correspond to a product id

**Code** : `404`

**Json** :
```json
    {"message":"Tag not found"}
```

# DELETE tag

Used to delete an existing tag.

**URL** : `/tags/:id`

**Method** : `DELETE`

**Auth required** : YES

**Data constraints**

```json

```

## Success Response

**Code** : `200`

**Content example**

```json
    {"Message": "Item deleted"}
```

## Error Response

**Condition** : If credential is wrong

**Code** : `401`
```json
```

**Condition** : If the id params does not correspond to a tag id

**Code** : `404`

**Json** :
```json
    {"message":"Tag not found"}
```

# GET tag

Used to GET all existing tags.

**URL** : `/tags/:id`

**Method** : `GET`

**Auth required** : NO

**Data constraints**

```json

```

## Success Response

**Code** : `200`

**Content example**

```json
[
    {
        "id": 1,
        "name": "teg",
        "createdAt": "2021-07-06T01:54:48.664Z",
        "updatedAt": "2021-07-06T01:54:48.664Z"
    },
    {
        "id": 3,
        "name": "tog",
        "createdAt": "2021-07-06T01:55:00.102Z",
        "updatedAt": "2021-07-06T01:55:00.102Z"
    },
    {
        "id": 12,
        "name": "tag baru",
        "createdAt": "2021-07-07T14:42:31.056Z",
        "updatedAt": "2021-07-07T14:42:31.056Z"
    }
]
```

## Error Response

**Condition** : If credential is wrong

**Code** : `401`
```json
```

**Condition** : no product is found

**Code** : `404`

**Json** :
```json
    {"message":"tags not found"}
```

# Post tagList

Used to register a new tagList.

**URL** : `/productTag/`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

```json
{
    "tagId": "[tagId]",
    "productId": "[productId]",
}
```

## Success Response

**Code** : `201`

**Content example**

```json
    {"message": "tag added"}
```

## Error Response

**Condition** : If credential is wrong

**Code** : `401`
```json
```
**Condition** : If productId or TagId is empty

**Code** : `400`

**Json** :
```json
```

# DELETE taglist

Used to delete an existing tag relation.

**URL** : `/producttag/:id`

**Method** : `DELETE`

**Auth required** : YES

**Data constraints**

```json

```

## Success Response

**Code** : `200`

**Content example**

```json
    {"Message": "delete complete"}
```

## Error Response

**Condition** : If credential is wrong

**Code** : `401`
```json
```

**Condition** : If the id params does not correspond to a taglist id

**Code** : `404`

**Json** :
```json
```

# addCart

Used to add items to cart or create a new cart.

**URL** : `/cart/:id`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

```json
{
    "toBuy": [interger],
}
```

## Success Response

**Code** : `201` OR `200`

**Content example**

```json
    {"message": "added to cart"}
```

## Error Response

**Condition** : If credential is wrong

**Code** : `401`
```json
```
**Condition** : If product does not exist

**Code** : `404`

**Json** :
```json
    {"message":"Product not found"}
```
**Condition** : If item requested is more than available stock

**Code** : `400`

**Json** :
```json
    {"message": "Item out of stock"}
```

# POST buy

Used to buy an item in cart.

**URL** : `/buy/:id`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

```json
{
    "toBuy": [integer],
}
```

## Success Response

**Code** : `200`

**Content example**

```json
    {"message": "Purchase complete"}
```

## Error Response

**Condition** : If credential is wrong

**Code** : `401`
```json
```
**Condition** : If product does not exist

**Code** : `404`

**Json** :
```json
    {"message":"Product not found"}
```
**Condition** : If item requested is more than available stock

**Code** : `400`

**Json** :
```json
    {"message": "Item out of stock"}
```

# GET cart

Used to GET all the logged in user's cart

**URL** : `/cart/`

**Method** : `GET`

**Auth required** : YES

**Data constraints**

```json
{
    "toBuy": [integer],
}
```

## Success Response

**Code** : `200`

**Content example**

```json
[
    {
        "id": 37,
        "toBuy": 4,
        "Product": {
            "id": 1,
            "name": "icon",
            "image_url": "https://cdn.discordapp.com/attachments/583880464784424960/851801611738415164/image0.jpg",
            "price": 100,
            "stock": 100,
            "createdAt": "2021-07-05T15:08:01.962Z",
            "updatedAt": "2021-07-07T11:34:38.980Z"
        }
    },
    {
        "id": 35,
        "toBuy": 7,
        "Product": {
            "id": 2,
            "name": "pin",
            "image_url": "https://cdn.discordapp.com/attachments/583880464784424960/851801875392757810/image0.jpg",
            "price": 101,
            "stock": 88,
            "createdAt": "2021-07-05T15:08:09.452Z",
            "updatedAt": "2021-07-16T03:13:49.028Z"
        }
    }
]
```

## Error Response

**Condition** : If credential is wrong

**Code** : `401`
```json
```

# DELETE cart

Used to GET all the logged in user's cart

**URL** : `/cart/:id`

**Method** : `DELETE`

**Auth required** : YES

**Data constraints**


## Success Response

**Code** : `200`

**Content example**

```json
 "delete success"
```

## Error Response

**Condition** : If credential is wrong

**Code** : `401`
```json
```
**Condition** : If param refer to a non-existent cart

**Code** : `404`
```json
    {"message": "Cart not found"}
```