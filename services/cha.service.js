let dbCHA = {
  // Cria um BD inicial no Local Storage
  install: function () {
    let cha = [
      {
        nome: "Algoritmos",
        tipo: 0,
        area: 7,
        descricao:
          "Lógica de programação. Tipos primitivos de dados. Variáveis. Estruturas condicionais. Estruturas de repetição. Vetores. Matrizes. Funções.",
        id: 1,
      },
      {
        nome: "Estruturas de dados",
        tipo: 0,
        area: 7,
        descricao: "Listas. Filas. Pilhas. Árvores. Algoritmos de Ordenação.",
        id: 2,
      },
      {
        nome: "Bancos de dados",
        tipo: 0,
        area: 7,
        descricao: "Bancos de dados relacionais. Linguagem SQL.",
        id: 3,
      },
      {
        nome: "Padrões Web",
        tipo: 0,
        area: 7,
        descricao: "HTML. CSS. JavaScript.",
        id: 4,
      },
      {
        nome: "Desenvolvimento agil de software",
        tipo: 0,
        area: 4,
        descricao:
          "Metologia ágil de desenvolvimento de software. SCRUM. Kanban.",
        id: 5,
      },
      {
        nome: "Testes de software",
        tipo: 0,
        area: 4,
        descricao:
          "Tipos de testes. Teste unitário. Teste de integração. Testes de usablidade.",
        id: 6,
      },
      {
        nome: "Programar",
        tipo: 1,
        area: 7,
        descricao:
          "Escrever e desenvolver um conjunto de instruções precisas em uma linguagem de programação para que um computador possa executar uma determinada tarefa ou resolver um problema específico.",
        id: 7,
      },
      {
        nome: "Prototipar um software",
        tipo: 1,
        area: 4,
        descricao:
          "Desenvolver uma versão inicial e simplificada de um aplicativo ou sistema para validar conceitos, funcionalidades e interações com os usuários antes da implementação completa.",
        id: 8,
      },
      {
        nome: "Criar um modelo de dados para um sofware",
        tipo: 1,
        area: 4,
        descricao:
          "Definir a estrutura e os relacionamentos dos elementos de informação que serão armazenados e manipulados por um sistema de software.",
        id: 9,
      },
      {
        nome: "Testar um software",
        tipo: 1,
        area: 4,
        descricao:
          "Avaliar e validar as funcionalidades e o desempenho de um software para garantir que ele atenda aos requisitos especificados e funcione corretamente em diferentes cenários e condições.",
        id: 10,
      },
      {
        nome: "Gerenciar projetos de software",
        tipo: 1,
        area: 4,
        descricao:
          "Avaiar e validar as funcionalidades e o desempenho de um software para garantir que ele atenda aos requisitos especificados e funcione corretamente em diferentes cenários e condições.coordenar e controlar recursos, cronogramas e atividades para garantir a entrega bem-sucedida de um projeto dentro dos prazos, orçamentos e requisitos definidos.",
        id: 11,
      },
      {
        nome: "Colaboração",
        tipo: 2,
        area: 1,
        descricao:
          "Capacidade de colaborar e trabalhar efetivamente em equipe.",
        id: 12,
      },
      {
        nome: "Adaptabilidade",
        tipo: 2,
        area: 1,
        descricao:
          "Capacidade de se adaptar a novas tecnologias, metodologias, situações e contextos.",
        id: 13,
      },
      {
        nome: "Criatividade",
        tipo: 2,
        area: 1,
        descricao:
          "Habilidade de pensar de forma criativa para encontrar soluções inovadoras para os problemas e desafios do mundo real.",
        id: 14,
      },
    ];
    localStorage.setItem("CHA", JSON.stringify(cha));
    localStorage.setItem("ultimoCHA", 14);
  },

  // recupera a lista de conhecimentos, habilidades e atitudes
  chas: function () {
    return JSON.parse(localStorage.getItem("CHA") || "[]");
  },

  // recupera um conhecimento, habilidade ou atitude
  cha: function (id) {
    return JSON.parse(localStorage.getItem("CHA") || "[]").find(
      (c) => c.id == id
    );
  },

  /*

  // recupera um competencia específico
  competencia: function (idCompetencia) {
    let competencias = JSON.parse(localStorage.getItem("competencias") || "[]");
    for (i in competencias) {
      if (competencias[i].id == idCompetencia) return competencias[i];
    }
    return null;
  },

  // Atualiza os dados da área, supondo que o id foi mantido
  update: function (elem) {
    let competencias = JSON.parse(localStorage.getItem("competencias") || "[]");
    for (i in competencias) {
      if (competencias[i].id == elem.id) {
        competencias[i].nome = elem.nome;
        competencias[i].tipo = elem.tipo;
        competencias[i].observacoes = elem.observacoes;
      }
    }
    localStorage.setItem("competencias", JSON.stringify(competencias));
  },

  // Apaga uma área. Seus cursos devem ser apagados separadamente
  delete: function (idCompetencia) {
    let competencias = JSON.parse(localStorage.getItem("competencias") || "[]");
    competencias = competencias.filter((elem) => elem.id != idCompetencia);
    localStorage.setItem("competencias", JSON.stringify(competencias));
  },

  // Cria um novo usuário
  create: function (competencia) {
    let competencias = JSON.parse(localStorage.getItem("competencias") || "[]");
    let idCompetencia =
      parseInt(localStorage.getItem("ultimaCompetencia") || "0") + 1;
    competencia.id = idCompetencia;
    competencias.push(competencia);
    localStorage.setItem("ultimaCompetencia", idCompetencia);
    localStorage.setItem("competencias", JSON.stringify(competencias));
    return idCompetencia;
  },

  */
};
