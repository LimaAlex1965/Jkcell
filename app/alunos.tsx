import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from "react-native";
import { Aluno } from "./Types/Aluno";
import { carregarAlunos } from "./services/storage";

export default function Alunos() {

  const [listaAlunos, setListaAlunos] = useState<Aluno[]>([]);
  const [pesquisa, setPesquisa] = useState("");
  const [filtroTurma, setFiltroTurma] =
  useState("Todas");
  const [filtroPagamento, setFiltroPagamento] =
  useState("Todos");
  const alunosFiltrados = listaAlunos.filter(
  aluno => {

    const nomeValido =
      aluno.nome
        .toLowerCase()
        .includes(
          pesquisa.toLowerCase()
        );

    const turmaValida =
      filtroTurma === "Todas"
        ? true
        : aluno.turma === filtroTurma;

    const pagamentoValido =
      filtroPagamento === "Todos"
        ? true
        : aluno.pagamento === "Pendente";

    return nomeValido && turmaValida &&
    pagamentoValido

  }
);

  useEffect(() => {
     
    async function buscarAlunos() {

      const dados = await carregarAlunos();

      setListaAlunos(dados);

    }

    buscarAlunos();

  }, []);

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.inputPesquisa}
        placeholder="🔍 Buscar aluno..."
        placeholderTextColor="#999"
        value={pesquisa}
        onChangeText={setPesquisa}
      />
      <View style={styles.filtros}>

      <TouchableOpacity
        style={styles.botaoFiltro}
        onPress={() =>
          setFiltroTurma("Todas")
        }
      >
        <Text style={styles.textoFiltro}>
          Todas
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoFiltro}
        onPress={() =>
          setFiltroTurma("Manhã")
        }
      >
        <Text style={styles.textoFiltro}>
          Manhã
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoFiltro}
        onPress={() =>
          setFiltroTurma("Tarde")
        }
      >
        <Text style={styles.textoFiltro}>
          Tarde
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoFiltro}
        onPress={() =>
          setFiltroTurma("Noite")
        }
      >
        <Text style={styles.textoFiltro}>
          Noite
        </Text>
      </TouchableOpacity>

          </View>

          <View style={styles.filtrosPagamento}>

        <TouchableOpacity
          style={styles.botaoFiltro}
          onPress={() =>
            setFiltroPagamento("Todos")
          }
        >
          <Text style={styles.textoFiltro}>
            Todos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoFiltro}
          onPress={() =>
            setFiltroPagamento("Pendente")
          }
        >
          <Text style={styles.textoFiltro}>
            Pendente
          </Text>
        </TouchableOpacity>

      </View>
      <FlatList
        data={alunosFiltrados}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item,index }) => (

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push(
                  `/Detalhes?telefone=${item.telefone}`
                )
              }
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
  inputPesquisa: {
  backgroundColor: "#111",
  color: "#FFF",
  borderWidth: 1,
  borderColor: "#D4AF37",
  borderRadius: 10,
  padding: 12,
  marginBottom: 15,
},
filtros: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 15,
},

botaoFiltro: {
  backgroundColor: "#D4AF37",
  paddingHorizontal: 10,
  paddingVertical: 8,
  borderRadius: 8,
},

textoFiltro: {
  color: "#000",
  fontWeight: "bold",
},
filtrosPagamento: {
  flexDirection: "row",
  justifyContent: "center",
  gap: 10,
  marginBottom: 15,
},

});