let dbComponentesCompetencias_ComponentesCurriculares = {
  // Cria um BD inicial no Local Storage
  install: function () {
    let componentesCompentencia_ComponentesCurriculares = [
      { idComponenteCompetencia: 1, idComponenteCurricular: 1 },
      { idComponenteCompetencia: 2, idComponenteCurricular: 1 },
      { idComponenteCompetencia: 3, idComponenteCurricular: 1 },
      { idComponenteCompetencia: 4, idComponenteCurricular: 1 },
      { idComponenteCompetencia: 5, idComponenteCurricular: 1 },
      { idComponenteCompetencia: 6, idComponenteCurricular: 1 },
      { idComponenteCompetencia: 7, idComponenteCurricular: 1 },
      { idComponenteCompetencia: 8, idComponenteCurricular: 1 },
      { idComponenteCompetencia: 9, idComponenteCurricular: 1 },
      { idComponenteCompetencia: 10, idComponenteCurricular: 1 },
      { idComponenteCompetencia: 11, idComponenteCurricular: 1 },
      { idComponenteCompetencia: 12, idComponenteCurricular: 1 },
      { idComponenteCompetencia: 13, idComponenteCurricular: 1 },
      { idComponenteCompetencia: 14, idComponenteCurricular: 1 },

      { idComponenteCompetencia: 1, idComponenteCurricular: 2 },
      { idComponenteCompetencia: 2, idComponenteCurricular: 2 },
      { idComponenteCompetencia: 7, idComponenteCurricular: 2 },
      { idComponenteCompetencia: 14, idComponenteCurricular: 2 },
      { idComponenteCompetencia: 15, idComponenteCurricular: 2 },
      { idComponenteCompetencia: 16, idComponenteCurricular: 2 },
      { idComponenteCompetencia: 17, idComponenteCurricular: 2 },
      { idComponenteCompetencia: 18, idComponenteCurricular: 2 },
      { idComponenteCompetencia: 19, idComponenteCurricular: 2 },
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
  componentescurriculares: function (idComponenteCompetencia) {
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

  /*


  // altera o código de uma componente curricular em um curso
  update: function (componenteCurricularCurso) {
    let componentescurricularesCursos = JSON.parse(
      localStorage.getItem("componentescurriculares-cursos") || "[]"
    );
    let i = componentescurricularesCursos.findIndex(
      (cc) =>
        cc.idCurso == componenteCurricularCurso.idCurso &&
        cc.idComponenteCurricular == componenteCurricularCurso.idComponenteCurricular
    );
    if (i >= 0) {
      componentescurricularesCursos[i].codigo = componenteCurricularCurso.codigo;
      localStorage.setItem(
        "componentescurriculares-cursos",
        JSON.stringify(componentescurricularesCursos)
      );
    }
  },

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
