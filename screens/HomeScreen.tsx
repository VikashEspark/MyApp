import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import supabase from '../supabase'; // Import Supabase client

type Props = {
  onLogout: () => void;
};

const HomeScreen: React.FC<Props> = ({ onLogout }) => {
  const [showPersonalDetails, setShowPersonalDetails] = useState(false); // Toggle view
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');

  const handleSave = async () => {
    if (!name || !age || !address) {
      Alert.alert('Error', 'Please fill in all fields before saving.');
      return;
    }

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        Alert.alert('Error', 'You must be logged in to save personal details.');
        return;
      }

      const { error } = await supabase
        .from('personal_details') // Supabase table name
        .insert([
          {
            name,
            age: parseInt(age, 10), // Convert age to integer
            address,
            user_id: user.id, // Associate details with the logged-in user
          },
        ]);

      if (error) {
        throw error;
      }

      Alert.alert('Success', 'Personal details saved successfully!');
      setShowPersonalDetails(false); // Toggle back after saving
      setName(''); // Reset email field
        setAge(''); // Reset phone field
        setAddress(''); // Reset address field
    } catch (error) {
      console.error('Error saving personal details:', error);
      Alert.alert('Error', 'Something went wrong while saving details.');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Home Screen!</Text>
      <Button title="Logout" onPress={onLogout} />

      <View style={styles.spacing} />

      {showPersonalDetails ? (
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>Enter Personal Details:</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Age"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleSave} />
            <Button
              title="Back"
              onPress={() => setShowPersonalDetails(false)}
              color="gray"
            />
          </View>
        </View>
      ) : (
        <Button
          title="Personal Details"
          onPress={() => setShowPersonalDetails(true)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  subtitle: { fontSize: 18, marginBottom: 10 },
  formContainer: { marginTop: 20 },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  spacing: {
    marginTop: 20, // Add space between Logout and Personal Details button
  },
});

export default HomeScreen;
