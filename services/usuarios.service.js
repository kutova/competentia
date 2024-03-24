let usuariosService = {
  // Cria um BD inicial no Local Storage
  install: function () {
    let usuarios = [
      {
        nome: "Marcos Kutova",
        email: "kutova@pucminas.br",
        senha: "kutova",
        tipo: 0,
        celular: "(31)99999-9999",
        id: 1,
      },
      {
        nome: "Juliana Granffild",
        email: "granffild@pucminas.br",
        senha: "docinho",
        tipo: 0,
        celular: "(31)99999-9999",
        id: 2,
      },
    ];
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("ultimoUsuario", 2);
  },

  // Valida email e senha do usuário, retornando os demais dados
  validate: function (email, senha) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    for (u in usuarios) {
      if (usuarios[u].email == email && usuarios[u].senha == senha)
        return {
          id: usuarios[u].id,
          email: usuarios[u].email,
          nome: usuarios[u].nome,
          tipo: usuarios[u].tipo,
          celular: usuarios[u].celular,
        };
    }
    return null;
  },

  // Retorna a lista completa de usuários, mas sem as senhas.
  usuarios: function () {
    let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    return usuarios.map((elem) => {
      return {
        id: elem.id,
        email: elem.email,
        nome: elem.nome,
        tipo: elem.tipo,
        celular: elem.celular,
      };
    });
  },

  // Retorna os dados de um usuário por meio do seu e-mail (sem a senha)
  usuario: function (id) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    for (i in usuarios) {
      if (usuarios[i].id == id)
        return {
          id: usuarios[i].id,
          email: usuarios[i].email,
          nome: usuarios[i].nome,
          tipo: usuarios[i].tipo,
          celular: usuarios[i].celular,
        };
    }
    return null;
  },

  // Atualiza os dados do usuário, supondo que o id foi mantido
  // O campo senha não está incluído nos dados
  update: function (elem) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    for (i in usuarios) {
      if (usuarios[i].id == elem.id) {
        usuarios[i].nome = elem.nome;
        usuarios[i].email = elem.email;
        usuarios[i].tipo = elem.tipo;
        usuarios[i].celular = elem.celular;
      }
    }
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  },

  // Apaga um usuário. Seus cursos devem ser apagados separadamente
  delete: function (idUsuario) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    usuarios = usuarios.filter((elem) => elem.id != idUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  },

  // Cria um novo usuário
  create: function (usuario) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    let idUsuario = parseInt(localStorage.getItem("ultimoUsuario") || "0") + 1;
    usuario.id = idUsuario;
    usuarios.push(usuario);
    localStorage.setItem("ultimoUsuario", idUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  },
};
