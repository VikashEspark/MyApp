// src/App.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true); // Update state to authenticated
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Navigate back to Login Screen
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <HomeScreen onLogout={handleLogout} />
      ) : (
        <LoginScreen onAuthSuccess={handleAuthSuccess} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default App;
