#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Fitlink App Structure...\n');

// Check required directories
const requiredDirs = [
  'src/api',
  'src/components',
  'src/navigation',
  'src/screens/Auth',
  'src/screens/Member',
  'src/screens/Staff',
  'src/screens/Owner',
  'src/store',
  'src/utils'
];

console.log('📁 Checking directory structure...');
let dirErrors = 0;
requiredDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`✅ ${dir}`);
  } else {
    console.log(`❌ ${dir} - Missing`);
    dirErrors++;
  }
});

// Check required files
const requiredFiles = [
  'src/api/auth.ts',
  'src/api/gyms.ts',
  'src/api/subscriptions.ts',
  'src/api/checkin.ts',
  'src/api/notifications.ts',
  'src/components/Button.tsx',
  'src/components/Input.tsx',
  'src/components/Card.tsx',
  'src/components/LoadingSpinner.tsx',
  'src/navigation/RootNavigator.tsx',
  'src/navigation/AuthNavigator.tsx',
  'src/navigation/MemberTabs.tsx',
  'src/navigation/OwnerStack.tsx',
  'src/navigation/StaffStack.tsx',
  'src/screens/Auth/WelcomeScreen.tsx',
  'src/screens/Auth/RoleSelectScreen.tsx',
  'src/screens/Auth/RegisterScreen.tsx',
  'src/screens/Auth/LoginScreen.tsx',
  'src/screens/Member/MemberHomeScreen.tsx',
  'src/screens/Member/GymDiscoveryScreen.tsx',
  'src/screens/Member/SubscriptionPlansScreen.tsx',
  'src/screens/Member/PaymentConfirmScreen.tsx',
  'src/screens/Member/MemberRoutinesScreen.tsx',
  'src/screens/Member/MemberDietScreen.tsx',
  'src/screens/Member/MemberProfileScreen.tsx',
  'src/screens/Member/NotificationCenter.tsx',
  'src/screens/Staff/ScanCheckInScreen.tsx',
  'src/screens/Owner/OwnerDashboardScreen.tsx',
  'src/store/useAuthStore.ts',
  'src/store/useGymStore.ts',
  'src/store/useNotifStore.ts',
  'src/utils/api.ts',
  'App.tsx',
  'package.json',
  'env.example'
];

console.log('\n📄 Checking required files...');
let fileErrors = 0;
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - Missing`);
    fileErrors++;
  }
});

// Check package.json dependencies
console.log('\n📦 Checking package.json dependencies...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = [
    '@react-navigation/native',
    '@react-navigation/native-stack',
    '@react-navigation/bottom-tabs',
    'axios',
    'zustand',
    'expo-secure-store',
    'expo-notifications',
    'expo-barcode-scanner',
    'react-native-qrcode-svg',
    'nativewind',
    'react-native-safe-area-context',
    'react-native-screens'
  ];

  let depErrors = 0;
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      console.log(`✅ ${dep}`);
    } else if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
      console.log(`✅ ${dep} (dev)`);
    } else {
      console.log(`❌ ${dep} - Missing`);
      depErrors++;
    }
  });

  console.log(`\n📊 Summary:`);
  console.log(`   Directories: ${requiredDirs.length - dirErrors}/${requiredDirs.length} ✅`);
  console.log(`   Files: ${requiredFiles.length - fileErrors}/${requiredFiles.length} ✅`);
  console.log(`   Dependencies: ${requiredDeps.length - depErrors}/${requiredDeps.length} ✅`);

  if (dirErrors === 0 && fileErrors === 0 && depErrors === 0) {
    console.log('\n🎉 All checks passed! The Fitlink app structure is complete.');
    console.log('\n🚀 Next steps:');
    console.log('   1. Set up your .env file with EXPO_PUBLIC_API_URL');
    console.log('   2. Run: npm start');
    console.log('   3. Test the app on your device or simulator');
  } else {
    console.log('\n⚠️  Some issues found. Please fix the missing items above.');
    process.exit(1);
  }

} catch (error) {
  console.error('❌ Error reading package.json:', error.message);
  process.exit(1);
}
