import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

export default function Signup() {
    const router = useRouter();

    // Form states
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

    // Example sign-up logic
    const handleSignUp = () => {
        // Basic validation example
        if (!email || !username || !password || !confirmPassword) {
            alert("Please fill out all fields!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // TODO: Add your sign-up logic/API call here
        // For now, just navigate to dashboard on success
        alert("Account created successfully!");
        router.push("/dashboard");
    };

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
                    <Animated.Text
                        style={[
                            styles.brandTitle,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }],
                            },
                        ]}
                    >
                        Aurum Knitting
                    </Animated.Text>

                    <Text style={styles.title}>Create Your Account</Text>

                    {/* Email Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="rgba(255,0,153,0.4)"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />

                    {/* Username Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="rgba(255,0,153,0.4)"
                        value={username}
                        onChangeText={setUsername}
                    />

                    {/* Password Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="rgba(255,0,153,0.4)"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    {/* Confirm Password Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor="rgba(255,0,153,0.4)"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    {/* Sign Up Button */}
                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </BlurView>

                {/* Social Media Sign Up */}
                <Text style={styles.orText}>Or sign up with</Text>
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

                {/* Already have an account? */}
                <Text style={styles.signUpText}>
                    Already have an account?{" "}
                    <Text
                        style={styles.signUpLink}
                        onPress={() => router.push("/")}
                    >
                        Login
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
        backgroundColor: "rgba(255,0,153,0.1)",
    },
    brandTitle: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#ff0099",
        textAlign: "center",
        marginBottom: 20,
        letterSpacing: 1.5,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: "85%",
        minHeight: 400,
        paddingVertical: 40,
        paddingHorizontal: 30,
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
        marginBottom: 25,
        letterSpacing: 1,
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.4)",
        borderRadius: 25,
        paddingHorizontal: 20,
        backgroundColor: "rgba(255,0,153,0.3)",
        marginBottom: 15,
        fontSize: 16,
        color: "rgb(255,0,153)",
        shadowColor: "rgba(250,0,217,0.24)",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 10,
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: "#ff0099",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        marginTop: 10,
        paddingHorizontal: 50,
        shadowColor: "#ff0099",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
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
