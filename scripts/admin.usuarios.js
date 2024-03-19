usuario = JSON.parse(
  localStorage.getItem("usuario") || "{nome: 'Usuário', tipo: 'Professor'}"
);
if (!usuario.tipo == 0) {
  // Administrador
  localStorage.removeItem("ultimoAcesso");
  localStorage.removeItem("usuario");
  window.location = "./login.html";
}
userName.innerHTML = usuario.nome;

// Testa se está logado e quando foi o último acesso
let ultimoAcesso = parseInt(localStorage.getItem("ultimoAcesso")) || 0;
if (new Date().getTime() - ultimoAcesso > 1800000) {
  let pathName = document.location.pathname.split("/");
  pagina = pathName.pop();
  if (pagina != "login.html") {
    window.location = "./login.html";
  }
} else {
  localStorage.setItem("ultimoAcesso", new Date().getTime());
}

// Atribui a funcionalidade de saída do sistema
btnLogout.onclick = () => {
  localStorage.removeItem("ultimoAcesso");
  localStorage.removeItem("usuario");
  window.location = "./login.html";
};

// Carrega os usuários
let usuarios = usuariosService.usuarios();
usuarios.sort((a, b) => a.nome.localeCompare(b.nome));
usuarios.forEach((usuario) => {
  dadosUsuarios.innerHTML += `
    <tr>
      <td>${usuario.nome}</td>
      <td>${usuario.email}</td>
      <td>${tiposUsuario[usuario.tipo]}</td>
      <td class="clicavel">
        <span class="simbolo" onclick="exibeUsuario('${
          usuario.id
        }')">visibility</span>
        <span class="simbolo">edit</span>
        <span class="simbolo">delete</span>
      </td>
    </tr>
  `;
});

let exibeUsuario = function (id) {
  let usuario = usuariosService.usuario(id);
  nomeModalUsuario.value = usuario.nome;
  emailModalUsuario.value = usuario.email;
  celularModalUsuario.value = usuario.celular;
  tipoModalUsuario.innerHTML = tiposUsuario
    .map(
      (t, i) =>
        `<option value=${i} ${
          usuario.tipo == i ? "selected" : ""
        }>${t}</option>`
    )
    .join();

  nomeModalUsuario.disabled = true;
  emailModalUsuario.disabled = true;
  celularModalUsuario.disabled = true;
  tipoModalUsuario.disabled = true;

  let htmlSelect = "";
  let primeiro = true;
  let idsCursosDoUsuario = cursosUsuariosService.cursosUsuario(id);
  if (idsCursosDoUsuario.length == 0)
    htmlSelect = "<option selected disabled>Nenhum curso encontrado</option>";
  else {
    let cursosDoUsuario = idsCursosDoUsuario.map((id) =>
      cursosService.curso(id)
    );
    cursosDoUsuario.sort((a, b) => a.nome.localeCompare(b.nome));
    for (i in cursosDoUsuario) {
      htmlSelect += `<option ${primeiro ? "selected " : ""}disabled>${
        cursosDoUsuario[i].nome
      }</option>`;
      primeiro = false;
    }
  }
  cursosModalUsuario.innerHTML = htmlSelect;
  btnCancelar.style.display = "none";
  modalUsuario.showModal();
};

iconeFechar.onclick = () => modalUsuario.close();
btnFechar.onclick = () => modalUsuario.close();
