@echo off
title Muhammad Jahanzaib - Modern Portfolio & CMS Admin
color 0A

echo ===================================================
echo   MUHAMMAD JAHANZAIB - MODERN PORTFOLIO SERVER
echo   Next.js 16 (App Router) + SQLite Embedded Database
echo ===================================================
echo.
echo [1/3] Checking environment & Prisma Client...
call npx prisma generate >nul 2>&1

echo [2/3] Checking if database is synced...
if not exist "prisma\dev.db" (
    echo Database file not found, creating and seeding initial data...
    call npx prisma db push
    call npx ts-node prisma\seed.ts
)

echo [3/3] Starting Next.js Development Server on Port 3000...
echo.
echo ===================================================
echo   Portfolio URL:    http://localhost:3000
echo   Admin Panel URL:  http://localhost:3000/admin
echo   Default Admin:    arainjhanzaib@gmail.com
echo   Default Password: adminpassword123
echo ===================================================
echo.
echo Press Ctrl + C to stop the server anytime.
echo.

npm run dev
pause

