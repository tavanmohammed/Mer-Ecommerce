Here’s a **clean, professional README** you can copy-paste directly into `README.md` for your project.
It’s written clearly, recruiter-friendly, and matches **exactly what you built**.

---

# 🛒 MER E-Commerce Platform

A full-stack **E-Commerce web application** built with a modern tech stack, featuring secure authentication, role-based access control, shopping cart, Stripe payments, and an admin dashboard.

This project demonstrates real-world backend + frontend integration, authentication flows, and payment processing.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User **signup / login / logout**
* JWT-based authentication with **access & refresh tokens**
* Secure **HTTP-only cookies**
* Protected routes using middleware
* **Role-based access control** (Admin vs User)

### 🛍️ E-Commerce Functionality

* Browse products by category
* Add / remove items from cart
* View order summary
* Apply coupons
* Stripe checkout integration
* Purchase success & cancel handling

### 🧑‍💼 Admin Dashboard

* Admin-only protected route
* Manage products
* Manage categories
* View analytics (sales / orders)
* Secure access based on user role

### ⚡ Performance & Reliability

* MongoDB for persistent data
* Redis (Upstash) for caching & refresh tokens
* Graceful fallback if Redis is unavailable
* Clean API structure with controllers & middleware

---

## 🧰 Tech Stack

### Frontend

* **React**
* **Vite**
* **Zustand** (state management)
* **Axios**
* **React Router**
* **Tailwind CSS**
* **Framer Motion**
* **Stripe.js**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB + Mongoose**
* **JWT (jsonwebtoken)**
* **Redis (Upstash)**
* **Stripe API**
* **Cloudinary** (image uploads)
* **Cookie-Parser**
* **CORS**

---

## 📁 Project Structure

```
MER-Ecommerce/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── lib/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── stores/
│   │   ├── lib/
│   │   └── App.jsx
│   └── .env
│
├── .gitignore
└── README.md
```

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

```env
PORT=4000
MONGO_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

STRIPE_SECRET_KEY=sk_test_...
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

NODE_ENV=development
```

### Frontend (`frontend/.env`)

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

> ⚠️ **Never commit `.env` files to GitHub**

---

## ▶️ Running the Project Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/tavanmohammed/Mer-Ecommerce.git
cd Mer-Ecommerce
```

### 2️⃣ Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3️⃣ Start the servers

```bash
# Backend
cd backend
node server.js

# Frontend (new terminal)
cd frontend
npm run dev
```

* Backend runs on: `http://localhost:4000`
* Frontend runs on: `http://localhost:5173`

---

## 💳 Stripe Checkout Flow

1. User proceeds to checkout
2. Backend creates a Stripe Checkout Session
3. Frontend redirects to Stripe Checkout
4. On success → `/purchase-success`
5. On cancel → `/purchase-cancel`

---

## 🔒 Security Highlights

* HTTP-only cookies (XSS protection)
* CORS with credentials enabled
* Password hashing with bcrypt
* Protected API routes
* Secure logout with cookie clearing
* Secrets stored in environment variables

---

## 📌 Future Improvements

* Order history page
* Email notifications
* Inventory management
* Pagination & search
* Deployment (Docker / AWS / Vercel)

Screenshot 2026-02-08 at 4.14.58 PM


