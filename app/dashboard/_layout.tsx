import React from "react";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export default function DashBoardLayout() {
    return (
        <Drawer
            screenOptions={{
                drawerType: "slide",
                drawerStyle: styles.drawerStyle,
                headerStyle: styles.headerStyle,
                drawerActiveTintColor: "#ff0099",
                drawerInactiveTintColor: "#ffffff",
            }}
        >
            {/* ✅ Main Screens */}
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

            {/* ✅ Hidden Screen (Will not appear in Drawer) */}
            <Drawer.Screen
                name="_hidden/hidden2"
                options={{
                    title: "Hidden",
                    drawerItemStyle: { display: "none" }, // ✅ Hides the drawer item
                }}
            />

            {/* ✅ Settings at the Bottom */}
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

// ✅ Styles
const styles = StyleSheet.create({
    drawerStyle: {
        width: 300,
        backgroundColor: "#000000",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        overflow: "hidden",
    },
    headerStyle: {
        backgroundColor: "#ffffff",
    },
});
