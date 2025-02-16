import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function DashBoardLayout() {
    const router = useRouter();

    return (
        <Drawer
            initialRouteName="main_page"
            screenOptions={{
                drawerType: "slide",
                drawerStyle: styles.drawerStyle,
                headerStyle: styles.headerStyle,
                headerTintColor: "#fff",
                headerTitleAlign: "center",
                drawerActiveTintColor: "#ff0099", // Pink active tint
                drawerInactiveTintColor: "#555",
                drawerItemStyle: styles.drawerItem,

                // ✅ FIX: Use a function that returns JSX
                headerTitle: () => <Text style={styles.headerTitle}>AURUM KNITTING</Text>,

                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => router.push("/profile")}
                        style={styles.profileIcon}
                    >
                        <Ionicons name="person-circle-outline" size={30} color="#fff" />
                    </TouchableOpacity>
                ),
            }}
        >
            <Drawer.Screen
                name="main_page"
                options={{
                    title: "Main Page",
                    headerShown: true,
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="customer"
                options={{
                    title: "Customers",
                    headerShown: true,
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="people-outline" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="item"
                options={{
                    title: "Items",
                    headerShown: true,
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="cube-outline" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="placeorder"
                options={{
                    title: "Place Order",
                    headerShown: true,
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="cart-outline" color={color} size={size} />
                    ),
                }}
            />
        </Drawer>
    );
}

const styles = StyleSheet.create({
    drawerStyle: {
        width: 300,
        backgroundColor: "#fff",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        overflow: "hidden",
    },
    headerStyle: {
        backgroundColor: "#ff0099",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        textTransform: "uppercase",
    },
    drawerItem: {
        marginVertical: 5,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    profileIcon: {
        marginRight: 15,
    },
});
