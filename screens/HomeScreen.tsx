import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

type Props = {
  navigation: any;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
     // Gradient colors




    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen</Text>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Dashboard')}
        >
        <Image
          source={require('../assets/dashboard-icon.png')}
          style={styles.icon}
          />
        <Text style={styles.buttonText}>Go to Dashboard</Text>
      </TouchableOpacity>
      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Settings')}
        >
        <Image
          source={require('../assets/settings-icon.png')}
          style={styles.icon}
          />
        <Text style={styles.buttonText}>Go to Settings</Text>
      </TouchableOpacity>
      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Add Profiles')}
        >
        <Image
          source={require('../assets/profile-icon.png')}
          style={styles.icon}
          />
        <Text style={styles.buttonText}>Go to Add Profiles</Text>
              </TouchableOpacity>

      <View style={styles.divider} />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Feedback')}
        >
        <Image
          source={require('../assets/profile-icon.png')}
          style={styles.icon}
          />
        <Text style={styles.buttonText}>Feedbacks</Text>
              </TouchableOpacity>
            </View>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  outerBorder: {
    flex: 1,
    margin: 10,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
     // For Android
  },
  innerBorder: {
    flex: 1,
    borderWidth: 2, // Inner border thickness
    borderColor: '#000', // Inner border color (black)
    borderRadius: 8, // Optional: rounded corners for inner border
    padding: 20, // Padding for content inside the inner border
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#6a11cb',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // For Android
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default HomeScreen;
