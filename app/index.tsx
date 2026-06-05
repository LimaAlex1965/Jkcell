import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>

      <Text style={styles.logo}>
        JK
        TREINAMENTOS
  
      </Text>

      <Text style={styles.subtitulo}>
        Sistema de Gerenciamento de Alunos
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push("/cadastro")}
      >
        <Text style={styles.textoBotao}>
          Cadastrar Aluno
         </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.botao}
        onPress={() => router.push("/alunos")}
        >
        <Text style={styles.textoBotao}>
          Lista de Alunos
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.botao}
        onPress={() => router.push("/calendario")}
        >
        <Text style={styles.textoBotao}>
          Calendário
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    padding: 20,
  },

  logo: {
    color: "#D4AF37",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitulo: {
    color: "#FFF",
    textAlign: "center",
    marginBottom: 50,
    fontSize: 16,
  },

  botao: {
    backgroundColor: "#D4AF37",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
  },

  textoBotao: {
    color: "#000",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});