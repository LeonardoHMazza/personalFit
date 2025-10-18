import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../../contexts/AuthContext';
import { AuthStackParamList } from '../../@types/navigation';
import { TipoUsuario } from '../../interfaces/User';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const { signUp } = useAuth();
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [tipo, setTipo] = useState<TipoUsuario>('aluno');
  const [cref, setCref] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleRegister(): Promise<void> {
    // Validações
    if (!nome || !email || !cpf || !password || !confirmPassword) {
      Alert.alert('Atenção', 'Preencha todos os campos');
      return;
    }

    if (tipo === 'personal' && !cref) {
      Alert.alert('Atenção', 'Personal Trainers devem informar o CREF');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Atenção', 'As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);
    const result = await signUp({ 
      nome, 
      email, 
      cpf,
      password, 
      tipo,
      cref: tipo === 'personal' ? cref : undefined
    });
    setLoading(false);

    if (result.success) {
      Alert.alert(
        'Sucesso!',
        'Conta criada com sucesso. Faça login para continuar.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } else {
      Alert.alert('Erro', result.error || 'Não foi possível criar a conta');
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Preencha os dados abaixo</Text>
      </View>

      {/* Seleção de Tipo */}
      <View style={styles.tipoContainer}>
        <Text style={styles.label}>Você é:</Text>
        <View style={styles.tipoButtons}>
          <TouchableOpacity
            style={[
              styles.tipoButton,
              tipo === 'aluno' && styles.tipoButtonActive,
            ]}
            onPress={() => setTipo('aluno')}
          >
            <Ionicons
              name="person"
              size={24}
              color={tipo === 'aluno' ? '#FFF' : '#666'}
            />
            <Text
              style={[
                styles.tipoButtonText,
                tipo === 'aluno' && styles.tipoButtonTextActive,
              ]}
            >
              Aluno
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tipoButton,
              tipo === 'personal' && styles.tipoButtonActive,
            ]}
            onPress={() => setTipo('personal')}
          >
            <Ionicons
              name="fitness"
              size={24}
              color={tipo === 'personal' ? '#FFF' : '#666'}
            />
            <Text
              style={[
                styles.tipoButtonText,
                tipo === 'personal' && styles.tipoButtonTextActive,
              ]}
            >
              Personal
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Formulário */}
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="card-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="CPF"
            value={cpf}
            onChangeText={setCpf}
            keyboardType="numeric"
            maxLength={14}
          />
        </View>

        {tipo === 'personal' && (
          <View style={styles.inputContainer}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="CREF (ex: 123456-G/SP)"
              value={cref}
              onChangeText={setCref}
              autoCapitalize="characters"
            />
          </View>
        )}

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Senha (mínimo 6 caracteres)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={[styles.registerButton, loading && styles.registerButtonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.registerButtonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Login */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Já tem uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Faça login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  tipoContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  tipoButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  tipoButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  tipoButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  tipoButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  tipoButtonTextActive: {
    color: '#FFF',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 55,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 5,
  },
  registerButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});