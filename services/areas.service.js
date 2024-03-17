let areasService = {
  // Cria um BD inicial no Local Storage
  install: function () {
    let areas = [
      { id: 0, nome: "Administração" },
      { id: 1, nome: "Direito" },
      { id: 2, nome: "Arquitetura" },
      { id: 3, nome: "Relações Internacionais" },
      { id: 4, nome: "Engenharia de Software" },
      { id: 5, nome: "Letras" },
      { id: 6, nome: "História" },
    ];
    localStorage.setItem("areas", JSON.stringify(areas));
  },

  // recupera a lista de areas
  areas: function () {
    return JSON.parse(localStorage.getItem("areas") || "[]");
  },

  // recupera um area específico
  area: function (idArea) {
    let areas = JSON.parse(localStorage.getItem("areas") || "[]");
    for (i in areas) {
      if (areas[i].id == idArea) return areas[i];
    }
    return null;
  },
};
