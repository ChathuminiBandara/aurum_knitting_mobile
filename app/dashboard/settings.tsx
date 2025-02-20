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
                    AsyncStorage.clear();
                    router.push("/");
                },
            },
        ]);
    };

    return (
        <View style={[styles.container, darkMode && styles.darkContainer]}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Text style={[styles.title, darkMode && styles.darkTitle]}>Settings</Text>

                {/* Profile Card */}
                <View style={[styles.card, darkMode && styles.darkCard]}>
                    <Text style={[styles.cardTitle, darkMode && styles.darkCardTitle]}>Profile</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="person-outline" size={20} color={darkMode ? "#aaa" : "#888"} />
                        <TextInput
                            style={[styles.input, darkMode && styles.darkInput]}
                            value={name}
                            onChangeText={setName}
                            placeholder="Full Name"
                            placeholderTextColor={darkMode ? "#aaa" : "#888"}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={20} color={darkMode ? "#aaa" : "#888"} />
                        <TextInput
                            style={[styles.input, darkMode && styles.darkInput]}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email Address"
                            placeholderTextColor={darkMode ? "#aaa" : "#888"}
                            keyboardType="email-address"
                        />
                    </View>
                </View>

                {/* Preferences Card */}
                <View style={[styles.card, darkMode && styles.darkCard]}>
                    <Text style={[styles.cardTitle, darkMode && styles.darkCardTitle]}>Preferences</Text>
                    <View style={styles.preferenceRow}>
                        <View style={styles.preferenceInfo}>
                            <Ionicons name="notifications-outline" size={20} color={darkMode ? "#aaa" : "#ff0099"} />
                            <Text style={[styles.preferenceText, darkMode && styles.darkPreferenceText]}>
                                Enable Notifications
                            </Text>
                        </View>
                        <Switch
                            trackColor={{ false: "#ccc", true: "#ff0099" }}
                            thumbColor={darkMode ? "#222" : "#fff"}
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                        />
                    </View>
                    <View style={styles.preferenceRow}>
                        <View style={styles.preferenceInfo}>
                            <Ionicons name="moon-outline" size={20} color={darkMode ? "#aaa" : "#ff0099"} />
                            <Text style={[styles.preferenceText, darkMode && styles.darkPreferenceText]}>Dark Mode</Text>
                        </View>
                        <Switch
                            trackColor={{ false: "#ccc", true: "#ff0099" }}
                            thumbColor={darkMode ? "#222" : "#fff"}
                            value={darkMode}
                            onValueChange={setDarkMode}
                        />
                    </View>
                </View>

                {/* Action Buttons */}
                <TouchableOpacity style={styles.buttonPrimary} onPress={saveSettings}>
                    <Ionicons name="save-outline" size={20} color="#fff" />
                    <Text style={styles.buttonPrimaryText}>Save Changes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonSecondary} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={20} color="#ff0099" />
                    <Text style={styles.buttonSecondaryText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        padding: 20,
    },
    darkContainer: {
        backgroundColor: "#1c1c1c",
    },
    scrollContent: {
        paddingBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 30,
        color: "#ff0099",
    },
    darkTitle: {
        color: "#ff66c2",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 2,
    },
    darkCard: {
        backgroundColor: "#2c2c2c",
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 15,
        color: "#333",
    },
    darkCardTitle: {
        color: "#ddd",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f7f7f7",
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 15,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: "#333",
    },
    darkInput: {
        backgroundColor: "#3a3a3a",
        color: "#fff",
    },
    preferenceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    preferenceInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    preferenceText: {
        fontSize: 16,
        marginLeft: 10,
        color: "#333",
    },
    darkPreferenceText: {
        color: "#ccc",
    },
    buttonPrimary: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ff0099",
        paddingVertical: 15,
        borderRadius: 15,
        marginTop: 10,
    },
    buttonPrimaryText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
        marginLeft: 10,
    },
    buttonSecondary: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#ff0099",
        paddingVertical: 15,
        borderRadius: 15,
        marginTop: 15,
    },
    buttonSecondaryText: {
        color: "#ff0099",
        fontSize: 18,
        fontWeight: "600",
        marginLeft: 10,
    },
});

