import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Image,
    ImageBackground,
} from "react-native";

export default function Item() {
    // Initial products include a sample image using a local asset.
    const [items, setItems] = useState([
        {
            id: "1",
            name: "Handcrafted Crochet Flower",
            price: "15",
            image: require("../../assets/login_background/img_2.jpg"),
        },
        {
            id: "2",
            name: "Premium Yarn Pack",
            price: "25",
            image: require("../../assets/login_background/img_2.jpg"),
        },
    ]);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    // We'll allow you to enter an image URL; if empty, a default local image is used.
    const defaultImage = require("../../assets/login_background/img_2.jpg");
    const [imageURL, setImageURL] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);

    // Function to add a new product.
    const addItem = () => {
        if (!name || !price) {
            Alert.alert("Error", "Please enter both product name and price");
            return;
        }
        const newItem = {
            id: Date.now().toString(),
            name,
            price,
            image: imageURL ? { uri: imageURL } : defaultImage,
        };
        setItems([...items, newItem]);
        setName("");
        setPrice("");
        setImageURL("");
    };

    // Function to edit a product.
    const editItem = (item: {
        id: string;
        name: string;
        price: string;
        image: { uri?: string } | number;
    }) => {
        setName(item.name);
        setPrice(item.price);
        // If the product image was provided via URL, set it; otherwise, leave it blank.
        if (typeof item.image === "object" && "uri" in item.image) {
            // @ts-ignore
            setImageURL(item.image.uri);
        } else {
            setImageURL("");
        }
        setEditingId(item.id);
    };

    // Function to update a product.
    const updateItem = () => {
        if (!name || !price) {
            Alert.alert("Error", "Please enter both product name and price");
            return;
        }
        setItems(
            items.map((item) =>
                item.id === editingId
                    ? {
                        ...item,
                        name,
                        price,
                        image: imageURL ? { uri: imageURL } : defaultImage,
                    }
                    : item
            )
        );
        setName("");
        setPrice("");
        setImageURL("");
        setEditingId(null);
    };

    // Function to delete a product.
    const deleteItem = (id: string) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const renderItem = ({
                            item,
                        }: {
        item: { id: string; name: string; price: string; image: { uri?: string } | number };
    }) => (
        <View style={styles.card}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.infoContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.editBtn} onPress={() => editItem(item)}>
                    <Text style={styles.btnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteItem(item.id)}>
                    <Text style={[styles.btnText, styles.deleteBtnText]}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <ImageBackground
            source={require("../../assets/login_background/img_2.jpg")}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Text style={styles.header}>Yarn & Crochet Shop</Text>

                {/* Input Section */}
                <View style={styles.inputSection}>
                    <TextInput
                        style={styles.input}
                        placeholder="Product Name"
                        placeholderTextColor="#E89ACF"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Product Price"
                        placeholderTextColor="#E89ACF"
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Image URL (optional)"
                        placeholderTextColor="#E89ACF"
                        value={imageURL}
                        onChangeText={setImageURL}
                    />
                    {editingId ? (
                        <TouchableOpacity style={styles.primaryButton} onPress={updateItem}>
                            <Text style={styles.buttonLabel}>Update Product</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.primaryButton} onPress={addItem}>
                            <Text style={styles.buttonLabel}>Add Product</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Products List */}
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    // Semi-transparent overlay to enhance readability.
    overlay: {
        flex: 1,
        backgroundColor: "rgba(255,240,246,0.56)",
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    header: {
        fontSize: 26,
        fontWeight: "700",
        color: "#C2185B",
        textAlign: "center",
        marginBottom: 20,
    },
    inputSection: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#FFC1E3",
        shadowColor: "#C2185B",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 8,
        elevation: 2,
    },
    input: {
        height: 45,
        borderWidth: 1,
        borderColor: "#FFC1E3",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 12,
        fontSize: 16,
        color: "#333",
        backgroundColor: "#FFF",
    },
    primaryButton: {
        backgroundColor: "#FF4081",
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
    },
    buttonLabel: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },
    listContainer: {
        paddingBottom: 40,
    },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        marginBottom: 16,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#FFB6C1",
        shadowColor: "#FF4081",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 2,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
    },
    infoContainer: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: "700",
        color: "#333",
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 14,
        color: "#666",
    },
    buttonRow: {
        flexDirection: "column",
        justifyContent: "space-between",
    },
    editBtn: {
        backgroundColor: "#FFE0F0",
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginBottom: 8,
    },
    deleteBtn: {
        backgroundColor: "#FF4081",
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    btnText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
    },
    deleteBtnText: {
        color: "#FFF",
    },
});

