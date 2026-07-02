import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { api } from '../services/api';

export default function Animes() {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    carregarAnimes();
  }, []);

  async function carregarAnimes() {
    const response = await api.get('/anime');
    setAnimes(response.data.data);
  }

  return (
    <FlatList
      data={animes}
      keyExtractor={(item: any) => item.mal_id.toString()}
      renderItem={({ item }: any) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: '/detalhe',
              params: { id: item.mal_id },
            })
          }
        >
          <Image
            source={{
              uri: item.images.jpg.image_url,
            }}
            style={styles.image}
          />

          <View style={styles.info}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>Nota: {item.score}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 140,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});