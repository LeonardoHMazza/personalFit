import { TipoUsuario, Usuario } from "./User";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  nome: string;
  email: string;
  cpf: string;
  password: string;
  tipo: TipoUsuario;
  cref?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: Usuario;
  token?: string;
  error?: string;
}

export interface AuthContextData {
  signed: boolean;
  user: Usuario | null;
  loading: boolean;
  signIn(email: string, password: string): Promise<AuthResponse>;
  signUp(data: RegisterData): Promise<AuthResponse>;
  signOut(): Promise<void>;
}