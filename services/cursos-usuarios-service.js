let dbCursos_Usuarios = {
  // Cria um BD inicial no Local Storage
  install: function () {
    let cursosUsuarios = [
      {
        idUsuario: 1,
        idCurso: 1,
        permissao: 0,
      },
      {
        idUsuario: 1,
        idCurso: 2,
        permissao: 0,
      },
      {
        idUsuario: 1,
        idCurso: 3,
        permissao: 0,
      },
      {
        idUsuario: 1,
        idCurso: 4,
        permissao: 0,
      },
      {
        idUsuario: 1,
        idCurso: 5,
        permissao: 0,
      },
      {
        idUsuario: 1,
        idCurso: 6,
        permissao: 1,
      },
      {
        idUsuario: 1,
        idCurso: 7,
        permissao: 1,
      },
      {
        idUsuario: 1,
        idCurso: 8,
        permissao: 1,
      },
      {
        idUsuario: 2,
        idCurso: 1,
        permissao: 1,
      },
      {
        idUsuario: 2,
        idCurso: 3,
        permissao: 0,
      },
      {
        idUsuario: 2,
        idCurso: 4,
        permissao: 1,
      },
      {
        idUsuario: 2,
        idCurso: 7,
        permissao: 0,
      },
      {
        idUsuario: 2,
        idCurso: 8,
        permissao: 0,
      },
      {
        idUsuario: 1,
        idCurso: 9,
        permissao: 0,
      },
      {
        idUsuario: 2,
        idCurso: 9,
        permissao: 0,
      },
      {
        idUsuario: 3,
        idCurso: 9,
        permissao: 1,
      },
      {
        idUsuario: 3,
        idCurso: 1,
        permissao: 0,
      },
      {
        idUsuario: 4,
        idCurso: 2,
        permissao: 1,
      },
      {
        idUsuario: 4,
        idCurso: 9,
        permissao: 0,
      },
      {
        idUsuario: 4,
        idCurso: 6,
        permissao: 0,
      },
      {
        idUsuario: 4,
        idCurso: 1,
        permissao: 1,
      },
    ];
    localStorage.setItem("cursos-usuarios", JSON.stringify(cursosUsuarios));
  },

  // recupera um curso específico
  cursosUsuario: function (idUsuario) {
    let cursosUsuarios = JSON.parse(
      localStorage.getItem("cursos-usuarios") || "[]"
    );
    let cursos = [];
    for (let i in cursosUsuarios) {
      if (cursosUsuarios[i].idUsuario == idUsuario)
        cursos.push({
          id: cursosUsuarios[i].idCurso,
          permissao: cursosUsuarios[i].permissao,
        });
    }
    return cursos;
  },

  // retorna os usuários que podem editar um curso
  usuarios: function (idCurso) {
    let cursosUsuarios = JSON.parse(
      localStorage.getItem("cursos-usuarios") || "[]"
    );
    let usuarios = [];
    for (let i in cursosUsuarios) {
      if (
        cursosUsuarios[i].idCurso == idCurso &&
        cursosUsuarios[i].permissao == 0
      )
        usuarios.push(cursosUsuarios[i].idUsuario);
    }
    return usuarios;
  },

  // retorna a permissão do usuário para um curso específico
  permissao: function (idUsuario, idCurso) {
    let cursosUsuarios = JSON.parse(
      localStorage.getItem("cursos-usuarios") || "[]"
    );
    for (let i in cursosUsuarios) {
      if (
        cursosUsuarios[i].idUsuario == idUsuario &&
        cursosUsuarios[i].idCurso == idCurso
      )
        return cursosUsuarios[i].permissao;
    }
    return -1;
  },

  // altera os cursos de um usuário
  update: function (idUsuario, cursosAEditar, cursosAVisualizar) {
    let cursosUsuarios = JSON.parse(
      localStorage.getItem("cursos-usuarios") || "[]"
    );

    // remove todos os cursos atuais
    cursosUsuarios = cursosUsuarios.filter((c) => c.idUsuario != idUsuario);

    // acrescenta os cursos a editar
    for (let i in cursosAEditar) {
      cursosUsuarios.push({
        idUsuario: idUsuario,
        idCurso: cursosAEditar[i],
        permissao: 0,
      });
    }

    // acrescenta os cursos a visualziar
    for (let i in cursosAVisualizar) {
      cursosUsuarios.push({
        idUsuario: idUsuario,
        idCurso: cursosAVisualizar[i],
        permissao: 1,
      });
    }

    localStorage.setItem("cursos-usuarios", JSON.stringify(cursosUsuarios));
  },

  // remove todos os cursos de um usuário
  deleteUsuario: function (idUsuario) {
    let cursosUsuarios = JSON.parse(
      localStorage.getItem("cursos-usuarios") || "[]"
    );

    // remove todos os cursos atuais
    cursosUsuarios = cursosUsuarios.filter((c) => c.idUsuario != idUsuario);
    localStorage.setItem("cursos-usuarios", JSON.stringify(cursosUsuarios));
  },

  // remove todos os usuários de um curso
  deleteCurso: function (idCurso) {
    let cursosUsuarios = JSON.parse(
      localStorage.getItem("cursos-usuarios") || "[]"
    );

    // remove todos os cursos atuais
    cursosUsuarios = cursosUsuarios.filter((c) => c.idCurso != idCurso);
    localStorage.setItem("cursos-usuarios", JSON.stringify(cursosUsuarios));
  },
};
