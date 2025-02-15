import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function SelectCustomer() {
    const router = useRouter(); // Ensure router is used correctly

    // Sample customers data
    const customers = [
        { id: "1", name: "Customer 1" },
        { id: "2", name: "Customer 2" },
        { id: "3", name: "Customer 3" }
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Customer</Text>
            <FlatList
                data={customers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.customerItem}
                        onPress={() => router.push({
                            pathname: "/dashboard/placeOrder/selectItem",
                            params: { customerName: item.name }
                        })}
                    >
                        <Text style={styles.customerName}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    customerItem: {
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: "center",
    },
    customerName: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
