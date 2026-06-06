import AsyncStorage from "@react-native-async-storage/async-storage";
import { Aluno } from "../Types/Aluno";

const CHAVE_ALUNOS = "@alunos";

export async function salvarAlunos(alunos: Aluno[]) {
  try {
    await AsyncStorage.setItem(
      CHAVE_ALUNOS,
      JSON.stringify(alunos)
    );
  } catch (error) {
    console.error("Erro ao salvar:", error);
  }
}

export async function carregarAlunos(): Promise<Aluno[]> {
  try {
    const dados = await AsyncStorage.getItem(CHAVE_ALUNOS);

    if (dados) {
      return JSON.parse(dados);
    }

    return [];
  } catch (error) {
    console.error("Erro ao carregar:", error);
    return [];
  }
}
export async function excluirAluno(
  telefone: string
) {

  const alunos = await carregarAlunos();

  const novaLista = alunos.filter(
    aluno => aluno.telefone !== telefone
  );

  await salvarAlunos(novaLista);

}