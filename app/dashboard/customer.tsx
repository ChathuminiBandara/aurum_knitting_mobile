import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Image,
    ImageBackground,
} from "react-native";

export default function Customer() {
    // Initial customers include a local asset for profilePic.
    const [customers, setCustomers] = useState([
        {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            profilePic: require("../../assets/login_background/img_2.jpg"),
        },
        {
            id: "2",
            name: "Jane Smith",
            email: "jane@example.com",
            profilePic: require("../../assets/login_background/img_2.jpg"),
        },
        {
            id: "3",
            name: "Alice Brown",
            email: "alice@example.com",
            profilePic: require("../../assets/login_background/img_2.jpg"),
        },
        {
            id: "4",
            name: "Bob Johnson",
            email: "bob@example.com",
            profilePic: require("../../assets/login_background/img_2.jpg"),
        },
    ]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);

    // Function to add a new customer.
    // When adding a new customer, you can set a default profilePic.
    const defaultProfilePic = require("../../assets/login_background/img_2.jpg");

    const addCustomer = () => {
        if (!name || !email) {
            Alert.alert("Error", "Please enter both name and email");
            return;
        }
        const newCustomer = {
            id: Date.now().toString(),
            name,
            email,
            profilePic: defaultProfilePic,
        };
        setCustomers([...customers, newCustomer]);
        setName("");
        setEmail("");
    };

    // Function to edit a customer.
    const editCustomer = (customer: { id: string; name: string; email: string; profilePic: any }) => {
        setName(customer.name);
        setEmail(customer.email);
        setEditingId(customer.id);
    };

    // Function to update customer details.
    const updateCustomer = () => {
        if (!name || !email) {
            Alert.alert("Error", "Please enter both name and email");
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

    // Function to delete a customer.
    const deleteCustomer = (id: string) => {
        setCustomers(customers.filter((customer) => customer.id !== id));
    };

    const renderCustomer = ({ item }: { item: { id: string; name: string; email: string; profilePic: any } }) => (
        <View style={styles.card}>
            <View style={styles.avatarContainer}>
                <Image source={item.profilePic} style={styles.avatar} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardEmail}>{item.email}</Text>
            </View>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.editBtn} onPress={() => editCustomer(item)}>
                    <Text style={styles.btnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteCustomer(item.id)}>
                    <Text style={[styles.btnText, styles.deleteBtnText]}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <ImageBackground
            source={require("../../assets/login_background/img_2.jpg")}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Text style={styles.header}>Customer Accounts</Text>

                {/* Input Section */}
                <View style={styles.inputSection}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter name"
                        placeholderTextColor="#E89ACF"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter email"
                        placeholderTextColor="#E89ACF"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                    {editingId ? (
                        <TouchableOpacity style={styles.primaryButton} onPress={updateCustomer}>
                            <Text style={styles.buttonLabel}>Update Customer</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.primaryButton} onPress={addCustomer}>
                            <Text style={styles.buttonLabel}>Add Customer</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Customer List */}
                <FlatList
                    data={customers}
                    keyExtractor={(item) => item.id}
                    renderItem={renderCustomer}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    // Semi-transparent overlay to enhance readability.
    overlay: {
        flex: 1,
        backgroundColor: "rgba(255,240,246,0.56)",
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    header: {
        fontSize: 26,
        fontWeight: "700",
        color: "#C2185B",
        textAlign: "center",
        marginBottom: 20,
    },
    inputSection: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#FFC1E3",
        shadowColor: "#C2185B",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 8,
        elevation: 2,
    },
    input: {
        height: 45,
        borderWidth: 1,
        borderColor: "#FFC1E3",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 12,
        fontSize: 15,
        color: "#333",
        backgroundColor: "#FFF",
    },
    primaryButton: {
        backgroundColor: "#FF4081",
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
    },
    buttonLabel: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },
    listContainer: {
        paddingBottom: 40,
    },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        marginBottom: 16,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#FFB6C1",
        shadowColor: "#FF4081",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 2,
    },
    avatarContainer: {
        marginRight: 12,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    infoContainer: {
        flex: 1,
    },
    cardName: {
        fontSize: 16,
        fontWeight: "700",
        color: "#333",
        marginBottom: 4,
    },
    cardEmail: {
        fontSize: 14,
        color: "#666",
    },
    buttonRow: {
        flexDirection: "column",
        justifyContent: "space-between",
    },
    editBtn: {
        backgroundColor: "#FFE0F0",
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginBottom: 8,
    },
    deleteBtn: {
        backgroundColor: "#FF4081",
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    btnText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
    },
    deleteBtnText: {
        color: "#FFF",
    },
});

