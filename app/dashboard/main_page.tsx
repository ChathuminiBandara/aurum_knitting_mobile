import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function main_page() {
    const router = useRouter();

    return (
        <ScrollView style={styles.container}>

            {/* Product Image */}
            <View style={styles.imageContainer}>
                <Image
                    source={require("../../assets/login_background/img_2.jpg")} // Update with your image path
                    style={styles.productImage}
                />
            </View>

            {/* Product Details */}
            <View style={styles.detailsContainer}>
                <Text style={styles.productTitle}>
                    Bouquet of Light Peach Bush Roses Pavlova
                </Text>
                <Text style={styles.productTitleEng}>
                    Puff tulip
                </Text>

                <View style={styles.priceRow}>
                    <Text style={styles.oldPrice}>4890 ₽</Text>
                    <Text style={styles.newPrice}>4290 ₽</Text>
                    <Text style={styles.cashback}>Cashback 10%</Text>
                </View>

                <View style={styles.ratingRow}>
                    <Ionicons name="star" size={20} color="#FFD700" />
                    <Text style={styles.rating}>4.5</Text>
                </View>

                <TouchableOpacity style={styles.buyButton}>
                    <Text style={styles.buyButtonText}>Buy</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    imageContainer: {
        alignItems: "center",
        marginVertical: 20,
    },
    productImage: {
        width: 250,
        height: 250,
        resizeMode: "contain",
        borderRadius: 10,
    },
    detailsContainer: {
        paddingHorizontal: 20,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
    },
    productTitleEng: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#666",
        textAlign: "center",
        marginTop: 5,
    },
    priceRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
    oldPrice: {
        textDecorationLine: "line-through",
        color: "#888",
        marginRight: 10,
        fontSize: 16,
    },
    newPrice: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#d32f2f",
    },
    cashback: {
        marginLeft: 10,
        color: "#388e3c",
        fontSize: 14,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
    },
    rating: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: "bold",
    },
    buyButton: {
        backgroundColor: "#ff4081",
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 15,
    },
    buyButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    buyButtonTextEng: {
        color: "#fff",
        fontSize: 14,
        marginTop: 2,
    },
});
