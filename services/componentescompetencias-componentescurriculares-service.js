let dbComponentesCompetencias_ComponentesCurriculares = {
  // Cria um BD inicial no Local Storage
  install: function () {
    let componentesCompentencia_ComponentesCurriculares = [
      { idComponenteCompetencia: 1, idComponenteCurricular: 1 },
      { idComponenteCompetencia: 7, idComponenteCurricular: 1 },
      { idComponenteCompetencia: 14, idComponenteCurricular: 1 },
      { idComponenteCompetencia: 16, idComponenteCurricular: 1 },
      { idComponenteCompetencia: 17, idComponenteCurricular: 1 },
      { idComponenteCompetencia: 1, idComponenteCurricular: 3 },
      { idComponenteCompetencia: 4, idComponenteCurricular: 3 },
      { idComponenteCompetencia: 7, idComponenteCurricular: 3 },
      { idComponenteCompetencia: 13, idComponenteCurricular: 3 },
      { idComponenteCompetencia: 14, idComponenteCurricular: 3 },
      { idComponenteCompetencia: 1, idComponenteCurricular: 7 },
      { idComponenteCompetencia: 4, idComponenteCurricular: 7 },
      { idComponenteCompetencia: 7, idComponenteCurricular: 7 },

      { idComponenteCompetencia: 12, idComponenteCurricular: 7 },
      { idComponenteCompetencia: 13, idComponenteCurricular: 7 },
      { idComponenteCompetencia: 14, idComponenteCurricular: 7 },
      { idComponenteCompetencia: 16, idComponenteCurricular: 7 },
      { idComponenteCompetencia: 18, idComponenteCurricular: 7 },
    ];
    localStorage.setItem(
      "componentescompetencias-componentescurriculares",
      JSON.stringify(componentesCompentencia_ComponentesCurriculares)
    );
  },

  // recupera conhecimentos, habilidades e atitudes de uma componente curricular
  componentesCompetencias: function (idComponenteCurricular) {
    let componentesCompentencia_ComponentesCurriculares = JSON.parse(
      localStorage.getItem("componentescompetencias-componentescurriculares") ||
        "[]"
    );
    let componentesCompetencias = [];
    for (i in componentesCompentencia_ComponentesCurriculares) {
      if (
        componentesCompentencia_ComponentesCurriculares[i]
          .idComponenteCurricular == idComponenteCurricular
      )
        componentesCompetencias.push(
          componentesCompentencia_ComponentesCurriculares[i]
            .idComponenteCompetencia
        );
    }
    return componentesCompetencias;
  },

  // recupera as componentes curriculares vinculadas a um conhecimento, habilidade ou atitude
  componentesCurriculares: function (idComponenteCompetencia) {
    let componentesCompentencia_ComponentesCurriculares = JSON.parse(
      localStorage.getItem("componentescompetencias-componentescurriculares") ||
        "[]"
    );
    let componentescurriculares = [];
    for (i in componentesCompentencia_ComponentesCurriculares) {
      if (
        componentesCompentencia_ComponentesCurriculares[i]
          .idComponenteCompetencia == idComponenteCompetencia
      )
        componentescurriculares.push(
          componentesCompentencia_ComponentesCurriculares[i]
            .idComponenteCurricular
        );
    }
    return componentescurriculares;
  },

  // altera os componentes de competência de um componente curricular
  update: function (idComponenteCurricular, listaIdsComponenteCompetencias) {
    let componentesCompentencia_ComponentesCurriculares = JSON.parse(
      localStorage.getItem("componentescompetencias-componentescurriculares") ||
        "[]"
    );
    componentesCompentencia_ComponentesCurriculares =
      componentesCompentencia_ComponentesCurriculares.filter(
        (cc) => cc.idComponenteCurricular != idComponenteCurricular
      );
    for (i in listaIdsComponenteCompetencias) {
      componentesCompentencia_ComponentesCurriculares.push({
        idComponenteCompetencia: listaIdsComponenteCompetencias[i],
        idComponenteCurricular: idComponenteCurricular,
      });
    }
    localStorage.setItem(
      "componentescompetencias-componentescurriculares",
      JSON.stringify(componentesCompentencia_ComponentesCurriculares)
    );
  },

  /*

  // remove a componente curricular de um curso
  delete: function (idComponenteCurricular, idCurso) {
    console.log(idComponenteCurricular, idCurso);
    let componentescurricularesCursos = JSON.parse(
      localStorage.getItem("componentescurriculares-cursos") || "[]"
    );
    componentescurricularesCursos = componentescurricularesCursos.filter(
      (cc) => cc.idCurso != idCurso || cc.idComponenteCurricular != idComponenteCurricular
    );
    localStorage.setItem(
      "componentescurriculares-cursos",
      JSON.stringify(componentescurricularesCursos)
    );
  },

  // Cria uma nova área
  create: function (componenteCurricularCurso) {
    let componentescurricularesCursos = JSON.parse(
      localStorage.getItem("componentescurriculares-cursos") || "[]"
    );
    componentescurricularesCursos.push(componenteCurricularCurso);
    localStorage.setItem(
      "componentescurriculares-cursos",
      JSON.stringify(componentescurricularesCursos)
    );
  },

  */
};
