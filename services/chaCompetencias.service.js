let dbCHACompetencias = {
  // Cria um BD inicial no Local Storage
  install: function () {
    let chaCompetencias = [
      { idCHA: 1, idCompetencia: 1 },
      { idCHA: 2, idCompetencia: 1 },
      { idCHA: 3, idCompetencia: 1 },
      { idCHA: 4, idCompetencia: 1 },
      { idCHA: 5, idCompetencia: 1 },
      { idCHA: 6, idCompetencia: 1 },
      { idCHA: 7, idCompetencia: 1 },
      { idCHA: 8, idCompetencia: 1 },
      { idCHA: 9, idCompetencia: 1 },
      { idCHA: 10, idCompetencia: 1 },
      { idCHA: 11, idCompetencia: 1 },
      { idCHA: 12, idCompetencia: 1 },
      { idCHA: 13, idCompetencia: 1 },
      { idCHA: 14, idCompetencia: 1 },
    ];
    localStorage.setItem("cha-competencias", JSON.stringify(chaCompetencias));
  },

  // recupera conhecimentos, habilidades e atitudes de uma competência
  cha: function (idCompetencia) {
    let chaCompetencias = JSON.parse(
      localStorage.getItem("cha-competencias") || "[]"
    );
    let cha = [];
    for (i in chaCompetencias) {
      if (chaCompetencias[i].idCompetencia == idCompetencia)
        cha.push(chaCompetencias[i].idCHA);
    }
    return cha;
  },

  // recupera as competências vinculadas a um conhecimento, habilidade ou atitude
  competencias: function (idCHA) {
    let chaCompetencias = JSON.parse(
      localStorage.getItem("cha-competencias") || "[]"
    );
    let competencias = [];
    for (i in chaCompetencias) {
      if (chaCompetencias[i].idCHA == idCHA)
        competencias.push(chaCompetencias[i].idCompetencia);
    }
    return competencias;
  },

  /*


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
    console.log(idCompetencia, idCurso);
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

  // Cria uma nova área
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

  */
};
