import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { AlunoStackParamList } from '../../@types/navigation';
import { Dieta } from '@/interfaces/Dieta';

type Props = BottomTabScreenProps<AlunoStackParamList, 'Dietas'>;

export default function MinhasDietasScreen() {
  // RN: O aluno só poderá visualizar a dieta, sem permissão para editá-la
  const [dietas] = useState<Dieta[]>([
    {
      id: 1,
      nome: 'Dieta Cutting',
      alunoId: 1,
      personalId: 1,
      dataCriacao: '2024-10-10',
      objetivo: 'Perda de gordura mantendo massa muscular',
      caloriasTotal: 2000,
      proteinas: 180,
      carboidratos: 200,
      gorduras: 55,
      status: 'ativo',
      refeicoes: [
        {
          nome: 'Café da Manhã',
          horario: '07:00',
          calorias: 450,
          alimentos: [
            { nome: 'Aveia', quantidade: '50g', calorias: 190 },
            { nome: 'Banana', quantidade: '1 unidade', calorias: 105 },
            { nome: 'Whey Protein', quantidade: '30g', calorias: 120 },
            { nome: 'Amendoim', quantidade: '15g', calorias: 85 },
          ],
        },
        {
          nome: 'Lanche da Manhã',
          horario: '10:00',
          calorias: 200,
          alimentos: [
            { nome: 'Iogurte Grego', quantidade: '150g', calorias: 130 },
            { nome: 'Castanhas', quantidade: '10g', calorias: 70 },
          ],
        },
        {
          nome: 'Almoço',
          horario: '12:30',
          calorias: 700,
          alimentos: [
            { nome: 'Arroz Integral', quantidade: '100g', calorias: 350 },
            { nome: 'Frango Grelhado', quantidade: '150g', calorias: 250 },
            { nome: 'Brócolis', quantidade: '100g', calorias: 35 },
            { nome: 'Azeite', quantidade: '1 colher', calorias: 90 },
          ],
        },
        {
          nome: 'Lanche da Tarde',
          horario: '16:00',
          calorias: 300,
          alimentos: [
            { nome: 'Batata Doce', quantidade: '150g', calorias: 130 },
            { nome: 'Peito de Peru', quantidade: '50g', calorias: 60 },
            { nome: 'Queijo Cottage', quantidade: '50g', calorias: 110 },
          ],
        },
        {
          nome: 'Jantar',
          horario: '19:30',
          calorias: 350,
          alimentos: [
            { nome: 'Salmão', quantidade: '150g', calorias: 280 },
            { nome: 'Salada Verde', quantidade: '100g', calorias: 25 },
            { nome: 'Quinoa', quantidade: '50g', calorias: 180 },
          ],
        },
      ],
      observacoes: 'Beber no mínimo 3L de água por dia. Evitar alimentos processados.',
    },
  ]);

  const [dietaSelecionada, setDietaSelecionada] = useState<Dieta | null>(null);
  const [refeicaoExpandida, setRefeicaoExpandida] = useState<number | null>(null);

  const toggleRefeicao = (index: number): void => {
    setRefeicaoExpandida(refeicaoExpandida === index ? null : index);
  };

  if (dietaSelecionada) {
    return (
      <ScrollView style={styles.container}>
        {/* Header da Dieta */}
        <View style={styles.dietaHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setDietaSelecionada(null)}
          >
            <Ionicons name="arrow-back" size={24} color="#4CAF50" />
          </TouchableOpacity>
          <View style={styles.dietaHeaderInfo}>
            <Text style={styles.dietaNome}>{dietaSelecionada.nome}</Text>
            <Text style={styles.dietaData}>
              Criada em: {new Date(dietaSelecionada.dataCriacao).toLocaleDateString('pt-BR')}
            </Text>
          </View>
        </View>

        {/* Aviso de Somente Leitura */}
        <View style={styles.avisoCard}>
          <Ionicons name="information-circle" size={20} color="#4CAF50" />
          <Text style={styles.avisoText}>
            Esta dieta foi criada pelo seu personal. Você pode visualizar, mas não editar.
          </Text>
        </View>

        {/* Objetivo */}
        <View style={styles.objetivoCard}>
          <View style={styles.objetivoHeader}>
            <Ionicons name="trophy" size={24} color="#FFC107" />
            <Text style={styles.objetivoTitle}>Objetivo</Text>
          </View>
          <Text style={styles.objetivoText}>{dietaSelecionada.objetivo}</Text>
        </View>

        {/* Macros do Dia */}
        <View style={styles.macrosContainer}>
          <Text style={styles.sectionTitle}>Macros Diários</Text>
          <View style={styles.macrosGrid}>
            <View style={styles.macroCard}>
              <Ionicons name="flame" size={28} color="#FF6B6B" />
              <Text style={styles.macroValor}>{dietaSelecionada.caloriasTotal}</Text>
              <Text style={styles.macroLabel}>Calorias</Text>
            </View>
            <View style={styles.macroCard}>
              <Ionicons name="fitness" size={28} color="#4ECDC4" />
              <Text style={styles.macroValor}>{dietaSelecionada.proteinas}g</Text>
              <Text style={styles.macroLabel}>Proteínas</Text>
            </View>
            <View style={styles.macroCard}>
              <Ionicons name="leaf" size={28} color="#95E1D3" />
              <Text style={styles.macroValor}>{dietaSelecionada.carboidratos}g</Text>
              <Text style={styles.macroLabel}>Carbos</Text>
            </View>
            <View style={styles.macroCard}>
              <Ionicons name="water" size={28} color="#FFE66D" />
              <Text style={styles.macroValor}>{dietaSelecionada.gorduras}g</Text>
              <Text style={styles.macroLabel}>Gorduras</Text>
            </View>
          </View>
        </View>

        {/* Refeições */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Refeições do Dia</Text>
          {dietaSelecionada.refeicoes.map((refeicao, index) => (
            <View key={index} style={styles.refeicaoCard}>
              <TouchableOpacity
                style={styles.refeicaoHeader}
                onPress={() => toggleRefeicao(index)}
              >
                <View style={styles.refeicaoInfo}>
                  <Text style={styles.refeicaoNome}>{refeicao.nome}</Text>
                  <Text style={styles.refeicaoHorario}>
                    {refeicao.horario} • {refeicao.calorias} kcal
                  </Text>
                </View>
                <Ionicons
                  name={refeicaoExpandida === index ? 'chevron-up' : 'chevron-down'}
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>

              {refeicaoExpandida === index && (
                <View style={styles.alimentosContainer}>
                  {refeicao.alimentos.map((alimento, idx) => (
                    <View key={idx} style={styles.alimentoItem}>
                      <View style={styles.alimentoBullet} />
                      <View style={styles.alimentoInfo}>
                        <Text style={styles.alimentoNome}>{alimento.nome}</Text>
                        <Text style={styles.alimentoDetalhes}>
                          {alimento.quantidade} • {alimento.calorias} kcal
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Observações */}
        {dietaSelecionada.observacoes && (
          <View style={styles.observacoesCard}>
            <View style={styles.observacoesHeader}>
              <Ionicons name="clipboard" size={20} color="#666" />
              <Text style={styles.observacoesTitle}>Observações Importantes</Text>
            </View>
            <Text style={styles.observacoesText}>
              {dietaSelecionada.observacoes}
            </Text>
          </View>
        )}
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Banner */}
      <View style={styles.banner}>
        <Ionicons name="restaurant" size={40} color="#4CAF50" />
        <Text style={styles.bannerTitle}>Minha Dieta</Text>
        <Text style={styles.bannerSubtitle}>
          Plano alimentar personalizado
        </Text>
      </View>

      {/* Dieta Ativa */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dieta Atual</Text>
        {dietas
          .filter((d) => d.status === 'ativo')
          .map((dieta) => (
            <TouchableOpacity
              key={dieta.id}
              style={styles.dietaCard}
              onPress={() => setDietaSelecionada(dieta)}
            >
              <View style={styles.dietaIconContainer}>
                <Ionicons name="restaurant" size={28} color="#4CAF50" />
              </View>
              <View style={styles.dietaInfo}>
                <Text style={styles.dietaCardNome}>{dieta.nome}</Text>
                <Text style={styles.dietaCardDetalhes}>
                  {dieta.caloriasTotal} kcal/dia • {dieta.refeicoes.length} refeições
                </Text>
                <Text style={styles.dietaCardObjetivo}>{dieta.objetivo}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#999" />
            </TouchableOpacity>
          ))}

        {dietas.filter((d) => d.status === 'ativo').length === 0 && (
          <View style={styles.emptyCard}>
            <Ionicons name="restaurant-outline" size={64} color="#CCC" />
            <Text style={styles.emptyText}>
              Aguardando dieta do seu personal
            </Text>
          </View>
        )}
      </View>

      {/* Dicas Rápidas */}
      <View style={styles.dicasCard}>
        <Text style={styles.dicasTitle}>💡 Dicas Importantes</Text>
        <View style={styles.dicaItem}>
          <Ionicons name="water" size={20} color="#2196F3" />
          <Text style={styles.dicaText}>Beba pelo menos 2-3L de água por dia</Text>
        </View>
        <View style={styles.dicaItem}>
          <Ionicons name="time" size={20} color="#FF9800" />
          <Text style={styles.dicaText}>Respeite os horários das refeições</Text>
        </View>
        <View style={styles.dicaItem}>
          <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
          <Text style={styles.dicaText}>Evite pular refeições</Text>
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
  banner: {
    backgroundColor: '#E8F5E9',
    padding: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  dietaCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dietaIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  dietaInfo: {
    flex: 1,
  },
  dietaCardNome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  dietaCardDetalhes: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  dietaCardObjetivo: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  emptyCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
    textAlign: 'center',
  },
  dietaHeader: {
    backgroundColor: 'white',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    marginRight: 15,
  },
  dietaHeaderInfo: {
    flex: 1,
  },
  dietaNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  dietaData: {
    fontSize: 13,
    color: '#666',
  },
  avisoCard: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    margin: 15,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  avisoText: {
    flex: 1,
    fontSize: 13,
    color: '#2E7D32',
    marginLeft: 10,
    lineHeight: 18,
  },
  objetivoCard: {
    backgroundColor: '#FFF9C4',
    margin: 15,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
  },
  objetivoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  objetivoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  objetivoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  macrosContainer: {
    padding: 15,
  },
  macrosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  macroCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  macroValor: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  macroLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  refeicaoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  refeicaoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  refeicaoInfo: {
    flex: 1,
  },
  refeicaoNome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  refeicaoHorario: {
    fontSize: 13,
    color: '#666',
  },
  alimentosContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  alimentoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  alimentoBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginRight: 10,
  },
  alimentoInfo: {
    flex: 1,
  },
  alimentoNome: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  alimentoDetalhes: {
    fontSize: 12,
    color: '#666',
  },
  observacoesCard: {
    backgroundColor: 'white',
    margin: 15,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  observacoesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  observacoesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  observacoesText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  dicasCard: {
    backgroundColor: 'white',
    margin: 15,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dicasTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  dicaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dicaText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    flex: 1,
  },
});