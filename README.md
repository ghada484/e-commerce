# 🛍️ Shoply — E-Commerce Website

A modern and responsive e-commerce web application built with React.js.

Shoply provides a complete online shopping experience with product browsing, search and filtering, authentication, cart management, wishlist, checkout, and order tracking.

## 🚀 Live Demo

https://e-commerce-lime-six-32.vercel.app/

## 📂 GitHub Repository

https://github.com/ghada484/e-commerce

## ✨ Features

### 🏠 Home Page

* Hero section
* Product categories
* Flash deals
* Best sellers
* New arrivals
* Recommended products
* Popular brands
* Newsletter subscription
* Responsive footer

### 🛍️ Products

* Fetch products from DummyJSON API
* Search products
* Filter by category
* Filter by brand
* Price range filtering
* Rating filtering
* Stock availability filter
* Product sorting
* Pagination

### 📦 Product Details

* Product images and thumbnails
* Product information
* Price and discount
* Stock availability
* Quantity control
* Color and size selection
* Customer reviews
* Related products
* Add to cart
* Add/remove from wishlist

### 🛒 Shopping Cart

* Add products to cart
* Increase/decrease quantity
* Stock-limit validation
* Remove products
* Move products to wishlist
* Automatic subtotal and total calculation
* Cart item counter

### ❤️ Wishlist

* Add/remove products
* Wishlist counter
* Move products to cart
* Persistent wishlist using LocalStorage

### 🔐 Authentication

* User registration
* User login
* Logout
* Protected routes
* Persistent authentication using LocalStorage

### 💳 Checkout

* Shipping information
* Form validation
* Payment method selection
* Order summary
* Shipping calculation
* Order placement

### 📦 Orders

* Order history
* Order details
* Order status
* Shipping information
* Payment information
* Order totals

### 🔔 Notifications

* Success notifications
* Error notifications
* Informational notifications
* Toast notifications for cart, wishlist, and orders

### 📱 Responsive Design

Fully responsive layout for:

* Desktop
* Tablet
* Mobile

## 🛠️ Technologies

* React.js
* JavaScript ES6+
* HTML5
* CSS3
* React Router
* Context API
* Axios
* REST API
* LocalStorage
* Create React App
* DummyJSON API
* Vercel

## 🧠 React Concepts Used

* Functional Components
* React Hooks
* `useState`
* `useEffect`
* `useContext`
* Context API
* React Router
* Protected Routes
* API Integration
* State Management
* LocalStorage
* Conditional Rendering
* Reusable Components

## 📁 Project Structure

```text
src/
├── assets/
│   └── images/
│
├── Components/
│   ├── BestSellers/
│   ├── Brands/
│   ├── Categories/
│   ├── FlashDeals/
│   ├── Footer/
│   ├── Hero/
│   ├── Loading/
│   ├── Navbar/
│   ├── NewArrivals/
│   ├── Newsletter/
│   ├── ProductCard/
│   ├── ProtectedRoute/
│   ├── Recommended/
│   └── Toast/
│
├── Pages/
│   ├── Cart/
│   ├── Checkout/
│   ├── Home/
│   ├── Login/
│   ├── NotFound/
│   ├── OrderDetails/
│   ├── Orders/
│   ├── ProductDetails/
│   ├── Products/
│   ├── Profile/
│   ├── Register/
│   └── Wishlist/
│
├── context/
│   ├── AuthContext.js
│   ├── CartContext.js
│   ├── OrdersContext.js
│   ├── ProductsContext.js
│   ├── ToastContext.js
│   └── WishlistContext.js
│
├── data/
│   └── products.js
│
├── App.js
└── index.js
```

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/ghada484/e-commerce.git
```

Navigate to the project:

```bash
cd e-commerce
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The application will run on:

```text
http://localhost:3000
```

## 🔌 API

Product data is provided by:

https://dummyjson.com/

Axios is used to communicate with the API.

## 💾 Data Persistence

The application uses LocalStorage to persist:

* User authentication
* Registered users
* Shopping cart
* Wishlist
* Orders

## 📌 Future Improvements

* Real payment gateway integration
* Backend API integration
* Product reviews submission
* Real user accounts
* Admin dashboard
* Product management
* Order management
* Advanced product variants
* Dark mode

## 👩‍💻 Developer

**Ghada Abdalla**

Frontend Developer | React.js

GitHub:
https://github.com/ghada484

---

⭐ If you find this project useful, feel free to explore the repository.
