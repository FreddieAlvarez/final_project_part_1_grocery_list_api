# Grocery List API

This API allows users to manage grocery lists and items. Users can create accounts, create lists, add items to lists, update them, and delete them. It's built with Node.js, Express, Sequelize, and SQLite.

---

# Project Structure
```
project/
│── app.js
│── server.js
│── package.json
│── .env
│
├── models/
├── routes/
├── controllers/
│
└── middleware/
     ├── logger.js
     └── errorHandler.js
```

### Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/FreddieAlvarez/final_project_part_1_grocery_list_api.git 
```

2. Install dependencies:

```bash
npm install
```

3. Set up the database:

```bash
npm run setup
```

4. Seed database:
```bash
npm run seed
```

5. Start the server:
```bash
npm start
```

6. Run tests if you want:

```bash
npm test
```

# API Endpoints

Users

**POST /users**  
Create a new user.  

**Body parameters:**  
- `email` (string)  
- `password` (string)  
- `role` (string)  

**Example Request:**
```json
{
  "email": "test@example.com",
  "password": "password123",
  "role": "user"
}
```
**Example Response**
```json
{
  "id": 1,
  "email": "test@example.com",
  "role": "user"
}
```
**Response:**  
- `201 Created` with the created user object  

---

**GET /users**  
Retrieve all users.  

**Response:**  
- `200 OK` with an array of user objects  

---

**GET /users/:id**  
Retrieve a user by ID.  

**Response:**  
- `200 OK` with the user object  
- `404 Not Found` if the user does not exist  

---

### Lists

**POST /lists**  
Create a new list.  

**Body parameters:**  
- `name` (string)  
- `userId` (integer)  

**Example Request**
```json
{
  "name": "Weekly Groceries",
  "userId": 1
}
```
**Example Response**
```json
{
  "id": 1,
  "name": "Weekly Groceries",
  "userId": 1
}
```
**Response:**  
- `201 Created` with the created list object  

---

**GET /lists**  
Retrieve all lists.  

**Response:**  
- `200 OK` with an array of list objects  

---

**GET /lists/:id**  
Retrieve a list by ID.  

**Response:**  
- `200 OK` with the list object  
- `404 Not Found` if the list does not exist  

---

### Items

**POST /items**  
Create a new item.  

**Body parameters:**  
- `name` (string)  
- `purchased` (boolean)  
- `listId` (integer)  

**Example Request**
```json
{
  "name": "Milk",
  "purchased": false,
  "listId": 1
}
```
**Example Response**
```json
{
  "id": 1,
  "name": "Milk",
  "purchased": false,
  "listId": 1
}
```
**Response:**  
- `201 Created` with the created item object  

---

**GET /items**  
Retrieve all items.  

**Response:**  
- `200 OK` with an array of item objects  

---

**GET /items/:id**  
Retrieve an item by ID.  

**Response:**  
- `200 OK` with the item object  
- `404 Not Found` if the item does not exist  

---

**PUT /items/:id**  
Update an item.  

**Body parameters (any or all):**  
- `name` (string)  
- `purchased` (boolean)  
- `listId` (integer)  

**Response:**  
- `200 OK` with the updated item object  

---

**DELETE /items/:id**  
Delete an item.  

**Response:**  
- `200 OK` if deleted successfully  
- `404 Not Found` if the item does not exist  