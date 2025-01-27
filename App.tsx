import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProfileScreen from './screens/ProfileScreen';
import QuickActionsScreen from './screens/QuickActionsScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import About from './screens/About';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Dashboard: { onLogout: () => void }; // Pass onLogout to Dashboard
  Settings: undefined;
  'Add Profiles': undefined;
  Statistics: undefined;
  Notifications: undefined;
  QuickActions: undefined;
  Feedback: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              initialParams={{ onLogout: handleLogout }} // Pass onLogout here
            />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Add Profiles" component={ProfileScreen} />
            <Stack.Screen name="QuickActions" component={QuickActionsScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="Statistics" component={StatisticsScreen} />
            <Stack.Screen name="Feedback" component={About} />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            children={() => <LoginScreen onAuthSuccess={handleAuthSuccess} />}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
