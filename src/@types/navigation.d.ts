import { NavigatorScreenParams } from '@react-navigation/native';
import { Aluno } from '../interfaces/Aluno';

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};

export type PersonalStackParamList = {
    HomePersonal: undefined;
    Alunos: NavigatorScreenParams<AlunosStackParamList>;
    PerfilPersonal: undefined;
};

// Tipos para Alunos Stack (dentro do Personal)
export type AlunosStackParamList = {
    AlunosList: undefined;
    AlunoDetalhe: {
        aluno: Aluno;
    };
};

// Tipos para Aluno Stack
export type AlunoStackParamList = {
    HomeAluno: undefined;
    Treinos: undefined;
    Dietas: undefined;
    MeuPersonal: undefined;
};

export type RootStackParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>;
    Personal: NavigatorScreenParams<PersonalStackParamList>;
    Aluno: NavigatorScreenParams<AlunoStackParamList>;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
