let dbComponentesCurriculares_Cursos = {
  // Cria um BD inicial no Local Storage
  install: function () {
    let componentesCurriculares_Cursos = [
      { idComponenteCurricular: 1, idCurso: 9, semestre: 1 },
      { idComponenteCurricular: 2, idCurso: 9, semestre: 1 },
      { idComponenteCurricular: 3, idCurso: 9, semestre: 1 },
      { idComponenteCurricular: 4, idCurso: 9, semestre: 1 },
      { idComponenteCurricular: 5, idCurso: 9, semestre: 1 },
      { idComponenteCurricular: 6, idCurso: 9, semestre: 1 },
      { idComponenteCurricular: 7, idCurso: 9, semestre: 1 },
      { idComponenteCurricular: 8, idCurso: 9, semestre: 2 },
      { idComponenteCurricular: 9, idCurso: 9, semestre: 2 },
      { idComponenteCurricular: 10, idCurso: 9, semestre: 2 },
      { idComponenteCurricular: 11, idCurso: 9, semestre: 2 },
      { idComponenteCurricular: 12, idCurso: 9, semestre: 2 },
      { idComponenteCurricular: 13, idCurso: 9, semestre: 2 },
      { idComponenteCurricular: 14, idCurso: 9, semestre: 3 },
      { idComponenteCurricular: 15, idCurso: 9, semestre: 3 },
      { idComponenteCurricular: 16, idCurso: 9, semestre: 3 },
      { idComponenteCurricular: 17, idCurso: 9, semestre: 3 },
      { idComponenteCurricular: 18, idCurso: 9, semestre: 3 },
      { idComponenteCurricular: 19, idCurso: 9, semestre: 3 },
      { idComponenteCurricular: 20, idCurso: 9, semestre: 4 },
    ];
    localStorage.setItem(
      "componentescurriculares-cursos",
      JSON.stringify(componentesCurriculares_Cursos)
    );
  },

  // recupera os componentes curriculares de um curso
  componentesCurriculares: function (idCurso) {
    let componentesCurriculares_Cursos = JSON.parse(
      localStorage.getItem("componentescurriculares-cursos") || "[]"
    );
    let componentesCurriculares = [];
    for (i in componentesCurriculares_Cursos) {
      if (componentesCurriculares_Cursos[i].idCurso == idCurso)
        componentesCurriculares.push(componentesCurriculares_Cursos[i]);
    }
    return componentesCurriculares;
  },

  // recupera as competências vinculadas a um conhecimento, habilidade ou atitude
  cursos: function (idComponenteCurricular) {
    let componentesCurriculares_Cursos = JSON.parse(
      localStorage.getItem("componentescurriculares-cursos") || "[]"
    );
    let cursos = [];
    for (i in componentesCurriculares_Cursos) {
      if (
        componentesCurriculares_Cursos[i].idComponenteCurricular ==
        idComponenteCurricular
      )
        cursos.push(componentesCurriculares_Cursos[i]);
    }
    return cursos;
  },

  // recupera o semestre de um componente curricular
  semestre: function (idComponenteCurricular, idCurso) {
    let componentesCurriculares_Cursos = JSON.parse(
      localStorage.getItem("componentescurriculares-cursos") || "[]"
    );
    let componente = componentesCurriculares_Cursos.find(
      (cc) =>
        cc.idComponenteCurricular == idComponenteCurricular &&
        cc.idCurso == idCurso
    );
    return componente != null ? componente.semestre : "";
  },

  // atualiza o semestre de um componente curricular
  update: function (componenteCurricular_Curso) {
    let componentesCurriculares_Cursos = JSON.parse(
      localStorage.getItem("componentescurriculares-cursos") || "[]"
    );
    let i = componentesCurriculares_Cursos.findIndex(
      (cc) =>
        cc.idComponenteCurricular ==
          componenteCurricular_Curso.idComponenteCurricular &&
        cc.idCurso == componenteCurricular_Curso.idCurso
    );
    if (i != -1)
      componentesCurriculares_Cursos[i].semestre =
        componenteCurricular_Curso.semestre;
    localStorage.setItem(
      "componentescurriculares-cursos",
      JSON.stringify(componentesCurriculares_Cursos)
    );
  },

  // remove o componente de um curso
  delete: function (idComponente, idCurso) {
    let componentesCurriculares_Cursos = JSON.parse(
      localStorage.getItem("componentescurriculares-cursos") || "[]"
    );
    componentesCurriculares_Cursos = componentesCurriculares_Cursos.filter(
      (cc) => cc.idCurso != idCurso || cc.idComponenteCurricular != idComponente
    );
    localStorage.setItem(
      "componentescurriculares-cursos",
      JSON.stringify(componentesCurriculares_Cursos)
    );
  },

  // Cria uma nova área
  create: function (componenteCurricular_Curso) {
    let componentesCurriculares_Cursos = JSON.parse(
      localStorage.getItem("componentescurriculares-cursos") || "[]"
    );
    componentesCurriculares_Cursos.push(componenteCurricular_Curso);
    localStorage.setItem(
      "componentescurriculares-cursos",
      JSON.stringify(componentesCurriculares_Cursos)
    );
  },
};
