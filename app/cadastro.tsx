import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { alunos } from "../app/data/alunos";
import { Aluno } from "../app/Types/Aluno";

export default function Cadastro() {
const [nome, setNome] = useState("");
const [telefone, setTelefone] = useState("");
const [endereco, setEndereco] = useState("");

const [dataInicio, setDataInicio] = useState("");
const [turma, setTurma] = useState("Manhã");
const [pagamento, setPagamento] = useState("Pago");
const [formaPagamento, setFormaPagamento] = useState("PIX");

const formatarTelefone = (texto: string) => {

  const numeros = texto.replace(/\D/g, "");

  if (numeros.length <= 2) {
    return `(${numeros}`;
  }

  if (numeros.length <= 7) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  }

  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
};

const formatarData = (texto: string) => {

  const numeros = texto.replace(/\D/g, "");

  if (numeros.length <= 2) {
    return numeros;
  }

  if (numeros.length <= 4) {
    return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
  }

  return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4, 8)}`;
};
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
      placeholder="(85) 99999-9999"
      placeholderTextColor="#999"
      keyboardType="phone-pad"
      value={telefone}
      onChangeText={(texto) =>
        setTelefone(formatarTelefone(texto))
  }
      />
      <TextInput
         style={styles.input}
         placeholder="Endereço"
         placeholderTextColor="#999"
          value={endereco}
        onChangeText={setEndereco}
      />
     <TextInput
        style={styles.input}
        placeholder="dd/mm/aaaa"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={dataInicio}
        onChangeText={(texto) =>
          setDataInicio(formatarData(texto))
        }
      />
      <Text style={styles.label}>Turma</Text>

      <Picker
        selectedValue={turma}
        onValueChange={(itemValue: string) => setTurma(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Manhã" value="Manhã" />
        <Picker.Item label="Tarde" value="Tarde" />
        <Picker.Item label="Noite" value="Noite" />
      </Picker>
      <Text style={styles.label}>Pagamento</Text>

      <Picker
        selectedValue={pagamento}
        onValueChange={(itemValue: string) => setPagamento(itemValue)}
        style={styles.picker}
      >
      <Picker.Item label="Pago" value="Pago" />
      <Picker.Item label="Pendente" value="Pendente" />
      </Picker>

      <Text style={styles.label}>Forma de Pagamento</Text>

      <Picker
        selectedValue={formaPagamento}
        onValueChange={(itemValue: string) => setFormaPagamento(itemValue)}
       style={styles.picker}
      >
      <Picker.Item label="PIX" value="PIX" />
      <Picker.Item label="Dinheiro" value="Dinheiro" />
      <Picker.Item label="Débito" value="Débito" />
      <Picker.Item label="Crédito" value="Crédito" />
      </Picker>
    
      <TouchableOpacity 
      style={styles.botao}
      onPress={() => {

        const novoAluno: Aluno = {
          nome,
          telefone,
          endereco,
          dataInicio,
          turma,
          pagamento,
          formaPagamento,
      };

        alunos.push(novoAluno);

      Alert.alert(
       "Dados do Aluno",

      `Nome: ${nome}
      Telefone: ${telefone}
      Endereço: ${endereco}
      Data Início: ${dataInicio}
      Turma: ${turma}
      Pagamento: ${pagamento}
      Forma: ${formaPagamento}`
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
  label: {
  color: "#D4AF37",
  fontSize: 16,
  marginBottom: 5,
  marginTop: 10,
},

picker: {
  backgroundColor: "#111",
  color: "#FFF",
  borderRadius: 10,
  marginBottom: 10,
},

});