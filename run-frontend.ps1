# Helper script to run npm commands in PowerShell
# This uses npm.cmd to avoid execution policy issues

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$frontendPath = Join-Path $scriptPath "frontend"

Write-Host "Starting frontend server..." -ForegroundColor Cyan
Set-Location $frontendPath
& npm.cmd run dev

