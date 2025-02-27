// app/dashboard/_layout.tsx
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import CustomDrawerContent from "../components/CustomDrawer"; // relative path

export default function DashBoardLayout() {
    return (
        <Drawer
            // Use our custom drawer content
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerType: "slide",
                // Transparent so gradient or background from custom drawer shows
                drawerStyle: {
                    width: 300,
                    backgroundColor: "transparent",
                },
                // Active / Inactive colors changed to black
                drawerActiveTintColor: "#000000",
                drawerInactiveTintColor: "#000000",
                // Active item background is slightly highlighted
                drawerActiveBackgroundColor: "rgba(255, 0, 153, 0.2)",
                // Header styling
                headerStyle: styles.headerStyle,
                headerTitleAlign: "center",
                headerTitle: () => (
                    <Text style={styles.headerTitleText}>Aurum Knitting</Text>
                ),
                headerRight: () => (
                    <View style={styles.headerRightContainer}>
                        <Ionicons
                            name="cart-outline"
                            size={24}
                            color="black"
                            style={{ marginRight: 20 }}
                        />
                        <Ionicons name="person-outline" size={24} color="black" />
                        <Ionicons
                            name="call-outline"
                            size={24}
                            color="black"
                            style={{ marginLeft: 16 }}
                        />
                    </View>
                ),
            }}
        >
            {/* Drawer Screens */}
            <Drawer.Screen
                name="main_page"
                options={{
                    title: "Main Page",
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="customer"
                options={{
                    title: "Customers",
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="people-outline" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="item"
                options={{
                    title: "Items",
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="cube-outline" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="placeorder"
                options={{
                    title: "Place Order",
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="cart-outline" color={color} size={size} />
                    ),
                }}
            />

            {/* Hidden Screen */}
            <Drawer.Screen
                name="_hidden/hidden2"
                options={{
                    title: "Hidden",
                    drawerItemStyle: { display: "none" },
                }}
            />

            <Drawer.Screen
                name="settings"
                options={{
                    title: "Settings",
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="settings-outline" color={color} size={size} />
                    ),
                }}
            />
        </Drawer>
    );
}

// Styles
const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: "#ffffff",
    },
    headerTitleText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    headerRightContainer: {
        flexDirection: "row",
        marginRight: 16,
    },
});