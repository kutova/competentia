let dbComponentesCompetencias_Competencias = {
  // Cria um BD inicial no Local Storage
  install: function () {
    let componentesCompetencias_Competencias = [
      { idComponenteCompetencia: 1, idCompetencia: 1 },
      { idComponenteCompetencia: 2, idCompetencia: 1 },
      { idComponenteCompetencia: 3, idCompetencia: 1 },
      { idComponenteCompetencia: 4, idCompetencia: 1 },
      { idComponenteCompetencia: 5, idCompetencia: 1 },
      { idComponenteCompetencia: 6, idCompetencia: 1 },
      { idComponenteCompetencia: 7, idCompetencia: 1 },
      { idComponenteCompetencia: 8, idCompetencia: 1 },
      { idComponenteCompetencia: 9, idCompetencia: 1 },
      { idComponenteCompetencia: 10, idCompetencia: 1 },
      { idComponenteCompetencia: 11, idCompetencia: 1 },
      { idComponenteCompetencia: 12, idCompetencia: 1 },
      { idComponenteCompetencia: 13, idCompetencia: 1 },
      { idComponenteCompetencia: 14, idCompetencia: 1 },
      { idComponenteCompetencia: 1, idCompetencia: 2 },
      { idComponenteCompetencia: 2, idCompetencia: 2 },
      { idComponenteCompetencia: 7, idCompetencia: 2 },
      { idComponenteCompetencia: 14, idCompetencia: 2 },
      { idComponenteCompetencia: 15, idCompetencia: 2 },
      { idComponenteCompetencia: 16, idCompetencia: 2 },
      { idComponenteCompetencia: 17, idCompetencia: 2 },
      { idComponenteCompetencia: 18, idCompetencia: 2 },
      { idComponenteCompetencia: 19, idCompetencia: 2 },
      { idComponenteCompetencia: 20, idCompetencia: 3 },
    ];
    localStorage.setItem(
      "componentescompetencias-competencias",
      JSON.stringify(componentesCompetencias_Competencias)
    );
  },

  // recupera conhecimentos, habilidades e atitudes de uma competência
  componentesCompetencia: function (idCompetencia) {
    let componentesCompetencias_Competencias = JSON.parse(
      localStorage.getItem("componentescompetencias-competencias") || "[]"
    );
    let componentesCompetencia = [];
    for (let i in componentesCompetencias_Competencias) {
      if (
        componentesCompetencias_Competencias[i].idCompetencia == idCompetencia
      )
        componentesCompetencia.push(
          componentesCompetencias_Competencias[i].idComponenteCompetencia
        );
    }
    return componentesCompetencia;
  },

  // recupera as competências vinculadas a um conhecimento, habilidade ou atitude
  competencias: function (idComponenteCompetencia) {
    let componentesCompetencias_Competencias = JSON.parse(
      localStorage.getItem("componentescompetencias-competencias") || "[]"
    );
    let competencias = [];
    for (let i in componentesCompetencias_Competencias) {
      if (
        componentesCompetencias_Competencias[i].idComponenteCompetencia ==
        idComponenteCompetencia
      )
        competencias.push(
          componentesCompetencias_Competencias[i].idCompetencia
        );
    }
    return competencias;
  },

  // altera as competencias de um componente de competencia
  update: function (idComponenteCompetencia, listaIdsCompetencias) {
    let componentesCompetencias_Competencias = JSON.parse(
      localStorage.getItem("componentescompetencias-competencias") || "[]"
    );
    componentesCompetencias_Competencias =
      componentesCompetencias_Competencias.filter(
        (cc) => cc.idComponenteCompetencia != idComponenteCompetencia
      );
    for (let i in listaIdsCompetencias) {
      componentesCompetencias_Competencias.push({
        idComponenteCompetencia: idComponenteCompetencia,
        idCompetencia: listaIdsCompetencias[i],
      });
    }
    localStorage.setItem(
      "componentescompetencias-competencias",
      JSON.stringify(componentesCompetencias_Competencias)
    );
  },

  // remove a componente de uma competência
  delete: function (idComponente, idCompetencia) {
    let componentesCompetencias_Competencias = JSON.parse(
      localStorage.getItem("componentescompetencias-competencias") || "[]"
    );
    componentesCompetencias_Competencias =
      componentesCompetencias_Competencias.filter(
        (cc) =>
          cc.idCompetencia != idCompetencia ||
          cc.idComponenteCompetencia != idComponente
      );
    localStorage.setItem(
      "componentescompetencias-competencias",
      JSON.stringify(componentesCompetencias_Competencias)
    );
  },

  // Cria uma nova área
  create: function (componenteCompetencia_Competencia) {
    let componentesCompetencias_Competencias = JSON.parse(
      localStorage.getItem("componentescompetencias-competencias") || "[]"
    );
    componentesCompetencias_Competencias.push(
      componenteCompetencia_Competencia
    );
    localStorage.setItem(
      "componentescompetencias-competencias",
      JSON.stringify(componentesCompetencias_Competencias)
    );
  },
};
