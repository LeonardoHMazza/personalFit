import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "../../contexts/AuthContext";
import {
  PersonalStackParamList,
  AlunosStackParamList,
} from "../../@types/navigation";
import { Aluno } from "../../interfaces/Aluno";

type Props = CompositeScreenProps<
  BottomTabScreenProps<PersonalStackParamList, "HomePersonal">,
  NativeStackScreenProps<AlunosStackParamList>
>;

interface Estatisticas {
  totalAlunos: number;
  alunosAtivos: number;
  treinosCriados: number;
  dietasCriadas: number;
}

export default function HomePersonalScreen({ navigation }: Props) {
  const { user } = useAuth();

  const [alunos] = useState<Aluno[]>([
    {
      id: 1,
      nome: "Maria Silva",
      email: "maria@email.com",
      cpf: "123.456.789-00",
      dataInicio: "2024-01-15",
      statusTreino: "ativo",
      statusDieta: "pendente",
      personalId: 1,
    },
    {
      id: 2,
      nome: "João Santos",
      email: "joao@email.com",
      cpf: "987.654.321-00",
      dataInicio: "2024-02-20",
      statusTreino: "ativo",
      statusDieta: "ativo",
      personalId: 1,
    },
    {
      id: 3,
      nome: "Ana Costa",
      email: "ana@email.com",
      cpf: "456.789.123-00",
      dataInicio: "2024-03-10",
      statusTreino: "atrasado",
      statusDieta: "ativo",
      personalId: 1,
    },
  ]);

  const [estatisticas] = useState<Estatisticas>({
    totalAlunos: 15,
    alunosAtivos: 12,
    treinosCriados: 45,
    dietasCriadas: 38,
  });

  const renderAlunoCard = ({ item }: { item: Aluno }) => (
    <TouchableOpacity
      style={styles.alunoCard}
      onPress={() =>
        navigation.navigate("Alunos", {
          screen: "AlunoDetalhe",
          params: { aluno: item },
        })
      }
    >
      <View style={styles.alunoHeader}>
        <View style={styles.alunoAvatar}>
          <Ionicons name="person" size={24} color="#007AFF" />
        </View>
        <View style={styles.alunoInfo}>
          <Text style={styles.alunoNome}>{item.nome}</Text>
          <Text style={styles.alunoData}>
            Último treino:{" "}
            {new Date(item.dataInicio).toLocaleDateString("pt-BR")}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#999" />
      </View>

      <View style={styles.alunoStatus}>
        <View style={styles.statusBadge}>
          <Ionicons
            name="barbell"
            size={16}
            color={item.statusTreino === "ativo" ? "#4CAF50" : "#FF9800"}
          />
          <Text
            style={[
              styles.statusText,
              { color: item.statusTreino === "ativo" ? "#4CAF50" : "#FF9800" },
            ]}
          >
            Treino {item.statusTreino}
          </Text>
        </View>

        <View style={styles.statusBadge}>
          <Ionicons
            name="restaurant"
            size={16}
            color={item.statusDieta === "ativo" ? "#4CAF50" : "#FF9800"}
          />
          <Text
            style={[
              styles.statusText,
              { color: item.statusDieta === "ativo" ? "#4CAF50" : "#FF9800" },
            ]}
          >
            Dieta {item.statusDieta}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            Olá, {user?.nome || "Personal"} 👋
          </Text>
          <Text style={styles.subtitle}>Gerencie seus alunos e treinos</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="white" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Estatísticas */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="people" size={28} color="#007AFF" />
          <Text style={styles.statNumber}>{estatisticas.totalAlunos}</Text>
          <Text style={styles.statLabel}>Total Alunos</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="checkmark-circle" size={28} color="#4CAF50" />
          <Text style={styles.statNumber}>{estatisticas.alunosAtivos}</Text>
          <Text style={styles.statLabel}>Ativos</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="barbell" size={28} color="#FF6B6B" />
          <Text style={styles.statNumber}>{estatisticas.treinosCriados}</Text>
          <Text style={styles.statLabel}>Treinos</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="restaurant" size={28} color="#4ECDC4" />
          <Text style={styles.statNumber}>{estatisticas.dietasCriadas}</Text>
          <Text style={styles.statLabel}>Dietas</Text>
        </View>
      </View>

      {/* Ações Rápidas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#007AFF" }]}
            onPress={() =>
              navigation.navigate("Alunos", { screen: "AlunosList" })
            }
          >
            <Ionicons name="person-add" size={24} color="white" />
            <Text style={styles.actionButtonText}>Novo Aluno</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#4CAF50" }]}
            onPress={() =>
              navigation.navigate("Alunos", { screen: "AlunosList" })
            }
          >
            <Ionicons name="create" size={24} color="white" />
            <Text style={styles.actionButtonText}>Criar Treino</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de Alunos Recentes */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Alunos Recentes</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Alunos", { screen: "AlunosList" })
            }
          >
            <Text style={styles.seeAllText}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={alunos}
          renderItem={renderAlunoCard}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    backgroundColor: "#007AFF",
    padding: 20,
    paddingTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    marginTop: 4,
  },
  notificationButton: {
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    marginTop: -30,
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
    color: "#333",
  },
  statLabel: {
    fontSize: 11,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  seeAllText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "600",
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  alunoCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  alunoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  alunoAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  alunoInfo: {
    flex: 1,
  },
  alunoNome: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  alunoData: {
    fontSize: 13,
    color: "#666",
  },
  alunoStatus: {
    flexDirection: "row",
    gap: 10,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 5,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
