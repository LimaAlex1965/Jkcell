import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";

import { Aluno } from "./Types/Aluno";
import {
  carregarAlunos,
  atualizarAluno
} from "./services/storage";

export default function Editar() {

  const { telefone } = useLocalSearchParams();

  const [telefoneOriginal, setTelefoneOriginal] =
    useState("");

  const [nome, setNome] = useState("");
  const [telefoneAluno, setTelefoneAluno] =
    useState("");
  const [endereco, setEndereco] =
    useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [turma, setTurma] = useState("");
  const [pagamento, setPagamento] = useState("");
  const [formaPagamento, setFormaPagamento] =
    useState("");

  useEffect(() => {
    
    carregarAluno();
async function carregarAluno() {

  const lista = await carregarAlunos();

  const aluno = lista.find(
    item => item.telefone === telefone
  );

  if (!aluno) return;

  setTelefoneOriginal(aluno.telefone);

  setNome(aluno.nome);

  setTelefoneAluno(aluno.telefone);

  setEndereco(aluno.endereco);

  setDataInicio(aluno.dataInicio);

  setTurma(aluno.turma);

  setPagamento(aluno.pagamento);

  setFormaPagamento(
    aluno.formaPagamento
  );

}

  }, []);
  const salvarAlteracoes = async () => {

  const alunoAtualizado: Aluno = {

    nome,

    telefone: telefoneAluno,

    endereco,

    dataInicio,

    turma,

    pagamento,

    formaPagamento,

  };

  await atualizarAluno(
    telefoneOriginal,
    alunoAtualizado
  );

  Alert.alert(
    "Sucesso",
    "Aluno atualizado com sucesso!"
  );
  router.back();

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
    <ScrollView style={styles.container}>

      <Text style={styles.titulo}>
        Editar Aluno
      </Text>

      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
      />

      <TextInput
        style={styles.input}
        value={telefoneAluno}
        onChangeText={setTelefoneAluno}
        placeholder="Telefone"
      />

      <TextInput
        style={styles.input}
        value={endereco}
        onChangeText={setEndereco}
        placeholder="Endereço"
      />
      <TextInput
        style={styles.input}
        value={dataInicio}
        onChangeText={(texto) =>
          setDataInicio(formatarData(texto))
      } 
        placeholder="Data de início"
      />
      <Text style={styles.label}>
        Turma
      </Text>

      <Picker
        selectedValue={turma}
        onValueChange={(itemValue) =>
          setTurma(itemValue)
        }
        style={styles.picker}
      >
        <Picker.Item
          label="Manhã"
          value="Manhã"
        />

        <Picker.Item
          label="Tarde"
          value="Tarde"
        />

        <Picker.Item
          label="Noite"
          value="Noite"
        />
      </Picker>

      <Text style={styles.label}>
        Pagamento
      </Text>

      <Picker
        selectedValue={pagamento}
        onValueChange={(itemValue) =>
          setPagamento(itemValue)
        }
        style={styles.picker}
      >
        <Picker.Item
          label="Pago"
          value="Pago"
        />

        <Picker.Item
          label="Pendente"
          value="Pendente"
        />
      </Picker>
      <Text style={styles.label}>
        Forma de Pagamento
      </Text>

      <Picker
        selectedValue={formaPagamento}
        onValueChange={(itemValue) =>
          setFormaPagamento(itemValue)
        }
        style={styles.picker}
      >
        <Picker.Item
          label="PIX"
          value="PIX"
        />

        <Picker.Item
          label="Dinheiro"
          value="Dinheiro"
        />

        <Picker.Item
          label="Débito"
          value="Débito"
        />

        <Picker.Item
          label="Crédito"
          value="Crédito"
        />
      </Picker>

<TouchableOpacity
  style={styles.botaoSalvar}
  onPress={salvarAlteracoes}
>
  <Text style={styles.textoBotao}>
    Salvar Alterações
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

  input: {
    backgroundColor: "#111",
    color: "#FFF",
    borderWidth: 1,
    borderColor: "#D4AF37",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  botaoSalvar: {
    backgroundColor: "#D4AF37",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },

  textoBotao: {
    color: "#000",
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