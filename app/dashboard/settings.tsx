import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Switch,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Settings() {
    const router = useRouter();

    // States for settings
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    // Load user preferences from storage
    useEffect(() => {
        const loadSettings = async () => {
            const storedName = await AsyncStorage.getItem("name");
            const storedEmail = await AsyncStorage.getItem("email");
            const storedNotifications = await AsyncStorage.getItem("notificationsEnabled");
            const storedDarkMode = await AsyncStorage.getItem("darkMode");

            if (storedName) setName(storedName);
            if (storedEmail) setEmail(storedEmail);
            if (storedNotifications !== null) setNotificationsEnabled(JSON.parse(storedNotifications));
            if (storedDarkMode !== null) setDarkMode(JSON.parse(storedDarkMode));
        };
        loadSettings();
    }, []);

    // Save user preferences
    const saveSettings = async () => {
        await AsyncStorage.setItem("name", name);
        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("notificationsEnabled", JSON.stringify(notificationsEnabled));
        await AsyncStorage.setItem("darkMode", JSON.stringify(darkMode));
        Alert.alert("Settings Saved!", "Your preferences have been updated.");
    };

    // Logout Confirmation
    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Logout",
                style: "destructive",
                onPress: () => {
                    AsyncStorage.clear(); // Clear saved data
                    router.push("/"); // Redirect to login
                },
            },
        ]);
    };

    return (
        <View style={[styles.container, darkMode && styles.darkContainer]}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Title */}
                <Text style={styles.title}>Settings</Text>

                {/* Profile Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Profile</Text>
                    <TextInput
                        style={[styles.input, darkMode && styles.darkInput]}
                        value={name}
                        onChangeText={setName}
                        placeholder="Full Name"
                        placeholderTextColor={darkMode ? "#bbb" : "#666"}
                    />
                    <TextInput
                        style={[styles.input, darkMode && styles.darkInput]}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email Address"
                        placeholderTextColor={darkMode ? "#bbb" : "#666"}
                        keyboardType="email-address"
                    />
                </View>

                {/* Preferences Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferences</Text>

                    {/* Notifications */}
                    <View style={styles.settingRow}>
                        <View style={styles.settingInfo}>
                            <Ionicons name="notifications-outline" size={22} color={darkMode ? "#fff" : "#ff0099"} />
                            <Text style={[styles.settingText, darkMode && styles.darkText]}>
                                Enable Notifications
                            </Text>
                        </View>
                        <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
                    </View>

                    {/* Dark Mode */}
                    <View style={styles.settingRow}>
                        <View style={styles.settingInfo}>
                            <Ionicons name="moon-outline" size={22} color={darkMode ? "#fff" : "#ff0099"} />
                            <Text style={[styles.settingText, darkMode && styles.darkText]}>Dark Mode</Text>
                        </View>
                        <Switch value={darkMode} onValueChange={setDarkMode} />
                    </View>
                </View>

                {/* Save Settings Button */}
                <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
                    <Ionicons name="save-outline" size={22} color="#fff" />
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={22} color="#fff" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    darkContainer: {
        backgroundColor: "#222",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#ff0099",
    },
    section: {
        marginBottom: 25,
        paddingHorizontal: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#ff0099",
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
        color: "#333",
    },
    darkInput: {
        backgroundColor: "#333",
        color: "#fff",
        borderColor: "#555",
    },
    settingRow: {
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
    settingInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    settingText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
    },
    darkText: {
        color: "#ddd",
    },
    saveButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#28a745",
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#dc3545",
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    logoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
    },
});

