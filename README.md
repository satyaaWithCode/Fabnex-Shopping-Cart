# Fabnex – Modern MERN Ecommerce Platform

Fabnex is a full-stack ecommerce application built using **React.js + Node.js + Express + MongoDB**, featuring OTP-based login, admin product management, cart/checkout system, order tracking, and production-ready backend architecture.

This project replicates features from modern ecommerce stores like **Layerzz, Bewakoof, Urbanic, Zara**, etc.

---

## 🚀 Features

### 🔐 Authentication
- Login using **Email + OTP** (No password required)
- Secure **JWT auth** stored in httpOnly cookies
- Role-based access → **User / Admin**
- Protected routes using middleware

---

## 🛒 User Features
- View all products added by admin
- Click any product → view details page
- Select sizes, view descriptions, price, images
- Add items to Cart
- Checkout
- Save shipping address
- Payment-ready structure (Razorpay/Stripe can be added)
- View **Order History** after login

---

## 👨‍💼 Admin Features
- Add products with complete details:
  - title  
  - description  
  - long description  
  - price  
  - compare price  
  - sizes  
  - stock  
  - tags  
  - multiple images  
- Update / Delete products
- View all orders placed by users

---

## 📦 Order Management
Each order contains:
- User details
- Items (product, qty, size)
- Shipping address
- Total price
- Payment status
- Created & updated timestamps

Users can view all their previous orders after login.

---

## 🧪 API Endpoints

### **Auth Routes**
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/auth/send-otp` | Send OTP to email |
| POST | `/api/auth/verify-otp` | Verify OTP & login |
| GET | `/api/auth/me` | Get logged in user |
| POST | `/api/auth/logout` | Logout |

### **Product Routes**
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:slug` | Get product by slug |
| POST | `/api/products` | Add product (Admin) |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### **Order Routes**
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/orders` | Create order |
| GET | `/api/orders/me` | Get logged-in user's orders |
| PUT | `/api/orders/:id/pay` | Mark order as paid |

---

## 🛠 Tech Stack

### **Frontend**
- React.js (Vite)
- Tailwind CSS
- Axios

### **Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- Nodemailer (OTP emails)
- JWT authentication

### **Security**
- httpOnly cookies
- CORS
- Helmet
- Rate limiting (can be added)

---

## 📁 Project Structure

