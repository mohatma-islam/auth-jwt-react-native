import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";
const Page = () => {
  const [code, setCode] = useState<number[]>([]);

  const codeLength = Array(4).fill(0);

  const router = useRouter();

  const onNumberPress = (number: number) => {
    console.log(number);
    setCode([...code, number]);
  };

  const numberBackspace = () => {
    setCode(code.slice(0, -1));
  };

  useEffect(() => {
    if (code.length === 4) {
      if (code.join("") === "1111") {
        router.replace("home");
        setCode([]);
      } else {
        showMessage({
          message: "Wrong PIN, please try again!",
          type: "warning",
          duration: 3000
        });
        setCode([]);
      }
    }
  }, [code]);

  return (
    <SafeAreaView>
      <Text style={styles.greeting}>Welcome Back, Mo</Text>

      <View style={[styles.codeView]}>
        {codeLength.map((_, index) => (
          <View
            key={index}
            style={[
              styles.codeEmpty,
              {
                backgroundColor:
                  typeof code[index] !== "undefined" ? "black" : "lightgrey",
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.numbersView}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[1, 2, 3].map((number) => (
            <Pressable key={number} onPress={() => onNumberPress(number)}>
              <View style={styles.circle}>
                <Text style={styles.number}>{number}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[4, 5, 6].map((number) => (
            <Pressable key={number} onPress={() => onNumberPress(number)}>
              <View style={styles.circle}>
                <Text style={styles.number}>{number}</Text>
              </View>
            </Pressable>
          ))}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[7, 8, 9].map((number) => (
            <Pressable key={number} onPress={() => onNumberPress(number)}>
              <View style={styles.circle}>
                <Text style={styles.number}>{number}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Pressable onPress={() => onNumberPress(0)}>
            <View style={styles.circle}>
              <Text style={styles.number}>0</Text>
            </View>
          </Pressable>

          <View style={{ minWidth: 30 }}>
            {/* {code.length > 0 && ( */}
              <Pressable onPress={numberBackspace}>
                <View style={styles.circle}>
                    <Ionicons
                      name="backspace-outline"
                      size={30}
                      color="black"
                    />
                </View>
              </Pressable>
            {/* )} */}
          </View>
        </View>
        <Text
          style={{
            alignSelf: "center",
            color: "green",
            fontWeight: "500",
            fontSize: 18,
          }}
        >
          Forgot your passcode? Press Here.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    alignSelf: "center",
  },
  codeView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
    marginVertical: 30,
  },
  codeEmpty: {
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  numbersView: {
    marginHorizontal: 50,
    gap: 60,
  },
  number: {
    fontSize: 32,
    color: "black",
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    margin: 10,
  },
});

export default Page;
