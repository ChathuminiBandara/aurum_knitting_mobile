// app/components/CustomDrawer.tsx
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";

export default function CustomDrawer(props: DrawerContentComponentProps) {
    return (
        // A light gradient from white to a very pale pink
        <LinearGradient colors={["#ffffff", "#ffeef7"]} style={styles.gradient}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Top Banner / User Info */}
                <View style={styles.bannerContainer}>
                    <View style={styles.bannerOverlay}>
                        <Image
                            source={require("../../assets/login_background/img_2.jpg")}
                            style={styles.avatar}
                        />

                        <View style={styles.userInfo}>
                            <Text style={styles.username}>Hello, Chathumini!</Text>
                            <Text style={styles.userEmail}>chathu@gmail.com</Text>
                            <View style={styles.row}>
                                <Text style={styles.userPoints}>VIP Level: Gold</Text>
                                <TouchableOpacity style={styles.profileButton}>
                                    <Text style={styles.profileButtonText}>View Profile</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Drawer Items */}
                <View style={styles.drawerItemsSection}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>

            {/* Footer */}
            <View style={styles.footerSection}>
                <TouchableOpacity style={styles.logoutButton} onPress={() => { /* handle logout */ }}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
                <Text style={styles.versionText}>App Version 1.0.0</Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    scrollContent: {
        flex: 1,
    },
    bannerContainer: {
        height: 140,
        justifyContent: "flex-end",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        overflow: "hidden",
        backgroundColor: "transparent",
        marginTop: -40,
    },
    bannerOverlay: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 15,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
    avatar: {
        width: 58,
        height: 58,
        borderRadius: 29,
        borderWidth: 2,
        borderColor: "#ff4081", // pink accent for avatar border
    },
    userInfo: {
        marginLeft: 12,
    },
    username: {
        color: "#000", // black text
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 2,
    },
    userEmail: {
        color: "#333", // dark grey
        fontSize: 12,
        marginBottom: 6,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    userPoints: {
        color: "#000", // black text
        fontSize: 12,
        marginRight: 10,
    },
    profileButton: {
        backgroundColor: "#ff4081", // pink accent
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    profileButtonText: {
        color: "#fff", // white text on pink button
        fontSize: 11,
        fontWeight: "bold",
    },
    drawerItemsSection: {
        flex: 1,
        paddingTop: 10,
        color: '#000'
    },
    footerSection: {
        padding: 15,
        backgroundColor: "#fff",
        borderTopColor: "#eee",
        borderTopWidth: 1,
    },
    logoutButton: {
        backgroundColor: "#ff4081", // pink accent
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 8,
        alignItems: "center",
    },
    logoutButtonText: {
        color: "#fff", // white text
        fontWeight: "600",
    },
    versionText: {
        color: "#333", // dark text
        fontSize: 12,
        textAlign: "center",
    },
});
