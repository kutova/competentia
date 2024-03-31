let dbComponentesCompetencias = {
  // Cria um BD inicial no Local Storage
  install: function () {
    let componentesCompetencias = [
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
        nome: "Desenvolvimento ágil de software",
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
        nome: "Criar um modelo de dados para um software",
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
      {
        nome: "Linguagens de programação",
        tipo: 0,
        area: 7,
        descricao:
          "Sintaxe e semântica. Paradigmas de programação. Programação orientada a objetos. Programação concorrente e paralela. Manipulação de exceções. Gerenciamento de memória.",
        id: 15,
      },
      {
        nome: "Resolução de problemas",
        tipo: 1,
        area: 7,
        descricao:
          "Habilidade para analisar problemas complexos e encontrar soluções eficazes.",
        id: 16,
      },
      {
        nome: "Perseverança",
        tipo: 2,
        area: 1,
        descricao:
          "Lidar com desafios e problemas de forma paciente e persistente, buscando soluções mesmo diante de dificuldades.",
        id: 17,
      },
      {
        nome: "Proatividade",
        tipo: 2,
        area: 1,
        descricao:
          "Ser proativo na busca por soluções, assumir responsabilidades e ter iniciativa para resolver problemas.",
        id: 18,
      },
      {
        nome: "Grafos",
        tipo: 0,
        area: 7,
        descricao:
          "Grafos. Operações básicas em grafos. Árvores e árvores geradoras mínimas. Caminhos mínimos. Fluxo máximo. Coloração. Emparelhamentos.",
        id: 19,
      },
      {
        nome: "Design Centrado no Usuário",
        tipo: 0,
        area: 7,
        descricao:
          "Design Centrado no Usuário. Análise de contexto e de tarefas. Personas e arquétipos. Prototipagem. Avaliação de usabilidade. Design de experiências",
        id: 20,
      },
    ];
    localStorage.setItem(
      "componentescompetencias",
      JSON.stringify(componentesCompetencias)
    );
    localStorage.setItem("ultimoComponenteCompetencia", 20);
  },

  // recupera a lista de conhecimentos, habilidades e atitudes
  componentesCompetencias: function () {
    return JSON.parse(localStorage.getItem("componentescompetencias") || "[]");
  },

  // recupera um conhecimento, habilidade ou atitude
  componenteCompetencias: function (id) {
    return JSON.parse(
      localStorage.getItem("componentescompetencias") || "[]"
    ).find((c) => c.id == id);
  },

  // Atualiza os dados da área, supondo que o id foi mantido
  update: function (elem) {
    let componentesCompetencias = JSON.parse(
      localStorage.getItem("componentescompetencias") || "[]"
    );
    for (i in componentesCompetencias) {
      if (componentesCompetencias[i].id == elem.id) {
        componentesCompetencias[i].nome = elem.nome;
        componentesCompetencias[i].tipo = elem.tipo;
        componentesCompetencias[i].area = elem.area;
        componentesCompetencias[i].descricao = elem.descricao;
      }
    }
    localStorage.setItem(
      "componentescompetencias",
      JSON.stringify(componentesCompetencias)
    );
  },

  // Apaga uma área. Seus cursos devem ser apagados separadamente
  delete: function (idComponente) {
    let componentesCompetencias = JSON.parse(
      localStorage.getItem("componentescompetencias") || "[]"
    );
    componentesCompetencias = componentesCompetencias.filter(
      (elem) => elem.id != idComponente
    );
    localStorage.setItem(
      "componentescompetencias",
      JSON.stringify(componentesCompetencias)
    );
  },

  // Cria um novo usuário
  create: function (componenteCompetencias) {
    let componentesCompetencias = JSON.parse(
      localStorage.getItem("componentescompetencias") || "[]"
    );
    let idComponente =
      parseInt(localStorage.getItem("ultimoComponenteCompetencia") || "0") + 1;
    componenteCompetencias.id = idComponente;
    componentesCompetencias.push(componenteCompetencias);
    localStorage.setItem("ultimoComponenteCompetencia", idComponente);
    localStorage.setItem(
      "componentescompetencias",
      JSON.stringify(componentesCompetencias)
    );
    return idComponente;
  },
};
