// --------------------------------------------------------------
// Mostra a tabela de usuarios
// --------------------------------------------------------------
let mostraTabela = function () {
  dadosUsuarios.innerHTML = "";
  let usuarios = dbUsuarios.usuarios();
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
  let usuario = dbUsuarios.usuario(id);
  nomeModalExibeUsuario.value = usuario.nome;
  emailModalExibeUsuario.value = usuario.email;
  celularModalExibeUsuario.value = usuario.celular;
  tipoModalExibeUsuario.value = tiposUsuario[usuario.tipo];

  let corpoTabela = "";
  let idsCursosDoUsuario = dbCursosUsuarios.cursosUsuario(id);
  if (idsCursosDoUsuario.length == 0)
    corpoTabela = "<li>Nenhum curso encontrado</li>";
  else {
    let cursosDoUsuario = idsCursosDoUsuario.map((c) => ({
      ...dbCursos.curso(c.id),
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
  btnFecharExibicao.onclick = () => modalExibeUsuario.close();
  modalExibeUsuario.showModal();
  btnFecharExibicao.focus();
};

// --------------------------------------------------------------
// Exibe o modal para edição dos dados do usuário
// --------------------------------------------------------------
let editaUsuario = function (id) {
  let usuario = dbUsuarios.usuario(id);
  nomeModalEditaUsuario.value = usuario.nome;
  emailModalEditaUsuario.value = usuario.email;
  celularModalEditaUsuario.value = usuario.celular;
  tipoModalEditaUsuario.innerHTML = tiposUsuario
    .map(
      (t, i) =>
        `<option value=${i} ${
          usuario.tipo == i ? "selected" : ""
        }>${t}</option>`
    )
    .join();

  let cursos = dbCursos.cursos().sort((a, b) => a.nome.localeCompare(b.nome));
  let cursosDoUsuario = dbCursosUsuarios.cursosUsuario(id);

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
            ${cursos[i].status == 1 ? " readOnly" : ""}
            onchange="alternaPermissao(${cursos[i].id}, 0)"/>
            </td> 
      </tr>`;
    }
  }
  document.querySelector("#listaCursos2").innerHTML = corpoTabela;
  btnFecharEdicao.onclick = () => {
    salvar(usuario, cursos);
    modalEditaUsuario.close();
  };
  modalEditaUsuario.showModal();
  nomeModalEditaUsuario.focus();
};

// --------------------------------------------------------------
// Salva os dados editados pelo usuário
// --------------------------------------------------------------
let salvar = function (usuario, cursos) {
  if (
    nomeModalEditaUsuario.value.length == 0 ||
    emailModalEditaUsuario.value.length == 0 ||
    celularModalEditaUsuario.value.length == 0
  ) {
    erro("Nenhum campo pode ficar vazio.");
    return;
  }
  usuario.nome = nomeModalEditaUsuario.value;
  usuario.email = emailModalEditaUsuario.value;
  usuario.tipo = tipoModalEditaUsuario.value;
  usuario.celular = celularModalEditaUsuario.value;
  dbUsuarios.update(usuario);

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
  dbCursosUsuarios.update(usuario.id, cursosAEditar, cursosAVisualizar);
  mostraTabela();
};

// --------------------------------------------------------------
// Exibe o modal para criação de usuário
// --------------------------------------------------------------
let criaUsuario = function () {
  tipoModalCreateUsuario.innerHTML = tiposUsuario
    .map((t, i) => `<option value=${i}>${t}</option>`)
    .join();
  nomeModalCriaUsuario.value = "";
  emailModalCriaUsuario.value = "";
  senha1ModalCriaUsuario.value = "";
  senha2ModalCriaUsuario.value = "";
  celularModalCriaUsuario.value = "";
  tipoModalCriaUsuario.value = 1;
  modalCriaUsuario.showModal();
  nomeModalCriaUsuario.focus();
};

// --------------------------------------------------------------
// Inclui um novo usuário
// --------------------------------------------------------------
let adicionar = function () {
  if (
    nomeModalCriaUsuario.value.length == 0 ||
    emailModalCriaUsuario.value.length == 0 ||
    senha1ModalCriaUsuario.value.length == 0 ||
    senha2ModalCriaUsuario.value.length == 0 ||
    celularModalCriaUsuario.value.length == 0
  ) {
    erro("Nenhum campo pode ficar vazio.");
    return;
  }
  if (senha1ModalCriaUsuario.value != senha2ModalCriaUsuario.value) {
    erro("As senhas devem ser iguais.");
    return;
  }
  let usuario = {
    nome: nomeModalCriaUsuario.value,
    email: emailModalCriaUsuario.value,
    senha: senha1ModalCriaUsuario.value,
    tipo: tipoModalCriaUsuario.value,
    celular: celularModalCriaUsuario.value,
  };
  dbUsuarios.create(usuario);
  modalCriaUsuario.close();
  mostraTabela();
};

// --------------------------------------------------------------
// Exibe o modal para confirmar a exclusão do usuário
// --------------------------------------------------------------
let apagaUsuario = function (id) {
  let usuario = dbUsuarios.usuario(id);
  usuarioAExcluir.innerHTML = usuario.nome;

  btnExcluir.onclick = () => excluir(id);
  modalApagaUsuario.showModal();
  btnExcluir.focus();
};

// --------------------------------------------------------------
// Apaga o usuário e seus cursos
// --------------------------------------------------------------
let excluir = function (id) {
  dbUsuarios.delete(id);
  dbCursosUsuarios.deleteUsuario(id);
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
btnAdicionar3.onclick = () => adicionar();
iconeFecharExibicao.onclick = () => modalExibeUsuario.close();
iconeFecharEdicao.onclick = () => modalEditaUsuario.close();
iconeFecharCriacao.onclick = () => modalCria.close();
iconeFecharExclusao.onclick = () => modalApagaUsuario.close();
iconeFecharErro.onclick = () => modalErro.close();
btnCancelar2.onclick = () => modalEditaUsuario.close();
btnCancelar3.onclick = () => modalCriaUsuario.close();
btnCancelar4.onclick = () => modalApagaUsuario.close();
btnOkErro.onclick = () => modalErro.close();

// Testes de validade dos campos
nomeModalEditaUsuario.oninput = function () {
  nomeModalEditaUsuario.setAttribute(
    "aria-invalid",
    nomeModalEditaUsuario.value.length == 0
  );
};
emailModalEditaUsuario.oninput = function () {
  emailModalEditaUsuario.setAttribute(
    "aria-invalid",
    emailModalEditaUsuario.value.length == 0
  );
};
celularModalEditaUsuario.oninput = function () {
  celularModalEditaUsuario.setAttribute(
    "aria-invalid",
    celularModalEditaUsuario.value.length == 0
  );
};
nomeModalCriaUsuario.oninput = function () {
  nomeModalCriaUsuario.setAttribute(
    "aria-invalid",
    nomeModalCriaUsuario.value.length == 0
  );
};
emailModalCriaUsuario.oninput = function () {
  emailModalCriaUsuario.setAttribute(
    "aria-invalid",
    emailModalCriaUsuario.value.length == 0
  );
};
senha1ModalCriaUsuario.oninput = function () {
  senha1ModalCriaUsuario.setAttribute(
    "aria-invalid",
    senha1ModalCriaUsuario.value.length == 0
  );
  if (senha1ModalCriaUsuario.value.length == 0)
    senha2ModalCriaUsuario.setAttribute("aria-invalid", true);
};
senha2ModalCriaUsuario.oninput = function () {
  senha2ModalCriaUsuario.setAttribute(
    "aria-invalid",
    senha2ModalCriaUsuario.value.length == 0 ||
      senha2ModalCriaUsuario.value != senha1ModalCriaUsuario.value
  );
};
celularModalCriaUsuario.oninput = function () {
  celularModalCriaUsuario.setAttribute(
    "aria-invalid",
    celularModalCriaUsuario.value.length == 0
  );
};

// Mostra a tabela de usuários
mostraTabela();
