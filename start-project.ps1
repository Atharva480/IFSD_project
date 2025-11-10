# Script to start both backend and frontend servers
# Uses npm.cmd to avoid PowerShell execution policy issues

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

# Check if .env exists
if (-not (Test-Path "$scriptPath\backend\.env")) {
    Write-Host "ERROR: backend/.env file not found!" -ForegroundColor Red
    Write-Host "Please create it with your MongoDB connection string." -ForegroundColor Yellow
    exit 1
}

Write-Host "Starting Flyer Project..." -ForegroundColor Green
Write-Host ""

# Start backend server
Write-Host "Starting backend server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptPath\backend'; npm.cmd start"

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start frontend server
Write-Host "Starting frontend server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptPath\frontend'; npm.cmd run dev"

Write-Host ""
Write-Host "Both servers are starting!" -ForegroundColor Green
Write-Host "Backend: http://localhost:5000" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to exit this window (servers will continue running)..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
