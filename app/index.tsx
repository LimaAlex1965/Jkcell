import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { useEffect, useState } from "react";
import { carregarAlunos } from "./services/storage";
import { Aluno } from "./Types/Aluno";
import { router } from "expo-router";
import {
  calcularNumeroAula
} from "./utils/cronograma";

export default function Home() {

  const [alunos, setAlunos] =
  useState<Aluno[]>([]);

  useEffect(() => {

  async function buscarAlunos() {

    const dados =
      await carregarAlunos();

    setAlunos(dados);

  }

      buscarAlunos();

    }, []);


    const totalAlunos =
  alunos.length;

  const pagos =
    alunos.filter(
      aluno =>
        aluno.pagamento === "Pago"
    ).length;

  const pendentes =
    alunos.filter(
      aluno =>
        aluno.pagamento === "Pendente"
    ).length;

  const manha =
    alunos.filter(
      aluno =>
        aluno.turma === "Manhã"
    ).length;

  const tarde =
    alunos.filter(
      aluno =>
        aluno.turma === "Tarde"
    ).length;

  const noite =
    alunos.filter(
      aluno =>
        aluno.turma === "Noite"
    ).length;

  const ultimoAluno =
    alunos.length > 0
       ? alunos[alunos.length - 1]
        : null;

        const alunosPendentes =
          alunos.filter(
            aluno =>
              aluno.pagamento === "Pendente"
          );

        const totalPendentes =
          alunosPendentes.length;

          const aulasSemana =
            alunos.slice(0, 5);

  return (
        <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 30,
      }}
    >

      <Text style={styles.logo}>
        JK
        TREINAMENTOS
  
      </Text>

      <Text style={styles.subtitulo}>
        Sistema de Gerenciamento de Alunos
      </Text>

      <View style={styles.cardGrande}>

      <Text style={styles.tituloCard}>
        Total de Alunos
      </Text>

      <Text style={styles.numero}>
        {totalAlunos}
      </Text>

    </View>

    <View style={styles.cardGrande}>

      <Text style={styles.tituloCard}>
        Último Cadastro
      </Text>

      {ultimoAluno ? (
        <>
          <Text style={styles.nomeAluno}>
            {ultimoAluno.nome}
          </Text>

          <Text style={styles.infoAluno}>
            Turma: {ultimoAluno.turma}
          </Text>
        </>
      ) : (
        <Text style={styles.infoAluno}>
          Nenhum aluno cadastrado
        </Text>
      )}

    </View>

    <View style={styles.linhaCards}>

      <View style={styles.cardPequeno}>
        <Text style={styles.tituloCard}>
          Pagos
        </Text>

        <Text style={styles.numero}>
          {pagos}
        </Text>
      </View>

      <View style={styles.cardPequeno}>
        <Text style={styles.tituloCard}>
          Pendentes
        </Text>

        <Text style={styles.numero}>
          {pendentes}
        </Text>
      </View>

    </View>

    <View style={styles.linhaCards}>

      <View style={styles.cardPequeno}>
        <Text style={styles.tituloCard}>
          Manhã
        </Text>

        <Text style={styles.numero}>
          {manha}
        </Text>
      </View>

      <View style={styles.cardPequeno}>
        <Text style={styles.tituloCard}>
          Tarde
        </Text>

        <Text style={styles.numero}>
          {tarde}
        </Text>
      </View>

      <View style={styles.cardPequeno}>
        <Text style={styles.tituloCard}>
          Noite
        </Text>

        <Text style={styles.numero}>
          {noite}
        </Text>
      </View>

    </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push("/cadastro")}
      >
        <Text style={styles.textoBotao}>
          Cadastrar Aluno
         </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.botao}
        onPress={() => router.push("/alunos")}
        >
        <Text style={styles.textoBotao}>
          Lista de Alunos
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.botao}
        onPress={() => router.push("/calendario")}
        >
        <Text style={styles.textoBotao}>
          Calendário
        </Text>
      </TouchableOpacity>

      <View style={styles.cardGrande}>

      <Text style={styles.tituloCard}>
        ⚠️ Alunos Pendentes
      </Text>

      {alunosPendentes.length === 0 ? (

        <Text style={styles.infoAluno}>
          Nenhuma pendência
        </Text>

      ) : (

        <>
          {alunosPendentes
            .slice(0, 3)
            .map((aluno, index) => (

              <Text
                key={index}
                style={styles.infoAluno}
              >
                • {aluno.nome}
              </Text>

          ))}

          <Text style={styles.totalPendentes}>
            Total: {totalPendentes}
          </Text>
        </>

      )}

    </View>
    <View style={styles.cardGrande}>

    <Text style={styles.tituloCard}>
      📅 Aulas desta Semana
    </Text>

    {aulasSemana.length === 0 ? (

      <Text style={styles.infoAluno}>
        Nenhuma aula encontrada
      </Text>

    ) : (

      aulasSemana.map((aluno, index) => (

        <Text
          key={index}
          style={styles.infoAluno}
        >
          • {aluno.nome} - Aula {calcularNumeroAula(aluno.dataInicio)}
        </Text>

      ))

    )}

  </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },

  logo: {
    color: "#D4AF37",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitulo: {
    color: "#FFF",
    textAlign: "center",
    marginBottom: 50,
    fontSize: 16,
  },

  botao: {
    backgroundColor: "#D4AF37",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
  },

  textoBotao: {
    color: "#000",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardGrande: {
  backgroundColor: "#111",
  borderWidth: 1,
  borderColor: "#D4AF37",
  borderRadius: 12,
  padding: 20,
  marginBottom: 15,
  alignItems: "center",
},

linhaCards: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 15,
},

cardPequeno: {
  flex: 1,
  backgroundColor: "#111",
  borderWidth: 1,
  borderColor: "#D4AF37",
  borderRadius: 12,
  padding: 15,
  alignItems: "center",
  marginHorizontal: 3,
},

  tituloCard: {
    color: "#FFF",
    fontSize: 14,
  },

  numero: {
    color: "#D4AF37",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 5,
  },
  nomeAluno: {
    color: "#D4AF37",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },

  infoAluno: {
    color: "#FFF",
    marginTop: 5,
  },
  totalPendentes: {
    color: "#D4AF37",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 16,
  },
});