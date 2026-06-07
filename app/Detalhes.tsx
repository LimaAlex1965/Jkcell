import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { Alert } from "react-native";
import { excluirAluno } from "./services/storage";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

import { useEffect, useState } from "react";
import { Aluno } from "./Types/Aluno";
import { carregarAlunos } from "./services/storage";
import { gerarCronograma } from "./utils/cronograma";

export default function Detalhes() {

 const { telefone } = useLocalSearchParams();

const [aluno, setAluno] =
  useState<Aluno | null>(null);

  useEffect(() => {

  async function buscarAluno() {

    const lista = await carregarAlunos();

    const encontrado = lista.find(
      item => item.telefone === telefone
    );

    if (encontrado) {
      setAluno(encontrado);
    }

  }

  buscarAluno();

}, [telefone]);

  const removerAluno = () => {

  Alert.alert(
    "Excluir Aluno",
    "Tem certeza que deseja excluir este aluno?",
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {

         if (!aluno) return;

        await excluirAluno(
          aluno.telefone
        );

          Alert.alert(
            "Sucesso",
            "Aluno removido."
          );

          router.push("/alunos");

        },
      },
    ]
  );

};
 const cronograma = aluno
  ? gerarCronograma(
      aluno.dataInicio,
      aluno.nome
    )
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
    <ScrollView style={styles.container}>

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
        <TouchableOpacity
          style={styles.botaoExcluir}
          onPress={removerAluno}
        >
          <Text style={styles.textoBotao}>
            Excluir Aluno
          </Text>
        </TouchableOpacity>

    </ScrollView>
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
botaoExcluir: {
  backgroundColor: "#AA0000",
  borderWidth: 2,
  borderColor: "#FFFFFF",
  paddingVertical: 15,
  paddingHorizontal: 20,
  borderRadius: 10,
  marginTop: 20,
  marginBottom: 50,
  alignItems: "center",
},

textoBotao: {
  color: "#FFF",
  fontSize: 16,
  fontWeight: "bold",
},
});
