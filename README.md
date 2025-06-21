# 🌱 Agroecology Content API

A modular and scalable backend API for the **Agroecology InfoHub** platform, built with **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Setup

1. **Clone this repository:**

   ```bash
   git clone https://github.com/your-username/agroecology-api.git
   cd agroecology-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root directory with the following:

   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/agro-chemical?retryWrites=true&w=majority
   JWT_SECRET=yourSuperSecretKey
   ```

   Replace `<username>` and `<password>` with your MongoDB Atlas credentials, or use your local MongoDB URI if preferred.

4. **Start the server:**

   ```bash
   npm start
   ```

   The server will start on: [http://localhost:5000](http://localhost:5000)

---

## 🧪 Testing

Run the API test suite using:

```bash
npm test
```

If any test hangs or fails to exit:

```bash
npm test -- --detectOpenHandles
```

---

## 📦 Data Ingestion

Use the `/ingest/:type` endpoint to upload bulk JSON data:

- `:type` can be: `products`, `faqs`, `outlets`, or `blogs`.

**Example (cURL):**

```bash
curl -F "file=@data/products.json" http://localhost:5000/ingest/products
```

---

## 🌍 API Endpoints

| Method | Endpoint         | Description                               | Auth |
|--------|------------------|-------------------------------------------|------|
| GET    | /products        | List of products (supports i18n)          | ❌   |
| GET    | /outlets         | Outlet locations with regions & coords    | ❌   |
| GET    | /faqs            | List of FAQs (supports i18n)              | ❌   |
| GET    | /blogs           | List all blog posts                       | ❌   |
| POST   | /blogs           | Create blog post (JWT required)           | ✅   |
| GET    | /dashboard       | Get mock dashboard stats                  | ❌   |
| POST   | /ingest/:type    | Bulk ingest via JSON file upload          | ❌   |
| POST   | /users/register  | Register a new user                       | ❌   |
| POST   | /users/login     | Login and get JWT token                   | ❌   |

---

## 🔐 Authentication

- Register a user via: `POST /users/register`
- Login to receive a JWT: `POST /users/login`
- Use JWT for protected routes (e.g., `POST /blogs`):

**Example Header:**

```makefile
Authorization: Bearer <your-token>
```

---

## 🌐 Internationalization

Supported for products and FAQs. Use the `Accept-Language` header:

```makefile
Accept-Language: fr
```

Defaults to `en` if not provided.

---

## ✅ Notes

- MongoDB connection is handled in `server.js` using a reusable connectDB utility.
- Tests are implemented with Jest and Supertest.
- Project is modular with separation of concerns: routes, controllers, models, and middleware.
- Uses `.env` for sensitive config and secrets.

---

## 📁 .gitignore

```gitignore
node_modules/
.env
coverage/
logs/
*.log
build/
.DS_Store
```

---

## 📸 Demonstration

Use Postman or curl to demonstrate:

- At least 3 working API endpoints
- Valid data ingestion and retrieval
- Authentication flow (optional bonus)

---

🚜 **Happy Building!**

If something breaks, double-check your `.env` and MongoDB settings first.