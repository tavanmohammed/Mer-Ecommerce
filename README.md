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

<img width="1429" height="777" alt="Screenshot 2026-02-08 at 4 14 58 PM" src="https://github.com/user-attachments/assets/c9631a09-0e87-477d-929c-9472d13a40e7" />
<img width="1440" height="781" alt="Screenshot 2026-02-08 at 4 15 16 PM" src="https://github.com/user-attachments/assets/d16f487f-1d9a-458e-9cc9-2c8df9b809e2" />

<img width="1423" height="776" alt="Screenshot 2026-02-08 at 4 15 29 PM" src="https://github.com/user-attachments/assets/45b0c457-bfca-4969-afc9-533b9a1a236c" />


<img width="1438" height="777" alt="Screenshot 2026-02-08 at 4 15 43 PM" src="https://github.com/user-attachments/assets/4605f69c-88f4-437a-bfa4-c040aef93228" />

<img width="1431" height="776" alt="Screenshot 2026-02-08 at 4 16 01 PM" src="https://github.com/user-attachments/assets/c6c1abf2-33c9-4a13-9926-cf4f5445ed29" />

<img width="1420" height="772" alt="Screenshot 2026-02-08 at 4 16 57 PM" src="https://github.com/user-attachments/assets/36523dcc-df9e-473d-b924-81156338e8eb" />


<img width="1433" height="779" alt="Screenshot 2026-02-08 at 4 17 13 PM" src="https://github.com/user-attachments/assets/78fe92fa-9382-4768-8172-42d95bb553a4" />

<img width="1434" height="777" alt="Screenshot 2026-02-08 at 4 17 52 PM" src="https://github.com/user-attachments/assets/b8f703d6-a844-49ee-a0f4-96a91387c9f7" />

<img width="1426" height="778" alt="Screenshot 2026-02-08 at 4 18 37 PM" src="https://github.com/user-attachments/assets/945d07eb-504e-4085-9822-8658016cd213" />

<img width="1440" height="777" alt="Screenshot 2026-02-08 at 4 19 24 PM" src="https://github.com/user-attachments/assets/bf3b7693-7565-4aed-b474-8ae28b55ee22" />

<img width="1428" height="778" alt="Screenshot 2026-02-08 at 4 19 43 PM" src="https://github.com/user-attachments/assets/872d3809-f4dc-4e41-b399-f299d7be673b" />

<img width="1426" height="776" alt="Screenshot 2026-02-08 at 4 20 03 PM" src="https://github.com/user-attachments/assets/d804bcf6-e005-41d2-ac35-52363493b663" />


<img width="1424" height="783" alt="Screenshot 2026-02-08 at 4 20 21 PM" src="https://github.com/user-attachments/assets/3db74706-67e1-43b2-8b8b-1be3bc1e7270" />



<img width="1394" height="792" alt="Screenshot 2026-02-08 at 4 20 40 PM" src="https://github.com/user-attachments/assets/c7e3b692-bf49-49aa-b593-c3473a54a7b3" />


<img width="1353" height="573" alt="Screenshot 2026-02-08 at 4 21 47 PM" src="https://github.com/user-attachments/assets/25c8fc90-28a3-4f3b-9957-605cfd896283" />


