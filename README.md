# 📘 User Management API Documentation

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

---
🔧 **Built with NestJS, Prisma, and PostgreSQL**

