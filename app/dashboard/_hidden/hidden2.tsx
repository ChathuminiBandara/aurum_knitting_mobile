import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Hidden2() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hidden Screen 2</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#ff0099",
    },
});
