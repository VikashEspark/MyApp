import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import supabase from '../supabase'; // Import Supabase client
import { LinearGradient } from 'react-native-linear-gradient';
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  withDelay,
  useAnimatedStyle,
} from 'react-native-reanimated';

type Props = {
  onAuthSuccess: () => void; // Prop for successful authentication
};

const LoginScreen: React.FC<Props> = ({ onAuthSuccess }) => {
  const [isLoginMode, setIsLoginMode] = useState(true); // Toggle between Login and Sign Up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Define shared values for animations
  const fadeIn = useSharedValue(10);
  const fadeInBtn = useSharedValue(10);

  // Animated styles using useAnimatedStyle
  const fadeInTextStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
  }));

  const fadeInViewStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
  }));

  const fadeInButtonStyle = useAnimatedStyle(() => ({
    opacity: fadeInBtn.value,
  }));

  useEffect(() => {
    fadeIn.value = withTiming(1, { duration: 1000, easing: Easing.ease });
    fadeInBtn.value = withDelay(500, withTiming(1, { duration: 1500, easing: Easing.ease }));
  }, [fadeIn, fadeInBtn]);

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
        setIsLoginMode(true);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong, please try again.');
    }
  };

  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.backgroundImage}>
      <LinearGradient colors={['#FF5F6D', '#FFC371']} style={styles.gradient}>
        <View style={styles.container}>
          <Animated.Text style={[styles.title, fadeInTextStyle]}>
            {isLoginMode ? 'Login' : 'Sign Up'}
          </Animated.Text>

          <Animated.View style={fadeInViewStyle}>
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
          </Animated.View>

          <Animated.View style={fadeInButtonStyle}>
            <TouchableOpacity
              style={styles.button}
              onPress={isLoginMode ? handleLogin : handleSignUp}>
              <Text style={styles.buttonText}>{isLoginMode ? 'Login' : 'Sign Up'}</Text>
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>
              {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
            </Text>
            <TouchableOpacity onPress={() => setIsLoginMode((prevMode) => !prevMode)}>
              <Text style={styles.toggleButton}>
                {isLoginMode ? 'Sign Up' : 'Login'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    color: '#000',
  },
  button: {
    backgroundColor: '#FF5F6D',
    padding: 15,
    borderRadius: 25,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  toggleText: {
    color: '#fff',
  },
  toggleButton: {
    color: '#FF5F6D',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
