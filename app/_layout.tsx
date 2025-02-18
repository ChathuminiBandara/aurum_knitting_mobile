import { StatusBar } from "react-native";
import { Stack } from "expo-router";

export default function Layout() {
    return (
        <>
            {/* ✅ Show Status Bar */}
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            {/* ✅ Your Stack Navigation */}
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="dashboard" options={{ headerShown: false }} />
            </Stack>
        </>
    );
}
