# API-Craftify

## Overview
Craftify API is designed to support the functionalities of the Craftify application, enabling users to manage DIY projects effectively and interact with Google Cloud Storage for file uploads. This documentation provides details about the API endpoints, request/response structures, and other essential features.

* Cloud Architecture
  ![Cloud Architecture](https://drive.google.com/uc?id=1s3S1IT_f1dOJFsC1fvdEvFUfUaKGBdsP)

## 🔗Base URL
```
https://craftify-backend-677363691640.asia-southeast2.run.app
```
## Get Started
Clone `repository` with command:
```
git clone https://github.com/C242-PS132-Craftify/API-Craftify.git

```
Install `dependencies` with command:
```
npm install
```

---
### API

#### API For Blog
1. Post Blog
   - **Method**: `POST`
   - **Endpoint**: `/`
   - **Body Request**:

     | Parameter      | Type     | 
     |----------------|----------|
     | `title`        | `string` | 
     | `author`       | `string` | 
     | `content`      | `string` | 
     | `header_image` | `string` | 

     *Example:*
     ```json
     {
       "title": "Bookshelf Cardboard",
       "author": "alil-hd",
       "content": "How to make bookshelf",
       "header_image": "https://storage.googleapis.com/craftify-blog-bucket/918467.jpg"
     }
     ```
   - **Body Response**:
     
     *Example*
     ```json
     {
       "title": "Bookshelf Cardboard",
       "author": "alil-hd",
       "content": "How to make bookshelf",
       "header_image": "https://storage.googleapis.com/craftify-blog-bucket/918467.jpg",
       "user_id": "5u2G9t1WLxWJpJidyAKPThMZmO82",
       "createdAt": "Dec 7, 2024, 12:57:43.236 PM"
     }
     ```
     
2. Get Blog
   - **Method**: `GET`
   - **Endpoint**: `/`
   - **Body Response**:

     *Example:*
     ```json
     [
       {
       "title": "Bookshelf Cardboard",
       "author": "alil-hd",
       "content": "How to make bookshelf",
       "header_image": "https://storage.googleapis.com/craftify-blog-bucket/918467.jpg",
       "user_id": "5u2G9t1WLxWJpJidyAKPThMZmO82",
       "createdAt": "Dec 7, 2024, 12:57:43.236 PM"
       },
       ...
     ]
     
     ```

#### API For Upload Image
1. Upload Scanned Image
   - **Method**: `POST`
   - **Endpoint**: `/scan-image`
   - **Body Request**: `form-data`
     
     | Key            | value          | 
     |----------------|----------------|
     | `file`         | `Select files` |

   - **Body Response**:
     
     *Example:*
      ```json
     {
       "message": "File uploaded successfully",
       "url": "https://storage.googleapis.com/item-uploaded-bucket/1733055586040-plastic_bottle.jpg",
     }
     ```
  
2. Upload Blog Image
   - **Method**: `POST`
   - **Endpoint**: `/blog-image`
   - **Body Request**: `form-data`
     
     | Key            | value          | 
     |----------------|----------------|
     | `file`         | `Select files` |
   
   - **Body Response**:
     
     *Example:*
      ```json
     {
       "message": "File uploaded successfully",
       "url": "https://storage.googleapis.com/craftify-blog-bucket/JPEG_1733797346935_6294779736510253822.jpg",
     }
     ```


## 👨‍💻Authors:
* [mickeyjiyestha](https://github.com/mickeyjiyestha)
* [alilhamdani18](https://github.com/alilhamdani18)




