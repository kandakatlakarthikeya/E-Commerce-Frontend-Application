# 🛒 E-Commerce Frontend Application

A modern and responsive E-Commerce web application built using **React**, **Vite**, **Zustand**, **React Router**, and **Tailwind CSS**. The application allows users to browse products, search and filter products, sort products, add items to a cart, and manage their shopping experience with persistent cart storage.

---

## 🚀 Live Features

- Browse products from Fake Store API
- Search products by name
- Filter products by category
- Sort products by price and title
- Add products to cart
- Update product quantities
- Remove items from cart
- Persistent cart using local storage
- Responsive design for mobile, tablet, and desktop devices
- Fast navigation using React Router

---

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM

### State Management
- Zustand
- Zustand Persist Middleware

### Styling
- Tailwind CSS

### API Handling
- Axios

### Icons
- Lucide React

---

# 📥 Setup Instructions

## 1. Clone the Repository

```bash
git clone <repository-url>
cd E-Commerce-Frontend-Application
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Start the Development Server

```bash
npm run dev
```

The application will start on:

```bash
http://localhost:5173
```

## 4. Build for Production

```bash
npm run build
```

## 5. Preview Production Build

```bash
npm run preview
```

---

# 📂 Project Structure

```text
src/
│
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Layout.jsx
│   ├── ProductCard.jsx
│   ├── ProductFilters.jsx
│   └── MiniCart.jsx
│
├── pages/
│   ├── HomePage.jsx
│   ├── ProductsPage.jsx
│   └── CartPage.jsx
│
├── store/
│   ├── useProductStore.js
│   └── useCartStore.js
│
├── services/
│   └── api.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# 💡 Approach

## Product Management

The application fetches product data from the Fake Store API using Axios. Product information is stored in a Zustand store, which provides centralized state management and avoids unnecessary prop drilling.

### Product Features

- Fetch products from API
- Store products globally using Zustand
- Search products by title
- Filter products by category
- Sort products by:
  - Price (Low to High)
  - Price (High to Low)
  - Name (A-Z)

The filtering and sorting logic is implemented within the Zustand store to keep the UI components clean and reusable.

---

## Cart Management

A dedicated Zustand store is used to manage cart operations.

### Cart Functionalities

- Add product to cart
- Remove product from cart
- Increase quantity
- Decrease quantity
- Calculate subtotal
- Calculate shipping cost
- Calculate final order total

The cart state is persisted using Zustand Persist Middleware, ensuring that cart items remain available even after refreshing the page.

---

## State Management Strategy

Zustand was chosen because:

- Lightweight and simple to use
- Less boilerplate compared to Redux
- Easy integration with React
- Built-in persistence support
- Better readability for small and medium-sized applications

---

## Routing

React Router DOM is used to implement client-side navigation.

### Available Routes

| Route | Description |
|---------|-------------|
| `/` | Home Page |
| `/products` | Products Listing Page |
| `/cart` | Shopping Cart Page |

The application uses a shared layout component to maintain a consistent user experience across pages.

---

## UI and Responsiveness

The user interface is built using Tailwind CSS.

### Design Considerations

- Mobile-first approach
- Responsive grid layouts
- Reusable components
- Consistent spacing and typography
- Clean and modern design
- Fast rendering and optimized styling

---

## Error Handling

The application handles common API scenarios:

- Loading state while fetching data
- Error state for failed API requests
- Empty product list handling
- Empty cart handling

This improves overall user experience and prevents UI crashes.

---

# 📌 Assumptions Made

1. The Fake Store API is always available and returns valid product data.

2. Every product returned by the API contains:
   - Unique ID
   - Title
   - Price
   - Category
   - Image URL

3. Authentication and user accounts are not required for this assignment.

4. Cart data is stored locally in the browser and does not need backend synchronization.

5. Product stock availability is not tracked.

6. Multiple quantities of the same product can be added to the cart.

7. Product prices are assumed to be accurate and are directly displayed from the API response.

8. Product images provided by the API remain accessible.

9. Shipping charges are calculated using a simple business rule:
   - Orders above $100 receive free shipping.
   - Orders below $100 incur a $15 shipping fee.

10. Checkout and payment processing are outside the scope of this project.

---

# 🔮 Future Enhancements

The following features can be added in future versions:

- User Authentication
- User Profile Management
- Wishlist Functionality
- Product Details Page
- Product Reviews and Ratings
- Checkout Workflow
- Payment Gateway Integration
- Order Tracking
- Backend Integration
- Inventory Management
- Admin Dashboard
- Dark Mode Support

---

# 🌐 API Used

### Fake Store API

```text
https://fakestoreapi.com/products
```

The API is used to retrieve product information including title, price, category, description, and images.

---

# 🎯 Key Learning Outcomes

This project demonstrates:

- React Functional Components
- React Hooks
- State Management with Zustand
- API Integration using Axios
- Client-Side Routing
- Persistent State Storage
- Responsive UI Development
- Component-Based Architecture
- Modern Frontend Development Practices

---

# 👨‍💻 Author

Developed as part of an E-Commerce Frontend Assignment using React, Zustand, React Router, Axios, and Tailwind CSS.
