import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TIME_KEY = 'startTime';
const LOCK_TIME = 3000;

export const UserInactivityProvider = ({children}: any) => {
    const appState = useRef(AppState.currentState);
    const router = useRouter();

    useEffect(() => {
        const subscription = AppState.addEventListener('change', handleAppStateChange);

        window.addEventListener('beforeunload', handleTabClose);
        window.addEventListener('load', handleTabOpen);

        return () => {
            subscription.remove();
            window.removeEventListener('beforeunload', handleTabClose);
            window.removeEventListener('load', handleTabOpen);
        };
    }, []);

    const handleAppStateChange = async (nextAppState: any) => {
        console.log('appState', appState.current, nextAppState);

        if (nextAppState === 'inactive') {
            router.push('(modals)/white');
        } else {
            if (router.canGoBack()) {
                router.back();
            }
        }

        if (nextAppState === 'background') {
            const data = await recordStartTime();
            console.log(data);
        } else if (nextAppState === 'active' && appState.current.match(/background/)) {
            await checkLockScreen();
        }

        appState.current = nextAppState;
    };

    const handleTabClose = async (event: any) => {
        await recordStartTime();
    };

    const handleTabOpen = async () => {
        await checkLockScreen();
    };

    const checkLockScreen = async () => {
        const storedTime = await AsyncStorage.getItem(TIME_KEY);
        if (storedTime) {
            const DateTime = Number(storedTime);
            const elapsed = Date.now() - DateTime;
            console.log('elapsed:', elapsed);

            if (elapsed > LOCK_TIME) {
                router.replace('(modals)/lock');
            }
        }
    };

    const recordStartTime = async () => {
        const currentTime = Date.now().toString();
        await AsyncStorage.setItem(TIME_KEY, currentTime);
        return currentTime;
    };

    return children;
};
