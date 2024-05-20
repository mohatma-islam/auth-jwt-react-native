import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, onRegister } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const login = async () => {
    const result = await onLogin!(email, password);
    
    if (result && result.error) {
      alert(result.msg);
    }
  };

  const register = async () => {
    const result = await onRegister!(email, password);
    if (result && result.error) {
      alert(result.msg);
    } else {
      login();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text: string) => setEmail(text)}
          value={email}
        />
        <View>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <Pressable
            style={styles.iconContainer}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons
              name={passwordVisible ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="orange"
            />
          </Pressable>
        </View>
        <Button onPress={login} title="Sign in" />
        <Button onPress={register} title="Create Account" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
  },
  form: {
    gap: 10,
    width: "60%",
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1, // Take the full height of the parent
    justifyContent: "center", // Center vertically
    alignItems: "center",
    width: "100%",
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    height: "100%",
    justifyContent: "center",
  },
});

export default Login;
