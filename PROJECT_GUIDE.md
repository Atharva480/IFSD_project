# Flyer Project - Complete User Guide

## 📋 Project Overview

**Flyer** (also called **PosterFly**) is a full-stack social media application for creating, sharing, and discovering flyers/posters. It's built with the MERN stack (MongoDB, Express, React, Node.js).

---

## 🏗️ Architecture

### **Backend (Node.js/Express)**
- **Port**: 5000
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer for image uploads

### **Frontend (React + Vite)**
- **Port**: 5173 (default Vite port)
- **Routing**: React Router
- **State Management**: React Context API
- **Styling**: Glass morphism design with CSS

---

## 🎯 Features

### 1. **User Authentication**
- ✅ Sign up with name, email, and password
- ✅ Login with email and password
- ✅ JWT token-based authentication
- ✅ Protected routes (require login)
- ✅ Logout functionality

### 2. **Flyer/Poster Creation**
- ✅ Upload images (flyers/posters)
- ✅ Add captions to flyers
- ✅ Image preview before posting
- ✅ Images stored in `backend/uploads/` folder

### 3. **Social Feed**
- ✅ View all flyers from all users
- ✅ Like flyers (heart button)
- ✅ Comment on flyers
- ✅ See author name and timestamp
- ✅ Real-time like count updates

### 4. **User Search**
- ✅ Search users by name
- ✅ View user profiles
- ✅ Follow/Unfollow users (backend ready)

### 5. **User Profile**
- ✅ View your own profile
- ✅ See your email and name
- ⚠️ "Your Flyers" section coming soon

### 6. **Theme Toggle**
- ✅ Light/Dark mode toggle
- ✅ Stored in browser context

---

## 📱 Pages & Navigation

### **Public Pages** (No login required)
1. **`/login`** - Login page
2. **`/signup`** - Sign up page

### **Protected Pages** (Require login)
1. **`/`** (Home) - Welcome page with user info
2. **`/feed`** - Main feed showing all flyers
3. **`/designer`** - Create and post new flyers
4. **`/profile`** - Your profile page
5. **`/search`** - Search for users
6. **`/user/:id`** - View other user profiles

### **Navigation Bar**
- **PosterFly** logo (links to Feed)
- **Feed** - View all flyers
- **Post** - Create new flyer
- **Search** - Find users
- **Profile** - Your profile
- **Theme Toggle** (🌙/☀️)
- **Logout** button

---

## 🗄️ Database Models

### **User Model**
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  followers: [User IDs],
  following: [User IDs],
  createdAt: Date,
  updatedAt: Date
}
```

### **Flyer Model**
```javascript
{
  author: User ID (required),
  authorName: String (required),
  imageUrl: String (required),
  caption: String,
  likes: Number (default: 0),
  likedBy: [User IDs],
  comments: [{
    user: User ID,
    text: String,
    createdAt: Date
  }],
  createdAt: Date
}
```

---

## 🔌 API Endpoints

### **Authentication Routes** (`/api/auth`)
- `POST /api/auth/signup` - Create new account
  - Body: `{ name, email, password }`
  - Returns: `{ _id, name, email, token }`

- `POST /api/auth/login` - Login
  - Body: `{ email, password }`
  - Returns: `{ _id, name, email, token }`

- `GET /api/auth/users/search?name=xxx` - Search users
  - Returns: Array of users (without passwords)

- `POST /api/auth/users/:id/follow` - Follow a user (requires auth)
- `POST /api/auth/users/:id/unfollow` - Unfollow a user (requires auth)

### **Flyer Routes** (`/api/flyers`)
- `GET /api/flyers` - Get all flyers (public)
  - Returns: Array of flyers sorted by newest first

- `POST /api/flyers` - Create new flyer (requires auth)
  - Content-Type: `multipart/form-data`
  - Body: `{ caption, image (file) }`
  - Returns: Created flyer object

- `POST /api/flyers/:id/like` - Like/Unlike a flyer (requires auth)
  - Returns: `{ likes, likedBy }`

- `POST /api/flyers/:id/comment` - Add comment (requires auth)
  - Body: `{ text }`
  - Returns: Array of all comments

### **Static Files**
- `GET /uploads/:filename` - Serve uploaded images

---

## 🚀 How to Use the Application

### **Step 1: Start the Servers**
1. **Backend**: `cd backend && npm.cmd start`
2. **Frontend**: `cd frontend && npm.cmd run dev` (in new terminal)

### **Step 2: Create an Account**
1. Open http://localhost:5173
2. Click "Create an account" or go to `/signup`
3. Enter your name, email, and password
4. You'll be automatically logged in

### **Step 3: Create Your First Flyer**
1. Click **"Post"** in the navbar (or go to `/designer`)
2. Click **"Choose File"** and select an image
3. Add a caption (optional)
4. Click **"Post Flyer"**
5. Your flyer will appear in the feed!

### **Step 4: Explore the Feed**
1. Click **"Feed"** in the navbar (or go to `/feed`)
2. See all flyers from all users
3. **Like** flyers by clicking the ❤️ button
4. **Comment** on flyers using the comment box
5. View comments from other users

### **Step 5: Search for Users**
1. Click **"Search"** in the navbar
2. Type a user's name
3. Click **"Search"**
4. Click on a user to view their profile

### **Step 6: View Your Profile**
1. Click **"Profile"** in the navbar
2. See your name, email, and avatar
3. (Your flyers list coming soon)

---

## 🔐 Authentication Flow

1. **Sign Up/Login** → Backend validates credentials
2. **Backend returns JWT token** → Stored in localStorage
3. **Frontend sends token** → In `Authorization: Bearer <token>` header
4. **Protected routes** → Check for valid token
5. **Logout** → Clear token from localStorage

---

## 📁 Project Structure

```
Flyer-main/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js  # Auth logic (signup, login, follow)
│   │   └── flyerController.js # Flyer logic (create, like, comment)
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT verification
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Flyer.js           # Flyer schema
│   ├── routes/
│   │   ├── authRoutes.js      # Auth endpoints
│   │   └── flyerRoutes.js     # Flyer endpoints
│   ├── uploads/               # Uploaded images
│   ├── utils/
│   │   └── generateToken.js   # JWT token generation
│   ├── .env                   # Environment variables
│   └── server.js              # Express server
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   └── SkeletonLoader.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx    # User state
    │   │   └── ThemeContext.jsx   # Theme state
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Feed.jsx
    │   │   ├── Designer.jsx
    │   │   ├── Profile.jsx
    │   │   ├── Search.jsx
    │   │   ├── Login.jsx
    │   │   └── Signup.jsx
    │   ├── services/
    │   │   └── api.js            # Axios configuration
    │   ├── styles/
    │   │   └── glass.css         # Glass morphism styles
    │   ├── App.jsx               # Main app component
    │   └── main.jsx              # Entry point
    └── vite.config.js            # Vite configuration
```

---

## 🎨 Design Features

- **Glass Morphism**: Modern frosted glass effect on cards
- **Responsive Design**: Works on different screen sizes
- **Theme Support**: Light/Dark mode toggle
- **Smooth Animations**: Loading states and transitions
- **Avatar Generation**: Uses UI Avatars API for user avatars

---

## 🔧 Configuration Files

### **Backend `.env`**
```
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```

### **Frontend `vite.config.js`**
- Proxies `/api` requests to `http://localhost:5000`
- This allows frontend to make API calls without CORS issues

---

## ⚠️ Current Limitations / Coming Soon

1. **Profile Page**: "Your Flyers" section not yet implemented
2. **User Profile**: Viewing other users' flyers not yet implemented
3. **Follow/Unfollow**: Backend ready, but UI not fully implemented
4. **Image Editor**: Basic upload only, no editing tools yet
5. **Notifications**: Not implemented
6. **Delete Flyers**: Not implemented

---

## 🐛 Troubleshooting

### **Backend won't start**
- Check MongoDB connection string in `.env`
- Make sure MongoDB is running or Atlas cluster is accessible
- Check if port 5000 is already in use

### **Frontend can't connect to backend**
- Make sure backend is running on port 5000
- Check `vite.config.js` proxy configuration
- Check browser console for CORS errors

### **Images not loading**
- Check if images are in `backend/uploads/` folder
- Verify backend is serving static files from `/uploads` route
- Check image URL in browser network tab

### **Authentication not working**
- Check if JWT token is in localStorage
- Verify token is being sent in request headers
- Check backend logs for token validation errors

---

## 📝 Quick Reference

| Action | Route | Method | Auth Required |
|--------|-------|--------|---------------|
| Sign Up | `/api/auth/signup` | POST | No |
| Login | `/api/auth/login` | POST | No |
| Get Flyers | `/api/flyers` | GET | No |
| Create Flyer | `/api/flyers` | POST | Yes |
| Like Flyer | `/api/flyers/:id/like` | POST | Yes |
| Comment | `/api/flyers/:id/comment` | POST | Yes |
| Search Users | `/api/auth/users/search` | GET | No |
| Follow User | `/api/auth/users/:id/follow` | POST | Yes |

---

## 🎓 Learning Points

This project demonstrates:
- Full-stack MERN development
- JWT authentication
- File uploads with Multer
- RESTful API design
- React Router for navigation
- Context API for state management
- Protected routes
- Social media features (likes, comments, follows)

---

**Happy Designing! 🎨**

