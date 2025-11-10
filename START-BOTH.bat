@echo off
echo Starting Flyer Project...
echo.
start "Backend Server" cmd /k "cd /d %~dp0backend && npm.cmd start"
timeout /t 3 /nobreak >nul
start "Frontend Server" cmd /k "cd /d %~dp0frontend && npm.cmd run dev"
echo.
echo Both servers are starting in separate windows!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
pause

