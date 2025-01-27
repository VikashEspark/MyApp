import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  Alert,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import supabase from '../supabase';

const About = () => {
  const [suggestions, setSuggestions] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!suggestions.trim() || !email.trim()) {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }

    if (suggestions.trim().length < 10) {
      Alert.alert('Error', 'Suggestions must be at least 10 characters.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from('feedback').insert([
        { suggestions: suggestions.trim(), email: email.trim() },
      ]);

      if (error) {
        console.error(error);
        Alert.alert('Error', error.message || 'Failed to submit feedback.');
      } else {
        Alert.alert('Success', 'Feedback submitted successfully!');
        setSuggestions('');
        setEmail('');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/about.png')} style={styles.logo} />
      <Text style={styles.title}>About Our App</Text>
      <Text style={styles.text}>
        This is all about enhancing user experience for daily login and task updates.
        Share your suggestions below, and don't forget to include your email!
      </Text>

      <Text style={styles.text}>Suggestions:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your suggestions (at least 10 characters)"
        value={suggestions}
        onChangeText={setSuggestions}
        multiline
        numberOfLines={4}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <Button
          title="Submit Feedback"
          onPress={handleSubmit}
          disabled={!suggestions || !email}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 24,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default About;
