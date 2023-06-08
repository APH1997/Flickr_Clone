# HighrMe
HighrMe is a loose clone of Flickr, where sky enthusiasts come to share their favorite pictures of the sky and the space beyond. All files are reliably stored and retrieved through Amazon Web Services S3 buckets.
#### [HighrMe](https://highrme.onrender.com)!

## Technologies used
![aws](https://github.com/APH1997/HighrMe/assets/118479307/7637a667-f615-4298-95ab-27ffb2ffd661)
![css3](https://github.com/APH1997/HighrMe/assets/118479307/234a8f7f-c6aa-46ec-a475-4ed470cc2c92)
![html5](https://github.com/APH1997/HighrMe/assets/118479307/c5007985-1860-4ca1-bf4a-491cd82200a0)
![python](https://github.com/APH1997/HighrMe/assets/118479307/1382ff72-bf17-49f9-9225-1fd32c32a04a)
![flask](https://github.com/APH1997/HighrMe/assets/118479307/844cd8e7-1e2b-49b9-9d78-84529e695cbd)
![flasksqlalch](https://github.com/APH1997/HighrMe/assets/118479307/9cadecd7-5f95-4259-b101-27354bd6abcf)
![javascript](https://github.com/APH1997/HighrMe/assets/118479307/1140990b-2bd7-47bd-99ac-0664e01e618f)
![react](https://github.com/APH1997/HighrMe/assets/118479307/ba6582ee-cebf-48d6-aaeb-b964516f7913)
![redux](https://github.com/APH1997/HighrMe/assets/118479307/771f6a98-9a2a-43ad-a7bf-62fe4027171f)

## Splash

<img width="1024" alt="splash" src="https://github.com/APH1997/HighrMe/assets/118479307/384283f7-4fec-42c6-988f-e27af418e010">

## Content Feed

![contentfeed](https://github.com/APH1997/HighrMe/assets/118479307/b4d427b0-d198-4309-9a87-3005f6f31416)

## User Page - Photos

<img width="1329" alt="userpagephotos" src="https://github.com/APH1997/HighrMe/assets/118479307/04047bf8-7a5a-4095-adc4-9ec671ba1146">

## User Page - Albums

<img width="1234" alt="userpagealbums" src="https://github.com/APH1997/HighrMe/assets/118479307/144ca443-d2da-4fc3-8c7e-3ccedcfb10c5">

## Photo By Id and Comments

![photoandcomms](https://github.com/APH1997/HighrMe/assets/118479307/f0218be8-661c-4891-ac42-f4b88a24c175)

## Album By Id

<img width="1252" alt="albumbyid" src="https://github.com/APH1997/HighrMe/assets/118479307/6bd73196-3cde-42fb-b963-bf81c0d73999">

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```
      
      * If using AWS S3 bucket to store files, additionally install boto3:
      
      ```bash
      pipenv install boto3
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## Features

### Photos
* Users can view/read photos
* Users can upload and edit a photo
* Users can delete their photos
### Albums
* Users can view/read albums
* Users can create albums out of their uploaded photos
* Users can edit their albums
* Users can delete their albums
### User Page
* Users can update their bio, names, profile picture, and cover photo

### Upcoming
#### Likes
* Users can like/unlike photos
#### Live notifications
* Users are notified whenever another user likes their photos
#### Follows
* users can subscribe to each other by following

#### Comment threads
* users can reply to comments on photos

------------------------------------------------------------------------------------------------------------------------------
# API ROUTES

## User Routes
### Route: /api/users [GET]
#### Description
Query for all users and returns them in a list of user dictionaries.

#### Request

Method: GET
<br>
URL: /api/users
<br>
#### Response

Status: 200 OK
<br>
Body:

```
{
    "users": [
        {
            "id": 1,
            "username": "john_doe",
            "first_name": "John",
            "last_name": "Doe",
            "cover_photo_url": "https://example.com/cover.jpg",
            "profile_image_url": "https://example.com/profile.jpg"
        },
        ...
    ]
}
```

------------------------------------------------------------------------------------------------------------------------------

### Route: /api/users/int:id [GET]
#### Description
Query for a user by id and returns that user in a dictionary.

#### Request

Method: GET
<br>
URL: /api/users/<int:id>

#### Response

Status: 200 OK
<br>
Body:

```
{
    "id": 1,
    "username": "john_doe",
    "first_name": "John",
    "last_name": "Doe",
    "cover_photo_url": "https://example.com/cover.jpg",
    "profile_image_url": "https://example.com/profile.jpg"
}
```

------------------------------------------------------------------------------------------------------------------------------

### Route: /api/users/int:id/edit [PUT]
#### Description
Queries for user by id, instantiates flask form, checks for new cover photo or new profile picture, and updates applicable properties with form data.

#### Request

Method: PUT
<br>
URL: /api/users/<int:id>/edit
<br>
Headers:
<br>
Content-Type: multipart/form-data
<br>
Body:

```
{
      "username": [string]
      "first_name": [string]
      "last_name": [string]
      "cover_photo": [file]
      "profile_pic": [file]
}
```

#### Response

Status: 200 OK
Body:

```
{
    "id": 1,
    "username": "john_doe",
    "first_name": "John",
    "last_name": "Doe",
    "cover_photo_url": "https://example.com/new_cover.jpg",
    "profile_image_url": "https://example.com/new_profile.jpg"
}
```

------------------------------------------------------------------------------------------------------------------------------


### Route: /api/users/int:id/bio/edit [PUT]
#### Description
Queries for user by id, instantiates flask form, and updates the user's bio with the provided data.

#### Request

Method: PUT
<br>
URL: /api/users/<int:id>/bio/edit
<br>
Headers:
<br>
Content-Type: application/json
<br>
Body:

```
{
    "bio": "New bio"
}
```

#### Response

Status: 200 OK
<br>
Body:

```
{
    "id": 1,
    "username": "john_doe",
    "first_name": "John",
    "last_name": "Doe",
    "cover_photo_url": "https://example.com/cover.jpg",
    "profile_image_url": "https://example.com/profile.jpg",
    "bio": "New bio"
}
```



## Authentication Routes

### Route: /api/auth [GET]
#### Description
Authenticates a user.

#### Request

Method: GET
<br>
URL: /api/auth
<br>

#### Response

Status: 200 OK
<br>
Body:

```
{
    "id": 1,
    "username": "john_doe",
    "first_name": "John",
    "last_name": "Doe",
    "cover_photo_url": "https://example.com/cover.jpg",
    "profile_image_url": "https://example.com/profile.jpg"
}
```

------------------------------------------------------------------------------------------------------------------------------


### Route: /api/auth/login [POST]

#### Description

Logs a user in.

#### Request

Method: POST
<br>
URL: /api/auth/login
<br>
Headers:
<br>
Content-Type: application/json
<br>
Body:

```
{
    "email": "user@example.com",
    "password": "password"
}
```

#### Response

Status: 200 OK
<br>
Body:

```
{
    "id": 1,
    "username": "john_doe",
    "first_name": "John",
    "last_name": "Doe",
    "cover_photo_url": "https://example.com/cover.jpg",
    "profile_image_url": "https://example.com/profile.jpg"
}
```

------------------------------------------------------------------------------------------------------------------------------

### Route: /api/auth/logout [GET]

#### Description

Logs a user out.

#### Request

Method: GET
<br>
URL: /api/auth/logout
<br>

#### Response

Status: 200 OK
<br>
Body:

```
{
    "message": "User logged out"
}
```

------------------------------------------------------------------------------------------------------------------------------

### Route: /api/auth/signup [POST]
#### Description
Creates a new user and logs them in.

#### Request

Method: POST
<br>
URL: /api/auth/signup
<br>
Headers:
<br>
Content-Type: application/json
<br>
Body:

```
{
    "username": "john_doe",
    "email": "user@example.com",
    "password": "password",
    "first_name": "John",
    "last_name": "Doe"
}
```

#### Response

Status: 200 OK
<br>
Body:

```
{
    "id": 1,
    "username": "john_doe",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe"
}
```

------------------------------------------------------------------------------------------------------------------------------

### Route: /api/auth/unauthorized [GET]

#### Description

Returns unauthorized JSON when Flask-Login authentication fails.

#### Request

Method: GET
<br>
URL: /api/auth/unauthorized

#### Response

Status: 401 Unauthorized
<br>
Body:

```
{
    "errors": ["Unauthorized"]
}
```

------------------------------------------------------------------------------------------------------------------------------


------------------------------------------------------------------------------------------------------------------------------


------------------------------------------------------------------------------------------------------------------------------


------------------------------------------------------------------------------------------------------------------------------


------------------------------------------------------------------------------------------------------------------------------


------------------------------------------------------------------------------------------------------------------------------


------------------------------------------------------------------------------------------------------------------------------


------------------------------------------------------------------------------------------------------------------------------







