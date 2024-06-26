let dbUsuarios = {
  // Cria um BD inicial no Local Storage
  install: function () {
    let usuarios = [
      {
        nome: "Marcos Kutova",
        email: "kutova@pucminas.br",
        senha: "kutova",
        tipo: 0,
        telefone: "(31)99999-9999",
        id: 1,
      },
      {
        nome: "Juliana Granffild",
        email: "granffild@pucminas.br",
        senha: "docinho",
        tipo: 0,
        telefone: "(31)99991-9991",
        id: 2,
      },
      {
        nome: "Sara Pimenta Resende",
        email: "sara@pucminas.br",
        senha: "sara",
        tipo: 1,
        telefone: "(31)99992-9992",
        id: 3,
      },
      {
        nome: "Usuário de Teste",
        email: "admin@pucminas.br",
        senha: "admin",
        tipo: 0,
        telefone: "(31)99999-9999",
        id: 4,
      },
    ];
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("ultimoUsuario", 4);
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
          telefone: usuarios[u].telefone,
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
        telefone: elem.telefone,
      };
    });
  },

  // Retorna os dados de um usuário por meio do seu e-mail (sem a senha)
  usuario: function (id) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    for (let i in usuarios) {
      if (usuarios[i].id == id)
        return {
          id: usuarios[i].id,
          email: usuarios[i].email,
          nome: usuarios[i].nome,
          tipo: usuarios[i].tipo,
          telefone: usuarios[i].telefone,
        };
    }
    return null;
  },

  // Atualiza os dados do usuário, supondo que o id foi mantido
  // O campo senha não está incluído nos dados
  update: function (elem) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    for (let i in usuarios) {
      if (usuarios[i].id == elem.id) {
        usuarios[i].nome = elem.nome;
        usuarios[i].email = elem.email;
        usuarios[i].tipo = elem.tipo;
        usuarios[i].telefone = elem.telefone;
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
