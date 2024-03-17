let cursosService = {
  // Cria um BD inicial no Local Storage
  install: function () {
    let cursos = [
      {
        id: 1,
        nome: "Administração",
        grau: 0,
        modalidade: 0,
        periodos: 8,
        area: 0,
      },
      {
        id: 2,
        nome: "Direito",
        grau: 0,
        modalidade: 0,
        periodos: 10,
        area: 1,
      },
      {
        id: 3,
        nome: "Arquitetura e Urbanismo",
        grau: 0,
        modalidade: 0,
        periodos: 10,
        area: 2,
      },
      {
        id: 4,
        nome: "Relações Internacionais",
        grau: 0,
        modalidade: 0,
        periodos: 8,
        area: 3,
      },
      {
        id: 5,
        nome: "Engenharia de Software",
        grau: 0,
        modalidade: 0,
        periodos: 8,
        area: 4,
      },
      {
        id: 6,
        nome: "Análise e Desenvolvimento de Sistemas",
        grau: 2,
        modalidade: 1,
        periodos: 5,
        area: 4,
      },
      {
        id: 7,
        nome: "Letras",
        grau: 1,
        modalidade: 0,
        periodos: 8,
        area: 5,
      },
      {
        id: 8,
        nome: "História",
        grau: 1,
        modalidade: 0,
        periodos: 8,
        area: 6,
      },
    ];
    localStorage.setItem("cursos", JSON.stringify(cursos));
  },

  // recupera a lista de cursos
  cursos: function () {
    return JSON.parse(localStorage.getItem("cursos") || "[]");
  },

  // recupera um curso específico
  curso: function (idCurso) {
    let cursos = JSON.parse(localStorage.getItem("cursos") || "[]");
    for (i in cursos) {
      if (cursos[i].id == idCurso) return cursos[i];
    }
    return null;
  },
};
