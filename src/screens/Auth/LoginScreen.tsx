import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../../contexts/AuthContext';
import { AuthStackParamList } from '../../@types/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
    const { signIn } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    async function handleLogin(): Promise<void> {
        if (!email || !password) {
            Alert.alert('Atenção!', 'Preencha todos os campos.');
            return;
        }

        setLoading(true);
        const result = await signIn(email, password);
        setLoading(false);

        if (!result.success) {
            Alert.alert('Erro', result.error || 'Não foi possível fazer login');
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.content}>
                {/* Logo / Header */}
                <View style={styles.header}>
                    <Ionicons name="barbell" size={64} color="#007AFF" />
                    <Text style={styles.title}>PersonalFit</Text>
                    <Text style={styles.subtitle}> Treinos e Dietas Personalizados </Text>
                </View>

                {/* Formulário de Login */}
                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput 
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize='none'
                            keyboardType="email-address"
                            autoCorrect={false}
                        />
                    </View>

                    <View style={styles.inputContainer}> 
                        <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput 
                            style={styles.input}
                            placeholder="Senha"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoCapitalize='none'
                        />
                        <TouchableOpacity 
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.eyeIcon}
                        >
                            <Ionicons 
                                name={showPassword ?  "eye-outline" : "eye-off-outline"}
                                size={20}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Text style={styles.loginButtonText}>Entrar</Text>
                        )}
                    </TouchableOpacity>

                    {/* Dica de teste */}
                    <View style={styles.testInfo}>
                        <Text style={styles.testInfoText}>💡 Para testar:</Text>
                        <Text style={styles.testInfoText}>Personal: personal@teste.com</Text>
                        <Text style={styles.testInfoText}>Aluno: aluno@teste.com</Text>
                        <Text style={styles.testInfoText}>Senha: 123456</Text>
                    </View>
                </View>

                {/* Registro */}
                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>Não tem uma conta?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.registerLink}> Cadastre-se </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
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
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: '#007AFF',
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: '#007AFF',
        borderRadius: 12,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    loginButtonDisabled: {
        opacity: 0.6,
    },
    loginButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    testInfo: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#FFF9E6',
        borderRadius: 8,
        borderLeftWidth: 3,
        borderLeftColor: '#FFC107',
    },
    testInfoText: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    registerText: {
        color: '#666',
        fontSize: 14,
    },
    registerLink: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
});