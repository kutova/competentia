let usuariosService = {
  // Cria um BD inicial no Local Storage
  install: function () {
    let usuarios = [
      {
        nome: "Marcos",
        email: "kutova@pucminas.br",
        senha: "kutova",
        tipo: "admin",
      },
      {
        nome: "Juliana",
        email: "granffild@pucminas.br",
        senha: "docinho",
        tipo: "usuario",
      },
    ];
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  },

  // Valida email e senha do usuário, retornando os demais dados
  validate: function (email, senha) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    for (u in usuarios) {
      if (usuarios[u].email == email && usuarios[u].senha == senha)
        return {
          email: usuarios[u].email,
          nome: usuarios[u].nome,
          admin: usuarios[u].tipo == "admin",
        };
    }
    return null;
  },

  // Retorna a lista completa de usuários, mas sem as senhas.
  usuarios: function () {
    let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    return usuarios.map((u) => {
      return {
        email: u.email,
        nome: u.nome,
        admin: u.tipo == "admin",
      };
    });
  },

  // Retorna os dados de um usuário por meio do seu e-mail (sem a senha)
  usuario: function (email) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    for (u in usuarios) {
      if (usuarios[u].email == email)
        return {
          email: usuarios[u].email,
          nome: usuarios[u].nome,
          admin: usuarios[u].tipo == "admin",
        };
    }
    return null;
  },
};
