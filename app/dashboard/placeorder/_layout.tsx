import { Tabs } from "expo-router/tabs";
import { Ionicons } from "@expo/vector-icons";

export default function PlaceOrderLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#007bff",
            tabBarInactiveTintColor: "#959595",
            tabBarStyle: { height: 60, paddingBottom: 10 }
        }}>
            <Tabs.Screen
                name="selectcustomer"
                options={{
                    title: "Select Customer",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person-outline" color={color} size={26} />
                    )
                }}
            />
            <Tabs.Screen
                name="selectitem"
                options={{
                    title: "Select Item",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="cart-outline" color={color} size={26} />
                    )
                }}
            />
            <Tabs.Screen
                name="checkout"
                options={{
                    title: "Check Out",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="cash-outline" color={color} size={26} />
                    )
                }}
            />
        </Tabs>
    );
}
