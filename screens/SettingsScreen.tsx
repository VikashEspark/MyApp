import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import supabase from '../supabase';

const SettingsScreen: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showPasswordInput, setShowPasswordInput] = useState(false); // State to control input visibility

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();

        if (sessionData?.session?.user?.email) {
          setUserEmail(sessionData.session.user.email);
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch user email.');
      }
    };

    fetchUserEmail();
  }, []);

  const handlePasswordButtonClick = async () => {
    if (!showPasswordInput) {
      // Show the password input when it's hidden
      setShowPasswordInput(true);
    } else {
      // If the input is already visible, handle password update
      if (!newPassword) {
        Alert.alert('Error', 'Password cannot be empty.');
        return;
      }

      setIsLoading(true);
      setPasswordUpdated(false);

      try {
        const { data: sessionData } = await supabase.auth.getSession();

        if (sessionData?.session?.user?.id) {
          const { error } = await supabase.auth.updateUser({ password: newPassword });

          if (error) {
            Alert.alert('Error', error.message);
          } else {
            Alert.alert('Success', 'Password updated successfully!');
            setPasswordUpdated(true);
            setNewPassword(''); // Clear the input
            setShowPasswordInput(false); // Hide the input field after success
          }
        } else {
          Alert.alert('Error', 'User not found!');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to update password.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Settings Icon */}
      <Image
        source={require('../assets/settings-icon.png')}
        style={styles.settingsIcon}
      />

      <Text style={styles.title}>Settings</Text>

      {/* Display User Email */}
      {userEmail && <Text style={styles.email}>User: {userEmail}</Text>}

      {/* Conditional Password Input */}
      {showPasswordInput && (
        <View style={styles.inputContainer}>
          <Image
            source={require('../assets/lock-icon.png')}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter New Password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
        </View>
      )}

      {/* Toggle Button for Showing/Updating Password */}
      <Button
        title={isLoading ? 'Updating...' : showPasswordInput ? 'Update Password' : 'Change Password'}
        onPress={handlePasswordButtonClick}
        disabled={isLoading}
      />

      {/* Success Image displayed after successful password update */}
      {passwordUpdated && !isLoading && (
        <Image
          source={require('../assets/success-icon.png')}
          style={styles.successImage}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
  },
  settingsIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    marginBottom: 10,
    color: 'gray',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  successImage: {
    width: 50,
    height: 50,
    marginTop: 20,
  },
});

export default SettingsScreen;
