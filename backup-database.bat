@echo off
title Muhammad Jahanzaib - Cloud Database Backup
color 0A
echo ====================================================
echo   Muhammad Jahanzaib Portfolio - Cloud DB Backup
echo ====================================================
echo.
echo Fetching latest records from Neon Cloud Database...
echo.

node scripts/backup.js

echo.
echo Backup file created successfully!
echo Press any key to open the backups folder...
pause >nul
start backups
