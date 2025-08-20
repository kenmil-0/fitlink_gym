# 🏋️‍♂️ Fitlink - Gym Management & Subscription System

A comprehensive mobile-first gym management and subscription application designed specifically for the Nigerian market, starting with Asaba, Delta State.

## 🌟 Project Overview

**Fitlink** is a full-stack mobile application that revolutionizes how users discover, subscribe to, and interact with gyms in Nigeria. The system provides a seamless experience for gym users, gym owners, and administrators.

### 🎯 Target Market
- **Primary**: Asaba, Delta State, Nigeria
- **Secondary**: Expandable to other Nigerian cities
- **Focus**: Mobile-first approach for the growing Nigerian fitness community

## 🏗️ System Architecture

### 📱 Mobile App (React Native)
- **Platform**: iOS & Android
- **Language**: JavaScript/TypeScript
- **Features**: Gym discovery, subscription management, instructor booking, real-time chat

### 🌐 Web Landing Site (Next.js)
- **Purpose**: Promotional landing page only
- **Features**: App introduction, feature showcase, download links
- **Note**: No user interaction - purely informational

### 🔧 Backend API (Laravel)
- **Framework**: Laravel 12.x with PHP 8.2+
- **Authentication**: Laravel Sanctum
- **Database**: MySQL with Redis for caching/queues
- **API**: RESTful with versioning (v1)

## 🚀 Key Features

### 👥 For Gym Users
- **Gym Discovery**: Location-based gym search with filters
- **Subscription Management**: Flexible plans (daily to yearly)
- **Instructor Booking**: Schedule personal training sessions
- **Workout Routines**: Curated routines by body region and difficulty
- **Real-time Chat**: Communicate with instructors and gym staff
- **Push Notifications**: Stay updated on subscriptions, bookings, and offers

### 🏢 For Gym Owners
- **Gym Management**: Complete gym profile and settings
- **Member Management**: Track subscriptions and member data
- **Instructor Management**: Add and manage fitness instructors
- **Analytics Dashboard**: Revenue, membership, and booking insights
- **Payment Tracking**: Monitor subscription payments and revenue

### 👨‍💼 For Super Admins
- **Gym Approval**: Review and approve new gym applications
- **Fraud Management**: Investigate and resolve fraud reports
- **System Analytics**: Platform-wide statistics and insights
- **Content Management**: Manage workout routines and system content

## 💳 Payment Integration

### Supported Gateways
- **Paystack**: Primary payment processor for Nigerian market
- **Flutterwave**: Alternative payment gateway
- **Local Methods**: Bank transfers and card payments

### Subscription Plans
| Plan | Duration | Price (NGN) | Description |
|------|----------|--------------|-------------|
| Daily | 1 day | ₦500 | Single day access |
| Weekly | 7 days | ₦2,500 | Week-long access |
| Bi-weekly | 14 days | ₦4,500 | Two-week access |
| Monthly | 30 days | ₦8,000 | Monthly membership |
| Quarterly | 90 days | ₦22,000 | Three-month plan |
| Half Year | 180 days | ₦40,000 | Six-month plan |
| Yearly | 365 days | ₦70,000 | Annual membership |

## 🔐 User Roles & Permissions

### 1. **Gym User** (Default Role)
- Browse gyms and routines
- Subscribe to gym memberships
- Book instructor sessions
- Access chat and notifications
- Manage personal profile

### 2. **Gym Owner**
- All user permissions
- Manage gym profile and settings
- Add/remove instructors
- View gym analytics
- Manage member subscriptions

### 3. **Super Admin**
- All permissions
- Approve/reject gym applications
- Manage fraud reports
- System-wide analytics
- Content moderation

## 🗄️ Database Schema

### Core Entities
- **Users**: Authentication, profiles, roles
- **Gyms**: Gym information, status, verification
- **Instructors**: Trainer profiles, specializations, availability
- **Routines**: Workout plans, exercises, scheduling
- **Subscriptions**: Membership plans, status, renewal
- **Bookings**: Session scheduling, confirmation, completion
- **Payments**: Transaction tracking, gateway integration
- **Chats**: Real-time messaging system
- **Notifications**: Push notification management

### Relationships
- Users can have multiple subscriptions
- Gyms can have multiple instructors
- Instructors can have multiple bookings
- Users can participate in multiple chats
- All entities maintain audit trails

## 🔧 Technical Implementation

### Backend (Laravel)
- **API Versioning**: Structured v1 endpoints
- **Middleware**: Role-based access control
- **Validation**: Comprehensive input validation
- **Error Handling**: Standardized API responses
- **Caching**: Redis-based caching strategy
- **Queues**: Background job processing

### Authentication & Security
- **Sanctum Tokens**: Secure API authentication
- **Role Middleware**: Granular permission control
- **Input Sanitization**: XSS and injection protection
- **CORS Configuration**: Controlled cross-origin access
- **Rate Limiting**: API request throttling

### Database Design
- **Migrations**: Version-controlled schema changes
- **Indexing**: Optimized query performance
- **Relationships**: Proper foreign key constraints
- **Soft Deletes**: Data preservation strategy
- **Audit Logs**: Comprehensive activity tracking

## 📱 Mobile App Features

### Core Functionality
- **User Authentication**: Secure login/registration
- **Gym Discovery**: Map-based gym search
- **Subscription Management**: Plan selection and renewal
- **Booking System**: Instructor session scheduling
- **Chat Interface**: Real-time messaging
- **Push Notifications**: Timely updates and reminders

### User Experience
- **Offline Support**: Basic functionality without internet
- **Push Notifications**: Firebase Cloud Messaging
- **Real-time Updates**: Live chat and status changes
- **Responsive Design**: Optimized for all screen sizes
- **Dark Mode**: User preference support

## 🌐 Web Landing Site

### Purpose
- **App Introduction**: Feature showcase and benefits
- **Download Links**: App Store and Play Store links
- **Business Information**: Company details and contact
- **User Onboarding**: How the app works
- **Marketing Content**: Promotional materials

### Technology Stack
- **Framework**: Next.js with React
- **Styling**: Tailwind CSS or styled-components
- **Deployment**: Vercel or similar platform
- **SEO**: Optimized for search engines

## 🚀 Getting Started

### Prerequisites
- PHP 8.2+
- Composer
- MySQL 8.0+
- Redis
- Node.js 18+
- React Native development environment

### Quick Setup

1. **Clone Repository**
```bash
git clone <repository-url>
cd fitlink_gym
```

2. **Backend Setup**
```bash
cd backend
composer install
cp .env.example .env
# Configure database and other settings
php artisan migrate --seed
php artisan serve
```

3. **Frontend Setup** (Coming Soon)
```bash
cd frontend
npm install
npm run dev
```

4. **Mobile App Setup** (Coming Soon)
```bash
cd mobile
npm install
npx react-native run-android
# or
npx react-native run-ios
```

## 🧪 Testing

### Backend Testing
- **API Endpoints**: Test all CRUD operations
- **Authentication**: Verify role-based access
- **Validation**: Test input validation rules
- **Database**: Ensure data integrity

### Sample Data
The system includes comprehensive sample data:
- Test users (admin, gym owner, regular user)
- Sample gyms in Asaba
- Instructors with different specializations
- Workout routines and subscription plans
- Sample bookings and payments

## 🔒 Security Considerations

### Data Protection
- **Encryption**: Sensitive data encryption
- **Access Control**: Role-based permissions
- **Audit Logs**: Comprehensive activity tracking
- **Input Validation**: Prevent injection attacks
- **Rate Limiting**: Prevent abuse

### Compliance
- **GDPR**: Data privacy compliance
- **Local Laws**: Nigerian data protection regulations
- **Payment Security**: PCI DSS compliance for payments

## 📊 Performance & Scalability

### Optimization Strategies
- **Database Indexing**: Optimized query performance
- **Caching**: Redis-based caching system
- **API Pagination**: Efficient data loading
- **Image Optimization**: Compressed media files
- **CDN Integration**: Global content delivery

### Monitoring
- **Application Metrics**: Performance monitoring
- **Error Tracking**: Comprehensive error logging
- **User Analytics**: Usage pattern analysis
- **Performance Alerts**: Automated monitoring

## 🚀 Deployment

### Production Environment
- **Web Server**: Nginx or Apache
- **PHP**: PHP-FPM configuration
- **Database**: MySQL with replication
- **Caching**: Redis cluster
- **SSL**: HTTPS encryption
- **Monitoring**: Application performance monitoring

### CI/CD Pipeline
- **Automated Testing**: Run tests on deployment
- **Database Migrations**: Safe schema updates
- **Environment Management**: Staging and production
- **Rollback Strategy**: Quick deployment reversal

## 🤝 Contributing

### Development Guidelines
1. **Code Standards**: Follow PSR-12 for PHP
2. **Testing**: Write tests for new features
3. **Documentation**: Update relevant documentation
4. **Code Review**: Submit pull requests for review
5. **Testing**: Ensure all tests pass

### Project Structure
```
fitlink_gym/
├── backend/          # Laravel API
├── frontend/         # Next.js landing site
├── mobile/           # React Native app
├── docs/             # Documentation
└── README.md         # This file
```

## 📈 Future Roadmap

### Phase 1 (Current)
- ✅ Backend API development
- ✅ Database schema design
- ✅ Authentication system
- ✅ Basic CRUD operations

### Phase 2 (Next)
- 🔄 Frontend landing site
- 🔄 Mobile app development
- 🔄 Payment integration
- 🔄 Push notifications

### Phase 3 (Future)
- 📋 Advanced analytics
- 📋 Multi-language support
- 📋 Advanced booking system
- 📋 Social features

## 📞 Support & Contact

### Development Team
- **Backend Developer**: [Your Name]
- **Frontend Developer**: [Coming Soon]
- **Mobile Developer**: [Coming Soon]
- **Project Manager**: [Coming Soon]

### Contact Information
- **Email**: support@fitlink.com
- **Phone**: +234 XXX XXX XXXX
- **Address**: Asaba, Delta State, Nigeria

## 📄 License

This project is proprietary software developed for Fitlink Gym Management System. All rights reserved.

---

**Built with ❤️ for the Nigerian fitness community**

*Empowering fitness enthusiasts and gym owners across Nigeria*
