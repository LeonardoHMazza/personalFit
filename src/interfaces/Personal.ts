export interface Personal {
    id: number;
    nome: string;
    email: string;
    cref: string;
    especialidades: string[];
    experiencia: string;
    bio: string;
    contato: {
        telefone: string;
        email: string;
        instagram?: string;
    };
    horarioAtendimento: string;
    avaliacoes: {
        nota: number;
        total: number;
    };
}