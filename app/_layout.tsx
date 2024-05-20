import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable } from "react-native";
import "react-native-reanimated";

const StackLayout = () => {
  const router = useRouter();
  const { authState, onLogout } = useAuth();

  useEffect(() => {
    if (authState?.authenticate === false) {
      router.replace("/");
    } else if (authState?.authenticate === true) {
      router.replace("/home");
    }
  }, [authState?.authenticate]);

  console.log("test", authState);
  console.log(authState?.authenticate);

  return (
    <Stack>
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
      <StackLayout />
    </AuthProvider>
  );
}
