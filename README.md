# Todo API

A simple, RESTful Todo API built with Node.js, Express, and MongoDB. It provides full CRUD operations with additional features like search, sorting, and pagination. The API follows best practices with centralized error handling and asynchronous middleware.

## Features

- **Create** a new todo
- **Retrieve** all todos (with optional search, sort, and pagination)
- **Retrieve** a single todo by ID
- **Update** an existing todo
- **Toggle** completion status (mark as done/pending)
- **Delete** a todo
- Input validation and error handling
- Environment-based configuration

## Tech Stack

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- [dotenv](https://github.com/motdotla/dotenv) for environment variables
- [CORS](https://github.com/expressjs/cors) enabled

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/todo-api.git
   cd todo-api
   ```
2. **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```
3. **Set up environment variables**

    Create a .env file in the root directory and add the following:
    ```bash
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    ```
    Replace your_mongodb_connection_string with your actual MongoDB URI (e.g., mongodb://localhost:27017/todo_db or a cloud URI).
4. **Start the server**
    ```bash
    npm start
    # or for development with auto-reload
    npm run dev
    ```
    The server will start on the defined port (default 3000).