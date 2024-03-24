let cursosService = {
  // Cria um BD inicial no Local Storage
  install: function () {
    let cursos = [
      {
        nome: "Administração",
        grau: 0,
        modalidade: 0,
        periodos: 8,
        area: 0,
        id: 1,
      },
      {
        nome: "Direito",
        grau: 0,
        modalidade: 0,
        periodos: 10,
        area: 1,
        id: 2,
      },
      {
        nome: "Arquitetura e Urbanismo",
        grau: 0,
        modalidade: 0,
        periodos: 10,
        area: 2,
        id: 3,
      },
      {
        nome: "Relações Internacionais",
        grau: 0,
        modalidade: 0,
        periodos: 8,
        area: 3,
        id: 4,
      },
      {
        nome: "Engenharia de Software",
        grau: 0,
        modalidade: 0,
        periodos: 8,
        area: 4,
        id: 5,
      },
      {
        nome: "Análise e Desenvolvimento de Sistemas",
        grau: 2,
        modalidade: 1,
        periodos: 5,
        area: 4,
        id: 6,
      },
      {
        nome: "Letras",
        grau: 1,
        modalidade: 0,
        periodos: 8,
        area: 5,
        id: 7,
      },
      {
        nome: "História",
        grau: 1,
        modalidade: 0,
        periodos: 8,
        area: 6,
        id: 8,
      },
    ];
    localStorage.setItem("cursos", JSON.stringify(cursos));
    localStorage.setItem("ultimoCurso", 8);
  },

  // recupera a lista de cursos
  cursos: function () {
    return JSON.parse(localStorage.getItem("cursos") || "[]");
  },

  // recupera a lista de cursos de uma área específica
  cursosDaArea: function (idArea) {
    return JSON.parse(localStorage.getItem("cursos") || "[]").filter(
      (elem) => elem.area == idArea
    );
  },

  // recupera um curso específico
  curso: function (idCurso) {
    let cursos = JSON.parse(localStorage.getItem("cursos") || "[]");
    for (i in cursos) {
      if (cursos[i].id == idCurso) return cursos[i];
    }
    return null;
  },

  // Atualiza os dados do curso, supondo que o id foi mantido
  update: function (elem) {
    let cursos = JSON.parse(localStorage.getItem("cursos") || "[]");
    for (i in cursos) {
      if (cursos[i].id == elem.id) {
        cursos[i].nome = elem.nome;
        cursos[i].periodos = elem.periodos;
        cursos[i].modalidade = elem.modalidade;
        cursos[i].grau = elem.grau;
        cursos[i].area = elem.area;
      }
    }
    localStorage.setItem("cursos", JSON.stringify(cursos));
  },

  // Apaga um curso. Seus usuários, bem como competências,
  // componentes, curriculares, ... devem ser apagados separadamente
  delete: function (idCurso) {
    let cursos = JSON.parse(localStorage.getItem("cursos") || "[]");
    cursos = cursos.filter((elem) => elem.id != idCurso);
    localStorage.setItem("cursos", JSON.stringify(cursos));
  },

  // Cria um novo curso
  create: function (curso) {
    let cursos = JSON.parse(localStorage.getItem("cursos") || "[]");
    let idCurso = parseInt(localStorage.getItem("ultimoCurso") || "0") + 1;
    curso.id = idCurso;
    cursos.push(curso);
    localStorage.setItem("ultimoCurso", idCurso);
    localStorage.setItem("cursos", JSON.stringify(cursos));
  },
};
