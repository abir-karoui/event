import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

// Empêche le splash natif de disparaître trop vite
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Chargement initial (1.5s)
        await new Promise(resolve => setTimeout(resolve, 1500)); 
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if (!appIsReady) return null;

 // app/_layout.tsx (Extrait du return)
return (
  <Stack screenOptions={{ headerShown: false }}>
    {/* "index" correspond à ton fichier app/index.tsx (ton WelcomeScreen) */}
    <Stack.Screen name="index" /> 
    
    {/* "(auth)" correspond au dossier app/(auth)/ */}
    <Stack.Screen name="(auth)" />
  </Stack>
);
}