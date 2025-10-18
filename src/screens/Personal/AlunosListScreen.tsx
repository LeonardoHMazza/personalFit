import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AlunosStackParamList } from '../../@types/navigation';
import { Aluno } from '../../interfaces/Aluno';

type Props = NativeStackScreenProps<AlunosStackParamList, 'AlunosList'>;

interface NovoAlunoForm {
  nome: string;
  email: string;
  cpf: string;
}

export default function AlunosListScreen({ navigation }: Props) {
  const [alunos, setAlunos] = useState<Aluno[]>([
    {
      id: 1,
      nome: 'Maria Silva',
      email: 'maria@email.com',
      cpf: '123.456.789-00',
      dataInicio: '2024-01-15',
      statusTreino: 'ativo',
      statusDieta: 'ativo',
      personalId: 1,
    },
    {
      id: 2,
      nome: 'João Santos',
      email: 'joao@email.com',
      cpf: '987.654.321-00',
      dataInicio: '2024-02-20',
      statusTreino: 'ativo',
      statusDieta: 'pendente',
      personalId: 1,
    },
    {
      id: 3,
      nome: 'Ana Costa',
      email: 'ana@email.com',
      cpf: '456.789.123-00',
      dataInicio: '2024-03-10',
      statusTreino: 'atrasado',
      statusDieta: 'ativo',
      personalId: 1,
    },
  ]);

  const [searchText, setSearchText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [novoAluno, setNovoAluno] = useState<NovoAlunoForm>({
    nome: '',
    email: '',
    cpf: '',
  });

  const alunosFiltrados = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAddAluno = (): void => {
    // Validações baseadas nas regras de negócio do TCC
    if (!novoAluno.nome || !novoAluno.email || !novoAluno.cpf) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    // RN: O sistema não permitirá a criação de contas com um CPF que já esteja em uso
    const cpfExiste = alunos.some((a) => a.cpf === novoAluno.cpf);
    if (cpfExiste) {
      Alert.alert('Erro', 'Este CPF já está cadastrado no sistema');
      return;
    }

    // Adicionar novo aluno
    const novoId = Math.max(...alunos.map((a) => a.id)) + 1;
    const alunoCompleto: Aluno = {
      ...novoAluno,
      id: novoId,
      dataInicio: new Date().toISOString().split('T')[0],
      statusTreino: 'pendente',
      statusDieta: 'pendente',
      personalId: 1,
    };

    setAlunos([...alunos, alunoCompleto]);

    // Limpar formulário e fechar modal
    setNovoAluno({ nome: '', email: '', cpf: '' });
    setModalVisible(false);
    Alert.alert('Sucesso', 'Aluno cadastrado com sucesso!');
  };

  const renderAlunoItem = ({ item }: { item: Aluno }) => (
    <TouchableOpacity
      style={styles.alunoCard}
      onPress={() => navigation.navigate('AlunoDetalhe', { aluno: item })}
    >
      <View style={styles.alunoHeader}>
        <View style={styles.alunoAvatar}>
          <Text style={styles.alunoInitial}>{item.nome.charAt(0)}</Text>
        </View>
        <View style={styles.alunoInfo}>
          <Text style={styles.alunoNome}>{item.nome}</Text>
          <Text style={styles.alunoEmail}>{item.email}</Text>
          <Text style={styles.alunoData}>
            Desde {new Date(item.dataInicio).toLocaleDateString('pt-BR')}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#999" />
      </View>

      <View style={styles.statusContainer}>
        <View
          style={[
            styles.statusChip,
            {
              backgroundColor:
                item.statusTreino === 'ativo' ? '#E8F5E9' : '#FFF3E0',
            },
          ]}
        >
          <Ionicons
            name="barbell"
            size={14}
            color={item.statusTreino === 'ativo' ? '#4CAF50' : '#FF9800'}
          />
          <Text
            style={[
              styles.statusText,
              {
                color: item.statusTreino === 'ativo' ? '#4CAF50' : '#FF9800',
              },
            ]}
          >
            {item.statusTreino}
          </Text>
        </View>

        <View
          style={[
            styles.statusChip,
            {
              backgroundColor:
                item.statusDieta === 'ativo' ? '#E8F5E9' : '#FFF3E0',
            },
          ]}
        >
          <Ionicons
            name="restaurant"
            size={14}
            color={item.statusDieta === 'ativo' ? '#4CAF50' : '#FF9800'}
          />
          <Text
            style={[
              styles.statusText,
              { color: item.statusDieta === 'ativo' ? '#4CAF50' : '#FF9800' },
            ]}
          >
            {item.statusDieta}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Barra de Pesquisa */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar aluno..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Lista de Alunos */}
      <FlatList
        data={alunosFiltrados}
        renderItem={renderAlunoItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={64} color="#CCC" />
            <Text style={styles.emptyText}>Nenhum aluno encontrado</Text>
          </View>
        }
      />

      {/* Botão Flutuante para Adicionar Aluno */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>

      {/* Modal para Adicionar Novo Aluno */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Novo Aluno</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={28} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome Completo</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o nome do aluno"
                value={novoAluno.nome}
                onChangeText={(text) =>
                  setNovoAluno({ ...novoAluno, nome: text })
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="email@exemplo.com"
                value={novoAluno.email}
                onChangeText={(text) =>
                  setNovoAluno({ ...novoAluno, email: text })
                }
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>CPF</Text>
              <TextInput
                style={styles.input}
                placeholder="000.000.000-00"
                value={novoAluno.cpf}
                onChangeText={(text) =>
                  setNovoAluno({ ...novoAluno, cpf: text })
                }
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity style={styles.addButton} onPress={handleAddAluno}>
              <Text style={styles.addButtonText}>Cadastrar Aluno</Text>
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
    backgroundColor: '#F8F9FA',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  listContent: {
    padding: 15,
  },
  alunoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  alunoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  alunoAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  alunoInitial: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  alunoInfo: {
    flex: 1,
  },
  alunoNome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  alunoEmail: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  alunoData: {
    fontSize: 12,
    color: '#999',
  },
  statusContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 5,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 15,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});