import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, ScrollView } from 'react-native';
import supabase from '../supabase'; // Ensure you've initialized supabase client properly

const ProfileScreen = () => {
    const [userData, setUserData] = useState<{ id: number; name: string; age: string; address: string }[]>([]);
    const [editingRow, setEditingRow] = useState<number | null>(null);
    const [editedData, setEditedData] = useState({ name: '', age: '', address: '' });
    const [newData, setNewData] = useState({ name: '', age: '', address: '' });

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        const { data, error } = await supabase.from('personal_details').select('*');
        if (error) {
            Alert.alert('Error', error.message);
        } else {
            setUserData(data);
        }
    };


    const handleDelete = async (id: number) =>{
        try {
            const { error } = await supabase.from('personal_details').delete().eq('id', id);
            if (error) {
                throw new Error(error.message);
            }
            if (editingRow !== null && userData[editingRow]?.id === id) {
                setEditingRow(null);
                setEditedData({ name: '', age: '', address: '' });
            }
            fetchUserData();
            Alert.alert('Success', 'Record has been deleted!');
        } catch (err) {
            if (err instanceof Error) {
                Alert.alert('Error', err.message);
            } else {
                Alert.alert('Error', 'An unknown error occurred');
            }
        }
        };


    const handleSave = async (id: number) => {
        try {
            const { error } = await supabase
                .from('personal_details')
                .update({
                    name: editedData.name,
                    age: parseInt(editedData.age, 10), // Convert age to a number
                    address: editedData.address,
                })
                .eq('id', id);

            if (error) {
                throw new Error(error.message);
            }

            setEditingRow(null);
            fetchUserData();
            Alert.alert('Success', 'Your personal details have been updated!');
        } catch (err) {
            if (err instanceof Error) {
                Alert.alert('Error', err.message);
            } else {
                Alert.alert('Error', 'An unknown error occurred');
            }
        }
    };

    const handleCancel = () => {
        // Reset editedData to empty or original data when cancel is pressed
        setEditingRow(null);
        setEditedData({ name: '', age: '', address: '' });
    };

    const handleAddNew = async () => {
        try {
            const { error } = await supabase
                .from('personal_details')
                .insert([newData]);

            if (error) {
                throw new Error(error.message);
            }

            setNewData({ name: '', age: '', address: '' });
            fetchUserData();
            Alert.alert('Success', 'New record has been added!');
        } catch (err) {
            if (err instanceof Error) {
                Alert.alert('Error', err.message);
            }
        }
    };

    const handleEdit = (item: { name: string; age: string; address: string }, index: number) => {
        // Set editedData to the values of the row being edited
        setEditingRow(index);
        setEditedData({ name: item.name, age: String(item.age), address: item.address }); // Ensure age is a string
    };



    const renderItem = ({ item, index }: { item: { id: number; name: string; age: string; address: string }, index: number }) => {
        return (
            <View key={item.id} style={styles.row}>
                {editingRow === index ? (
                    <View style={styles.editContainer}>
                        <TextInput
                            style={styles.input}
                            value={editedData.name}
                            onChangeText={(text) => setEditedData((prev) => ({ ...prev, name: text }))}
                        />
                        <TextInput
                            style={styles.input}
                            value={editedData.age}
                            onChangeText={(text) => setEditedData((prev) => ({ ...prev, age: text }))}
                            keyboardType="numeric" // Make sure the user inputs a numeric value
                        />
                        <TextInput
                            style={styles.input}
                            value={editedData.address}
                            onChangeText={(text) => setEditedData((prev) => ({ ...prev, address: text }))}
                        />
                        <View style={styles.buttonsContainer}>
                            <Button title="Save" onPress={() => handleSave(item.id)} />
                            <Button title="Cancel" onPress={handleCancel} color="red" />
                            <Button title="Delete" onPress={()=>handleDelete(item.id)}/>
                        </View>
                    </View>
                ) : (
                    <View>
                        <Text>Name: {item.name}</Text>
                        <Text>Age: {item.age}</Text>
                        <Text>Address: {item.address}</Text>
                        <View style={styles.editButton}>
                        <Button title="Edit" onPress={() => handleEdit(item, index)} />
                        </View>
                    </View>
                )}
            </View>
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {userData.map((item, index) => renderItem({ item, index }))}
            <View style={styles.newRecordContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={newData.name}
                    onChangeText={(text) => setNewData((prev) => ({ ...prev, name: text }))}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Age"
                    value={newData.age}
                    onChangeText={(text) => setNewData((prev) => ({ ...prev, age: text }))}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={newData.address}
                    onChangeText={(text) => setNewData((prev) => ({ ...prev, address: text }))}
                />
                <Button title="Add New" onPress={handleAddNew} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    row: {
        marginBottom: 20,
        borderBottomWidth: 1,
        paddingBottom: 10,
    },
    editContainer: {
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    text: {
        fontSize: 18,
        marginVertical: 5,
    },
    newRecordContainer: {
        marginTop: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    editButton:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default ProfileScreen;
