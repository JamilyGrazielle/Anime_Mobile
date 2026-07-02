import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { api } from '../services/api';

const { width } = Dimensions.get('window');

export default function Sorteio() {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function realizarSorteio() {
    try {
      setLoading(true);
      setModalVisible(false);

      const response = await api.get('/random/anime');

      router.push({
        pathname: '/detalhe',
        params: {
          id: String(response.data.data.mal_id),
          from: 'sorteio', 
        },
      });
    } catch (error) {
      console.error('Erro no sorteio:', error);
      setErrorMessage('Erro ao sortear anime. Tente novamente.');
      setErrorModalVisible(true);
    } finally {
      setLoading(false);
    }
  }

  function abrirModal() {
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Anime Aleatório</Text>

        <Text style={styles.subtitle}>
          Clique no botão abaixo e deixe o destino decidir!
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Sorteio completamente aleatório</Text>
          <Text style={styles.infoText}>Pode vir qualquer gênero</Text>
          <Text style={styles.infoText}>Inclui todos os tipos de anime</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={abrirModal}
          disabled={loading}
          activeOpacity={0.7}
        >
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color="#fff" size="small" />
              <Text style={styles.buttonText}>Sorteando...</Text>
            </View>
          ) : (
            <Text style={styles.buttonText}>Sortear Anime</Text>
          )}
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalEmoji}>!</Text>
              <Text style={styles.modalTitle}>Atenção!</Text>
            </View>

            <Text style={styles.modalMessage}>
              O sorteio pode trazer qualquer tipo de anime, de qualquer gênero ou classificação etária.
            </Text>

            <View style={styles.modalWarningBox}>
              <Text style={styles.modalWarningText}>• Pode conter conteúdo adulto</Text>
              <Text style={styles.modalWarningText}>• Qualquer gênero é possível</Text>
              <Text style={styles.modalWarningText}>• Animes de todas as épocas</Text>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={realizarSorteio}
              >
                <Text style={styles.modalButtonTextConfirm}>Estou ciente!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={errorModalVisible}
        onRequestClose={() => setErrorModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, styles.errorModalContainer]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, styles.errorTitle]}>Erro</Text>
            </View>

            <Text style={styles.errorMessage}>{errorMessage}</Text>

            <TouchableOpacity
              style={[styles.modalButton, styles.errorButton]}
              onPress={() => setErrorModalVisible(false)}
            >
              <Text style={styles.modalButtonTextConfirm}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#a8a8b3',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  infoBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  infoText: {
    color: '#c8c8d4',
    fontSize: 15,
    marginVertical: 5,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#e74c3c',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#e74c3c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    width: '100%',
    maxWidth: 300,
  },
  buttonDisabled: {
    opacity: 0.7,
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
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
    width: width * 0.85,
    maxWidth: 400,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  errorModalContainer: {
    borderWidth: 2,
    borderColor: '#e74c3c',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalEmoji: {
    fontSize: 28,
    fontWeight: 'bold',
    marginRight: 12,
    color: '#e74c3c',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  errorTitle: {
    color: '#e74c3c',
  },
  modalMessage: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 16,
  },
  modalWarningBox: {
    backgroundColor: '#fff3e0',
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ffcc80',
  },
  modalWarningText: {
    fontSize: 14,
    color: '#e65100',
    marginVertical: 3,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: '#f0f0f0',
  },
  modalButtonConfirm: {
    backgroundColor: '#e74c3c',
  },
  errorButton: {
    backgroundColor: '#e74c3c',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  modalButtonTextConfirm: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  errorMessage: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});