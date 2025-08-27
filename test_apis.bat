@echo off
echo ========================================
echo Fitlink API Testing Script
echo ========================================
echo.

set BASE_URL=http://192.168.1.179:8000/api/v1

echo 1. Testing API Connection...
curl -s "%BASE_URL%/test"
echo.
echo.

echo 2. Registering test member...
curl -s -X POST "%BASE_URL%/auth/register" -H "Content-Type: application/json" -d "{\"name\":\"Test Member\",\"email\":\"member@test.com\",\"password\":\"password123\",\"password_confirmation\":\"password123\",\"role\":\"member\"}"
echo.
echo.

echo 3. Registering test trainer...
curl -s -X POST "%BASE_URL%/auth/register" -H "Content-Type: application/json" -d "{\"name\":\"Test Trainer\",\"email\":\"trainer@test.com\",\"password\":\"password123\",\"password_confirmation\":\"password123\",\"role\":\"trainer\"}"
echo.
echo.

echo 4. Registering test gym owner...
curl -s -X POST "%BASE_URL%/auth/register" -H "Content-Type: application/json" -d "{\"name\":\"Test Gym Owner\",\"email\":\"owner@test.com\",\"password\":\"password123\",\"password_confirmation\":\"password123\",\"role\":\"gym_owner\"}"
echo.
echo.

echo ========================================
echo API Testing Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Use the tokens from registration to test protected endpoints
echo 2. Test the mobile app connection
echo 3. Check the API_TESTING_GUIDE.md for detailed testing instructions
echo.
pause
