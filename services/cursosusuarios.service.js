let cursosUsuariosService = {
  // Cria um BD inicial no Local Storage
  install: function () {
    let cursosUsuarios = [
      {
        idUsuario: 1,
        idCurso: 1,
      },
      {
        idUsuario: 1,
        idCurso: 2,
      },
      {
        idUsuario: 1,
        idCurso: 3,
      },
      {
        idUsuario: 1,
        idCurso: 4,
      },
      {
        idUsuario: 1,
        idCurso: 5,
      },
      {
        idUsuario: 1,
        idCurso: 6,
      },
      {
        idUsuario: 1,
        idCurso: 7,
      },
      {
        idUsuario: 1,
        idCurso: 8,
      },
      {
        idUsuario: 2,
        idCurso: 1,
      },
      {
        idUsuario: 2,
        idCurso: 3,
      },
      {
        idUsuario: 2,
        idCurso: 4,
      },
      {
        idUsuario: 2,
        idCurso: 7,
      },
      {
        idUsuario: 2,
        idCurso: 8,
      },
    ];
    localStorage.setItem("cursosUsuarios", JSON.stringify(cursosUsuarios));
  },

  // recupera um curso específico
  cursosUsuario: function (idUsuario) {
    let cursosUsuarios = JSON.parse(
      localStorage.getItem("cursosUsuarios") || "[]"
    );
    let cursos = [];
    for (i in cursosUsuarios) {
      if (cursosUsuarios[i].idUsuario == idUsuario)
        cursos.push(cursosUsuarios[i].idCurso);
    }
    return cursos;
  },
};
