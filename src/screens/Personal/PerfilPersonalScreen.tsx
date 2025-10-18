import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";

export default function PerfilPersonalScreen() {
  const { user, signOut } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color="white" />
        </View>
        <Text style={styles.nome}>{user?.nome}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        {user?.cref && <Text style={styles.cref}>CREF: {user.cref}</Text>}
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="person-outline" size={24} color="#666" />
          <Text style={styles.menuText}>Editar Perfil</Text>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="settings-outline" size={24} color="#666" />
          <Text style={styles.menuText}>Configurações</Text>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="help-circle-outline" size={24} color="#666" />
          <Text style={styles.menuText}>Ajuda</Text>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, styles.logoutButton]}
          onPress={signOut}
        >
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          <Text style={[styles.menuText, { color: "#FF3B30" }]}>Sair</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: { backgroundColor: "#007AFF", padding: 40, alignItems: "center" },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#0051D5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  nome: { fontSize: 24, fontWeight: "bold", color: "white", marginBottom: 4 },
  email: { fontSize: 14, color: "rgba(255,255,255,0.9)" },
  cref: { fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 4 },
  section: { padding: 20 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuText: { flex: 1, fontSize: 16, color: "#333", marginLeft: 15 },
  logoutButton: { marginTop: 20 },
});
