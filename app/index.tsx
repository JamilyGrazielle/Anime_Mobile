import { router } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.jpg')}
        style={styles.logoImage}
        resizeMode="contain"
      />

      <Text style={styles.logoText}>Anime Mobile</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/animes')}
      >
        <Text style={styles.buttonText}>Listar Animes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buttonBusca]}
        onPress={() => router.push('/busca')}
      >
        <Text style={styles.buttonText}>Buscar Anime</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buttonSorteio]}
        onPress={() => router.push('/sorteio')}
      >
        <Text style={styles.buttonText}>Sortear Anime</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buttonSobre]}
        onPress={() => router.push('/sobre')}
      >
        <Text style={styles.buttonText}>Sobre</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Desenvolvido por Jamily Grazielle e Marcio Sá
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1a1a2e',
  },
  logoImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 20,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#fff',
  },
  button: {
    backgroundColor: '#2563eb',
    width: 220,
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    elevation: 2,
  },
  buttonBusca: {
    backgroundColor: '#8b5cf6',
  },
  buttonSorteio: {
    backgroundColor: '#e74c3c',
  },
  buttonSobre: {
    backgroundColor: '#2d3436',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
});