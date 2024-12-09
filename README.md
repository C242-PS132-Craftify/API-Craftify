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
   - **method**: `POST`
   - **endpoint**: `/`
   - **body request**:

     | Parameter      | Type     | 
     |----------------|----------|
     | `title`        | `string` | 
     | `author`       | `string` | 
     | `content`      | `string` | 
     | `header_image` | `string` | 
     | `createdAt`    | `string` | 

     **Example:**
     ```
     {
       "title": "Bookshelf Cardboard",
       "author": "alil-hd",
       "content": "How to make bookshelf",
       "header_image": "https://storage.googleapis.com/craftify-blog-bucket/918467.jpg",
       "createdAt": "Dec 7, 2024, 12:57:43.236 PM"
     }
     ```
2. Get Blog
   - **method**: `GET`
   - **endpoint**: `/`
   - **body request**:

     | Parameter      | Type     | 
     |----------------|----------|
     | `title`        | `string` | 
     | `author`       | `string` | 
     | `content`      | `string` | 
     | `header_image` | `string` | 
     | `createdAt`    | `string` | 

     **Example:**
     ```
     {
       "title": "Bookshelf Cardboard",
       "author": "alil-hd",
       "content": "How to make bookshelf",
       "header_image": "https://storage.googleapis.com/craftify-blog-bucket/918467.jpg",
       "createdAt": "Dec 7, 2024, 12:57:43.236 PM"
     }
     ...
     ```


## 👨‍💻Authors:
* [mickeyjiyestha](https://github.com/mickeyjiyestha)
* [alilhamdani18](https://github.com/alilhamdani18)




