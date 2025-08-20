# Fitlink Gym Management System - Backend API

A comprehensive Laravel-based backend API for the Fitlink gym management and subscription app, focused on the Nigerian market starting with Asaba.

## 🏗️ Architecture

- **Framework**: Laravel 12.x with PHP 8.2+
- **Authentication**: Laravel Sanctum for API tokens
- **Database**: MySQL with comprehensive migrations
- **API Versioning**: v1 with structured endpoints
- **Role-Based Access Control**: User, Gym Owner, Admin roles

## 🚀 Quick Start

### Prerequisites
- PHP 8.2 or higher
- Composer
- MySQL 8.0 or higher
- Redis (for queues and caching)

### Installation

1. **Clone and setup**
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

2. **Configure database**
```bash
# Update .env file with your database credentials
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fitlink_gym
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

3. **Run migrations and seeders**
```bash
php artisan migrate
php artisan db:seed --class=FitlinkSeeder
```

4. **Start the server**
```bash
php artisan serve
```

## 📊 Database Schema

### Core Entities

#### Users
- **Roles**: `user`, `gym_owner`, `admin`
- **Fields**: name, email, phone, location, role, profile_picture, bio, verification status

#### Gyms
- **Status**: `pending`, `approved`, `rejected`, `suspended`
- **Fields**: name, description, address, coordinates, amenities, operating hours, rating

#### Instructors
- **Status**: `active`, `inactive`, `suspended`
- **Fields**: name, specialization, experience, hourly rate, availability schedule

#### Subscriptions
- **Plans**: daily, weekly, bi-weekly, monthly, quarterly, half-year, yearly
- **Status**: `active`, `expired`, `cancelled`, `suspended`

#### Bookings
- **Status**: `pending`, `confirmed`, `completed`, `cancelled`, `no_show`
- **Payment Status**: `pending`, `paid`, `failed`, `refunded`

#### Payments
- **Methods**: Paystack, Flutterwave, Card, Bank Transfer
- **Status**: `pending`, `processing`, `completed`, `failed`, `cancelled`, `refunded`

## 🔐 Authentication

### Registration
```http
POST /api/v1/auth/register
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "phone": "+2348012345678",
    "location": "Asaba, Delta State",
    "role": "user"
}
```

### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "password123",
    "device_token": "firebase_token_here",
    "platform": "android"
}
```

### Protected Routes
Include the Bearer token in the Authorization header:
```http
Authorization: Bearer {your_token_here}
```

## 🌐 API Endpoints

### Public Routes (No Authentication)

#### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/forgot-password` - Password reset request
- `POST /api/v1/auth/reset-password` - Password reset

#### Gym Discovery
- `GET /api/v1/gyms` - List approved gyms with filters
- `GET /api/v1/gyms/{id}` - Get gym details
- `GET /api/v1/gyms/{id}/instructors` - Get gym instructors

#### Workout Routines
- `GET /api/v1/routines` - Browse workout routines
- `GET /api/v1/routines/{id}` - Get routine details

### Protected Routes (Authentication Required)

#### User Management
- `GET /api/v1/auth/profile` - Get user profile
- `PUT /api/v1/auth/profile` - Update profile
- `PUT /api/v1/auth/change-password` - Change password
- `POST /api/v1/auth/logout` - Logout
- `POST /api/v1/auth/device-token` - Store device token

#### Gym Management (Gym Owners)
- `POST /api/v1/gyms` - Create gym
- `PUT /api/v1/gyms/{id}` - Update gym
- `DELETE /api/v1/gyms/{id}` - Delete gym
- `GET /api/v1/my-gyms` - Get owned gyms
- `GET /api/v1/my-gyms/{id}/analytics` - Gym analytics

#### Instructor Management
- `POST /api/v1/instructors` - Add instructor
- `PUT /api/v1/instructors/{id}` - Update instructor
- `DELETE /api/v1/instructors/{id}` - Remove instructor

#### Subscriptions
- `GET /api/v1/subscriptions` - User subscriptions
- `POST /api/v1/subscriptions` - Create subscription
- `PUT /api/v1/subscriptions/{id}/cancel` - Cancel subscription
- `PUT /api/v1/subscriptions/{id}/renew` - Renew subscription

#### Bookings
- `GET /api/v1/bookings` - User bookings
- `POST /api/v1/bookings` - Book session
- `PUT /api/v1/bookings/{id}/cancel` - Cancel booking

#### Chat System
- `GET /api/v1/chats` - User chats
- `POST /api/v1/chats` - Create chat
- `GET /api/v1/chats/{id}/messages` - Get chat messages
- `POST /api/v1/chats/{id}/messages` - Send message

#### Notifications
- `GET /api/v1/notifications` - User notifications
- `PUT /api/v1/notifications/{id}/read` - Mark as read

### Admin Routes (Admin Only)

#### Gym Approval
- `GET /api/v1/admin/gym-applications` - List applications
- `PUT /api/v1/admin/gym-applications/{id}/approve` - Approve gym
- `PUT /api/v1/admin/gym-applications/{id}/reject` - Reject gym

#### Fraud Management
- `GET /api/v1/admin/fraud-reports` - List reports
- `PUT /api/v1/admin/fraud-reports/{id}/assign` - Assign investigation
- `PUT /api/v1/admin/fraud-reports/{id}/resolve` - Resolve report

## 🔧 Configuration

### Environment Variables

```env
# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fitlink_gym
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# Sanctum
SANCTUM_STATEFUL_DOMAINS=localhost:3000,localhost:8080

# CORS
CORS_ALLOWED_ORIGINS=localhost:3000,localhost:8080

# Firebase (for notifications)
FIREBASE_CREDENTIALS=path/to/firebase-credentials.json
FIREBASE_PROJECT_ID=your-project-id

# Payment Gateways
PAYSTACK_SECRET_KEY=your_paystack_secret
FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret
```

### Queue Configuration

```env
QUEUE_CONNECTION=redis
REDIS_QUEUE=default
```

## 📱 Sample Data

After running the seeder, you'll have access to:

### Test Accounts
- **Admin**: `admin@fitlink.com` / `password123`
- **Gym Owner**: `john@fitnesspro.com` / `password123`
- **User**: `mike@example.com` / `password123`

### Sample Data
- 2 gyms in Asaba
- 2 instructors with different specializations
- 2 workout routines (Full Body & Core)
- Sample subscriptions and bookings
- Chat conversations
- Device tokens and notifications

## 🧪 Testing

### API Testing
```bash
# Test authentication
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"mike@example.com","password":"password123"}'

# Test protected route
curl -X GET http://localhost:8000/api/v1/auth/profile \
  -H "Authorization: Bearer {your_token}"
```

### Database Testing
```bash
# Refresh database
php artisan migrate:fresh --seed

# Run specific seeder
php artisan db:seed --class=FitlinkSeeder
```

## 🚀 Deployment

### Production Checklist
- [ ] Set `APP_ENV=production`
- [ ] Configure production database
- [ ] Set up Redis for queues
- [ ] Configure Firebase credentials
- [ ] Set payment gateway keys
- [ ] Configure CORS origins
- [ ] Set up SSL certificates
- [ ] Configure web server (Nginx/Apache)

### Performance Optimization
```bash
# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Queue workers
php artisan queue:work --daemon
```

## 🔒 Security Features

- **Sanctum Authentication**: Secure API token management
- **Role-Based Access Control**: Granular permissions
- **Input Validation**: Comprehensive request validation
- **SQL Injection Protection**: Eloquent ORM with prepared statements
- **CORS Configuration**: Controlled cross-origin requests
- **Rate Limiting**: API request throttling

## 📚 Additional Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Laravel Sanctum](https://laravel.com/docs/sanctum)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Redis Documentation](https://redis.io/documentation)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary software for Fitlink Gym Management System.

---

**Built with ❤️ for the Nigerian fitness community**
