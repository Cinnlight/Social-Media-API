# Social Media API Server

A server-only example of a social media API built with Node.js, Apollo, Express, and Mongoose. This application demonstrates how to implement simultaneously working REST and Mongoose routes for common social media functionalities.

## Features

- **User Management**
  - Create a user
  - Update user information
  - Delete account

- **Friendship Management**
  - Friend a user
  - Add or remove friends

- **Thoughts (Posts)**
  - Add or remove a thought (post)
  - Add or remove a reaction (reply to a post)

## Technologies Used

- **Node.js**
- **Apollo Server**
- **Express.js**
- **Mongoose**

## Installation

1. **Clone the repository:**
   `git clone https://github.com/cinnlight/social-media-api-server.git`
2. **Navigate to the project directory:**
   `cd social-media-api-server`
3. **Install dependencies:**
   `npm install`
4. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add your MongoDB connection string:
     `MONGODB_URI=your_mongodb_connection_string`

## Video Demo
https://drive.google.com/file/d/19kFQySRtzBik_EJMTKeLHs1BocXdQZOG/view

## Usage

1. **Start the server:**
   `npm start`
2. **Interact with the API:**
   - Use **GraphQL Playground**, **Apollo Studio**, or tools like **Insomnia** to send server requests.
   - Available operations include creating users, managing friendships, adding/removing thoughts and reactions, and deleting accounts.

### Example GraphQL Queries & Mutations

```graphql
mutation {
  createUser(username: "johndoe", email: "johndoe@example.com") {
    _id
    username
    email
  }
}

mutation {
  addFriend(userId: "userId1", friendId: "userId2") {
    _id
    friends {
      _id
      username
    }
  }
}

mutation {
  addThought(userId: "userId", thoughtText: "This is a new thought!") {
    _id
    thoughtText
    createdAt
  }
}
```
## API Endpoints

- **REST Routes:**
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user
- *(Additional routes for friends, thoughts, and reactions)*

- **GraphQL Endpoint:**
- `/graphql` - Access GraphQL Playground

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or feedback, please contact [cinnlight@gmail.com](mailto:cinnlight@gmail.com).
