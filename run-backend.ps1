# Helper script to run npm commands in PowerShell
# This uses npm.cmd to avoid execution policy issues

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendPath = Join-Path $scriptPath "backend"

Write-Host "Starting backend server..." -ForegroundColor Cyan
Set-Location $backendPath
& npm.cmd start

