import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, Button, ScrollView, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const StatisticsScreen: React.FC = () => {
  const [labels, setLabels] = useState<string[]>([]); // Start with no labels
  const [data, setData] = useState<number[]>([]);     // Start with no data points
  const [newLabel, setNewLabel] = useState<string>('');
  const [newValue, setNewValue] = useState<string>('');

  const updateData = () => {
    if (!newLabel || isNaN(Number(newValue))) {
      Alert.alert('Invalid Input', 'Please enter a valid month and numeric value.');
      return;
    }

    setLabels((prev) => [...prev, newLabel]);
    setData((prev) => [...prev, Number(newValue)]);
    setNewLabel('');
    setNewValue('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.container}>
      <Text style={styles.title}>Statistics</Text>
      {labels.length === 0 || data.length === 0 ? (
        <Text style={styles.placeholder}>No data available. Add some values to see the chart.</Text>
      ) : (
        <LineChart
          data={{
            labels: labels,
            datasets: [{ data: data }],
          }}
          width={Dimensions.get('window').width * 0.85}
          height={Dimensions.get('window').height / 3}
          yAxisLabel="$"
          fromZero = { true }
          chartConfig={{
            backgroundGradientFrom: '#ff9800',
            backgroundGradientTo: '#f44336',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForDots: { r: '6', strokeWidth: '2', stroke: '#ffa726' },
          }}
          style={styles.chart}
          />
        )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Month (e.g., Jan)"
          value={newLabel}
          onChangeText={setNewLabel}
        />
        <TextInput
          style={styles.input}
          placeholder="Value (e.g., 45)"
          value={newValue}
          onChangeText={setNewValue}
          keyboardType="numeric"
        />
        <Button title="Add Data" onPress={updateData} />
      </View>

    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  chart: { borderRadius: 16 },
  placeholder: { fontSize: 16, textAlign: 'center', color: '#666' },
  inputContainer: { marginTop: 20 },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default StatisticsScreen;
