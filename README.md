# Happy Meal - Restaurant Food App 🍔

A full-stack MERN application for online food ordering with secure payment integration and comprehensive admin management features.

## 🌟 Features

### Customer Features
- **User Authentication**: Secure login and registration with JWT tokens
- **Browse Menu**: View delicious food items with detailed descriptions and images
- **Category Filtering**: Easy navigation through different food categories
- **Shopping Cart**: Add, remove, and modify items in your cart
- **Secure Checkout**: Complete order with delivery information
- **Payment Integration**: Safe and secure payments via Stripe
- **Order Tracking**: Real-time order status updates
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)

### Admin Features
- **Admin Dashboard**: Comprehensive management panel
- **Menu Management**: Add, edit, and delete food items
- **Order Management**: View and update order statuses
- **Category Management**: Organize food items by categories
- **User Management**: Monitor registered users
- **Analytics**: Track orders and revenue

## 🛠️ Technologies Used

### Frontend
- **React.js** - Modern UI library for building interactive interfaces
- **CSS3** - Responsive styling and animations
- **JavaScript (ES6+)** - Modern JavaScript features
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling library

### Authentication & Security
- **JWT (JSON Web Tokens)** - Secure user authentication
- **bcrypt** - Password hashing and security

### Payment Processing
- **Stripe** - Secure online payment processing

## 📋 Prerequisites

Before running this project, ensure you have:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Stripe account for payment processing
- Git for version control

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/vishalsharma123321/Happy-Meal-MAIN-MERN-PROJECT.git
cd Happy-Meal-MAIN-MERN-PROJECT
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file in backend directory
touch .env
```

Add the following environment variables to your `.env` file:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/happymeal
# Or use MongoDB Atlas
# MONGODB_URI=Add_Your_URL.

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Email Configuration (optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory (open new terminal)
cd frontend

# Install dependencies
npm install

# Create .env file in frontend directory
touch .env
```

Add the following to frontend `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 4. Start the Application
```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend application (from frontend directory, new terminal)
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## 📱 Application Structure

```
Happy-Meal-MAIN-MERN-PROJECT/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   └── App.js
│   └── package.json
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   ├── config/
│   └── server.js
└── README.md
```

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (default: 'user'),
  address: {
    street: String,
    city: String,
    zipCode: String,
    country: String
  },
  createdAt: Date
}
```

### Food Item Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  available: Boolean,
  createdAt: Date
}
```

### Order Model
```javascript
{
  user: ObjectId,
  items: [{
    food: ObjectId,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  deliveryInfo: {
    name: String,
    address: String,
    phone: String
  },
  paymentStatus: String,
  orderStatus: String,
  createdAt: Date
}
```

## 🔐 Authentication Flow

1. **Registration**: User creates account with email and password
2. **Login**: User authenticates and receives JWT token
3. **Authorization**: Protected routes verify JWT token
4. **Role-based Access**: Admin routes require admin role

## 💳 Payment Integration

The app uses Stripe for secure payment processing:
- **Card Payments**: Credit/Debit card support
- **Security**: PCI DSS compliant
- **Real-time Processing**: Instant payment confirmation
- **Webhooks**: Automatic order status updates

## 🛡️ Security Features

- **Password Hashing**: bcrypt for secure password storage
- **JWT Authentication**: Stateless authentication
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Controlled cross-origin requests
- **Rate Limiting**: Protection against spam requests

## 📧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Food Items
- `GET /api/foods` - Get all food items
- `GET /api/foods/:id` - Get single food item
- `POST /api/foods` - Add new food item (Admin)
- `PUT /api/foods/:id` - Update food item (Admin)
- `DELETE /api/foods/:id` - Delete food item (Admin)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id` - Update order status (Admin)

### Payments
- `POST /api/payments/create-payment-intent` - Create Stripe payment intent
- `POST /api/payments/confirm` - Confirm payment


### Environment Variables for Production
Update your environment variables for production:
- Use MongoDB Atlas for database
- Update CORS origins
- Set NODE_ENV to 'production'
- Use production Stripe keys


## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Known Issues

- *List any known issues or limitations*

## 🔮 Future Enhancements

- [ ] Push notifications for order updates
- [ ] Multi-restaurant support
- [ ] Loyalty points system
- [ ] Social media integration
- [ ] Real-time chat support
- [ ] Mobile app development

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React.js team for the amazing frontend library
- Express.js for the robust backend framework
- MongoDB for the flexible database solution
- Stripe for secure payment processing
- All open-source contributors

## 📞 Support & Contact

If you have any questions, suggestions, or issues:

- **Email**: vishalsharma2212003@gmail.com
- **GitHub**: [vishalsharma123321](https://github.com/vishalsharma123321)
- **Issues**: [Project Issues](https://github.com/vishalsharma123321/Happy-Meal-MAIN-MERN-PROJECT/issues)

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub!

---

**Happy Coding! 🚀**

*Made with ❤️ by [Vishal Sharma](https://github.com/vishalsharma123321)*
