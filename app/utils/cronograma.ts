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

export function calcularNumeroAula(
  dataInicio: string
) {

  const partes =
    dataInicio.split("/");

  const inicio =
    new Date(
      Number(partes[2]),
      Number(partes[1]) - 1,
      Number(partes[0])
    );

  const hoje = new Date();

  const diferencaDias =
    Math.floor(
      (hoje.getTime() -
        inicio.getTime()) /
      (1000 * 60 * 60 * 24)
    );

  const aulaAtual =
    Math.floor(
      diferencaDias / 7
    ) + 1;

  return Math.min(
    Math.max(aulaAtual, 1),
    12
  );

}