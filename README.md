# 🌾 Agroecology InfoHub API

A clean, scalable, and well-tested RESTful API built with **Node.js**, **Express**, and **MongoDB Atlas**, designed to power an agroecology information platform.

This API handles **product listings**, **FAQs**, **blogs**, **regional outlet data**, **file ingestion**, and **JWT-based user authentication**, while supporting internationalization and bulk uploads.

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express  
- **Database:** MongoDB Atlas (Mongoose ORM)  
- **Auth:** JSON Web Tokens (JWT)  
- **File Uploads:** Multer  
- **Testing:** Jest, Supertest  
- **i18n:** i18next middleware

---

## 📁 Project Structure

```bash
├── app.js                 # Express app configuration
├── server.js              # DB connection and server startup
├── config/
│   └── db.js              # MongoDB connection logic
├── controllers/           # Business logic for routes
├── routes/                # Route definitions
├── models/                # Mongoose schemas
├── middleware/            # Custom middleware (auth, i18n, etc.)
├── uploads/               # Temporary storage for file uploads
├── tests/                 # Automated tests using Jest & Supertest
├── data/                  # Sample JSON files for ingestion
├── .env / .env.test       # Environment variables
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Nyamori2024/agroecology-api.git
cd agroecology-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/agro-chemical?retryWrites=true&w=majority
JWT_SECRET=yourSuperSecretKey
```

Create `.env.test` for test isolation:

```env
MONGO_URI_TEST=mongodb+srv://<user>:<password>@cluster0.mongodb.net/agro-chemical-test?retryWrites=true&w=majority
JWT_SECRET=yourSuperSecretKey
```

### 4. Start the server

```bash
npm start
```

> The server runs at: http://localhost:5000

---

## 🧪 Run Tests

```bash
npm test
```

- Uses `.env.test` for a separate test database
- Cleans collections after each run
- Handles JWT auth, file uploads, and user flows

Troubleshoot test hangs:

```bash
npm test -- --detectOpenHandles
```

---

## 🔐 Authentication (JWT)

- **Register:** `POST /users/register`
- **Login:** `POST /users/login`

Use the returned token for protected routes like `/blogs`:

```
Authorization: Bearer <your-token>
```

---

## 🌍 Internationalization

- Set `Accept-Language: fr` or `sw` (defaults to English)
- Supported in `/products` and `/faqs`

---

## 📦 File Ingestion

Upload JSON files to bulk-ingest data:

- `POST /ingest/:type`

| Type      | Description                   |
|-----------|------------------------------|
| products  | Agricultural products         |
| faqs      | Frequently Asked Questions    |
| outlets   | Regional outlet data          |
| blogs     | Blog articles                 |

**Example:**

```bash
curl -F "file=@data/products.json" http://localhost:5000/ingest/products
```

Uploaded files are stored in `/uploads`.

---

## 🌐 API Overview

| Method | Endpoint            | Description                    | Auth |
|--------|---------------------|--------------------------------|------|
| GET    | /products           | Get product list               | ❌   |
| GET    | /outlets            | List outlets by region         | ❌   |
| GET    | /faqs               | Common questions               | ❌   |
| GET    | /blogs              | Public blog articles           | ❌   |
| POST   | /blogs              | Create new blog (JWT required) | ✅   |
| GET    | /dashboard          | Sample dashboard metrics       | ❌   |
| POST   | /ingest/:type       | Bulk upload JSON files         | ❌   |
| POST   | /users/register     | Register a user                | ❌   |
| POST   | /users/login        | Login and retrieve JWT         | ❌   |

---

## 📌 Highlights

✅ Modular architecture  
✅ Secure user auth with hashed passwords  
✅ Production-ready MongoDB Atlas integration  
✅ Clean teardown and test isolation  
✅ Internationalization and dynamic content  
✅ Simple file upload logic with Multer  
✅ 100% working REST endpoints with 90%+ test coverage  

---

## 📸 Sample Demo Flow

In your recorded video or live presentation:

1. Register a user → receive JWT  
2. Upload sample `products.json` via `/ingest/products`  
3. Retrieve products list via `/products`  
4. Access a protected endpoint with the JWT  
5. Run `npm test` to show green tests and teardown logs

---

## 📁 .gitignore

```
node_modules/
.env
.env.test
uploads/
coverage/
logs/
*.log
.DS_Store
```

---

## 👨‍💻 Author

**Christian Abuto**  
Frontend & Backend Developer 

---

💡 **Pro Tip:** MongoDB Atlas doesn’t allow `dropDatabase()` — tests use `deleteMany()` for safe and efficient cleanup.

---

🚜 **Happy Coding!**  
If something breaks, check your `.env` setup, MongoDB access permissions, or internet connection.
