// --------------------------------------------------------
// Valida o login do usuário
// --------------------------------------------------------
let validaLogin = function () {
  if (email.value == "") {
    email.placeholder = "Preencha o e-mail";
    return;
  }
  if (senha.value == "") {
    senha.placeholder = "Preencha a senha";
    return;
  }
  let usuario = dbUsuarios.validate(email.value, senha.value);
  if (usuario) {
    localStorage.setItem("ultimoAcesso", new Date().getTime());
    localStorage.setItem("usuario", JSON.stringify(usuario));
    window.location = "./index.html";
  } else modalErro.showModal();
};

// --------------------------------------------------------
// Atribui funcionalidade aos botões
// --------------------------------------------------------
btnLogin.onclick = () => validaLogin();
btnOkErro.onclick = () => {
  email.value = "";
  email.placeholder = "";
  senha.value = "";
  senha.placeholder = "";
  modalErro.close();
};

email.onkeypress = function (evento) {
  if (evento.key === "Enter") {
    evento.preventDefault();
    validaLogin();
  }
};
senha.onkeypress = function (evento) {
  if (evento.key === "Enter") {
    evento.preventDefault();
    validaLogin();
  }
};
