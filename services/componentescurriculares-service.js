let dbComponentesCurriculares = {
  // Cria um BD inicial no Local Storage
  install: function () {
    let componentesCurriculares = [
      {
        nome: "Algoritmos e Estruturas de Dados I",
        tipo: 0,
        cargaHoraria: 72,
        area: 7,
        id: 1,
      },
      {
        nome: "Cálculo I",
        tipo: 0,
        cargaHoraria: 72,
        area: 10,
        id: 2,
      },
      {
        nome: "Desenvolvimento de Interfaces Web",
        tipo: 0,
        cargaHoraria: 72,
        area: 7,
        id: 3,
      },
      {
        nome: "Filosofia: Razão e Modernidade",
        tipo: 0,
        cargaHoraria: 72,
        area: 13,
        id: 4,
      },
      {
        nome: "Introdução à Computação",
        tipo: 0,
        cargaHoraria: 36,
        area: 7,
        id: 5,
      },
      {
        nome: "Laboratório de Iniciação à Programação",
        tipo: 1,
        cargaHoraria: 36,
        area: 7,
        id: 6,
      },
      {
        nome: "Trabalho Interdisciplinar I: Front-end",
        tipo: 1,
        cargaHoraria: 36,
        area: 7,
        id: 7,
      },
      {
        nome: "Algoritmos e Estruturas de Dados II",
        tipo: 0,
        cargaHoraria: 72,
        area: 7,
        id: 8,
      },
      {
        nome: "Arquitetura de Computadores I",
        tipo: 0,
        cargaHoraria: 72,
        area: 7,
        id: 9,
      },
      {
        nome: "Cultura Religiosa: Fenômeno Religioso",
        tipo: 0,
        cargaHoraria: 72,
        area: 14,
        id: 10,
      },
      {
        nome: "Engenharia de Software I",
        tipo: 0,
        cargaHoraria: 72,
        area: 4,
        id: 11,
      },
      {
        nome: "Trabalho Interdisciplinar II: Back-end",
        tipo: 1,
        cargaHoraria: 36,
        area: 7,
        id: 12,
      },
      {
        nome: "Cálculo II",
        tipo: 0,
        cargaHoraria: 72,
        area: 10,
        id: 13,
      },
      {
        nome: "Algoritmos e Estruturas de Dados III",
        tipo: 0,
        cargaHoraria: 72,
        area: 7,
        id: 14,
      },
      {
        nome: "Banco de Dados",
        tipo: 0,
        cargaHoraria: 72,
        area: 7,
        id: 15,
      },
      {
        nome: "Arquitetura de Computadores II",
        tipo: 0,
        cargaHoraria: 72,
        area: 7,
        id: 16,
      },
      {
        nome: "Linguagens de Programação",
        tipo: 0,
        cargaHoraria: 72,
        area: 7,
        id: 17,
      },
      {
        nome: "Estatística e Probabilidade",
        tipo: 0,
        cargaHoraria: 72,
        area: 10,
        id: 18,
      },
      {
        nome: "Trabalho Interdisciplinar III: Pesquisa Aplicada",
        tipo: 1,
        cargaHoraria: 36,
        area: 7,
        id: 19,
      },
      {
        nome: "Inteligência Artificial",
        tipo: 0,
        cargaHoraria: 72,
        area: 7,
        id: 20,
      },
    ];
    localStorage.setItem(
      "componentescurriculares",
      JSON.stringify(componentesCurriculares)
    );
    localStorage.setItem("ultimoComponenteCurricular", 20);
  },

  // recupera a lista de componentes curriculares
  componentesCurriculares: function () {
    return JSON.parse(localStorage.getItem("componentescurriculares") || "[]");
  },

  // recupera um componente curricular
  componenteCurricular: function (id) {
    return JSON.parse(
      localStorage.getItem("componentescurriculares") || "[]"
    ).find((c) => c.id == id);
  },

  // Atualiza os dados da área, supondo que o id foi mantido
  update: function (elem) {
    let componentesCurriculares = JSON.parse(
      localStorage.getItem("componentescurriculares") || "[]"
    );
    for (let i in componentesCurriculares) {
      if (componentesCurriculares[i].id == elem.id) {
        componentesCurriculares[i].nome = elem.nome;
        componentesCurriculares[i].cargaHoraria = elem.cargaHoraria;
        componentesCurriculares[i].tipo = elem.tipo;
        componentesCurriculares[i].area = elem.area;
      }
    }
    localStorage.setItem(
      "componentescurriculares",
      JSON.stringify(componentesCurriculares)
    );
  },

  // Apaga um componente curricular. Seus cursos devem ser apagados separadamente
  delete: function (idComponente) {
    let componentesCurriculares = JSON.parse(
      localStorage.getItem("componentescurriculares") || "[]"
    );
    componentesCurriculares = componentesCurriculares.filter(
      (elem) => elem.id != idComponente
    );
    localStorage.setItem(
      "componentescurriculares",
      JSON.stringify(componentesCurriculares)
    );
  },

  // Cria um novo usuário
  create: function (componenteCurriculares) {
    let componentesCurriculares = JSON.parse(
      localStorage.getItem("componentescurriculares") || "[]"
    );
    let idComponente =
      parseInt(localStorage.getItem("ultimoComponenteCurricular") || "0") + 1;
    componenteCurriculares.id = idComponente;
    componentesCurriculares.push(componenteCurriculares);
    localStorage.setItem("ultimoComponenteCurricular", idComponente);
    localStorage.setItem(
      "componentescurriculares",
      JSON.stringify(componentesCurriculares)
    );
    return idComponente;
  },
};
