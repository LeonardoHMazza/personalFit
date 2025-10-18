import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";

export default function HomeAlunoScreen() {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, {user?.nome}! 💪</Text>
        <Text style={styles.subtitle}>Continue firme nos treinos!</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="flame" size={24} color="#FF6B6B" />
          <Text style={styles.statNumber}>1.850</Text>
          <Text style={styles.statLabel}>Calorias</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="barbell" size={24} color="#4ECDC4" />
          <Text style={styles.statNumber}>3/5</Text>
          <Text style={styles.statLabel}>Treinos</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="water" size={24} color="#95E1D3" />
          <Text style={styles.statNumber}>2.1L</Text>
          <Text style={styles.statLabel}>Água</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Próximo Treino</Text>
        <TouchableOpacity style={styles.treinoCard}>
          <View style={styles.treinoInfo}>
            <Text style={styles.treinoTitulo}>Treino A - Peito e Tríceps</Text>
            <Text style={styles.treinoDetalhes}>8 exercícios • ~60 min</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Refeições de Hoje</Text>
        <TouchableOpacity style={styles.dietaCard}>
          <View style={styles.dietaInfo}>
            <Text style={styles.dietaTitulo}>Café da Manhã ✅</Text>
            <Text style={styles.dietaDetalhes}>450 kcal</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dietaCard}>
          <View style={styles.dietaInfo}>
            <Text style={styles.dietaTitulo}>Almoço</Text>
            <Text style={styles.dietaDetalhes}>700 kcal</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#007AFF",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  subtitle: { fontSize: 16, color: "rgba(255,255,255,0.9)" },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    marginTop: -30,
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: 15,
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
  statNumber: { fontSize: 20, fontWeight: "bold", marginTop: 8 },
  statLabel: { fontSize: 12, color: "#666", marginTop: 4 },
  section: { padding: 20 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  treinoCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  treinoInfo: { flex: 1 },
  treinoTitulo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  treinoDetalhes: { fontSize: 14, color: "#666" },
  dietaCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dietaInfo: { flex: 1 },
  dietaTitulo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  dietaDetalhes: { fontSize: 14, color: "#666" },
});
