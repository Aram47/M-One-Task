# 📘 User Management API Documentation

## 📌 Overview
The **User Management API** is a robust backend service built with **NestJS** and **Prisma ORM**. It enables user management, authentication, and a friendship system, allowing users to send, accept, and reject friend requests. 

## 🚀 Features
- **User Management**: Create, retrieve, update, and delete users.
- **Friendship System**: Send, accept, and reject friend requests.
- **Authentication & Authorization**: JWT-based authentication for secure access.
- **Custom Decorators & Pipes**: Enhancing request validation and handling.
- **Prisma ORM**: Efficient database management and query execution.
- **Security Guards**: `AuthGuard` ensures authentication, `FriendshipGuard` validates friend requests.

## 📂 Project Structure
```
/src
  ├── auth/                  # Authentication module (guards, strategies)
  ├── decorators/            # Custom decorators for user and friendship validation
  ├── dto/                   # Data transfer objects (DTOs) for request validation
  ├── pipes/                 # NestJS pipes for advanced validation
  ├── services/              # Business logic (UserService)
  ├── guards/                # Security guards (AuthGuard, FriendshipGuard)
  ├── user.controller.ts     # API controller handling user routes
  ├── user.service.ts        # Business logic and data management
  ├── main.ts                # Application entry point
```

## 🛠 Installation Guide
### Prerequisites
Ensure you have the following installed:
- Node.js (>=16.x)
- PostgreSQL or a compatible database
- Prisma CLI

### Installation Steps
1. **Clone the repository and install dependencies:**
```sh
git clone <repository_url>
cd <project_name>
npm install
```
2. **Set up environment variables:**
Create a `.env` file and configure it with the following:
```sh
DATABASE_URL="your_database_connection_string"
JWT_SECRET="your_secret_key"
```
3. **Run Prisma migrations:**
```sh
npx prisma migrate dev --name init
```
4. **Start the server:**
```sh
npm run start:dev
```

## 📡 API Endpoints
### User Management
| Method | Endpoint                         | Description               |
|--------|----------------------------------|---------------------------|
| GET    | `/user/getById/:id`             | Retrieve a user by ID     |
| GET    | `/user`                         | Search users              |
| PATCH  | `/user/editUser/:id`            | Update user details       |
| DELETE | `/user/:id`                     | Remove a user             |

### Friend Request System
| Method | Endpoint                          | Description                        |
|--------|-----------------------------------|------------------------------------|
| POST   | `/user/sendFriendRequest/:id`    | Send a friend request             |
| GET    | `/user/getFriendRequests`        | Fetch pending friend requests     |
| PATCH  | `/user/resolveFriendRequest/:id` | Accept or reject a friend request |

## 🔑 Authentication & Security
- **JWT Authentication**: Secure user authentication with JSON Web Tokens.
- **Authorization Guards**:
  - `AuthGuard`: Ensures only authenticated users access protected routes.
  - `FriendshipGuard`: Validates friend request operations.

## 🛠 Usage Examples
### Sending a Friend Request
```sh
POST /user/sendFriendRequest/:id
Headers: { Authorization: Bearer <token> }
```

### Accepting a Friend Request
```sh
PATCH /user/resolveFriendRequest/:id
Headers: { Authorization: Bearer <token> }
Body: { "status": "accepted" }
```

## 🚀 Future Improvements
- Implement Role-Based Access Control (RBAC)
- Add WebSocket support for real-time friend request notifications
- Extend API with GraphQL support

## 📜 License
This project is licensed under the MIT License.

---
🔧 **Built with NestJS, Prisma, and PostgreSQL**

