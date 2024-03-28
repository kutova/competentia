let dbCursos = {
  // Cria um BD inicial no Local Storage
  install: function () {
    let cursos = [
      {
        nome: "Administração",
        grau: 0,
        modalidade: 0,
        semestres: 8,
        area: 8,
        versao: 1,
        ano: 2024,
        status: 0,
        observacoes: "",
        id: 1,
      },
      {
        nome: "Direito",
        grau: 0,
        modalidade: 0,
        semestres: 10,
        area: 9,
        versao: 1,
        ano: 2024,
        status: 0,
        observacoes: "",
        id: 2,
      },
      {
        nome: "Arquitetura e Urbanismo",
        grau: 0,
        modalidade: 0,
        semestres: 10,
        area: 2,
        versao: 1,
        ano: 2024,
        status: 0,
        observacoes: "",
        id: 3,
      },
      {
        nome: "Relações Internacionais",
        grau: 0,
        modalidade: 0,
        semestres: 8,
        area: 3,
        versao: 1,
        ano: 2024,
        status: 0,
        observacoes: "",
        id: 4,
      },
      {
        nome: "Engenharia de Software",
        grau: 0,
        modalidade: 0,
        semestres: 8,
        area: 4,
        versao: 1,
        ano: 2024,
        status: 0,
        observacoes: "",
        id: 5,
      },
      {
        nome: "Análise e Desenvolvimento de Sistemas",
        grau: 2,
        modalidade: 1,
        semestres: 5,
        area: 4,
        versao: 1,
        ano: 2024,
        status: 0,
        observacoes: "",
        id: 6,
      },
      {
        nome: "Letras",
        grau: 1,
        modalidade: 0,
        semestres: 8,
        area: 5,
        versao: 1,
        ano: 2024,
        status: 1,
        observacoes: "",
        id: 7,
      },
      {
        nome: "História",
        grau: 1,
        modalidade: 0,
        semestres: 8,
        area: 6,
        versao: 1,
        ano: 2024,
        status: 1,
        observacoes: "",
        id: 8,
      },
      {
        nome: "Ciência da Computação",
        grau: 0,
        modalidade: 0,
        semestres: 8,
        area: 7,
        versao: 1,
        ano: 2024,
        status: 0,
        observacoes: "",
        id: 9,
      },
    ];
    localStorage.setItem("cursos", JSON.stringify(cursos));
    localStorage.setItem("ultimoCurso", 9);
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
    return cursos.find((c) => c.id == idCurso);
  },

  // Atualiza os dados do curso, supondo que o id foi mantido
  update: function (elem) {
    let cursos = JSON.parse(localStorage.getItem("cursos") || "[]");
    for (i in cursos) {
      if (cursos[i].id == elem.id) {
        cursos[i].nome = elem.nome;
        cursos[i].semestres = elem.semestres;
        cursos[i].modalidade = elem.modalidade;
        cursos[i].grau = elem.grau;
        cursos[i].area = elem.area;
        cursos[i].versao = elem.versao;
        cursos[i].ano = elem.ano;
        cursos[i].observacoes = elem.observacoes;
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

  // Arquiva um curso. O acesso ao curso deve ser removido dos usuários
  archive: function (idCurso) {
    let cursos = JSON.parse(localStorage.getItem("cursos") || "[]");
    let i = cursos.findIndex((c) => c.id == idCurso);
    cursos[i].status = 1;
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
