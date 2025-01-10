import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import supabase from '../supabase'; // Import Supabase client

type Props = {
  onAuthSuccess: () => void; // Prop for successful authentication
};

const LoginScreen: React.FC<Props> = ({onAuthSuccess}) => {
  const [isLoginMode, setIsLoginMode] = useState(true); // Toggle between Login and Sign Up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert('Login Failed', error.message);
      } else {
        Alert.alert('Login Success', `Welcome back, ${data?.user?.email}`);
        onAuthSuccess();
        // Navigate to Home Screen or other authenticated screen
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong, please try again.');
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        Alert.alert('Sign-Up Failed', error.message);
      } else {
        Alert.alert('Sign-Up Success', `Welcome, ${data?.user?.email}`);
        // Optionally, navigate to the login mode or another screen
        setIsLoginMode(true);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong, please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLoginMode ? 'Login' : 'Sign Up'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title={isLoginMode ? 'Login' : 'Sign Up'}
        onPress={isLoginMode ? handleLogin : handleSignUp}
      />
      <View style={styles.toggleContainer}>
        <Text>
          {isLoginMode ? "Don't have an account?" : 'Already have an account?'}{' '}
        </Text>
        <Button
          title={isLoginMode ? 'Sign Up' : 'Login'}
          onPress={() => setIsLoginMode((prevMode) => !prevMode)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  toggleContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default LoginScreen;
