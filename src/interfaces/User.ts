export type TipoUsuario = 'personal' | 'aluno';

export interface Usuario {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    tipo: TipoUsuario;
    cref?: string; // Apenas para personal
    PersonalId?: number; // Apenas para aluno
    dataCriacao?: string;
}