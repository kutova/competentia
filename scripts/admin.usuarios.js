// --------------------------------------------------------------
// Mostra a tabela de usuarios
// --------------------------------------------------------------
let mostraTabela = function () {
  dadosUsuarios.innerHTML = "";
  let usuarios = usuariosService.usuarios();
  usuarios.sort((a, b) => a.nome.localeCompare(b.nome));
  usuarios.forEach((usuario) => {
    dadosUsuarios.innerHTML += `
    <tr>
      <td>${usuario.nome}</td>
      <td>${usuario.email}</td>
      <td>${tiposUsuario[usuario.tipo]}</td>
      <td class="clicavel">
        <span class="simbolo" 
          onclick="exibeUsuario('${usuario.id}')"
          title="Exibe os dados do usuário">
          <img src="./imagens/visibility.svg" />
        </span>
        <span class="simbolo" 
          onclick="editaUsuario('${usuario.id}')"
          title="Altera os dados do usuário">
          <img src="./imagens/edit.svg" />
        </span>
        <span class="simbolo" 
          onclick="apagaUsuario('${usuario.id}')"
          title="Exclui o usuário">
          <img src="./imagens/delete.svg" />
        </span>
      </td>
    </tr>
  `;
  });
};

// --------------------------------------------------------------
// Exibe o modal para visualização dos dados do usuário
// --------------------------------------------------------------
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

  let corpoTabela = "";
  let idsCursosDoUsuario = cursosUsuariosService.cursosUsuario(id);
  if (idsCursosDoUsuario.length == 0)
    corpoTabela = "<li>Nenhum curso encontrado</li>";
  else {
    let cursosDoUsuario = idsCursosDoUsuario.map((c) => ({
      ...cursosService.curso(c.id),
      permissao: c.permissao,
    }));
    cursosDoUsuario.sort((a, b) => a.nome.localeCompare(b.nome));
    for (i in cursosDoUsuario)
      corpoTabela += `<tr>
      <td>${cursosDoUsuario[i].nome} ${
        cursosDoUsuario[i].status == 1
          ? ' <sup><img width="15px" src="./imagens/inventory.svg" title="Arquivado" /></sup>'
          : ""
      }</td>
      <td>
      ${
        cursosDoUsuario[i].permissao == 1
          ? '<span class="simbolo"><img src="./imagens/check.svg" /></span>'
          : ""
      }
      </td> 
      <td>
      ${
        cursosDoUsuario[i].permissao == 0
          ? '<span class="simbolo"><img src="./imagens/check.svg" /></span>'
          : ""
      }
      </td> 
    </tr>`;
  }
  document.querySelector("#listaCursos").innerHTML = corpoTabela;
  btnCancelar.style.display = "none";
  btnFechar.onclick = () => modalUsuario.close();
  btnFechar.innerHTML = "Fechar";
  modalUsuario.showModal();
  btnFechar.focus();
};

// --------------------------------------------------------------
// Exibe o modal para edição dos dados do usuário
// --------------------------------------------------------------
let editaUsuario = function (id) {
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

  nomeModalUsuario.disabled = false;
  emailModalUsuario.disabled = false;
  celularModalUsuario.disabled = false;
  tipoModalUsuario.disabled = false;

  let cursos = cursosService
    .cursos()
    .sort((a, b) => a.nome.localeCompare(b.nome));
  let cursosDoUsuario = cursosUsuariosService.cursosUsuario(id);

  let corpoTabela = "";
  if (cursos.length == 0)
    corpoTabela = "<tr><td>Nenhum curso encontrado</td><td></td><td></td></tr>";
  else {
    for (i in cursos) {
      let j = cursosDoUsuario.findIndex((c) => c.id == cursos[i].id);
      let p = j == -1 ? -1 : parseInt(cursosDoUsuario[j].permissao);
      corpoTabela += `<tr>
        <td>${cursos[i].nome}${
        cursos[i].status == 1
          ? ' <sup><img width="15px" src="./imagens/inventory.svg" title="Arquivado" /></sup>'
          : ""
      }</td>
        <td>
          <input 
            class="permissaoCurso" 
            type="checkbox" 
            id="${"ct_" + cursos[i].id + "_v"}" 
            ${p == 1 ? "checked" : ""} 
            onchange="alternaPermissao(${cursos[i].id}, 1)"/>
        </td> 
        <td>
          <input 
            class="permissaoCurso" 
            type="checkbox" 
            id="${"ct_" + cursos[i].id + "_e"}" 
            ${p == 0 ? "checked" : ""} 
            ${cursos[i].status == 1 ? " disabled" : ""}
            onchange="alternaPermissao(${cursos[i].id}, 0)"/>
            </td> 
      </tr>`;
    }
  }
  document.querySelector("#listaCursos").innerHTML = corpoTabela;
  btnCancelar.style.display = "block";
  btnFechar.innerHTML = "Salvar";
  btnFechar.onclick = () => {
    salvar(usuario, cursos);
    modalUsuario.close();
  };
  modalUsuario.showModal();
  nomeModalUsuario.focus();
};

// --------------------------------------------------------------
// Salva os dados editados pelo usuário
// --------------------------------------------------------------
let salvar = function (usuario, cursos) {
  if (
    nomeModalUsuario.value.length == 0 ||
    emailModalUsuario.value.length == 0 ||
    celularModalUsuario.value.length == 0
  ) {
    erro("Nenhum campo pode ficar vazio.");
    return;
  }
  usuario.nome = nomeModalUsuario.value;
  usuario.email = emailModalUsuario.value;
  usuario.tipo = tipoModalUsuario.value;
  usuario.celular = celularModalUsuario.value;
  usuariosService.update(usuario);

  let cursosAEditar = [];
  let cursosAVisualizar = [];
  for (i in cursos) {
    let campo1 = "#ct_" + cursos[i].id + "_v";
    let campo2 = "#ct_" + cursos[i].id + "_e";
    if (document.querySelector(campo1).checked)
      cursosAVisualizar.push(cursos[i].id);
    else if (document.querySelector(campo2).checked)
      cursosAEditar.push(cursos[i].id);
  }
  cursosUsuariosService.update(usuario.id, cursosAEditar, cursosAVisualizar);
  mostraTabela();
};

// --------------------------------------------------------------
// Exibe o modal para criação de usuário
// --------------------------------------------------------------
let criaUsuario = function () {
  tipoModalCreateUsuario.innerHTML = tiposUsuario
    .map((t, i) => `<option value=${i}>${t}</option>`)
    .join();
  nomeModalCreateUsuario.value = "";
  emailModalCreateUsuario.value = "";
  senha1ModalCreateUsuario.value = "";
  senha2ModalCreateUsuario.value = "";
  celularModalCreateUsuario.value = "";
  tipoModalCreateUsuario.value = 1;
  modalCreateUsuario.showModal();
  nomeModalCreateUsuario.focus();
};

// --------------------------------------------------------------
// Inclui um novo usuário
// --------------------------------------------------------------
let adicionar = function () {
  if (
    nomeModalCreateUsuario.value.length == 0 ||
    emailModalCreateUsuario.value.length == 0 ||
    senha1ModalCreateUsuario.value.length == 0 ||
    senha2ModalCreateUsuario.value.length == 0 ||
    celularModalCreateUsuario.value.length == 0
  ) {
    erro("Nenhum campo pode ficar vazio.");
    return;
  }
  if (senha1ModalCreateUsuario.value != senha2ModalCreateUsuario.value) {
    erro("As senhas devem ser iguais.");
    return;
  }
  let usuario = {
    nome: nomeModalCreateUsuario.value,
    email: emailModalCreateUsuario.value,
    senha: senha1ModalCreateUsuario.value,
    tipo: tipoModalCreateUsuario.value,
    celular: celularModalCreateUsuario.value,
  };
  usuariosService.create(usuario);
  modalCreateUsuario.close();
  mostraTabela();
};

// --------------------------------------------------------------
// Exibe o modal para confirmar a exclusão do usuário
// --------------------------------------------------------------
let apagaUsuario = function (id) {
  let usuario = usuariosService.usuario(id);
  usuarioAExcluir.innerHTML = usuario.nome;

  btnExcluir.onclick = () => excluir(id);
  modalDeleteUsuario.showModal();
  btnExcluir.focus();
};

// --------------------------------------------------------------
// Apaga o usuário e seus cursos
// --------------------------------------------------------------
let excluir = function (id) {
  usuariosService.delete(id);
  cursosUsuariosService.deleteUsuario(id);
  modalDeleteUsuario.close();
  mostraTabela();
};

// --------------------------------------------------------------
// Funções auxiliares
// --------------------------------------------------------------
// Mostra o modal de erro
let erro = function (mensagem) {
  mensagemErro.innerHTML = mensagem;
  modalErro.showModal();
  btnOk.focus();
};

// Assegura que apenas uma permissão poderá ser marcada por curso
let alternaPermissao = function (id, p) {
  c1 = document.querySelector("#ct_" + id + "_v");
  c2 = document.querySelector("#ct_" + id + "_e");
  if (p == 1 && c2.checked) c2.checked = false;
  if (p == 0 && c1.checked) c1.checked = false;
};

// Atribui funcionalidade aos elementos das janelas modais
btnAdicionar.onclick = () => criaUsuario();
btnAdicionar2.onclick = () => adicionar();
iconeFechar.onclick = () => modalUsuario.close();
iconeFechar2.onclick = () => modalCreateUsuario.close();
iconeFechar3.onclick = () => modalErro.close();
iconeFechar4.onclick = () => modalDeleteUsuario.close();
btnCancelar.onclick = () => modalUsuario.close();
btnCancelar2.onclick = () => modalCreateUsuario.close();
btnCancelar3.onclick = () => modalDeleteUsuario.close();
btnOk.onclick = () => modalErro.close();

// Testes de validade dos campos
nomeModalUsuario.oninput = function () {
  nomeModalUsuario.setAttribute(
    "aria-invalid",
    nomeModalUsuario.value.length == 0
  );
};
emailModalUsuario.oninput = function () {
  emailModalUsuario.setAttribute(
    "aria-invalid",
    emailModalUsuario.value.length == 0
  );
};
celularModalUsuario.oninput = function () {
  celularModalUsuario.setAttribute(
    "aria-invalid",
    celularModalUsuario.value.length == 0
  );
};
nomeModalCreateUsuario.oninput = function () {
  nomeModalCreateUsuario.setAttribute(
    "aria-invalid",
    nomeModalCreateUsuario.value.length == 0
  );
};
emailModalCreateUsuario.oninput = function () {
  emailModalCreateUsuario.setAttribute(
    "aria-invalid",
    emailModalCreateUsuario.value.length == 0
  );
};
senha1ModalCreateUsuario.oninput = function () {
  senha1ModalCreateUsuario.setAttribute(
    "aria-invalid",
    senha1ModalCreateUsuario.value.length == 0
  );
  if (senha1ModalCreateUsuario.value.length == 0)
    senha2ModalCreateUsuario.setAttribute("aria-invalid", true);
};
senha2ModalCreateUsuario.oninput = function () {
  senha2ModalCreateUsuario.setAttribute(
    "aria-invalid",
    senha2ModalCreateUsuario.value.length == 0 ||
      senha2ModalCreateUsuario.value != senha1ModalCreateUsuario.value
  );
};
celularModalCreateUsuario.oninput = function () {
  celularModalCreateUsuario.setAttribute(
    "aria-invalid",
    celularModalCreateUsuario.value.length == 0
  );
};

// Mostra a tabela de usuários
mostraTabela();
