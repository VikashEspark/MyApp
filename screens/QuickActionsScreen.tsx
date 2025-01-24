import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import supabase from '../supabase';

// Helper function to format date and time
const formatDateTime = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Use 24-hour format
  };
  return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
};

const QuickActionsScreen: React.FC = () => {
  const [tasks, setTasks] = useState<{ id: string; title: string; created_at: string }[]>([]);
  const [taskInput, setTaskInput] = useState<string>('');
  const [isAddTaskVisible, setIsAddTaskVisible] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch the current user
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        Alert.alert('Error', 'Failed to fetch user information.');
        console.error(error);
      } else {
        setUserId(user?.id ?? null);
      }
    };

    fetchUser();
  }, []);

  // Fetch tasks for the logged-in user
  const fetchTasks = useCallback(async () => {
    if (userId) {
      const { data, error } = await supabase
        .from('tasks')
        .select('id, title, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });
      if (error) {
        Alert.alert('Error', 'Failed to fetch tasks.');
        console.error(error);
      } else {
        setTasks(data || []);
      }
    }
  }, [userId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async () => {
    if (taskInput.trim() === '') {
      Alert.alert('Error', 'Task cannot be empty!');
      return;
    }

    if (!userId) {
      Alert.alert('Error', 'User not authenticated.');
      return;
    }

    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title: taskInput, user_id: userId }])
      .select('*');

    if (error) {
      Alert.alert('Error', 'Failed to add task.');
      console.error(error);
    } else {
      setTasks((prevTasks) => [...prevTasks, ...data]); // Add new task to state
      setTaskInput('');
      setIsAddTaskVisible(false); // Hide input form
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (error) {
      Alert.alert('Error', 'Failed to delete task.');
      console.error(error);
    } else {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      Alert.alert('Success', 'Task deleted.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Actions</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setIsAddTaskVisible(true)}
        >
          <Text style={styles.actionText}>Create Task</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tableTitleContainer}>
        <Text style={styles.title}>Task</Text>
        <Text style={styles.title}>Date</Text>
        <Text style={styles.title}>Action</Text>
      </View>

      {/* Input for task creation */}
      {isAddTaskVisible && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your task..."
            value={taskInput}
            onChangeText={setTaskInput}
          />
          <TouchableOpacity style={styles.addTaskButton} onPress={handleAddTask}>
            <Text style={styles.addTaskButtonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Task list */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.title}</Text>
            <Text style={styles.taskDate}>{formatDateTime(item.created_at)}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteTask(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  actionsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  actionButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
  },
  actionText: { fontSize: 16, color: '#fff', textAlign: 'center' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  addTaskButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addTaskButtonText: { color: '#fff', fontWeight: 'bold' },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
  taskText: { fontSize: 16, color: '#333' },
  taskDate: { fontSize: 12, color: '#666' },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deleteButtonText: { color: '#fff', fontWeight: 'bold' },
  tableTitleContainer: { fontSize: 12, fontWeight: 'bold',flexDirection: 'row' ,justifyContent: 'space-between'},
});

export default QuickActionsScreen;
