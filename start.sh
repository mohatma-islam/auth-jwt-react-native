npx create-expo-app auth-jwt -t expo-template-blank-typescript
cd ./auth-jwt

npm install axios
# npm install @react-navigation/native @react-navigation/native-stack

npx expo install react-native-reanimated

npx expo install react-native-screens react-native-safe-area-context
# npx expo install expo-secure-store

npm install @react-native-async-storage/async-storage

# npx expo intall react-native-mmkv -- this package broke the app needs prebuild as well

npx expo install expo-local-authentication

npx expo install expo-haptics

npm install --save react-native-flash-message