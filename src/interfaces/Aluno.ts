export interface Aluno {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    dataInicio: string;
    statusTreino: 'ativo' | 'pendente' | 'atrasado' | 'finalizado';
    statusDieta: 'ativo' | 'pendente' | 'atrasado' | 'finalizado';
    personalId: number;
}