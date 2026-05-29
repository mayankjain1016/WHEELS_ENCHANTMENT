@echo off
echo ========================================
echo Wheels Enchntment
 - Admin Panel Check
echo ========================================
echo.

echo [1/5] Checking Node.js...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js not found!
    pause
    exit /b 1
)
echo ✓ Node.js installed
echo.

echo [2/5] Checking MongoDB...
sc query MongoDB | find "RUNNING" >nul
if %errorlevel% neq 0 (
    echo WARNING: MongoDB service not running
    echo Starting MongoDB...
    net start MongoDB
) else (
    echo ✓ MongoDB is running
)
echo.

echo [3/5] Checking Backend Dependencies...
cd backend
if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
) else (
    echo ✓ Backend dependencies installed
)
cd ..
echo.

echo [4/5] Checking Frontend Dependencies...
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo ✓ Frontend dependencies installed
)
echo.

echo [5/5] Checking Environment Files...
if not exist ".env" (
    echo WARNING: Frontend .env file not found!
) else (
    echo ✓ Frontend .env exists
)

if not exist "backend\.env" (
    echo WARNING: Backend .env file not found!
) else (
    echo ✓ Backend .env exists
)
echo.

echo ========================================
echo Setup Check Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Open TWO terminal windows
echo 2. Terminal 1: cd backend ^&^& npm run dev
echo 3. Terminal 2: npm run dev
echo 4. Open browser: http://localhost:5173/admin/login
echo.
echo Admin Credentials:
echo Email: admin@wheelsenchantment.com
echo Password: Admin@123456
echo.
echo For detailed testing guide, see TEST_ADMIN.md
echo.
pause
