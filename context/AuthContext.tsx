import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthProps {
  authState?: { token: string | null; authenticate: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "my-jwt";
export const API_URL = "https://api.developbetterapps.com";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticate: boolean | null;
  }>({
    token: null,
    authenticate: null,
  });

  // Check if the user has a token or not
  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      console.log('stored Token:', token);

      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setAuthState({
          token: token,
          authenticate: true,
        });
      } else {
        setAuthState({
          token: null,
          authenticate: false,
        });
      }
    };

    loadToken(); // Call the loadToken function
  }, []);

  const register = async (email: string, password: string) => {
    try {
      return await axios.post(`${API_URL}/users`, { email, password });
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/auth`, { email, password });

      console.log(result);

      // Save the token in the state and make the user authenticated
      setAuthState({
        token: result.data.token,
        authenticate: true,
      });

      // Add the token to the header
      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

      // Save the token in the secure store
      await AsyncStorage.setItem(TOKEN_KEY, result.data.token);

      return result;

    } catch (e) {
      // alert('Username or Password is not correct!');
      return { error: true, msg: (e as any).response.data.msg };

    }
  };

  const logout = async () => {
    // Delete token from storage
    await AsyncStorage.removeItem(TOKEN_KEY);

    // Update HTTP Headers
    axios.defaults.headers.common['Authorization'] = '';

    // Reset auth state
    setAuthState({
      token: null,
      authenticate: false,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
