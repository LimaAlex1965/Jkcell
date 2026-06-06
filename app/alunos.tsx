import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { alunos } from "../app/data/alunos";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function Alunos() {
  return (
    <View style={styles.container}>

      <FlatList
        data={alunos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item,index }) => (

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/Detalhes?id=${index}`)}
          >

            <Text style={styles.nome}>
              {item.nome}
            </Text>

            <Text style={styles.texto}>
              Turma: {item.turma}
            </Text>

            <Text style={styles.texto}>
              Pagamento: {item.pagamento}
            </Text>

          </TouchableOpacity>

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

  card: {
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#D4AF37",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },

  nome: {
    color: "#D4AF37",
    fontSize: 18,
    fontWeight: "bold",
  },

  texto: {
    color: "#FFF",
    marginTop: 5,
  },

});