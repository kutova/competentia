let usuariosService = {
  // Cria um BD inicial no Local Storage
  install: function () {
    let usuarios = [
      {
        id: 1,
        nome: "Marcos",
        email: "kutova@pucminas.br",
        senha: "kutova",
        tipo: 0,
        celular: "(31)99999-9999",
      },
      {
        id: 2,
        nome: "Juliana",
        email: "granffild@pucminas.br",
        senha: "docinho",
        tipo: 0,
        celular: "(31)99999-9999",
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
    return usuarios.map((u) => {
      return {
        id: u.id,
        email: u.email,
        nome: u.nome,
        tipo: u.tipo,
        celular: u.celular,
      };
    });
  },

  // Retorna os dados de um usuário por meio do seu e-mail (sem a senha)
  usuario: function (id) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    for (u in usuarios) {
      if (usuarios[u].id == id)
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
};
