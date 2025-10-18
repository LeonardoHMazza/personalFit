import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { AlunoStackParamList } from "../../@types/navigation";
import { Exercicio, Treino } from "@/interfaces/Treino";

type Props = BottomTabScreenProps<AlunoStackParamList, "Treinos">;

export default function MeusTreinosScreen() {
  // RN: O aluno não poderá alterar as informações do treino
  const [treinos] = useState<Treino[]>([
    {
      id: 1,
      nome: "Treino A - Peito e Tríceps",
      alunoId: 1,
      personalId: 1,
      dataCriacao: "2024-10-15",
      exercicios: [
        {
          nome: "Supino Reto",
          series: 4,
          repeticoes: "10-12",
          descanso: "60s",
        },
        {
          nome: "Supino Inclinado",
          series: 4,
          repeticoes: "10-12",
          descanso: "60s",
        },
        { nome: "Crucifixo", series: 3, repeticoes: "12-15", descanso: "45s" },
        {
          nome: "Tríceps Testa",
          series: 3,
          repeticoes: "10-12",
          descanso: "45s",
        },
        {
          nome: "Tríceps Corda",
          series: 3,
          repeticoes: "12-15",
          descanso: "45s",
        },
      ],
      observacoes:
        "Focar na execução correta. Aumentar carga progressivamente.",
      status: "ativo",
    },
    {
      id: 2,
      alunoId: 1,
      personalId: 1,
      nome: "Treino B - Costas e Bíceps",
      dataCriacao: "2024-10-14",
      exercicios: [
        {
          nome: "Puxada Frontal",
          series: 4,
          repeticoes: "10-12",
          descanso: "60s",
        },
        {
          nome: "Remada Curvada",
          series: 4,
          repeticoes: "10-12",
          descanso: "60s",
        },
        {
          nome: "Remada Unilateral",
          series: 3,
          repeticoes: "12-15",
          descanso: "45s",
        },
        {
          nome: "Rosca Direta",
          series: 3,
          repeticoes: "10-12",
          descanso: "45s",
        },
        {
          nome: "Rosca Martelo",
          series: 3,
          repeticoes: "12-15",
          descanso: "45s",
        },
      ],
      observacoes: "Manter a postura durante todos os exercícios.",
      status: "ativo",
    },
    {
      id: 3,
      alunoId: 1,
      personalId: 1,
      nome: "Treino C - Pernas",
      dataCriacao: "2024-10-10",
      exercicios: [
        {
          nome: "Agachamento Livre",
          series: 4,
          repeticoes: "8-10",
          descanso: "90s",
        },
        {
          nome: "Leg Press 45°",
          series: 4,
          repeticoes: "12-15",
          descanso: "60s",
        },
        {
          nome: "Cadeira Extensora",
          series: 3,
          repeticoes: "12-15",
          descanso: "45s",
        },
        {
          nome: "Mesa Flexora",
          series: 3,
          repeticoes: "12-15",
          descanso: "45s",
        },
      ],
      observacoes: "Dia de pernas - não pular!",
      status: "finalizado", // RN: Histórico não pode ser editado
    },
  ]);

  const [treinoSelecionado, setTreinoSelecionado] = useState<Treino | null>(
    null
  );

  const renderExercicio = (exercicio: Exercicio, index: number) => (
    <View key={index} style={styles.exercicioCard}>
      <View style={styles.exercicioHeader}>
        <View style={styles.exercicioNumero}>
          <Text style={styles.exercicioNumeroText}>{index + 1}</Text>
        </View>
        <Text style={styles.exercicioNome}>{exercicio.nome}</Text>
      </View>
      <View style={styles.exercicioDetalhes}>
        <View style={styles.detalheItem}>
          <Ionicons name="repeat-outline" size={16} color="#666" />
          <Text style={styles.detalheText}>{exercicio.series} séries</Text>
        </View>
        <View style={styles.detalheItem}>
          <Ionicons name="fitness-outline" size={16} color="#666" />
          <Text style={styles.detalheText}>{exercicio.repeticoes} reps</Text>
        </View>
        <View style={styles.detalheItem}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.detalheText}>{exercicio.descanso}</Text>
        </View>
      </View>
    </View>
  );

  if (treinoSelecionado) {
    return (
      <ScrollView style={styles.container}>
        {/* Header do Treino */}
        <View style={styles.treinoHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setTreinoSelecionado(null)}
          >
            <Ionicons name="arrow-back" size={24} color="#007AFF" />
          </TouchableOpacity>
          <View style={styles.treinoHeaderInfo}>
            <Text style={styles.treinoNome}>{treinoSelecionado.nome}</Text>
            <Text style={styles.treinoData}>
              Criado em:{" "}
              {new Date(treinoSelecionado.dataCriacao).toLocaleDateString(
                "pt-BR"
              )}
            </Text>
          </View>
          {treinoSelecionado.status === "finalizado" && (
            <View style={styles.finalizadoBadge}>
              <Text style={styles.finalizadoText}>Histórico</Text>
            </View>
          )}
        </View>

        {/* Aviso de Somente Leitura */}
        <View style={styles.avisoCard}>
          <Ionicons name="information-circle" size={20} color="#007AFF" />
          <Text style={styles.avisoText}>
            {treinoSelecionado.status === "finalizado"
              ? "Este treino já foi finalizado e não pode ser alterado."
              : "Você pode visualizar seu treino. Apenas seu personal pode editá-lo."}
          </Text>
        </View>

        {/* Exercícios */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercícios</Text>
          {treinoSelecionado.exercicios.map((exercicio, index) =>
            renderExercicio(exercicio, index)
          )}
        </View>

        {/* Observações */}
        {treinoSelecionado.observacoes && (
          <View style={styles.observacoesCard}>
            <View style={styles.observacoesHeader}>
              <Ionicons name="document-text" size={20} color="#666" />
              <Text style={styles.observacoesTitle}>
                Observações do Personal
              </Text>
            </View>
            <Text style={styles.observacoesText}>
              {treinoSelecionado.observacoes}
            </Text>
          </View>
        )}

        {/* Botão de Concluir Treino (apenas para ativos) */}
        {treinoSelecionado.status === "ativo" && (
          <TouchableOpacity
            style={styles.concluirButton}
            onPress={() =>
              Alert.alert("Parabéns!", "Treino concluído! Continue assim! 💪")
            }
          >
            <Ionicons name="checkmark-circle" size={24} color="white" />
            <Text style={styles.concluirButtonText}>Concluir Treino</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Banner Motivacional */}
      <View style={styles.banner}>
        <Ionicons name="barbell" size={40} color="#007AFF" />
        <Text style={styles.bannerTitle}>Seus Treinos</Text>
        <Text style={styles.bannerSubtitle}>
          Treinos personalizados pelo seu personal
        </Text>
      </View>

      {/* Treinos Ativos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Treinos Ativos</Text>
        {treinos
          .filter((t) => t.status === "ativo")
          .map((treino) => (
            <TouchableOpacity
              key={treino.id}
              style={styles.treinoCard}
              onPress={() => setTreinoSelecionado(treino)}
            >
              <View style={styles.treinoIconContainer}>
                <Ionicons name="barbell" size={28} color="#007AFF" />
              </View>
              <View style={styles.treinoInfo}>
                <Text style={styles.treinoCardNome}>{treino.nome}</Text>
                <Text style={styles.treinoCardDetalhes}>
                  {treino.exercicios.length} exercícios
                </Text>
                <Text style={styles.treinoCardData}>
                  Criado:{" "}
                  {new Date(treino.dataCriacao).toLocaleDateString("pt-BR")}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#999" />
            </TouchableOpacity>
          ))}
      </View>

      {/* Histórico */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Histórico</Text>
        {treinos
          .filter((t) => t.status === "finalizado")
          .map((treino) => (
            <TouchableOpacity
              key={treino.id}
              style={[styles.treinoCard, styles.treinoCardHistorico]}
              onPress={() => setTreinoSelecionado(treino)}
            >
              <View
                style={[
                  styles.treinoIconContainer,
                  { backgroundColor: "#F5F5F5" },
                ]}
              >
                <Ionicons name="checkmark-circle" size={28} color="#4CAF50" />
              </View>
              <View style={styles.treinoInfo}>
                <Text style={styles.treinoCardNome}>{treino.nome}</Text>
                <Text style={styles.treinoCardDetalhes}>
                  {treino.exercicios.length} exercícios • Finalizado
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#999" />
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  banner: {
    backgroundColor: "#E3F2FD",
    padding: 30,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  treinoCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  treinoCardHistorico: {
    opacity: 0.7,
  },
  treinoIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  treinoInfo: {
    flex: 1,
  },
  treinoCardNome: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  treinoCardDetalhes: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },
  treinoCardData: {
    fontSize: 12,
    color: "#999",
  },
  treinoHeader: {
    backgroundColor: "white",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    marginRight: 15,
  },
  treinoHeaderInfo: {
    flex: 1,
  },
  treinoNome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  treinoData: {
    fontSize: 13,
    color: "#666",
  },
  finalizadoBadge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  finalizadoText: {
    color: "#4CAF50",
    fontSize: 12,
    fontWeight: "600",
  },
  avisoCard: {
    flexDirection: "row",
    backgroundColor: "#E3F2FD",
    margin: 15,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  avisoText: {
    flex: 1,
    fontSize: 13,
    color: "#0277BD",
    marginLeft: 10,
    lineHeight: 18,
  },
  exercicioCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  exercicioHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  exercicioNumero: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  exercicioNumeroText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  exercicioNome: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  exercicioDetalhes: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  detalheItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  detalheText: {
    fontSize: 13,
    color: "#666",
  },
  observacoesCard: {
    backgroundColor: "white",
    margin: 15,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  observacoesHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  observacoesTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
  },
  observacoesText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  concluirButton: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    gap: 10,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  concluirButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
