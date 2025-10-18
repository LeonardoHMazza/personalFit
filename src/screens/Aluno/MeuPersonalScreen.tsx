import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { AlunoStackParamList } from '../../@types/navigation';
import { Personal } from '@/interfaces/Personal';
import { useAuth } from '@/contexts/AuthContext';

type Props = BottomTabScreenProps<AlunoStackParamList, 'MeuPersonal'>;

export default function MeuPersonalScreen() {
  // Dados do personal - viriam da API
  const personal: Personal = {
      id: 1,
      nome: 'João Silva',
      email: 'joaoS@personal.com',
      cref: '123456-G/SP',
      especialidades: ['Hipertrofia', 'Emagrecimento', 'Funcional'],
      experiencia: '8 anos',
      bio: 'Personal Trainer certificado com mais de 8 anos de experiência. Especialista em treino funcional e hipertrofia. Focado em resultados e transformação de vida através do exercício físico.',
      contato: {
          telefone: '(16) 99999-9999',
          email: 'joao.personal@email.com',
          instagram: '@joaopersonal',
      },
      horarioAtendimento: 'Segunda a Sexta: 06:00 - 20:00\nSábado: 08:00 - 12:00',
      avaliacoes: {
          nota: 4.8,
          total: 47,
      },
  };

  const { user, signOut } = useAuth();
  
  const handleLigar = (): void => {
    const phoneNumber = personal.contato.telefone.replace(/\D/g, '');
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmail = (): void => {
    Linking.openURL(`mailto:${personal.contato.email}`);
  };

  const handleWhatsApp = (): void => {
    const numero = personal.contato.telefone.replace(/\D/g, '');
    const url = `whatsapp://send?phone=55${numero}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert('Erro', 'WhatsApp não está instalado no dispositivo');
        }
      })
      .catch((err) => console.error('Erro ao abrir WhatsApp:', err));
  };

  const handleInstagram = (): void => {
    if (!personal.contato.instagram) return;
    
    const username = personal.contato.instagram.replace('@', '');
    const instagramUrl = `instagram://user?username=${username}`;
    const webUrl = `https://www.instagram.com/${username}/`;
    
    Linking.canOpenURL(instagramUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(instagramUrl);
        } else {
          return Linking.openURL(webUrl);
        }
      })
      .catch((err) => console.error('Erro ao abrir Instagram:', err));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header do Personal */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={50} color="white" />
          </View>
          <View style={styles.avaliacaoContainer}>
            <Ionicons name="star" size={16} color="#FFC107" />
            <Text style={styles.avaliacaoText}>{personal.avaliacoes.nota}</Text>
          </View>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.personalNome}>{personal.nome}</Text>
          <Text style={styles.personalCref}>CREF: {personal.cref}</Text>
          <Text style={styles.personalExperiencia}>
            {personal.experiencia} de experiência
          </Text>
        </View>
      </View>

      {/* Especialidades */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="fitness" size={24} color="#007AFF" />
          <Text style={styles.sectionTitle}>Especialidades</Text>
        </View>
        <View style={styles.especialidadesContainer}>
          {personal.especialidades.map((especialidade, index) => (
            <View key={index} style={styles.especialidadeChip}>
              <Text style={styles.especialidadeText}>{especialidade}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Biografia */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="document-text" size={24} color="#007AFF" />
          <Text style={styles.sectionTitle}>Sobre</Text>
        </View>
        <Text style={styles.bioText}>{personal.bio}</Text>
      </View>

      {/* Horário de Atendimento */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="time" size={24} color="#007AFF" />
          <Text style={styles.sectionTitle}>Horário de Atendimento</Text>
        </View>
        <View style={styles.horarioCard}>
          <Text style={styles.horarioText}>{personal.horarioAtendimento}</Text>
        </View>
      </View>

      {/* Botões de Contato */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="call" size={24} color="#007AFF" />
          <Text style={styles.sectionTitle}>Contato</Text>
        </View>

        <TouchableOpacity style={styles.contatoButton} onPress={handleWhatsApp}>
          <View style={[styles.contatoIcon, { backgroundColor: '#25D366' }]}>
            <Ionicons name="logo-whatsapp" size={24} color="white" />
          </View>
          <View style={styles.contatoInfo}>
            <Text style={styles.contatoLabel}>WhatsApp</Text>
            <Text style={styles.contatoValor}>{personal.contato.telefone}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.contatoButton} onPress={handleLigar}>
          <View style={[styles.contatoIcon, { backgroundColor: '#007AFF' }]}>
            <Ionicons name="call" size={24} color="white" />
          </View>
          <View style={styles.contatoInfo}>
            <Text style={styles.contatoLabel}>Telefone</Text>
            <Text style={styles.contatoValor}>{personal.contato.telefone}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.contatoButton} onPress={handleEmail}>
          <View style={[styles.contatoIcon, { backgroundColor: '#EA4335' }]}>
            <Ionicons name="mail" size={24} color="white" />
          </View>
          <View style={styles.contatoInfo}>
            <Text style={styles.contatoLabel}>Email</Text>
            <Text style={styles.contatoValor}>{personal.contato.email}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>

        {personal.contato.instagram && (
          <TouchableOpacity style={styles.contatoButton} onPress={handleInstagram}>
            <View style={[styles.contatoIcon, { backgroundColor: '#E4405F' }]}>
              <Ionicons name="logo-instagram" size={24} color="white" />
            </View>
            <View style={styles.contatoInfo}>
              <Text style={styles.contatoLabel}>Instagram</Text>
              <Text style={styles.contatoValor}>{personal.contato.instagram}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Avaliações */}
      <View style={styles.avaliacoesSection}>
        <View style={styles.avaliacoesHeader}>
          <Ionicons name="star" size={24} color="#FFC107" />
          <Text style={styles.sectionTitle}>Avaliações</Text>
        </View>
        <View style={styles.avaliacoesCard}>
          <View style={styles.avaliacoesNumero}>
            <Text style={styles.avaliacoesNota}>{personal.avaliacoes.nota}</Text>
            <View style={styles.estrelas}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= Math.floor(personal.avaliacoes.nota) ? 'star' : 'star-outline'}
                  size={20}
                  color="#FFC107"
                />
              ))}
            </View>
            <Text style={styles.avaliacoesTotal}>
              {personal.avaliacoes.total} avaliações
            </Text>
          </View>
        </View>
      </View>

      {/* Botão de Emergência */}
      <View style={styles.emergenciaCard}>
        <Ionicons name="alert-circle" size={24} color="#FF3B30" />
        <View style={styles.emergenciaInfo}>
          <Text style={styles.emergenciaTitle}>Dúvidas ou Problemas?</Text>
          <Text style={styles.emergenciaText}>
            Entre em contato com seu personal através dos canais acima
          </Text>
        </View>
        <View>
          <TouchableOpacity
                    
                    onPress={signOut}
                  >
                    <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
                    <Text>Sair</Text>
                  </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 30,
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#0051D5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  avaliacaoContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  avaliacaoText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  headerInfo: {
    flex: 1,
  },
  personalNome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  personalCref: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 2,
  },
  personalExperiencia: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  especialidadesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  especialidadeChip: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  especialidadeText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  bioText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  horarioCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  horarioText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
  },
  contatoButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contatoIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  contatoInfo: {
    flex: 1,
  },
  contatoLabel: {
    fontSize: 13,
    color: '#999',
    marginBottom: 2,
  },
  contatoValor: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  avaliacoesSection: {
    padding: 20,
    paddingTop: 0,
  },
  avaliacoesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avaliacoesCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avaliacoesNumero: {
    alignItems: 'center',
  },
  avaliacoesNota: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  estrelas: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 8,
  },
  avaliacoesTotal: {
    fontSize: 14,
    color: '#666',
  },
  emergenciaCard: {
    backgroundColor: '#FFEBEE',
    margin: 20,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  emergenciaInfo: {
    flex: 1,
    marginLeft: 12,
  },
  emergenciaTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#C62828',
    marginBottom: 4,
  },
  emergenciaText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
});