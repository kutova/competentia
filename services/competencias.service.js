let competenciasService = {
  // Cria um BD inicial no Local Storage
  install: function () {
    let competencias = [
      {
        nome: "Desenvolver softwares para melhorar e empoderar a sociedade e os negócios",
        tipo: 1,
        observacoes:
          "O egresso deve ser capaz de projetar, implementar e avaliar softwares que apoiem as pessoas nas suas vidas pessoais e profissionais. Na perspectiva desta competência, esses softwares são aqueles entendidos como sistemas produtivos.",
        id: 1,
      },
      {
        nome: "Criar algoritmos e modelos computacionais que permitam o avanço da área da Ciência da Computação",
        tipo: 1,
        observacoes:
          "O egresso não só cria soluções para a sociedade, mas também para a própria área da computação. Dessa forma, é esperado que produzam soluções que serão usadas por outras pessoas que desenvolvem softwares.",
        id: 2,
      },
      {
        nome: "Planejar e avaliar a forma como as pessoas interagem com os dispositivos computacionais",
        tipo: 1,
        observacoes:
          "O egresso deve ter uma boa comprensão de como as pessoas usam computadores e outros dispositivos e ser capaz de melhorar essas interações.",
        id: 3,
      },
      {
        nome: "Projetar e otimizar a estrutura e o desempenho de computadores e outros dispositivos computacionais",
        tipo: 1,
        observacoes:
          "O egresso deve ter uma boa compreensão da arquitura dos sistemas computacionais e de seus sistemas operacionais, para que possa projetar e otimizar soluções de alto desempenho.",
        id: 4,
      },
      {
        nome: "Criar softwares para entretenimento e para a melhora da qualidade de vida",
        tipo: 1,
        observacoes:
          "O egresso deve ser capaz de projetar e implementar jogos digitais, redes sociais e outros sistemas de entretenimento como os softwares de streamming de audio e video. Também deve ser capaz de implementar softwares que melhorem a qualidade de vida das pessoas, como aqueles relacionados à saúde, à organização da rotina pessoal e familiar e à interação social.",
        id: 5,
      },
      {
        nome: "Assegurar a proteção de sistemas e de dados contra ameaças cibernéticas",
        tipo: 1,
        observacoes:
          "O egresso deve ser capaz de empregar a criptografia e outros recursos de segurança para proteger os sistemas e dados das pessoas e das organizações. Também deve ser capaz de projetar estratégias de segurança e de promover a concientização da privacidade dados.",
        id: 6,
      },
      {
        nome: "Desenvolver algoritmos e modelos para capacitar as máquinas a realizar tarefas inteligentes",
        tipo: 1,
        observacoes:
          "O egresso deve ser capaz de usar a inteligência artificial e a aprendizagem de máquina para permitir que as tarefas rotineiras possam ser realizadas automaticamente pelas máquinas. Também devem criar soluções inteligentes para a solução de problemas complexos demais para serem resolvidos por meio dos métodos tradicionais.",
        id: 7,
      },
      {
        nome: "Cultivar o compromisso ético com a verdade e, naturalmente, com a honestidade intelectual e profissional",
        tipo: 0,
        observacoes: "",
        id: 8,
      },
      {
        nome: "Cultivar e promover o respeito às diferenças entre pessoas em suas singularidades",
        tipo: 0,
        observacoes: "",
        id: 9,
      },
      {
        nome: "Desenvolver postura crítica, analítica e reflexiva, no que diz respeito à economia, história, política, cultura e biodiversidade brasileira",
        tipo: 0,
        observacoes: "",
        id: 10,
      },
      {
        nome: "Resolver situações com flexibilidade e adaptabilidade, frente aos problemas e desafios organizacionais, socioeconômicos e político-econômicos",
        tipo: 0,
        observacoes: "",
        id: 11,
      },
      {
        nome: "Buscar contínuo aperfeiçoamento profissional, no desenvolvimento da autoconfiança, da iniciativa e da criatividade",
        tipo: 0,
        observacoes: "",
        id: 12,
      },
      {
        nome: "Estimular a liberdade de criação, produção de conhecimento e de expressão do pensamento",
        tipo: 0,
        observacoes: "",
        id: 13,
      },
    ];
    localStorage.setItem("competencias", JSON.stringify(competencias));
    localStorage.setItem("ultimaCompetencia", 13);
  },

  // recupera a lista de competencias
  competencias: function () {
    return JSON.parse(localStorage.getItem("competencias") || "[]");
  },

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
  },
};
