import { AuthProvider, useAuth } from "@/context/AuthContext";
import { UserInactivityProvider } from "@/context/UserInactivity";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable } from "react-native";
import "react-native-reanimated";
import { Platform } from "react-native";
import FlashMessage from "react-native-flash-message";

const StackLayout = () => {
  const router = useRouter();
  const { authState, onLogout } = useAuth();

  useEffect(() => {
    if (authState?.authenticate === false) {
      router.replace("/");
      // router.replace("(modals)/lock"); //only for testing
    } else if (authState?.authenticate === true) {
      router.replace("/home");
    }
  }, [authState?.authenticate]);

  console.log("test", authState);
  console.log(authState?.authenticate);

  return (
    <Stack>
      <Stack.Screen
        name="(modals)/white"
        options={{ headerShown: false, animation: "none" }}
      />
      <Stack.Screen
        name="(modals)/lock"
        options={{ headerShown: false, animation: "none" }}
      />
      <Stack.Screen
        name="home"
        options={{
          headerRight: () => (
            <Pressable onPress={onLogout} style={{ marginRight: 20 }}>
              <Ionicons name="log-out-outline" size={30} color="orange" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="index"
        options={{ title: "Login", headerTitleAlign: "center" }}
      />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <UserInactivityProvider>
        <StackLayout />
        {/* GLOBAL FLASH MESSAGE COMPONENT INSTANCE */}
        <FlashMessage
          position="top"
          statusBarHeight={Platform.OS === "web" ? 0 : undefined}
        />
      </UserInactivityProvider>
    </AuthProvider>
  );
}
