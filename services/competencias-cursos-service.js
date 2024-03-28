let dbCompetencias_Cursos = {
  // Cria um BD inicial no Local Storage
  install: function () {
    let competenciasCursos = [
      {
        idCompetencia: 1,
        idCurso: 9,
        codigo: "C01",
      },
      {
        idCompetencia: 2,
        idCurso: 9,
        codigo: "C02",
      },
      {
        idCompetencia: 3,
        idCurso: 9,
        codigo: "C03",
      },
      {
        idCompetencia: 4,
        idCurso: 9,
        codigo: "C04",
      },
      {
        idCompetencia: 5,
        idCurso: 9,
        codigo: "C05",
      },
      {
        idCompetencia: 6,
        idCurso: 9,
        codigo: "C06",
      },
      {
        idCompetencia: 7,
        idCurso: 9,
        codigo: "C07",
      },
      {
        idCompetencia: 1,
        idCurso: 5,
        codigo: "C01",
      },
    ];
    localStorage.setItem(
      "competencias-cursos",
      JSON.stringify(competenciasCursos)
    );
  },

  // recupera as competências de um curso específico
  competencias: function (idCurso) {
    let competenciasCursos = JSON.parse(
      localStorage.getItem("competencias-cursos") || "[]"
    );
    let competencias = [];
    for (i in competenciasCursos) {
      if (competenciasCursos[i].idCurso == idCurso)
        competencias.push({
          id: competenciasCursos[i].idCompetencia,
          codigo: competenciasCursos[i].codigo,
        });
    }
    return competencias;
  },

  // recupera o código de uma competÊncia e curso específicos
  codigo: function (idCompetencia, idCurso) {
    let competenciasCursos = JSON.parse(
      localStorage.getItem("competencias-cursos") || "[]"
    );
    let competencia = competenciasCursos.find(
      (c) => c.idCompetencia == idCompetencia && c.idCurso == idCurso
    );
    return competencia ? competencia.codigo : "";
  },

  // recupera os cursos de uma competência específica
  cursos: function (idCompetencia) {
    let competenciasCursos = JSON.parse(
      localStorage.getItem("competencias-cursos") || "[]"
    );
    let cursos = [];
    for (i in competenciasCursos) {
      if (competenciasCursos[i].idCompetencia == idCompetencia)
        cursos.push({
          id: competenciasCursos[i].idCurso,
          codigo: competenciasCursos[i].codigo,
        });
    }
    return cursos;
  },

  // altera o código de uma competência em um curso
  update: function (competenciaCurso) {
    let competenciasCursos = JSON.parse(
      localStorage.getItem("competencias-cursos") || "[]"
    );
    let i = competenciasCursos.findIndex(
      (cc) =>
        cc.idCurso == competenciaCurso.idCurso &&
        cc.idCompetencia == competenciaCurso.idCompetencia
    );
    if (i >= 0) {
      competenciasCursos[i].codigo = competenciaCurso.codigo;
      localStorage.setItem(
        "competencias-cursos",
        JSON.stringify(competenciasCursos)
      );
    }
  },

  // remove a competência de um curso
  delete: function (idCompetencia, idCurso) {
    let competenciasCursos = JSON.parse(
      localStorage.getItem("competencias-cursos") || "[]"
    );
    competenciasCursos = competenciasCursos.filter(
      (cc) => cc.idCurso != idCurso || cc.idCompetencia != idCompetencia
    );
    localStorage.setItem(
      "competencias-cursos",
      JSON.stringify(competenciasCursos)
    );
  },

  // Adiciona uma nova competencia ao curso
  create: function (competenciaCurso) {
    let competenciasCursos = JSON.parse(
      localStorage.getItem("competencias-cursos") || "[]"
    );
    competenciasCursos.push(competenciaCurso);
    localStorage.setItem(
      "competencias-cursos",
      JSON.stringify(competenciasCursos)
    );
  },
};
