import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { api } from '../services/api';

export default function Detalhe() {
  const { id, from } = useLocalSearchParams();
  const [anime, setAnime] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Verifica se veio da página de sorteio
  const veioDoSorteio = from === 'sorteio';

  useEffect(() => {
    carregarDetalhes();
  }, []);

  async function carregarDetalhes() {
    try {
      setLoading(true);
      const response = await api.get(`/anime/${id}`);
      setAnime(response.data.data);
    } catch (error) {
      console.error('Erro ao carregar detalhes:', error);
    } finally {
      setLoading(false);
    }
  }

  async function sortearNovamente() {
    try {
      setLoading(true);
      const response = await api.get('/random/anime');
      setAnime(response.data.data);
    } catch (error) {
      console.error('Erro ao sortear novamente:', error);
      alert('Erro ao sortear novo anime. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#e74c3c" />
        <Text style={styles.loadingText}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (!anime) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Anime não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image
        source={{
          uri: anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url,
        }}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.title}>{anime.title}</Text>

      {anime.title_japanese && (
        <Text style={styles.titleJapanese}>{anime.title_japanese}</Text>
      )}

      <View style={styles.infoContainer}>
        {anime.score && (
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Nota</Text>
            <Text style={styles.infoValue}>{anime.score}</Text>
          </View>
        )}

        {anime.episodes && (
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Episódios</Text>
            <Text style={styles.infoValue}>{anime.episodes}</Text>
          </View>
        )}

        {anime.status && (
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Status</Text>
            <Text style={styles.infoValue}>{anime.status}</Text>
          </View>
        )}

        {anime.type && (
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Tipo</Text>
            <Text style={styles.infoValue}>{anime.type}</Text>
          </View>
        )}

        {anime.rating && (
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Classificação</Text>
            <Text style={styles.infoValue}>{anime.rating}</Text>
          </View>
        )}

        {anime.duration && (
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Duração</Text>
            <Text style={styles.infoValue}>{anime.duration}</Text>
          </View>
        )}

        {anime.aired?.string && (
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Exibição</Text>
            <Text style={styles.infoValue}>{anime.aired.string}</Text>
          </View>
        )}
      </View>

      {anime.genres && anime.genres.length > 0 && (
        <View style={styles.genresContainer}>
          <Text style={styles.genresTitle}>Gêneros</Text>
          <View style={styles.genresList}>
            {anime.genres.map((genre: any) => (
              <View key={genre.mal_id} style={styles.genreTag}>
                <Text style={styles.genreText}>{genre.name}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {anime.synopsis && (
        <View style={styles.synopsisContainer}>
          <Text style={styles.synopsisTitle}>Sinopse</Text>
          <Text style={styles.synopsisText}>{anime.synopsis}</Text>
        </View>
      )}

      {anime.background && (
        <View style={styles.backgroundContainer}>
          <Text style={styles.backgroundTitle}>Informações Adicionais</Text>
          <Text style={styles.backgroundText}>{anime.background}</Text>
        </View>
      )}

      {/* Botão "Sortear Novamente" - só aparece se veio da página de sorteio */}
      {veioDoSorteio && (
        <TouchableOpacity
          style={styles.sortearNovamenteButton}
          onPress={sortearNovamente}
          activeOpacity={0.7}
        >
          <Text style={styles.sortearNovamenteText}>Sortear Novamente</Text>
        </TouchableOpacity>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Desenvolvido por Jamily Grazielle e Marcio Sá
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    paddingBottom: 30,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    color: '#e74c3c',
  },
  image: {
    width: '100%',
    height: 400,
    backgroundColor: '#ddd',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a2e',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 5,
  },
  titleJapanese: {
    fontSize: 18,
    color: '#666',
    paddingHorizontal: 20,
    paddingBottom: 15,
    fontStyle: 'italic',
  },
  infoContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 14,
    color: '#1a1a2e',
    fontWeight: '500',
  },
  genresContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  genresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 10,
  },
  genresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreTag: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  synopsisContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  synopsisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 10,
  },
  synopsisText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#333',
    textAlign: 'justify',
  },
  backgroundContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backgroundTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 10,
  },
  backgroundText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
    textAlign: 'justify',
  },
  sortearNovamenteButton: {
    backgroundColor: '#e74c3c',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#e74c3c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  sortearNovamenteText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  voltarButton: {
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 12,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  voltarText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    paddingTop: 15,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginHorizontal: 20,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
  },
});