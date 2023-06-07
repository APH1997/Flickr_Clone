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

## Content Feed

## User Page - Photos

## User Page - Albums

## Photo By Id

## Album By Id

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


