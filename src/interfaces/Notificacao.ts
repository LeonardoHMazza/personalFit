export interface Notificacao {
  id: number;
  usuarioId: number;
  tipo: 'treino' | 'dieta' | 'geral';
  titulo: string;
  mensagem: string;
  lida: boolean;
  dataCriacao: string;
}