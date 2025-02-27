import React, { useRef, useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput,
    Dimensions,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Screen width for the banner carousel
const { width } = Dimensions.get("window");

// Type definitions for our data
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    quantity: number;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
}

const categories = [
    { id: "1", title: "New", icon: "flash-outline" },
    { id: "2", title: "Trending", icon: "trending-up-outline" },
    { id: "3", title: "Top Rated", icon: "star-outline" },
    { id: "4", title: "Discounts", icon: "pricetag-outline" },
    { id: "5", title: "More", icon: "ellipsis-horizontal" },
];

export default function MainPage() {
    const router = useRouter();
    const bannerRef = useRef<FlatList<any> | null>(null);
    const [bannerIndex, setBannerIndex] = useState(0);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch products from API
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setLoading(false);
        }
    };

    // Auto-scroll banners
    useEffect(() => {
        const interval = setInterval(() => {
            setBannerIndex((prevIndex) =>
                prevIndex === products.slice(0, 3).length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);
        return () => clearInterval(interval);
    }, [products]);

    useEffect(() => {
        if (bannerRef.current) {
            bannerRef.current.scrollToOffset({
                offset: bannerIndex * width,
                animated: true,
            });
        }
    }, [bannerIndex]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ff4081" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchProducts}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Render Category
    // @ts-ignore
    const renderCategory = ({ item }: { item: typeof categories[0] }) => (
        <TouchableOpacity style={styles.categoryItem}>
            <Ionicons name={item.icon} size={24} color="#ff4081" />
            <Text style={styles.categoryText}>{item.title}</Text>
        </TouchableOpacity>
    );

    // Render Flash Sale Item
    const renderFlashSaleItem = ({ item }: { item: Product }) => (
        <View style={styles.flashItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.flashImage} />
            <Text style={styles.flashTitle} numberOfLines={1}>
                {item.name}
            </Text>
            <View style={styles.flashPriceRow}>
                <Text style={styles.flashNewPrice}>${item.price}</Text>
            </View>
            <View style={styles.flashRatingRow}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.flashRating}>4.5</Text>
            </View>
        </View>
    );

    // Render Featured Product
    const renderFeaturedProduct = ({ item }: { item: Product }) => (
        <View style={styles.productCard}>
            <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.productTitle} numberOfLines={2}>
                    {item.name}
                </Text>
                <Text style={styles.productSubtitle} numberOfLines={2}>
                    {item.description}
                </Text>
                <View style={styles.priceRow}>
                    <Text style={styles.newPrice}>${item.price}</Text>
                </View>
                <View style={styles.ratingRow}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.rating}>4.5</Text>
                </View>
                <TouchableOpacity style={styles.buyButton}>
                    <Text style={styles.buyButtonText}>Buy</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    // Render Recommended Item
    const renderRecommendedItem = ({ item }: { item: Product }) => (
        <View style={styles.recommendedCard}>
            <Image source={{ uri: item.imageUrl }} style={styles.recommendedImage} />
            <Text style={styles.recommendedTitle} numberOfLines={2}>
                {item.name}
            </Text>
            <Text style={styles.recommendedPrice}>${item.price}</Text>
        </View>
    );

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={20} color="#999" style={{ marginRight: 5 }} />
                <TextInput
                    placeholder="Search for items..."
                    style={styles.searchInput}
                />
            </View>

            {/* Banner Carousel */}
            <View style={styles.bannerContainer}>
                <FlatList
                    ref={bannerRef}
                    data={products.slice(0, 3)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    scrollEnabled={false}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item.imageUrl }} style={styles.bannerImage} />
                    )}
                />
                {/* Dots Indicator */}
                <View style={styles.dotsContainer}>
                    {products.slice(0, 3).map((_, i) => (
                        <View
                            key={i}
                            style={[
                                styles.dot,
                                bannerIndex === i ? { backgroundColor: "#ff4081" } : null,
                            ]}
                        />
                    ))}
                </View>
            </View>

            {/* Categories Section */}
            <View style={styles.categoriesSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Categories</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.categoryContainer}>
                    <FlatList
                        data={categories}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={renderCategory}
                        contentContainerStyle={{ paddingHorizontal: 10 }}
                    />
                </View>
            </View>

            {/* Flash Sale */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Flash Sale</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={products.slice(0, 6)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderFlashSaleItem}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                />
            </View>

            {/* Featured Products */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Featured Products</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={products.slice(0, 6)}
                    numColumns={2}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderFeaturedProduct}
                    columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 10 }}
                    contentContainerStyle={{ paddingBottom: 10 }}
                />
            </View>

            {/* Recommended */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recommended for You</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={products.slice(0, 5)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderRecommendedItem}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: '#ff4081',
        marginBottom: 20,
        textAlign: 'center',
    },
    retryButton: {
        backgroundColor: '#ff4081',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    searchContainer: {
        flexDirection: "row",
        backgroundColor: "#fff",
        margin: 10,
        borderRadius: 8,
        alignItems: "center",
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 14,
    },
    bannerContainer: {
        width: "100%",
        height: 200,
        position: "relative",
    },
    bannerImage: {
        width,
        height: "100%",
        resizeMode: "cover",
    },
    dotsContainer: {
        position: "absolute",
        bottom: 10,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#ccc",
        marginHorizontal: 4,
    },
    section: {
        marginVertical: 25,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    seeAll: {
        fontSize: 12,
        color: "#ff4081",
    },
    categoryItem: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: 10,
        marginRight: 10,
        borderRadius: 10,
        width: 70,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    categoryText: {
        marginTop: 5,
        fontSize: 12,
        color: "#333",
    },
    flashItem: {
        backgroundColor: "#fff",
        width: 140,
        borderRadius: 10,
        padding: 10,
        marginRight: 10,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
        marginBottom: 5,
    },
    flashImage: {
        width: "100%",
        height: 80,
        resizeMode: "cover",
        borderRadius: 8,
    },
    flashTitle: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: "500",
    },
    flashPriceRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 4,
    },
    flashNewPrice: {
        fontSize: 14,
        color: "#d32f2f",
        fontWeight: "bold",
    },
    flashRatingRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    flashRating: {
        marginLeft: 3,
        fontSize: 12,
    },
    productCard: {
        backgroundColor: "#fff",
        borderRadius: 10,
        width: (width / 2) - 20,
        marginBottom: 15,
        overflow: "hidden",
        marginHorizontal: 5,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    productImage: {
        width: "100%",
        height: 120,
        resizeMode: "cover",
    },
    productInfo: {
        padding: 8,
    },
    productTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
    productSubtitle: {
        fontSize: 12,
        color: "#666",
        marginVertical: 2,
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },
    newPrice: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#d32f2f",
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    rating: {
        marginLeft: 3,
        fontSize: 12,
    },
    buyButton: {
        backgroundColor: "#ff4081",
        paddingVertical: 6,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 5,
    },
    buyButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    recommendedCard: {
        backgroundColor: "#fff",
        width: 120,
        borderRadius: 10,
        marginRight: 10,
        padding: 8,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    recommendedImage: {
        width: "100%",
        height: 80,
        resizeMode: "cover",
        borderRadius: 5,
    },
    recommendedTitle: {
        fontSize: 12,
        fontWeight: "500",
        marginVertical: 5,
    },
    recommendedPrice: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#d32f2f",
    },
    categoriesSection: {
        marginTop: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginHorizontal: 10,
        paddingVertical: 10,
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    categoryContainer: {
        paddingBottom: 10,
    },
});