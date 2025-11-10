# How to Update MongoDB Connection String

## Option 1: Manual Update
1. Open `backend/.env` file
2. Replace the `MONGO_URI` line with your MongoDB connection string:
   ```
   MONGO_URI=your-mongodb-connection-string-here
   ```
3. Make sure to keep the database name in the connection string or add it at the end

## Option 2: Using PowerShell
Run this command (replace YOUR_CONNECTION_STRING with your actual string):
```powershell
cd backend
(Get-Content .env) -replace 'MONGO_URI=.*', 'MONGO_URI=YOUR_CONNECTION_STRING' | Set-Content .env
```

## Example MongoDB Atlas Connection String Format:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/flyer?retryWrites=true&w=majority
```

