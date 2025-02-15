import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import {StyleSheet, TouchableOpacity} from "react-native";
import { BlurView } from "expo-blur";
import {router} from "expo-router";

export default function DashBoardLayout() {
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
                headerTitle: () => (
                    <Text style={styles.headerTitle}>AURUM KNITTING</Text>
                ),
                headerRight: () => (
                    <TouchableOpacity onPress={() => router.push("/profile")} style={styles.profileIcon}>
                        <Ionicons name="person-circle-outline" size={30} color="#fff" />
                    </TouchableOpacity>
                ),
            }}
        >
            <Drawer.Screen
                name="main_page"
                options={{
                    title: "Main page",
                    // headerShown: false,
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="person-circle-outline" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="customer"
                options={{
                    title: "Customers",
                    headerShown: false,
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="person-circle-outline" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="item"
                options={{
                    title: "Items",
                    headerShown: false,
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="cube-outline" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="placeorder"
                options={{
                    title: "Place Order",
                    headerShown: false,
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
        backgroundColor: "#fff", // White background for the drawer
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        overflow: "hidden",
    },
    headerStyle: {
        backgroundColor: "#ff0099", // Pink header
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
        marginRight: 15, // Adjust spacing from the right
    },
});

export function BlurredDrawerBackground() {
    return <BlurView intensity={50} style={StyleSheet.absoluteFill} />;
}
