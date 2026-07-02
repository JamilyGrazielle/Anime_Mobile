import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Anime Explorer',
            headerStyle: {
              backgroundColor: '#1a1a2e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerBackVisible: false, // Remove o botão de voltar da Home
          }}
        />

        <Stack.Screen
          name="animes"
          options={{
            title: 'Lista de Animes',
            headerStyle: {
              backgroundColor: '#1a1a2e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerBackTitle: 'Voltar', // Texto do botão de voltar
            headerBackVisible: true, // Mostra o botão de voltar
          }}
        />

        <Stack.Screen
          name="busca"
          options={{
            title: 'Buscar Animes',
            headerStyle: {
              backgroundColor: '#1a1a2e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerBackTitle: 'Voltar',
            headerBackVisible: true,
          }}
        />

        <Stack.Screen
          name="detalhe"
          options={{
            title: 'Detalhes do Anime',
            headerStyle: {
              backgroundColor: '#1a1a2e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerBackTitle: 'Voltar',
            headerBackVisible: true,
          }}
        />

        <Stack.Screen
          name="sobre"
          options={{
            title: 'Sobre',
            headerStyle: {
              backgroundColor: '#1a1a2e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerBackTitle: 'Voltar',
            headerBackVisible: true,
          }}
        />

        <Stack.Screen
          name="sorteio"
          options={{
            title: 'Sorteio Aleatório',
            headerStyle: {
              backgroundColor: '#1a1a2e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerBackTitle: 'Voltar',
            headerBackVisible: true,
          }}
        />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}