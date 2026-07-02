import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Sobre() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const colors = {
    background: isDark ? '#0f172a' : '#f5f7fa',
    text: isDark ? '#f1f5f9' : '#1a202c',
    subtext: isDark ? '#94a3b8' : '#4a5568',
    cardBlue: isDark ? '#172554' : '#eff6ff',
    cardPurple: isDark ? '#1e1b4b' : '#f5f3ff',
    cardGreen: isDark ? '#064e3b' : '#ecfdf5',
    cardGray: isDark ? '#1e293b' : '#f9fafb',
    tagBg: isDark ? '#1e293b' : '#e0e7ff',
    tagText: isDark ? '#94a3b8' : '#4338ca',
    linkBg: isDark ? '#0f172a' : '#ffffff',
    linkBorder: isDark ? '#334155' : '#e5e7eb',
    buttonBg: isDark ? '#2563eb' : '#3b82f6',
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            source={require('../assets/images/logo.jpg')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={[styles.title, { color: colors.text }]}>Anime Explorer</Text>
          <Text style={[styles.version, { color: colors.subtext }]}>Versao 1.0.0</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.cardBlue, borderColor: isDark ? '#1e3a5f' : '#bfdbfe' }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Sobre a API</Text>
          </View>
          <Text style={[styles.cardText, { color: colors.subtext }]}>
            Este aplicativo utiliza a <Text style={styles.highlight}>Jikan API</Text>, 
            uma API publica e gratuita que fornece dados do MyAnimeList, 
            um dos maiores bancos de dados de animes do mundo.
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.cardPurple, borderColor: isDark ? '#312e81' : '#ddd6fe' }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Funcionalidades</Text>
          </View>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureCheck}>[x]</Text>
              <Text style={[styles.cardText, { color: colors.subtext }]}>Listagem de animes com <Text style={styles.bold}>FlatList</Text></Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureCheck}>[x]</Text>
              <Text style={[styles.cardText, { color: colors.subtext }]}>Detalhes completos de cada anime</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureCheck}>[x]</Text>
              <Text style={[styles.cardText, { color: colors.subtext }]}>Sorteio aleatorio de animes</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureCheck}>[x]</Text>
              <Text style={[styles.cardText, { color: colors.subtext }]}>Suporte a temas Claro/Escuro</Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.cardGreen, borderColor: isDark ? '#065f46' : '#a7f3d0' }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Tecnologias</Text>
          </View>
          <View style={styles.techList}>
            <View style={[styles.techTag, { backgroundColor: colors.tagBg }]}>
              <Text style={[styles.techText, { color: colors.tagText }]}>React Native</Text>
            </View>
            <View style={[styles.techTag, { backgroundColor: colors.tagBg }]}>
              <Text style={[styles.techText, { color: colors.tagText }]}>Expo</Text>
            </View>
            <View style={[styles.techTag, { backgroundColor: colors.tagBg }]}>
              <Text style={[styles.techText, { color: colors.tagText }]}>TypeScript</Text>
            </View>
            <View style={[styles.techTag, { backgroundColor: colors.tagBg }]}>
              <Text style={[styles.techText, { color: colors.tagText }]}>Axios</Text>
            </View>
            <View style={[styles.techTag, { backgroundColor: colors.tagBg }]}>
              <Text style={[styles.techText, { color: colors.tagText }]}>Expo Router</Text>
            </View>
            <View style={[styles.techTag, { backgroundColor: colors.tagBg }]}>
              <Text style={[styles.techText, { color: colors.tagText }]}>Jikan API</Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.cardGray, borderColor: colors.linkBorder }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Links Uteis</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.linkItem, { backgroundColor: colors.linkBg, borderColor: colors.linkBorder }]} 
            onPress={() => Linking.openURL('https://jikan.moe')}
            activeOpacity={0.7}
          >
            <View style={styles.linkContent}>
              <Text style={styles.linkIcon}>Docs</Text>
              <View>
                <Text style={[styles.linkTitle, { color: colors.text }]}>Jikan API</Text>
                <Text style={[styles.linkSubtitle, { color: colors.subtext }]}>Documentacao Oficial</Text>
              </View>
            </View>
            <Text style={[styles.linkArrow, { color: isDark ? '#64748b' : '#9ca3af' }]}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.linkItem, { backgroundColor: colors.linkBg, borderColor: colors.linkBorder }]} 
            onPress={() => Linking.openURL('https://myanimelist.net')}
            activeOpacity={0.7}
          >
            <View style={styles.linkContent}>
              <Text style={styles.linkIcon}>MAL</Text>
              <View>
                <Text style={[styles.linkTitle, { color: colors.text }]}>MyAnimeList</Text>
                <Text style={[styles.linkSubtitle, { color: colors.subtext }]}>Fonte dos dados</Text>
              </View>
            </View>
            <Text style={[styles.linkArrow, { color: isDark ? '#64748b' : '#9ca3af' }]}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.linkItem, { backgroundColor: colors.linkBg, borderColor: colors.linkBorder }]} 
            onPress={() => Linking.openURL('https://github.com/jikan-me/jikan')}
            activeOpacity={0.7}
          >
            <View style={styles.linkContent}>
              <Text style={styles.linkIcon}>Git</Text>
              <View>
                <Text style={[styles.linkTitle, { color: colors.text }]}>GitHub</Text>
                <Text style={[styles.linkSubtitle, { color: colors.subtext }]}>Codigo fonte da API</Text>
              </View>
            </View>
            <Text style={[styles.linkArrow, { color: isDark ? '#64748b' : '#9ca3af' }]}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.footer, { borderTopColor: isDark ? '#1e293b' : '#e5e7eb' }]}>
          <Text style={[styles.footerText, { color: colors.subtext }]}>
            Desenvolvido para a disciplina de Programacao para Dispositivos Moveis
          </Text>
          <Text style={[styles.footerSubtext, { color: isDark ? '#64748b' : '#9ca3af' }]}>
            Desenvolvido por Jamily Grazielle e Marcio Sa
          </Text>
        </View>

        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: colors.buttonBg }]} 
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  version: {
    fontSize: 14,
    marginTop: 4,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardText: {
    fontSize: 15,
    lineHeight: 24,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#2563eb',
  },
  bold: {
    fontWeight: 'bold',
  },
  featureList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureCheck: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: 'bold',
  },
  techList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  techText: {
    fontSize: 13,
    fontWeight: '500',
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  linkContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  linkIcon: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  linkTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  linkSubtitle: {
    fontSize: 12,
  },
  linkArrow: {
    fontSize: 18,
  },
  footer: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 13,
  },
  footerSubtext: {
    textAlign: 'center',
    fontSize: 11,
    marginTop: 4,
  },
  backButton: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  backButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});