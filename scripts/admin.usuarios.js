usuario = JSON.parse(
  localStorage.getItem("usuario") || "{nome: Usuário, admin:false}"
);
if (!usuario.admin) {
  localStorage.removeItem("ultimoAcesso");
  localStorage.removeItem("usuario");
  window.location = "/login.html";
}
userName.innerHTML = usuario.nome;

// Testa se está logado e quando foi o último acesso
let ultimoAcesso = parseInt(localStorage.getItem("ultimoAcesso")) || 0;
if (new Date().getTime() - ultimoAcesso > 1800000) {
  let pathName = document.location.pathname.split("/");
  pagina = pathName.pop();
  if (pagina != "login.html") {
    window.location = "/login.html";
  }
} else {
  localStorage.setItem("ultimoAcesso", new Date().getTime());
}

// Atribui a funcionalidade de saída do sistema
btnLogout.onclick = () => {
  localStorage.removeItem("ultimoAcesso");
  localStorage.removeItem("usuario");
  window.location = "/login.html";
};

// Carrega os usuários
let usuarios = usuariosService.usuarios();
usuarios.sort((a, b) => a.nome.localeCompare(b.nome));
usuarios.forEach((usuario) => {
  dadosUsuarios.innerHTML += `
    <tr>
      <td>${usuario.nome}</td>
      <td>${usuario.email}</td>
      <td><span class="simbolo">${usuario.admin ? "check" : ""}</span></td>
      <td>
        <span class="simbolo" onclick="exibeUsuario('${
          usuario.email
        }')">visibility</span>
        <span class="simbolo">edit</span>
        <span class="simbolo">delete</span>
      </td>
    </tr>
  `;
});

let exibeUsuario = function (email) {
  let usuario = usuariosService.usuario(email);
  nomeExibeUsuario.innerHTML = usuario.nome;
  emailExibeUsuario.innerHTML = usuario.email;
  modalExibeUsuario.showModal();
};

iconeFechar.onclick = () => modalExibeUsuario.close();
btnFechar.onclick = () => modalExibeUsuario.close();
