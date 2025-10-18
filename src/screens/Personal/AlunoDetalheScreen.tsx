import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AlunosStackParamList } from "../../@types/navigation";

type Props = NativeStackScreenProps<AlunosStackParamList, "AlunoDetalhe">;

export default function AlunoDetalheScreen({ route }: Props) {
  const { aluno } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{aluno.nome.charAt(0)}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.nome}>{aluno.nome}</Text>
          <Text style={styles.email}>{aluno.email}</Text>
          <Text style={styles.cpf}>CPF: {aluno.cpf}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Treinos</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle" size={24} color="#007AFF" />
          <Text style={styles.addText}>Criar Novo Treino</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dietas</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle" size={24} color="#4CAF50" />
          <Text style={[styles.addText, { color: "#4CAF50" }]}>
            Criar Nova Dieta
          </Text>
        </TouchableOpacity>
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
    backgroundColor: "white",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  cpf: {
    fontSize: 13,
    color: "#999",
    marginTop: 2,
  },
  section: { padding: 20 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
  },
});
