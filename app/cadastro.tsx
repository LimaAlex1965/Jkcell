import { View, Text, StyleSheet } from "react-native";

export default function Cadastro() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Alunos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  titulo: {
    color: "#D4AF37",
    fontSize: 24,
    fontWeight: "bold",
  },
});