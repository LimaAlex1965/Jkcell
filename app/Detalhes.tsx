import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { alunos } from "./data/alunos";

export default function Detalhes() {

  const { id } = useLocalSearchParams();

  const aluno = alunos[Number(id)];

  if (!aluno) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>
          Aluno não encontrado
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        {aluno.nome}
      </Text>

      <Text style={styles.texto}>
        Telefone: {aluno.telefone}
      </Text>

      <Text style={styles.texto}>
        Endereço: {aluno.endereco}
      </Text>

      <Text style={styles.texto}>
        Data de Início: {aluno.dataInicio}
      </Text>

      <Text style={styles.texto}>
        Turma: {aluno.turma}
      </Text>

      <Text style={styles.texto}>
        Pagamento: {aluno.pagamento}
      </Text>

      <Text style={styles.texto}>
        Forma: {aluno.formaPagamento}
      </Text>

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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  texto: {
    color: "#FFF",
    fontSize: 16,
    marginBottom: 10,
  },

});