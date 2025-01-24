import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { BarChart } from 'react-native-chart-kit';
import { StackNavigationProp } from '@react-navigation/stack';

type DashboardScreenProps = {
  route: RouteProp<RootStackParamList, 'Dashboard'>; // Typing the route
};

type HeaderRightProps = {
  onLogout: () => void;
};

const HeaderRight: React.FC<HeaderRightProps> = ({ onLogout }) => {
  return <TouchableOpacity onPress={onLogout}><Text style={styles.logoutButton}>Logout</Text></TouchableOpacity>;
};

const DashboardScreen: React.FC<DashboardScreenProps> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Dashboard'>>();
  const { onLogout } = route.params; // Accessing `onLogout` from the route params

  useEffect(() => {
    // Dynamically setting the headerRight using navigation.setOptions
    navigation.setOptions({
      headerRight: () => <HeaderRight onLogout = {onLogout} />, // Use onLogout here directly
    });
  }, [navigation, onLogout]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/profile-picture.png')}
          style={styles.profileImage}
        />
        <Text style={styles.welcomeText}>Welcome, User!</Text>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Statistics')}
        >
          <Image
            source={require('../assets/stats-icon.png')}
            style={styles.cardIcon}
          />
          <Text style={styles.cardText}>Statistics</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Image
            source={require('../assets/notifications-icon.png')}
            style={styles.cardIcon}
          />
          <Text style={styles.cardText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('QuickActions')}
        >
          <Image
            source={require('../assets/actions-icon.png')}
            style={styles.cardIcon}
          />
          <Text style={styles.cardText}>Quick Actions</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.chartTitle}>Performance Overview</Text>
      <BarChart
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{ data: [20, 45, 28, 80, 99, 43] }],
        }}
        width={Dimensions.get('window').width - 32}
        height={Dimensions.get('window').height / 4 }
        yAxisLabel="$"
        yAxisSuffix="k"
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        style={styles.chart}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f5f5f5' },
  profileContainer: { alignItems: 'center', marginBottom: 30 },
  profileImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  welcomeText: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  card: {
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardIcon: { width: 50, height: 50, marginBottom: 10 },
  cardText: { fontSize: 16, fontWeight: '600', textAlign: 'center' },
  chartTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  chart: { borderRadius: 16, marginBottom: 30, marginVertical: 8 },
  logoutButton: { color: '#007AFF', fontWeight: 'bold', marginRight: 10 },
});

export default DashboardScreen;
