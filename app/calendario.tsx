import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

import { alunos } from "./data/alunos";
import { gerarCronograma } from "./utils/cronograma";

export default function Calendario() {

  const todasAulas = alunos.flatMap(aluno =>
    gerarCronograma(
      aluno.dataInicio,
      aluno.nome
    )
  );

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Calendário de Aulas
      </Text>

      <FlatList
        data={todasAulas}
        keyExtractor={(_, index) =>
          index.toString()
        }
        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text style={styles.data}>
              {item.data}
            </Text>

            <Text style={styles.texto}>
              {item.aluno}
            </Text>

            <Text style={styles.texto}>
              Aula {item.numero}
            </Text>

          </View>

        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 15,
  },

  titulo: {
    color: "#D4AF37",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#D4AF37",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },

  data: {
    color: "#D4AF37",
    fontSize: 18,
    fontWeight: "bold",
  },

  texto: {
    color: "#FFF",
    marginTop: 5,
  },

});