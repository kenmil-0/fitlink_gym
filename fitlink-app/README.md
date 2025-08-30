# Fitlink Mobile App

A comprehensive fitness app that connects gym members, instructors, and gym owners. Built with Expo React Native, TypeScript, and NativeWind.

## Features

### For Members
- **Gym Discovery**: Browse and select gyms in your area
- **Subscription Management**: Choose and manage gym subscriptions
- **QR Check-in**: Quick gym access with QR code
- **Workout Routines**: View personalized workout plans
- **Diet Tracking**: Monitor nutrition and meal plans
- **Notifications**: Real-time updates and reminders

### For Staff/Instructors
- **QR Scanner**: Scan member QR codes for check-in
- **Member Management**: View member information and status
- **Assignment Tracking**: Manage member assignments

### For Gym Owners
- **Dashboard**: Overview of gym operations and metrics
- **Member Management**: Comprehensive member administration
- **Revenue Tracking**: Monitor subscription and payment data
- **Analytics**: Performance insights and reports

## Tech Stack

- **Framework**: Expo React Native
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Storage**: Expo SecureStore
- **QR Code**: react-native-qrcode-svg
- **Barcode Scanner**: expo-barcode-scanner
- **Notifications**: expo-notifications

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd fitlink-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
# API Configuration
EXPO_PUBLIC_API_URL=http://192.168.1.xxx:8000/api/v1

# Firebase Configuration (for push notifications)
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

**Important**: Replace `192.168.1.xxx` with your actual backend server IP address.

### 4. Start the Development Server
```bash
npm start
```

### 5. Run on Device/Simulator
- **iOS**: Press `i` in the terminal or scan QR code with Expo Go app
- **Android**: Press `a` in the terminal or scan QR code with Expo Go app
- **Web**: Press `w` in the terminal

## Project Structure

```
src/
├── api/                    # API modules
│   ├── auth.ts            # Authentication endpoints
│   ├── gyms.ts            # Gym-related endpoints
│   ├── subscriptions.ts   # Subscription management
│   ├── checkin.ts         # Check-in functionality
│   └── notifications.ts   # Notification handling
├── components/            # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   └── LoadingSpinner.tsx
├── navigation/            # Navigation configuration
│   ├── RootNavigator.tsx  # Main navigation router
│   ├── AuthNavigator.tsx  # Authentication flow
│   ├── MemberTabs.tsx     # Member bottom tabs
│   ├── OwnerStack.tsx     # Gym owner navigation
│   └── StaffStack.tsx     # Staff navigation
├── screens/               # App screens
│   ├── Auth/             # Authentication screens
│   ├── Member/           # Member-specific screens
│   ├── Staff/            # Staff-specific screens
│   └── Owner/            # Owner-specific screens
├── store/                # State management
│   ├── useAuthStore.ts   # Authentication state
│   ├── useGymStore.ts    # Gym-related state
│   └── useNotifStore.ts  # Notification state
└── utils/                # Utility functions
    └── api.ts            # API configuration
```

## API Integration

The app integrates with a Laravel backend API. Key endpoints:

- **Authentication**: `/auth/login`, `/auth/register`, `/auth/logout`
- **Gyms**: `/gyms`, `/gyms/{id}`, `/gyms/{id}/plans`
- **Subscriptions**: `/subscriptions`, `/subscriptions/{id}`
- **Check-in**: `/check-in`
- **Notifications**: `/notifications`

## Testing the App

### 1. Member Flow
1. Register as a member
2. Browse and select a gym
3. Choose a subscription plan
4. Complete payment (mock)
5. Access member features (QR code, routines, etc.)

### 2. Staff Flow
1. Register as instructor/staff
2. Use QR scanner to check in members
3. View member information and status

### 3. Owner Flow
1. Register as gym owner
2. Access dashboard with gym metrics
3. Manage members and subscriptions

## Development Notes

### Mock Data
- The app includes mock data for development when backend endpoints are not available
- Check individual API modules for mock implementations
- Replace mocks with actual API calls as backend endpoints become available

### Environment Variables
- All API URLs use `EXPO_PUBLIC_API_URL` environment variable
- Update the IP address in `.env` to match your backend server
- For local development, use your computer's local IP address

### Permissions
- Camera permission required for QR scanning
- Notification permissions for push notifications
- Location permissions (optional, for gym discovery)

## Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check `EXPO_PUBLIC_API_URL` in `.env`
   - Ensure backend server is running
   - Verify network connectivity

2. **Camera Permission Denied**
   - Grant camera permission in device settings
   - Restart the app after granting permission

3. **Build Errors**
   - Clear Metro cache: `npx expo start --clear`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

4. **Navigation Issues**
   - Ensure all screen components are properly exported
   - Check navigation type definitions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Check the troubleshooting section
- Review API documentation
- Contact the development team
