# 🧑‍💻 User Management Backend (FeathersJS + PostgreSQL)

This is the **backend service** for the User Management Dashboard.  
It is built using **FeathersJS (v5 - Dove)** with a **PostgreSQL database**.

---

## 🚀 Features
- REST API with FeathersJS  
- PostgreSQL for persistent storage  
- User CRUD operations
- Input validation with Feathers schema  
- Gender filtering support 

---

## 📂 Project Structure
src/
services/
users/
    users.class.js
    users.js
    users.schema.js
migrations/
    20250824093905_users.js
config/


---

## ⚙️ Prerequisites
Make sure you have installed:

- [Node.js](https://nodejs.org/) (v16 or later recommended)  
- [PostgreSQL](https://www.postgresql.org/) (running locally)  
- [npm](https://www.npmjs.com/)  

---

## 🔧 Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/user-management-backend.git
cd user-management-backend


### 2. Install dependencies
npm install

### 3. Configure Database

Update your Postgres connection string in config/default.json:

{
  "postgres": "postgres://username:password@localhost:5432/your_database"
} 

(Insert your password and username)

### 4. Run database migrations
npm run migrate

### 5. (Optional) Seed database with dummy data
npm run seed


### Running the Server

Start development server:

npm start


API Endpoints
#Get all users
GET /users

Returns only users with deleted=false.

#Add a new user
POST /users
Content-Type: application/json

{
  "name": "Alice",
  "email": "alice@example.com",
  "gender": "Female"
}

Edit a user
PATCH /users/:id

{
  "name": "Alice Updated",
  "email": "alice.updated@example.com"
}

Soft delete a user
DELETE /users/:id


Marks user as deleted=true instead of removing.

Filter users by gender
GET /users?gender=Male
GET /users?gender=Female
GET /users        # all genders

✅ Notes

All new users default to deleted=false.

The deleted flag cannot be set or modified from the frontend.

The DELETE request internally performs a soft delete (PATCH { deleted: true }).