import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function Cadastro() {

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Cadastro de Aluno
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        placeholderTextColor="#999"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        placeholderTextColor="#999"
        value={telefone}
        onChangeText={setTelefone}
      />

      <TextInput
         style={styles.input}
         placeholder="Endereço"
         placeholderTextColor="#999"
          value={endereco}
        onChangeText={setEndereco}
      />

      <TouchableOpacity 
      style={styles.botao}
      onPress={() => {

    Alert.alert(
      "Aluno",
      `Nome: ${nome}\nTelefone: ${telefone}\nEndereço: ${endereco}`
    );

  }}
      >
        <Text style={styles.textoBotao}>
          Salvar Aluno
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },

  titulo: {
    color: "#D4AF37",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#111",
    color: "#FFF",
    borderWidth: 1,
    borderColor: "#D4AF37",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },

  botao: {
    backgroundColor: "#D4AF37",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },

  textoBotao: {
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

});