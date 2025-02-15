import {View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Animated} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Animations
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    function handleLogin() {
        if (username === "1" && password === "1") {
            router.push("/dashboard");
        } else {
            alert("Invalid username or password!");
        }
    }

    return (
        <ImageBackground
            source={require("../assets/login_background/img_2.jpg")}
            style={styles.background}
            resizeMode="cover"
        >
            {/* Overlay to reduce opacity */}
            <View style={styles.overlay} />



            <View style={styles.container}>
                <BlurView intensity={30} tint="light" style={styles.card}>
                    <Text style={[styles.brandTitle, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                        Aurum Knitting
                    </Text>
                    <Text style={styles.title}>Welcome Back!</Text>

                    {/* Username Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="rgba(255,0,153,0.4)" // New color
                        value={username}
                        onChangeText={setUsername}
                    />

                    {/* Password Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="rgba(255,0,153,0.4)" // New color
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    {/* Index Button */}
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </BlurView>

                {/* Social Media Index */}
                <Text style={styles.orText}>Or continue with</Text>
                <View style={styles.socialContainer}>
                    <TouchableOpacity style={styles.socialButton}>
                        <Ionicons name="logo-google" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Ionicons name="logo-facebook" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Ionicons name="logo-tiktok" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Ionicons name="logo-instagram" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Sign Up Option */}
                <Text style={styles.signUpText}>
                    Don't have an account?{" "}
                    <Text style={styles.signUpLink} onPress={() => router.push("/signup")}>
                        Sign Up
                    </Text>
                </Text>
            </View>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",

    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255,0,153,0.1)", // Adjust the opacity here (0.4 = 40% opacity)
    },
    brandTitle: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#ff0099",
        textAlign: "center",
        marginTop: 10, // Reduce this to move it up
        marginBottom: 20, // Reduce this to bring it closer to the card
        letterSpacing: 1.5,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
    },
    card: {
        width: "85%", // Keeps a good proportion
        minHeight: 300, // Ensures enough height for content
        paddingVertical: 40, // Balanced padding
        paddingHorizontal: 30, // Keeps it spacious
        borderRadius: 20,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.3)",
        overflow: "hidden",
        backgroundColor: "rgba(255,255,255,0.7)",
    },
    title: {
        fontSize: 20,
        fontWeight: "500",
        color: "#ff0099",
        paddingTop: -30,
        marginBottom: 35,
        letterSpacing: 1,
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.4)",
        borderRadius: 25,
        paddingHorizontal: 100, // Adjusted for better spacing
        backgroundColor: "rgba(255,0,153,0.3)",
        marginBottom: 15,
        fontSize: 16,
        color: "rgb(255,0,153)",
        // iOS shadow properties for a 3D look
        shadowColor: "rgba(250,0,217,0.24)",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        // Android shadow (elevation)
        elevation: 20,
    },

    button: {
        width: "100%",
        height: 50,
        backgroundColor: "#ff0099",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        marginTop: 10,
        paddingHorizontal: 50, // Added padding
        shadowColor: "#ff0099",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center", // Ensure center alignment
    },
    orText: {
        fontSize: 14,
        color: "#888",
        marginVertical: 15,
    },
    socialContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "70%",
        marginBottom: 15,
    },
    socialButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#ff0099",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
    },
    signUpText: {
        fontSize: 14,
        color: "#888",
        marginTop: 10,
    },
    signUpLink: {
        fontSize: 14,
        color: "#ff0099",
        fontWeight: "bold",
    },
});
