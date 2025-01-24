import React from 'react';
import { View, Text, FlatList, StyleSheet, Image,Animated } from 'react-native';

const notifications = [
  { id: '1', title: 'New Message', description: 'You have a new message from Vikash', icon: require('../assets/message-icon.png') },
  { id: '2', title: 'Update Available', description: 'Version 2.0 is now available', icon: require('../assets/update-icon.png') },
  { id: '3', title: 'Event Reminder', description: 'Meeting scheduled at 3 PM today', icon: require('../assets/event-icon.png') },
];

const NotificationsScreen: React.FC = () => {
  const renderNotification = ({ item }: { item: typeof notifications[0] }) => (
    <Animated.View style={styles.notificationCard}>
      <Image source={item.icon} style={styles.notificationIcon} />
      <View style={styles.notificationTextContainer}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDescription}>{item.description}</Text>
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  list: { paddingBottom: 20 },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: 'center',
  },
  notificationIcon: { width: 40, height: 40, marginRight: 15 },
  notificationTextContainer: { flex: 1 },
  notificationTitle: { fontSize: 18, fontWeight: '600' },
  notificationDescription: { fontSize: 14, color: '#666' },
});

export default NotificationsScreen;
