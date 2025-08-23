# Fitlink React Native App

A cross-platform mobile application for gym management with role-based access for Members, Trainers, and Gym Owners.

## 🚀 Features

### 🔐 Authentication
- Login and Registration with role selection
- JWT token-based authentication with Laravel Sanctum
- Role-based access control (Member, Trainer, Gym Owner)
- Automatic token refresh and "remember me" functionality
- Secure token storage with AsyncStorage

### 👤 Role-Based Dashboards

#### Member Dashboard
- Real-time subscription status from API
- Live workout tracking and progress
- Quick access to fitness routines
- Progress statistics with pull-to-refresh

#### Trainer Dashboard
- Real-time client management from API
- Workout routine creation and management
- Progress tracking for assigned clients
- Schedule management with live data

#### Gym Owner Dashboard
- Real-time member management from API
- Live revenue tracking and statistics
- Subscription management with live data
- Trainer oversight with dynamic data

### 🎨 Design & Styling
- **NativeWind** (Tailwind CSS for React Native)
- **Fitlink Brand Colors**:
  - Primary Green: `#22c55e`
  - Accent Orange: `#f97316`
  - Neutral Gray: `#1f2937`
- Modern, fitness-oriented UI design
- Smooth animations and transitions
- Loading states and error handling

### 🔧 API Integration
- **Laravel Sanctum** backend integration
- Automatic token refresh on 401 errors
- Role-based API endpoints
- Real-time data fetching
- Error handling and retry logic

## 🛠️ Tech Stack

- **React Native (Expo)** - Cross-platform development
- **TypeScript** - Type safety and better development experience
- **NativeWind** - Utility-first styling with Tailwind CSS
- **React Navigation** - Navigation between screens
- **Axios** - HTTP client for API requests with interceptors
- **AsyncStorage** - Local data persistence
- **Laravel Sanctum** - Backend authentication

## 📱 App Structure

```
fitlink-app/
├── src/
│   ├── navigation/
│   │   └── AppNavigator.tsx        # Role-based navigation with loading states
│   ├── screens/
│   │   ├── Auth/                   # Login, Register (connected to backend)
│   │   ├── Member/                 # Member dashboard (live API data)
│   │   ├── Trainer/                # Trainer dashboard (live API data)
│   │   └── GymOwner/               # Gym owner dashboard (live API data)
│   ├── components/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── LoadingSpinner.tsx
│   ├── hooks/                      # Custom hooks (auth, API)
│   │   └── useAuth.ts              # Enhanced with token refresh
│   └── utils/                      # API utilities, helpers
│       └── api.ts                  # Complete API integration
├── app.json
├── tailwind.config.js
├── babel.config.js
├── nativewind-env.d.ts
├── env.example                     # Environment configuration
├── BACKEND_SETUP.md               # Laravel backend setup guide
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)
- Laravel backend (see BACKEND_SETUP.md)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fitlink-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your API URL
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on device/simulator**
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   
   # For web
   npm run web
   ```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
EXPO_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### Backend Setup
Follow the `BACKEND_SETUP.md` guide to set up your Laravel backend with:
- Laravel Sanctum authentication
- Role-based API endpoints
- Database migrations
- Sample controllers with mock data

## 📱 API Integration

### Authentication Flow
1. **Login/Register** → Laravel Sanctum token
2. **Token Storage** → AsyncStorage with refresh token
3. **Auto Refresh** → Automatic token refresh on 401 errors
4. **Remember Me** → Persistent sessions across app restarts

### API Endpoints
- `POST /api/v1/register` - User registration
- `POST /api/v1/login` - User login
- `POST /api/v1/refresh` - Token refresh
- `POST /api/v1/logout` - User logout
- `GET /api/v1/user` - Get current user

#### Member Endpoints
- `GET /api/v1/member/subscription` - Get subscription status
- `GET /api/v1/member/workouts` - Get workouts
- `GET /api/v1/member/progress` - Get progress stats

#### Trainer Endpoints
- `GET /api/v1/trainer/clients` - Get assigned clients
- `GET /api/v1/trainer/routines` - Get created routines
- `POST /api/v1/trainer/routines` - Create new routine

#### Gym Owner Endpoints
- `GET /api/v1/gym-owner/members` - Get all members
- `GET /api/v1/gym-owner/revenue` - Get revenue data
- `GET /api/v1/gym-owner/subscriptions` - Get subscriptions

## 🎯 Key Components

### Reusable Components
- **Button** - Multiple variants (primary, secondary, outline)
- **Input** - Form inputs with validation
- **Card** - Content containers with consistent styling
- **LoadingSpinner** - Global loading states

### Custom Hooks
- **useAuth** - Enhanced authentication with token refresh
- **API utilities** - Centralized API calls with error handling

## 🔄 State Management
- React Context for authentication state
- AsyncStorage for persistent data
- Role-based navigation flow
- Loading states and error boundaries

## 🎨 Styling Guidelines

### Colors
```javascript
// Primary colors
primary-green: '#22c55e'
primary-orange: '#f97316'
neutral-gray: '#1f2937'

// Usage in components
className="bg-primary-green text-white"
className="text-primary-orange"
```

### Typography
- Headings: Poppins font family
- Body text: Inter font family
- Consistent text sizing with Tailwind classes

## 🚀 Deployment

### Building for Production
```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android
```

### App Store Deployment
1. Configure app.json with your app details
2. Build the production version
3. Submit to App Store/Google Play Store

## 🔧 Development

### Code Style
- TypeScript for type safety
- Functional components with hooks
- Consistent naming conventions
- Component-based architecture

### Testing
```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## 📚 API Documentation

The app includes pre-configured API endpoints for:
- Authentication (login, register, logout, refresh)
- Member operations (subscription, workouts, progress)
- Trainer operations (clients, routines)
- Gym Owner operations (members, revenue, subscriptions)

## 🔐 Security Features

- **Token-based Authentication** - Laravel Sanctum JWT tokens
- **Automatic Token Refresh** - Seamless session management
- **Secure Storage** - AsyncStorage for token persistence
- **Error Handling** - Graceful API error management
- **Role-based Access** - Protected routes and endpoints

## 🚀 Performance Features

- **Pull-to-Refresh** - Real-time data updates
- **Loading States** - Better user experience
- **Error Boundaries** - Graceful error handling
- **Optimized API Calls** - Efficient data fetching
- **Caching** - Local data persistence

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation
- Review BACKEND_SETUP.md for backend issues

---

**Fitlink** - Your fitness journey starts here! 💪

## 🔗 Quick Links

- [Backend Setup Guide](./BACKEND_SETUP.md)
- [Environment Configuration](./env.example)
- [API Documentation](./BACKEND_SETUP.md#api-endpoints)
