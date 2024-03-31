let dbAreas = {
  // Cria um BD inicial no Local Storage
  install: function () {
    let areas = [
      { nome: "Transdisciplinar", id: 1 },
      { nome: "Arquitetura", id: 2 },
      { nome: "Relações Internacionais", id: 3 },
      { nome: "Engenharia de Software", id: 4 },
      { nome: "Letras", id: 5 },
      { nome: "História", id: 6 },
      { nome: "Ciência da Computação", id: 7 },
      { nome: "Administração", id: 8 },
      { nome: "Direito", id: 9 },
      { nome: "Matemática", id: 10 },
      { nome: "Física", id: 11 },
      { nome: "Química", id: 12 },
      { nome: "Fisolofia", id: 13 },
      { nome: "Ciências da Religião", id: 14 },
    ];
    localStorage.setItem("areas", JSON.stringify(areas));
    localStorage.setItem("ultimaArea", 14);
  },

  // recupera a lista de areas
  areas: function () {
    return JSON.parse(localStorage.getItem("areas") || "[]");
  },

  // recupera um area específico
  area: function (idArea) {
    let areas = JSON.parse(localStorage.getItem("areas") || "[]");
    for (let i in areas) {
      if (areas[i].id == idArea) return areas[i];
    }
    return null;
  },

  // Atualiza os dados da área, supondo que o id foi mantido
  update: function (elem) {
    let areas = JSON.parse(localStorage.getItem("areas") || "[]");
    for (let i in areas) {
      if (areas[i].id == elem.id) {
        areas[i].nome = elem.nome;
      }
    }
    localStorage.setItem("areas", JSON.stringify(areas));
  },

  // Apaga uma área. Seus cursos devem ser apagados separadamente
  delete: function (idArea) {
    let areas = JSON.parse(localStorage.getItem("areas") || "[]");
    areas = areas.filter((elem) => elem.id != idArea);
    localStorage.setItem("areas", JSON.stringify(areas));
  },

  // Cria uma nova área
  create: function (area) {
    let areas = JSON.parse(localStorage.getItem("areas") || "[]");
    let idArea = parseInt(localStorage.getItem("ultimaArea") || "0") + 1;
    area.id = idArea;
    areas.push(area);
    localStorage.setItem("ultimaArea", idArea);
    localStorage.setItem("areas", JSON.stringify(areas));
  },
};
