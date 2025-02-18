import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function Customer() {
    // State for customers list and input fields
    const [customers, setCustomers] = useState([
        { id: "1", name: "John Doe", email: "john@example.com" },
        { id: "2", name: "Jane Smith", email: "jane@example.com" },
    ]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editingId, setEditingId] = useState(null);

    // Function to add a new customer
    const addCustomer = () => {
        if (!name || !email) {
            Alert.alert("Error", "Please enter name and email");
            return;
        }
        const newCustomer = { id: Date.now().toString(), name, email };
        setCustomers([...customers, newCustomer]);
        setName("");
        setEmail("");
    };

    // Function to edit a customer
    // @ts-ignore
    const editCustomer = (customer) => {
        setName(customer.name);
        setEmail(customer.email);
        setEditingId(customer.id);
    };

    // Function to update customer details
    const updateCustomer = () => {
        if (!name || !email) {
            Alert.alert("Error", "Please enter name and email");
            return;
        }
        setCustomers(
            customers.map((customer) =>
                customer.id === editingId ? { ...customer, name, email } : customer
            )
        );
        setName("");
        setEmail("");
        setEditingId(null);
    };

    // Function to delete a customer
    // @ts-ignore
    const deleteCustomer = (id) => {
        setCustomers(customers.filter((customer) => customer.id !== id));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Customer Management</Text>

            {/* Input Fields */}
            <TextInput
                style={styles.input}
                placeholder="Customer Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Customer Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            {/* Add or Update Button */}
            {editingId ? (
                <TouchableOpacity style={styles.updateButton} onPress={updateCustomer}>
                    <Text style={styles.buttonText}>Update Customer</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.addButton} onPress={addCustomer}>
                    <Text style={styles.buttonText}>Add Customer</Text>
                </TouchableOpacity>
            )}

            {/* Customer List */}
            <FlatList
                data={customers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.customerItem}>
                        <View>
                            <Text style={styles.customerName}>{item.name}</Text>
                            <Text style={styles.customerEmail}>{item.email}</Text>
                        </View>
                        <View style={styles.actionButtons}>
                            <TouchableOpacity style={styles.editButton} onPress={() => editCustomer(item)}>
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteCustomer(item.id)}>
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
    customerItem: {
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
    customerName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    customerEmail: {
        fontSize: 14,
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

