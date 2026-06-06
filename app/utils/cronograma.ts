export function gerarCronograma(
  dataInicio: string,
  nomeAluno: string
) {

  const [dia, mes, ano] = dataInicio.split("/");

  const dataBase = new Date(
    Number(ano),
    Number(mes) - 1,
    Number(dia)
  );

  const aulas = [];

  for (let i = 0; i < 12; i++) {

    const dataAula = new Date(dataBase);

    dataAula.setDate(
      dataBase.getDate() + (i * 7)
    );

    aulas.push({
      aluno: nomeAluno,
      numero: i + 1,
      data: dataAula.toLocaleDateString("pt-BR")
    });
  }

  return aulas;
}