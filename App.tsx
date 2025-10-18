import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { 
  AuthStackParamList, 
  PersonalStackParamList, 
  AlunoStackParamList,
  AlunosStackParamList 
} from './src/@types/navigation';

// Telas de Autenticação
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';


// Telas do Personal
import HomePersonalScreen from './src/screens/Personal/HomePersonalScreen';
import AlunosListScreen from './src/screens/Personal/AlunosListScreen';
import AlunoDetalheScreen from './src/screens/Personal/AlunoDetalheScreen';
import PerfilPersonalScreen from './src/screens/Personal/PerfilPersonalScreen';

// Telas do Aluno
import HomeAlunoScreen from './src/screens/Aluno/HomeAlunoScreen';
import MeusTreinosScreen from './src/screens/Aluno/MeusTreinosScreen';
import MinhasDietasScreen from './src/screens/Aluno/MinhasDietasScreen';
import MeuPersonalScreen from './src/screens/Aluno/MeuPersonalScreen';


const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const PersonalTab = createBottomTabNavigator<PersonalStackParamList>();
const AlunoTab = createBottomTabNavigator<AlunoStackParamList>();
const AlunosStack = createNativeStackNavigator<AlunosStackParamList>();

// Navegação de autenticação
function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}


// Stack de Alunos (para permitir navegaçao para detalhes)
function AlunosStackNavigator() {
  return (
    <AlunosStack.Navigator>
        <AlunosStack.Screen
          name="AlunosList"
          component={AlunosListScreen}
          options={{ title: 'Meus Alunos' }}
        />
        <AlunosStack.Screen
          name="AlunoDetalhe"
          component={AlunoDetalheScreen}
          options={{ title: 'Detalhes do Aluno' }}
        />
    </AlunosStack.Navigator>


  );
}

// Navegação do Personal (Bottom Tabs)
function PersonalNavigator() {
  return (
    <PersonalTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'HomePersonal') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Alunos') {
            iconName = focused ? 'people' : 'people-outline';
          } else {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <PersonalTab.Screen 
        name="HomePersonal" 
        component={HomePersonalScreen}
        options={{ tabBarLabel: 'Início' }}
      />
      <PersonalTab.Screen 
        name="Alunos" 
        component={AlunosStackNavigator}
        options={{ tabBarLabel: 'Alunos' }}
      />
      <PersonalTab.Screen 
        name="PerfilPersonal" 
        component={PerfilPersonalScreen}
        options={{ tabBarLabel: 'Perfil' }}
      />
    </PersonalTab.Navigator>
  );
}

// Navegação do Aluno (Bottom Tabs)
function AlunoNavigator() {
  return (
    <AlunoTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'HomeAluno') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Treinos') {
            iconName = focused ? 'barbell' : 'barbell-outline';
          } else if (route.name === 'Dietas') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else {
            iconName = focused ? 'fitness' : 'fitness-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
      })}
    >
      <AlunoTab.Screen 
        name="HomeAluno" 
        component={HomeAlunoScreen}
        options={{ tabBarLabel: 'Início', title: 'Meu Treino' }}
      />
      <AlunoTab.Screen 
        name="Treinos" 
        component={MeusTreinosScreen}
        options={{ tabBarLabel: 'Treinos', title: 'Meus Treinos' }}
      />
      <AlunoTab.Screen 
        name="Dietas" 
        component={MinhasDietasScreen}
        options={{ tabBarLabel: 'Dietas', title: 'Minha Dieta' }}
      />
      <AlunoTab.Screen 
        name="MeuPersonal" 
        component={MeuPersonalScreen}
        options={{ tabBarLabel: 'Personal', title: 'Meu Personal' }}
      />
    </AlunoTab.Navigator>
  );
}

// Componente principal que decide qual navegação mostrar
function RootNavigator() {
  const { signed, user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!signed) {
    return <AuthNavigator />;
  }

  // Redirecionar baseado no tipo de usuário
  if (user?.tipo === 'personal') {
    return <PersonalNavigator />;
  } else {
    return <AlunoNavigator />;
  }
}

// App principal
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
});
