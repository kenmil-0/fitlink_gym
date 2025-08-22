# Fitlink React Native App

A cross-platform mobile application for gym management with role-based access for Members, Trainers, and Gym Owners.

## 🚀 Features

### 🔐 Authentication
- Login and Registration with role selection
- JWT token-based authentication
- Role-based access control (Member, Trainer, Gym Owner)

### 👤 Role-Based Dashboards

#### Member Dashboard
- Subscription status overview
- Workout tracking and progress
- Quick access to fitness routines
- Progress statistics

#### Trainer Dashboard
- Client management
- Workout routine creation
- Progress tracking for assigned clients
- Schedule management

#### Gym Owner Dashboard
- Member management
- Revenue tracking
- Subscription management
- Trainer oversight

### 🎨 Design & Styling
- **NativeWind** (Tailwind CSS for React Native)
- **Fitlink Brand Colors**:
  - Primary Green: `#22c55e`
  - Accent Orange: `#f97316`
  - Neutral Gray: `#1f2937`
- Modern, fitness-oriented UI design
- Smooth animations and transitions

## 🛠️ Tech Stack

- **React Native (Expo)** - Cross-platform development
- **TypeScript** - Type safety and better development experience
- **NativeWind** - Utility-first styling with Tailwind CSS
- **React Navigation** - Navigation between screens
- **Axios** - HTTP client for API requests
- **AsyncStorage** - Local data persistence

## 📱 App Structure

```
fitlink-app/
├── src/
│   ├── navigation/
│   │   └── AppNavigator.tsx        # Role-based navigation
│   ├── screens/
│   │   ├── Auth/                   # Login, Register
│   │   ├── Member/                 # Member dashboard, workouts
│   │   ├── Trainer/                # Trainer dashboard, routines
│   │   └── GymOwner/               # Gym owner dashboard, subscriptions
│   ├── components/                 # Reusable UI components
│   ├── hooks/                      # Custom hooks (auth, API)
│   └── utils/                      # API utilities, helpers
├── app.json
├── tailwind.config.js
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

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

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
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

### API Integration
The app is configured to connect to a Laravel backend. Update the `EXPO_PUBLIC_API_URL` in your environment variables to point to your backend server.

## 📱 Screenshots

### Authentication
- Login screen with email/password
- Registration with role selection
- Form validation and error handling

### Member Dashboard
- Subscription status
- Workout overview
- Progress tracking
- Quick actions

### Trainer Dashboard
- Client management
- Routine creation
- Progress monitoring
- Schedule overview

### Gym Owner Dashboard
- Member management
- Revenue tracking
- Subscription overview
- Management actions

## 🎯 Key Components

### Reusable Components
- **Button** - Multiple variants (primary, secondary, outline)
- **Input** - Form inputs with validation
- **Card** - Content containers with consistent styling

### Custom Hooks
- **useAuth** - Authentication state management
- **API utilities** - Centralized API calls

## 🔄 State Management
- React Context for authentication state
- AsyncStorage for persistent data
- Role-based navigation flow

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
- Authentication (login, register, logout)
- Workouts management
- Member management
- Trainer operations
- Subscription handling

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

---

**Fitlink** - Your fitness journey starts here! 💪
