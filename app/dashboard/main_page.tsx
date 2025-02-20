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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Screen width for the banner carousel
const { width } = Dimensions.get("window");

// Sample Data
const bannerData = [
    { id: "1", image: require("../../assets/login_background/img_2.jpg") },
    { id: "2", image: require("../../assets/login_background/img_2.jpg") },
    { id: "3", image: require("../../assets/login_background/img_2.jpg") },
];

const categories = [
    { id: "1", title: "New", icon: "flash-outline" },
    { id: "2", title: "Trending", icon: "trending-up-outline" },
    { id: "3", title: "Top Rated", icon: "star-outline" },
    { id: "4", title: "Discounts", icon: "pricetag-outline" },
    { id: "5", title: "More", icon: "ellipsis-horizontal" },
];

const flashSaleProducts = [
    {
        id: "flash1",
        title: "Bouquet Rose 1",
        oldPrice: "4000 ₽",
        newPrice: "2999 ₽",
        rating: 4.8,
        image: require("../../assets/login_background/img_2.jpg"),
    },
    {
        id: "flash2",
        title: "Bouquet Rose 2",
        oldPrice: "3500 ₽",
        newPrice: "2499 ₽",
        rating: 4.3,
        image: require("../../assets/login_background/img_2.jpg"),
    },
    {
        id: "flash3",
        title: "Bouquet Rose 3",
        oldPrice: "3500 ₽",
        newPrice: "2499 ₽",
        rating: 4.3,
        image: require("../../assets/login_background/img_2.jpg"),
    },
    {
        id: "flash4",
        title: "Bouquet Rose 4",
        oldPrice: "3500 ₽",
        newPrice: "2499 ₽",
        rating: 4.3,
        image: require("../../assets/login_background/img_2.jpg"),
    },
    {
        id: "flash5",
        title: "Bouquet Rose 5",
        oldPrice: "3500 ₽",
        newPrice: "2499 ₽",
        rating: 4.3,
        image: require("../../assets/login_background/img_2.jpg"),
    },
    {
        id: "flash6",
        title: "Bouquet Rose 6",
        oldPrice: "3500 ₽",
        newPrice: "2499 ₽",
        rating: 4.3,
        image: require("../../assets/login_background/img_2.jpg"),
    },
    // Add more items...
];

const featuredProducts = [
    {
        id: "f1",
        title: "Bouquet of Light Peach Bush Roses Pavlova",
        subtitle: "Puff tulip",
        oldPrice: "4890 ₽",
        newPrice: "4290 ₽",
        rating: 4.5,
        image: require("../../assets/login_background/img_2.jpg"),
    },
    {
        id: "f2",
        title: "Luxurious Lavender Bouquet With Roses",
        subtitle: "Purple Dream",
        oldPrice: "2590 ₽",
        newPrice: "1990 ₽",
        rating: 4.7,
        image: require("../../assets/login_background/img_2.jpg"),
    },
    {
        id: "f3",
        title: "Luxurious Lavender Bouquet",
        subtitle: "Purple Dream",
        oldPrice: "2590 ₽",
        newPrice: "1990 ₽",
        rating: 4.7,
        image: require("../../assets/login_background/img_2.jpg"),
    },
    {
        id: "f4",
        title: "Luxurious Lavender Bouquet",
        subtitle: "Purple Dream",
        oldPrice: "2590 ₽",
        newPrice: "1990 ₽",
        rating: 4.7,
        image: require("../../assets/login_background/img_2.jpg"),
    },
    {
        id: "f5",
        title: "Luxurious Lavender Bouquet",
        subtitle: "Purple Dream",
        oldPrice: "2590 ₽",
        newPrice: "1990 ₽",
        rating: 4.7,
        image: require("../../assets/login_background/img_2.jpg"),
    },    {
        id: "f6",
        title: "Luxurious Lavender Bouquet",
        subtitle: "Purple Dream",
        oldPrice: "2590 ₽",
        newPrice: "1990 ₽",
        rating: 4.7,
        image: require("../../assets/login_background/img_2.jpg"),
    },

    // Add more items...
];

const recommendedItems = [
    {
        id: "r1",
        title: "Romantic Red Roses",
        price: "1590 ₽",
        image: require("../../assets/login_background/img_2.jpg"),
    },
    {
        id: "r2",
        title: "Sunflower Sunshine",
        price: "990 ₽",
        image: require("../../assets/login_background/img_2.jpg"),
    },
    {
        id: "r3",
        title: "Sunflower Sunshine",
        price: "990 ₽",
        image: require("../../assets/login_background/img_2.jpg"),
    },
    {
        id: "r4",
        title: "Sunflower Sunshine",
        price: "990 ₽",
        image: require("../../assets/login_background/img_2.jpg"),
    },
    {
        id: "r5",
        title: "Sunflower Sunshine",
        price: "990 ₽",
        image: require("../../assets/login_background/img_2.jpg"),
    },
    // Add more items...
];

export default function MainPage() {
    const router = useRouter();

    // Tell TypeScript what this ref points to:
    const bannerRef = useRef<FlatList<any> | null>(null);

    const [bannerIndex, setBannerIndex] = useState(0);

/*    // Carousel States
    const [bannerIndex, setBannerIndex] = useState(0);
    const bannerRef = useRef(null);*/

    // Auto-scroll banners every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setBannerIndex((prevIndex) =>
                prevIndex === bannerData.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (bannerRef.current) {
            bannerRef.current.scrollToOffset({
                offset: bannerIndex * width,
                animated: true,
            });
        }
    }, [bannerIndex]);

    // Render Category
    // @ts-ignore
    const renderCategory = ({ item }) => (
        <TouchableOpacity style={styles.categoryItem}>
            <Ionicons name={item.icon} size={24} color="#ff4081" />
            <Text style={styles.categoryText}>{item.title}</Text>
        </TouchableOpacity>
    );

    // Render Flash Sale Item
    // @ts-ignore
    const renderFlashSaleItem = ({ item }) => (
        <View style={styles.flashItem}>
            <Image source={item.image} style={styles.flashImage} />
            <Text style={styles.flashTitle} numberOfLines={1}>
                {item.title}
            </Text>
            <View style={styles.flashPriceRow}>
                <Text style={styles.flashOldPrice}>{item.oldPrice}</Text>
                <Text style={styles.flashNewPrice}>{item.newPrice}</Text>
            </View>
            <View style={styles.flashRatingRow}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.flashRating}>{item.rating}</Text>
            </View>
        </View>
    );

    // Render Featured Product
    // @ts-ignore
    const renderFeaturedProduct = ({ item }) => (
        <View style={styles.productCard}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.productTitle} numberOfLines={2}>
                    {item.title}
                </Text>
                <Text style={styles.productSubtitle}>{item.subtitle}</Text>
                <View style={styles.priceRow}>
                    <Text style={styles.oldPrice}>{item.oldPrice}</Text>
                    <Text style={styles.newPrice}>{item.newPrice}</Text>
                </View>
                <View style={styles.ratingRow}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.rating}>{item.rating}</Text>
                </View>
                <TouchableOpacity style={styles.buyButton}>
                    <Text style={styles.buyButtonText}>Buy</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    // Render Recommended Item (horizontal scroll)
    // @ts-ignore
    const renderRecommendedItem = ({ item }) => (
        <View style={styles.recommendedCard}>
            <Image source={item.image} style={styles.recommendedImage} />
            <Text style={styles.recommendedTitle} numberOfLines={2}>
                {item.title}
            </Text>
            <Text style={styles.recommendedPrice}>{item.price}</Text>
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
                    data={bannerData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    scrollEnabled={false} // We manage scrolling ourselves
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Image source={item.image} style={styles.bannerImage} />
                    )}
                />
                {/* Dots Indicator */}
                <View style={styles.dotsContainer}>
                    {bannerData.map((_, i) => (
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
                {/* Section Header */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Categories</Text>
                    <TouchableOpacity onPress={() => { /* navigate or show all categories */ }}>
                        <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                </View>

                {/* Categories List */}
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
                    <TouchableOpacity onPress={() => { /* navigate to see all */ }}>
                        <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={flashSaleProducts}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={renderFlashSaleItem}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                />
            </View>

            {/* Featured Products (Grid) */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Featured Products</Text>
                    <TouchableOpacity onPress={() => { /* navigate to see all */ }}>
                        <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={featuredProducts}
                    numColumns={2}
                    keyExtractor={(item) => item.id}
                    renderItem={renderFeaturedProduct}
                    columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 10 }}
                    contentContainerStyle={{ paddingBottom: 10 }}
                />
            </View>

            {/* Recommended (Horizontal Scroll) */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recommended for You</Text>
                    <TouchableOpacity onPress={() => { /* navigate to see all */ }}>
                        <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={recommendedItems}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={renderRecommendedItem}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                />
            </View>
        </ScrollView>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
    },
    // Search Bar
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

    // Banner Carousel
    bannerContainer: {
        width: "100%",
        height: 200,
        position: "relative",
    },
    bannerImage: {
        width: width,
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

    // General Section
    section: {
        marginTop: 14,  // increased from 15
        marginBottom: 15,
        marginVertical: 25, // instead of separate marginTop, marginBottom

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

    // Categories
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

    // Flash Sale
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
        marginBottom: 5
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
    flashOldPrice: {
        fontSize: 12,
        color: "#888",
        textDecorationLine: "line-through",
        marginRight: 6,
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

    // Featured Products
    productCard: {
        backgroundColor: "#fff",
        borderRadius: 10,
        width: (width / 2) - 20, // 2 columns
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
    oldPrice: {
        textDecorationLine: "line-through",
        fontSize: 12,
        color: "#888",
        marginRight: 5,
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

    // Recommended
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




    // ---------------------
    categoriesSection: {
        marginTop: 15,
        // Optional if you want some background or border
        backgroundColor: "#fff",
        borderRadius: 10,
        marginHorizontal: 10,
        paddingVertical: 10,
        // Shadow for iOS/Android
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },


    categoryContainer: {
        // If you want extra padding around the categories
        paddingBottom: 10,
    },

});
