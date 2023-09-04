# Files Manager Backend

This project is a backend application built using Node.js, Express.js, MongoDB, Redis, and other technologies. It serves as a simple platform to upload and manage files, focusing on user authentication, file storage, and background processing of image thumbnails.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Requirements](#requirements)
3. [Getting Started](#getting-started)
4. [API Endpoints](#api-endpoints)
5. [Background Processing](#background-processing)
6. [Contributing](#contributing)
7. [License](#license)

## Project Overview

This backend application is designed to provide the following functionality:

- User authentication via tokens
- Listing all files
- Uploading new files
- Changing file permissions
- Viewing files
- Generating thumbnails for images

The project aims to teach various backend concepts, including building an Express.js API, user authentication, data storage in MongoDB, temporary data storage in Redis, and background processing using Bull.

### Learning Objectives

By completing this project, you will gain knowledge in the following areas:

- Creating an API with Express.js
- Implementing user authentication
- Storing data in MongoDB
- Managing temporary data with Redis
- Setting up and using a background worker

## Requirements

### Environment

- Node.js (Version 12.x.x)
- Ubuntu 18.04 LTS (for development)
- Code Editor (e.g., Visual Studio Code)
- `npm` package manager

### Dependencies

Ensure you have installed the required npm packages by running:

```bash
npm install


### Allowed Editors

You can use the following text editors for this project:

- vi
- vim
- emacs
- Visual Studio Code

## Getting Started

Follow these steps to set up and run the project:

1. Clone this repository:

```bash
git clone <repository-url>


* Install project dependencies:

```bash
npm install

* Start the Express.js server:

```bash
npm start

## Accessing the API

You can access the API at [http://localhost:5000](http://localhost:5000).

## API Endpoints

### 1. Redis Utilities

Inside the `utils` folder, a Redis utility class `RedisClient` is provided. It includes functions to interact with Redis:

- `isAlive`: Check if the connection to Redis is successful.
- `get`: Retrieve a value from Redis based on a key.
- `set`: Store a value in Redis with an expiration time.
- `del`: Remove a value from Redis.

### 2. MongoDB Utilities

Inside the `utils` folder, a MongoDB utility class `DBClient` is provided. It includes functions to interact with MongoDB:

- `isAlive`: Check if the connection to MongoDB is successful.
- `nbUsers`: Get the number of user documents in the users collection.
- `nbFiles`: Get the number of file documents in the files collection.

### 3. First API

The Express server in `server.js` listens on a specified port and loads routes from `routes/index.js`. Two endpoints are defined:

- `GET /status`: Returns the status of Redis and MongoDB.
- `GET /stats`: Returns the number of users and files in the database.

### 4. Create a New User

A new endpoint `POST /users` is added to create a new user. It requires an email and password, and the password is securely hashed before storage.

### 5. Authenticate a User

Three new endpoints are added:

- `GET /connect`: Sign in a user by generating an authentication token.
- `GET /disconnect`: Sign out a user by deleting the authentication token.
- `GET /users/me`: Retrieve the user's information based on the authentication token.

### 6. First File

An endpoint `POST /files` is added to create new files, including text files and images. Files are stored both in the database and locally, with their content securely stored.

### 7. Get and List Files

Two new endpoints are added:

- `GET /files/:id`: Retrieve a specific file's information based on its ID.
- `GET /files`: Retrieve a list of files based on optional query parameters for pagination and filtering.

### 8. File Publish/Unpublish

Two endpoints are added to toggle a file's publish status:

- `PUT /files/:id/publish`: Set a file as public.
- `PUT /files/:id/unpublish`: Set a file as private.

### 9. File Data

An endpoint `GET /files/:id/data` is added to retrieve a file's content. The content is served based on the file's MIME type.

## Background Processing

The project uses Bull and a background worker (`worker.js`) to generate image thumbnails for uploaded images.

## Contributing

Contributions are welcome! If you have any suggestions or want to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Open a pull request to the main repository.

Your contributions help improve this project!
