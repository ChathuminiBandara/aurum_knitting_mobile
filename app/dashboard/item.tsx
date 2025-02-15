import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function ItemCRUD() {
    // State for items list and input fields
    const [items, setItems] = useState([
        { id: "1", name: "Laptop", price: "1200" },
        { id: "2", name: "Smartphone", price: "800" },
    ]);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [editingId, setEditingId] = useState(null);

    // Function to add a new item
    const addItem = () => {
        if (!name || !price) {
            Alert.alert("Error", "Please enter item name and price");
            return;
        }
        const newItem = { id: Date.now().toString(), name, price };
        setItems([...items, newItem]);
        setName("");
        setPrice("");
    };

    // Function to edit an item
    // @ts-ignore
    const editItem = (item) => {
        setName(item.name);
        setPrice(item.price);
        setEditingId(item.id);
    };

    // Function to update an item
    const updateItem = () => {
        if (!name || !price) {
            Alert.alert("Error", "Please enter item name and price");
            return;
        }
        setItems(
            items.map((item) =>
                item.id === editingId ? { ...item, name, price } : item
            )
        );
        setName("");
        setPrice("");
        setEditingId(null);
    };

    // Function to delete an item
    // @ts-ignore
    const deleteItem = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Item Management</Text>

            {/* Input Fields */}
            <TextInput
                style={styles.input}
                placeholder="Item Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Item Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />

            {/* Add or Update Button */}
            {editingId ? (
                <TouchableOpacity style={styles.updateButton} onPress={updateItem}>
                    <Text style={styles.buttonText}>Update Item</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.addButton} onPress={addItem}>
                    <Text style={styles.buttonText}>Add Item</Text>
                </TouchableOpacity>
            )}

            {/* Items List */}
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemRow}>
                        <View>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPrice}>${item.price}</Text>
                        </View>
                        <View style={styles.actionButtons}>
                            <TouchableOpacity style={styles.editButton} onPress={() => editItem(item)}>
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(item.id)}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

// Styles for the UI
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        marginBottom: 15,
        fontSize: 16,
    },
    addButton: {
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 20,
    },
    updateButton: {
        backgroundColor: "#28a745",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    itemName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    itemPrice: {
        fontSize: 16,
        color: "#666",
    },
    actionButtons: {
        flexDirection: "row",
    },
    editButton: {
        backgroundColor: "#ffc107",
        padding: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    deleteButton: {
        backgroundColor: "#dc3545",
        padding: 10,
        borderRadius: 5,
    },
});
