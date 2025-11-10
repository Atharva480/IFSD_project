# Setup Instructions

## Prerequisites
- Node.js and npm installed
- MongoDB installed and running (or MongoDB Atlas connection string)

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a `.env` file in the `backend` directory with the following content:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/flyer
   JWT_SECRET=your-secret-key-change-this-in-production
   ```
   
   **Note:** 
   - If using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string
   - Change `JWT_SECRET` to a secure random string in production

3. Install dependencies (if not already installed):
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

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Running the Project

1. Make sure MongoDB is running locally (or have your MongoDB Atlas connection string ready)
2. Start the backend server (runs on port 5000)
3. Start the frontend server (runs on port 5173 by default with Vite)
4. Open your browser to the frontend URL (usually http://localhost:5173)

## Troubleshooting

- **MongoDB Connection Error**: Make sure MongoDB is running or update the `MONGO_URI` in `.env`
- **Port Already in Use**: Change the `PORT` in `.env` or stop the process using that port
- **CORS Errors**: Check that the backend is running and the frontend proxy is configured correctly

