# Online Poster / Flyer Designer

A fullstack MERN app for designing posters and flyers online with authentication.

## Features
- User signup/login with JWT authentication
- Protected routes
- Poster/Flyer design tools (to be added)

## Prerequisites
- Node.js and npm installed
- MongoDB installed and running (or MongoDB Atlas connection string)

## Quick Start

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. The `.env` file has been created with default values. If you need to modify it:
   - `PORT=5000` - Backend server port
   - `MONGO_URI=mongodb://localhost:27017/flyer` - MongoDB connection string
   - `JWT_SECRET=your-secret-key-change-this-in-production` - JWT secret key

3. Install dependencies (already done):
   ```bash
   npm install
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies (already done):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Running the Project

1. **Make sure MongoDB is running** (or have your MongoDB Atlas connection string ready)
2. **Start the backend server** (runs on port 5000)
3. **Start the frontend server** (runs on port 5173 by default with Vite)
4. **Open your browser** to http://localhost:5173

## Troubleshooting

- **MongoDB Connection Error**: Make sure MongoDB is running or update the `MONGO_URI` in `backend/.env`
- **Port Already in Use**: Change the `PORT` in `backend/.env` or stop the process using that port
- **CORS Errors**: Check that the backend is running and the frontend proxy is configured correctly

For more detailed setup instructions, see [SETUP.md](./SETUP.md)
