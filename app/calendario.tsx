import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import { carregarAlunos } from "./services/storage";
import { Aluno } from "./Types/Aluno";
import { gerarCronograma } from "./utils/cronograma";
import { Calendar } from "react-native-calendars";

export default function Calendario() {
const [dataSelecionada, setDataSelecionada] =
  useState("");

const [aulasDoDia, setAulasDoDia] =
  useState<any[]>([]);

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

  const todasAulas = alunos.flatMap(aluno =>
    gerarCronograma(
      aluno.dataInicio,
      aluno.nome
    )
  );

  const datasMarcadas: any = {};

    todasAulas.forEach(aula => {

      const [dia, mes, ano] =
        aula.data.split("/");

      const dataFormatada =
        `${ano}-${mes}-${dia}`;

      datasMarcadas[dataFormatada] = {
        marked: true,
        dotColor: "#D4AF37",
      };

    });

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Calendário de Aulas
      </Text>

     <Calendar
        markedDates={datasMarcadas}

        onDayPress={(day) => {

          setDataSelecionada(day.dateString);

          const aulas =
            todasAulas.filter(aula => {

              const [dia, mes, ano] =
                aula.data.split("/");

              const dataFormatada =
                `${ano}-${mes}-${dia}`;

              return (
                dataFormatada ===
                day.dateString
              );

            });

          setAulasDoDia(aulas);

        }}

        theme={{

          backgroundColor: "#000",
          calendarBackground: "#111",

          textSectionTitleColor: "#D4AF37",

          dayTextColor: "#FFF",

          monthTextColor: "#D4AF37",

          todayTextColor: "#D4AF37",

          arrowColor: "#D4AF37",
        }}
      />

      {dataSelecionada !== "" && (

      <View style={styles.card}>

        <Text style={styles.data}>
          📚 Aulas do Dia
        </Text>

        {aulasDoDia.length === 0 ? (

          <Text style={styles.texto}>
            Nenhuma aula nesta data
          </Text>

        ) : (

          aulasDoDia.map((aula, index) => (

            <Text
              key={index}
              style={styles.texto}
            >
              {aula.aluno} - Aula {aula.numero}
            </Text>

          ))

        )}

      </View>

    )}

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