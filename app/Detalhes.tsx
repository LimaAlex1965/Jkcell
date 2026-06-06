import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";

import { alunos } from "./data/alunos";
import { gerarCronograma } from "./utils/cronograma";

export default function Detalhes() {

  const { id } = useLocalSearchParams();

  const aluno = alunos[Number(id)];
  const cronograma = aluno
  ? gerarCronograma(aluno.dataInicio)
  : [];

  if (!aluno) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.titulo}>
          Aluno não encontrado
        </Text>
      </ScrollView>
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
      <Text style={styles.subtitulo}>
        Cronograma de Aulas
      </Text>

      {cronograma.map((aula) => (

        <Text
           key={aula.numero}
          style={styles.texto}
      >
        Aula {aula.numero} - {aula.data}
        </Text>

))}

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

  subtitulo: {
  color: "#D4AF37",
  fontSize: 20,
  fontWeight: "bold",
  marginTop: 25,
  marginBottom: 10,
},
});