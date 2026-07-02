import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { api } from '../services/api';

export default function Busca() {
  const [searchQuery, setSearchQuery] = useState('');
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  async function buscarAnimes() {
    if (!searchQuery.trim()) {
      setModalMessage('Por favor, digite o nome de um anime para buscar.');
      setModalVisible(true);
      return;
    }

    try {
      setLoading(true);
      setHasSearched(true);
      
      const response = await api.get(`/anime?q=${encodeURIComponent(searchQuery)}&limit=20`);
      const resultados = response.data.data || [];
      setAnimes(resultados);
      
      if (resultados.length === 0) {
        setModalMessage(`Nenhum anime encontrado para "${searchQuery}"`);
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Erro ao buscar animes:', error);
      setModalMessage('Erro ao buscar animes. Tente novamente.');
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  }

  function limparBusca() {
    setSearchQuery('');
    setAnimes([]);
    setHasSearched(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Digite o nome do anime..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={buscarAnimes}
          returnKeyType="search"
          autoFocus={false}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={buscarAnimes}
          disabled={loading}
          activeOpacity={0.7}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.searchButtonText}>Buscar</Text>
          )}
        </TouchableOpacity>
      </View>

      {hasSearched && animes.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={limparBusca}
          activeOpacity={0.7}
        >
          <Text style={styles.clearButtonText}>Limpar Resultados</Text>
        </TouchableOpacity>
      )}

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.loadingText}>Buscando animes...</Text>
        </View>
      )}

      {!loading && hasSearched && animes.length > 0 && (
        <>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsCount}>
              {animes.length} anime(s) encontrado(s)
            </Text>
          </View>

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
                activeOpacity={0.7}
              >
                <Image
                  source={{
                    uri: item.images?.jpg?.image_url || 'https://via.placeholder.com/100x140',
                  }}
                  style={styles.image}
                />
                <View style={styles.info}>
                  <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                  </Text>
                  
                  {item.title_english && item.title_english !== item.title && (
                    <Text style={styles.titleEnglish} numberOfLines={1}>
                      {item.title_english}
                    </Text>
                  )}
                  
                  <View style={styles.detailsRow}>
                    {item.score && (
                      <View style={styles.scoreContainer}>
                        <Text style={styles.scoreIcon}>⭐</Text>
                        <Text style={styles.score}>{item.score}</Text>
                      </View>
                    )}
                    
                    {item.type && (
                      <Text style={styles.type}>{item.type}</Text>
                    )}
                    
                    {item.episodes && (
                      <Text style={styles.episodes}>{item.episodes} ep</Text>
                    )}
                  </View>
                  
                  {item.synopsis && (
                    <Text style={styles.synopsis} numberOfLines={2}>
                      {item.synopsis.replace(/<[^>]*>/g, '')}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}

      {!hasSearched && !loading && (
        <View style={styles.initialContainer}>
          <Text style={styles.initialTitle}>Busque seu anime favorito</Text>
          <Text style={styles.initialSubtitle}>
            Digite o nome do anime no campo acima{'\n'}
            e descubra todas as informações sobre ele
          </Text>
          <View style={styles.initialTips}>
            <View style={styles.tipItem}>
              <Text style={styles.tipText}>Busque pelo nome completo ou parcial</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipText}>Encontre animes de todas as épocas</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipText}>Resultados em tempo real</Text>
            </View>
          </View>
        </View>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Aviso</Text>
            </View>

            <Text style={styles.modalMessage}>{modalMessage}</Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
    backgroundColor: '#f5f7fa',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchInput: {
    flex: 1,
    height: 46,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#1a1a2e',
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  clearButton: {
    backgroundColor: '#f0f0f0',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 8,
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 112,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  titleEnglish: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  scoreIcon: {
    fontSize: 12,
    marginRight: 2,
  },
  score: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  type: {
    fontSize: 12,
    color: '#666',
    marginRight: 12,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  episodes: {
    fontSize: 12,
    color: '#666',
  },
  synopsis: {
    fontSize: 12,
    color: '#888',
    lineHeight: 16,
    marginTop: 4,
  },
  initialContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  initialTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a2e',
    textAlign: 'center',
    marginBottom: 8,
  },
  initialSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  initialTips: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tipItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tipText: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '80%',
    maxWidth: 340,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    marginBottom: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  modalMessage: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
  },
});