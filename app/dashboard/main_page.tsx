import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function MainPage() {
    const router = useRouter();

    return (
        <ScrollView style={styles.container}>
            {/* Top Bar with Menu Button & User Icon */}
            <View style={styles.topBar}>


                <Text style={styles.top_aurum}>AURUM KNITTING</Text>

                {/* User Profile Icon - Right Side */}
                <TouchableOpacity onPress={() => router.push("/profile")}>
                    <Ionicons name="person-circle-outline" size={30} color="#ff0099" />
                </TouchableOpacity>
            </View>

            {/* Welcome Banner */}
            <LinearGradient colors={["#ff9a9e", "#fecfef"]} style={styles.banner}>
                <Text style={styles.welcomeText}>🌸 Welcome Back, Jane! 🌸</Text>
                <Text style={styles.subtitle}>Let’s craft some floral magic today! ✨</Text>
            </LinearGradient>

            {/* Knitted Flower Showcase */}
            <View style={styles.showcase}>
                <Image source={require("../../assets/login_background/img_2.jpg")} style={styles.showcaseImage} />
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
                <TouchableOpacity style={styles.actionItem} onPress={() => router.push("/orders")}>
                    <Ionicons name="cart-outline" size={30} color="#ff4081" />
                    <Text style={styles.actionText}>Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem} onPress={() => router.push("/flowers")}>
                    <Ionicons name="rose-outline" size={30} color="#ff4081" />
                    <Text style={styles.actionText}>Flowers</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem} onPress={() => router.push("/customers")}>
                    <Ionicons name="people-outline" size={30} color="#ff4081" />
                    <Text style={styles.actionText}>Customers</Text>
                </TouchableOpacity>
            </View>

            {/* Promotions & Offers */}
            <View style={styles.promoCard}>
                <Text style={styles.promoText}>New Collection Alert! 20% Off on Handmade</Text>
                <Text style={styles.promoTextFlowers}>🌷 Roses! 🌷</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    topBar: {
        flexDirection: "row", // Align items in a row
        justifyContent: "space-between", // Push left and right items apart
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginTop: 10,
    },
    top_aurum: {
        color: "#ff0099", // Pink color for the heading
        fontSize: 28, // Large size for prominence
        fontWeight: "bold", // Bold font to give it a strong appearance
        textTransform: "uppercase", // Capitalize all letters for modern effect
        letterSpacing: 1.5, // Slight spacing between letters for a refined look
        textShadowColor: "rgba(255,0,153,0.31)", // Light pink shadow for some depth
        textShadowOffset: { width: 2, height: 2 }, // Shadow offset for a subtle 3D effect
        textShadowRadius: 5, // Soft shadow radius
        marginVertical: 20, // Vertical margin to space it from other content
        textAlign: "center", // Center-align the text for a balanced look
    },
    banner: {
        padding: 20,
        borderRadius: 15,
        margin: 15,
        alignItems: "center",
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
    subtitle: {
        fontSize: 14,
        color: "#fff",
        marginTop: 5,
    },
    showcase: {
        alignItems: "center",
        marginVertical: 20,
    },
    showcaseImage: {
        width: 250,
        height: 250,
        resizeMode: "contain",
    },
    quickActions: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 20,
    },
    actionItem: {
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fce4ec",
        borderRadius: 10,
    },
    actionText: {
        marginTop: 5,
        fontSize: 14,
        color: "#ff0099",
    },
    promoCard: {
        backgroundColor: "#ff80ab",
        padding: 15,
        margin: 20,
        borderRadius: 10,
    },
    promoText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    },
    promoTextFlowers: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20, // Larger font size for emphasis
        marginTop: 5, // Adds spacing from the first line
    },
});
