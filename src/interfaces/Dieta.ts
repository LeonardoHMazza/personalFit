export interface Alimento {
    id?: number;
    nome: string;
    quantidade: string;
    calorias: number;
    proteinas?: number;
    carboidratos?: number;
    gorduras?: number;
}

export interface Refeicao {
    id?: number;
    nome: string;
    horario: string;
    calorias: number;
    alimentos: Alimento[];
}

export interface Dieta {
    id: number;
    nome: string;
    alunoId: number;
    personalId: number;
    dataCriacao: string;
    objetivo: string;
    caloriasTotal: number;
    proteinas: number;
    carboidratos: number;
    gorduras: number;
    refeicoes: Refeicao[];
    observacoes?: string;
    status: 'ativo' | 'finalizado';
}