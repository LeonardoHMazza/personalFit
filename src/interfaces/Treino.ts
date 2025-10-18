export interface Exercicio {
    id?: number;
    nome: string;
    series: number;
    repeticoes: string;
    descanso: string;
    observacoes?: string;
}

export interface Treino {
    id: number;
    nome: string;
    alunoId: number;
    personalId: number;
    dataCriacao: string;
    exercicios: Exercicio[];
    observacoes?: string;
    status: 'ativo' | 'finalizado';
}