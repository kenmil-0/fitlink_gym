# Fitlink API Testing Guide

## 🚀 Quick Start

### Base URL
```
http://192.168.1.179:8000/api/v1
```

### Test Connection
```bash
curl http://192.168.1.179:8000/api/v1/test
```

## 📋 Authentication Flow Testing

### 1. User Registration
```bash
curl -X POST http://192.168.1.179:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "role": "member"
  }'
```

**Expected Response:**
```json
{
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "test@example.com",
    "role": "member"
  },
  "token": "1|abc123..."
}
```

### 2. User Login
```bash
curl -X POST http://192.168.1.179:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Get Current User (Protected)
```bash
curl -X GET http://192.168.1.179:8000/api/v1/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```2|L86IFJo5EyBio6immbxDhjPTLTeXX5x5QSyBWKlP8c2378ef

### 4. Logout
```bash
curl -X POST http://192.168.1.179:8000/api/v1/auth/logout \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🏋️ Member API Testing

### Prerequisites
- Register/login as a member user
- Get authentication token

### 1. Get Member Subscription
```bash
curl -X GET http://192.168.1.179:8000/api/v1/member/subscription \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "status": "active",
  "plan": "Premium",
  "expires_at": "2024-12-31"
}
```

### 2. Get Member Workouts
```bash
curl -X GET http://192.168.1.179:8000/api/v1/member/workouts \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
[
  {
    "id": 1,
    "name": "Upper Body Strength",
    "duration": "45 min",
    "difficulty": "Intermediate",
    "completed": false
  },
  {
    "id": 2,
    "name": "Cardio Blast",
    "duration": "30 min",
    "difficulty": "Beginner",
    "completed": true
  }
]
```

### 3. Get Member Progress
```bash
curl -X GET http://192.168.1.179:8000/api/v1/member/progress \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "total_workouts": 12,
  "total_hours": 8.5,
  "progress_percentage": 85
}
```

## 🎯 Trainer API Testing

### Prerequisites
- Register/login as a trainer user
- Get authentication token

### 1. Get Trainer Clients
```bash
curl -X GET http://192.168.1.179:8000/api/v1/trainer/clients \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
[
  {
    "id": 1,
    "name": "Sarah Johnson",
    "progress": 75,
    "last_workout": "2 days ago",
    "email": "sarah@example.com"
  },
  {
    "id": 2,
    "name": "Mike Chen",
    "progress": 60,
    "last_workout": "1 day ago",
    "email": "mike@example.com"
  }
]
```

### 2. Get Trainer Routines
```bash
curl -X GET http://192.168.1.179:8000/api/v1/trainer/routines \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
[
  {
    "id": 1,
    "name": "Beginner Strength",
    "client_count": 8,
    "duration": "6 weeks",
    "difficulty": "Beginner"
  },
  {
    "id": 2,
    "name": "Advanced Cardio",
    "client_count": 5,
    "duration": "4 weeks",
    "difficulty": "Advanced"
  }
]
```

### 3. Create New Routine
```bash
curl -X POST http://192.168.1.179:8000/api/v1/trainer/routines \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Advanced Strength Training",
    "duration": "8 weeks",
    "difficulty": "Advanced",
    "description": "Comprehensive strength training program"
  }'
```

## 🏢 Gym Owner API Testing

### Prerequisites
- Register/login as a gym_owner user
- Get authentication token

### 1. Get Gym Members
```bash
curl -X GET http://192.168.1.179:8000/api/v1/gym-owner/members \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
[
  {
    "id": 1,
    "name": "John Smith",
    "plan": "Premium",
    "status": "active",
    "join_date": "2024-01-15",
    "email": "john@example.com"
  },
  {
    "id": 2,
    "name": "Lisa Brown",
    "plan": "Basic",
    "status": "active",
    "join_date": "2024-02-01",
    "email": "lisa@example.com"
  }
]
```

### 2. Get Revenue Data
```bash
curl -X GET http://192.168.1.179:8000/api/v1/gym-owner/revenue \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
[
  {"month": "Jan", "amount": 12500},
  {"month": "Feb", "amount": 13800},
  {"month": "Mar", "amount": 14200}
]
```

### 3. Get Subscriptions
```bash
curl -X GET http://192.168.1.179:8000/api/v1/gym-owner/subscriptions \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
[
  {
    "id": 1,
    "member_name": "John Smith",
    "plan": "Premium",
    "status": "active",
    "amount": 99.99
  }
]
```

## 🔧 Mobile App Testing

### 1. Test API Connection
- Open the Fitlink app
- Tap "Test API Connection" button on login screen
- Should show success message with timestamp

### 2. Test Authentication Flow
1. **Register**: Create new account with different roles
2. **Login**: Sign in with created credentials
3. **Auto-login**: Close and reopen app (should stay logged in)
4. **Logout**: Test logout functionality

### 3. Test Role-Based Dashboards
- **Member**: Check subscription, workouts, progress
- **Trainer**: Check clients, routines
- **Gym Owner**: Check members, revenue, subscriptions

## 🛠️ Testing Tools

### 1. Postman Collection
Create a Postman collection with these requests:

**Environment Variables:**
- `base_url`: `http://192.168.1.179:8000/api/v1`
- `token`: (set after login)

**Pre-request Script (for auth):**
```javascript
if (pm.environment.get("token")) {
    pm.request.headers.add({
        key: "Authorization",
        value: "Bearer " + pm.environment.get("token")
    });
}
```

### 2. cURL Scripts
Save these as `.sh` files for easy testing:

```bash
#!/bin/bash
# test_auth.sh

BASE_URL="http://192.168.1.179:8000/api/v1"

echo "Testing API connection..."
curl -s "$BASE_URL/test" | jq '.'

echo "Registering test user..."
TOKEN=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","password_confirmation":"password123","role":"member"}' \
  | jq -r '.token')

echo "Token: $TOKEN"

echo "Testing protected endpoint..."
curl -s -X GET "$BASE_URL/auth/profile" \
  -H "Authorization: Bearer $TOKEN" | jq '.'
```

### 3. JavaScript Testing
```javascript
// test_api.js
const axios = require('axios');

const BASE_URL = 'http://192.168.1.179:8000/api/v1';

async function testAPI() {
  try {
    // Test connection
    const testResponse = await axios.get(`${BASE_URL}/test`);
    console.log('API Test:', testResponse.data);

    // Register user
    const registerResponse = await axios.post(`${BASE_URL}/auth/register`, {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      password_confirmation: 'password123',
      role: 'member'
    });

    const token = registerResponse.data.token;
    console.log('Token:', token);

    // Test protected endpoint
    const profileResponse = await axios.get(`${BASE_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Profile:', profileResponse.data);

  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testAPI();
```

## 🚨 Error Testing

### 1. Invalid Credentials
```bash
curl -X POST http://192.168.1.179:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"wrong@email.com","password":"wrongpass"}'
```

### 2. Missing Token
```bash
curl -X GET http://192.168.1.179:8000/api/v1/auth/profile
```

### 3. Invalid Token
```bash
curl -X GET http://192.168.1.179:8000/api/v1/auth/profile \
  -H "Authorization: Bearer invalid_token"
```

### 4. Wrong Role Access
- Login as member, try to access trainer endpoints
- Login as trainer, try to access gym owner endpoints

## 📊 Expected Status Codes

- `200`: Success
- `201`: Created (registration)
- `401`: Unauthorized (invalid/missing token)
- `403`: Forbidden (wrong role)
- `404`: Not found
- `422`: Validation error
- `500`: Server error

## 🔍 Debugging Tips

1. **Check Laravel logs**: `tail -f storage/logs/laravel.log`
2. **Enable debug mode**: Set `APP_DEBUG=true` in `.env`
3. **Test with Postman**: Use the collection above
4. **Check network**: Ensure firewall allows port 8000
5. **Verify CORS**: Check if requests are blocked by browser

## 📱 Mobile App Integration Testing

1. **Environment Variable**: Verify `EXPO_PUBLIC_API_URL` is set correctly
2. **Network Requests**: Check if app can reach backend
3. **Token Storage**: Verify AsyncStorage saves/retrieves tokens
4. **Auto-refresh**: Test token refresh functionality
5. **Error Handling**: Test network errors and invalid responses

## 🎯 Test Scenarios Checklist

- [ ] API connection test
- [ ] User registration (all roles)
- [ ] User login/logout
- [ ] Token refresh
- [ ] Member dashboard data
- [ ] Trainer dashboard data
- [ ] Gym owner dashboard data
- [ ] Error handling
- [ ] Role-based access control
- [ ] Mobile app integration
- [ ] Network connectivity
- [ ] Data persistence

Run through this checklist to ensure all APIs are working correctly!
