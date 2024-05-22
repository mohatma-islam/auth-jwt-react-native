import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, onRegister } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      // alert(result.msg);
      showMessage({
        message: result.msg,
        type: "warning",
        duration: 3000
      });
    }
  };

  const register = async () => {
    const result = await onRegister!(email, password);
    if (result && result.error) {
      // alert(result.msg);

    } else {
      login();
    }
  };

  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
    // </TouchableWithoutFeedback>
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
