// --------------------------------------------------------------
// Identifica o curso a partir do URL, atualiza o título da
// página e os links do menu lateral
// --------------------------------------------------------------
curso = carregaCursoDoURL();
nomeCurso.innerHTML =
  curso.nome +
  (curso.status == 0
    ? ' <sup><img src="./imagens/inventory.svg" title="Arquivado" /></sup>'
    : "");

let linksMenu = document.querySelectorAll(".linkDoCurso");
for (let i in linksMenu) {
  linksMenu[i].href += "?curso=" + curso.id;
}

if (permissaoUsuario != 0) btnAdicionar.style.display = "none";

// --------------------------------------------------------------
// Mostra a tabela de competências do curso
// --------------------------------------------------------------
let mostraTabela = function () {
  corpoTabela.innerHTML = "";
  let competencias = dbCompetencias_Cursos.competencias(curso.id);
  competencias.sort((a, b) => a.codigo.localeCompare(b.codigo));
  competencias = competencias.map((c) => ({
    codigo: c.codigo,
    ...dbCompetencias.competencia(c.id),
  }));
  competencias.forEach((competencia) => {
    corpoTabela.innerHTML += `
    <tr>
      <td>${competencia.codigo}</td>
      <td>${competencia.nome}</td>
      <td class="clicavel">
        <span class="simbolo" 
          onclick="exibeCompetencia('${competencia.id}')"
          title="Visualizar">
          <img src="./imagens/visibility.svg" />
        </span>
        ${
          permissaoUsuario == 0
            ? `
        <span class="simbolo" 
          onclick="editaCompetencia('${competencia.id}')"
          title="Editar">
          <img src="./imagens/edit.svg" />
        </span>
        <span class="simbolo" 
          onclick="removeCompetencia('${competencia.id}')"
          title="Remover">
          <img src="./imagens/close.svg" />
        </span>`
            : ""
        }
      </td>
    </tr>
  `;
  });
};

// --------------------------------------------------------------
// Exibe o modal para visualização dos dados da competência
// --------------------------------------------------------------
let exibeCompetencia = function (id) {
  let competencia = dbCompetencias.competencia(id);
  nomeModalExibeCompetencia.value = competencia.nome;
  codigoModalExibeCompetencia.value = dbCompetencias_Cursos.codigo(
    id,
    curso.id
  );
  descricaoModalExibeCompetencia.value = competencia.descricao;

  cursosModalExibeCompetencia.innerHTML = dbCompetencias_Cursos
    .cursos(id)
    .map((elem) => dbCursos.curso(elem.id).nome)
    .sort((a, b) => a.localeCompare(b))
    .map((elem) => `<tr><td>${elem}</td></tr>`)
    .join("\n");

  /*
  cursosModalExibeCompetencia.value = dbCompetencias_Cursos
    .cursos(id)
    .map((elem) => dbCursos.curso(elem.id).nome)
    .sort((a, b) => a.localeCompare(b))
    .join("\n");
*/

  let componentesCompetencias = dbComponentesCompetencias_Competencias
    .componentesCompetencia(id)
    .map((idComponenteCompetencia) =>
      dbComponentesCompetencias.componenteCompetencias(idComponenteCompetencia)
    );
  conhecimentosModalExibeCompetencia.innerHTML = componentesCompetencias
    .filter((c) => c.tipo == 0)
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .map(
      (elem) =>
        `<tr><td>${elem.nome}</td><td>${dbAreas.area(elem.area).nome}</td></tr>`
    )
    .join("");
  habilidadesModalExibeCompetencia.innerHTML = componentesCompetencias
    .filter((c) => c.tipo == 1)
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .map(
      (elem) =>
        `<tr><td>${elem.nome}</td><td>${dbAreas.area(elem.area).nome}</td></tr>`
    )
    .join("");
  atitudesModalExibeCompetencia.innerHTML = componentesCompetencias
    .filter((c) => c.tipo == 2)
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .map(
      (elem) =>
        `<tr><td>${elem.nome}</td><td>${dbAreas.area(elem.area).nome}</td></tr>`
    )
    .join("");

  modalExibeCompetencia.showModal();

  nomeModalExibeCompetencia.style.height = "auto";
  nomeModalExibeCompetencia.style.height =
    nomeModalExibeCompetencia.scrollHeight + 10 + "px";

  descricaoModalExibeCompetencia.style.height = "auto";
  descricaoModalExibeCompetencia.style.height =
    descricaoModalExibeCompetencia.scrollHeight + 10 + "px";
  nomeModalExibeCompetencia.focus();
};

// --------------------------------------------------------------
// Exibe o modal para edição dos dados da competência
// --------------------------------------------------------------
// Testa se há mais cursos vinculados a esta competência
let editaCompetencia = function (id) {
  let n = dbCompetencias_Cursos.cursos(id).length;
  if (n == 1) {
    editaCompetenciaContinuacao(id);
  } else {
    alerta(
      (n == 2
        ? "Existe <strong>mais 1 curso</strong> vinculado"
        : `Existem <strong>mais ${n - 1} cursos</strong> vinculados`) +
        " a esta competência. As alterações feitas aqui valerão para todos os cursos. Apenas o campo código é específico deste curso.",
      () => editaCompetenciaContinuacao(id)
    );
  }
};

// Mostra o modal
let editaCompetenciaContinuacao = function (id) {
  let competencia = dbCompetencias.competencia(id);
  nomeModalEditaCompetencia.value = competencia.nome;
  codigoModalEditaCompetencia.value = dbCompetencias_Cursos.codigo(
    id,
    curso.id
  );
  descricaoModalEditaCompetencia.value = competencia.descricao;
  btnFecharEdicao.onclick = () => salvar(competencia);
  modalEditaCompetencia.showModal();
  nomeModalEditaCompetencia.focus();
};

// Salva as alterações
let salvar = function (competencia) {
  if (
    nomeModalEditaCompetencia.value.length == 0 ||
    codigoModalEditaCompetencia.value.length == 0
  ) {
    erro("Nenhum campo pode ficar vazio.");
    return;
  }
  competencia.nome = nomeModalEditaCompetencia.value;
  competencia.descricao = descricaoModalEditaCompetencia.value;
  dbCompetencias.update(competencia);

  dbCompetencias_Cursos.update({
    idCompetencia: competencia.id,
    idCurso: curso.id,
    codigo: codigoModalEditaCompetencia.value,
  });

  modalEditaCompetencia.close();
  mostraTabela();
};

// --------------------------------------------------------------
// Exibe o modal para criação de uma nova competência
// --------------------------------------------------------------
let criaCompetencia = function () {
  nomeModalCriaCompetencia.value = "";
  codigoModalCriaCompetencia.value = "";
  descricaoModalCriaCompetencia.value = "";
  btnFecharCriacao.onclick = () => adicionar();
  modalCriaCompetencia.showModal();
  nomeModalCriaCompetencia.focus();
};

// Grava a nova competência
let adicionar = function () {
  if (
    nomeModalCriaCompetencia.value.length == 0 ||
    codigoModalCriaCompetencia.value.length == 0
  ) {
    erro("Nenhum campo pode ficar vazio.");
    return;
  }
  let novaCompetencia = {
    nome: nomeModalCriaCompetencia.value,
    descricao: descricaoModalCriaCompetencia.value,
  };
  id = dbCompetencias.create(novaCompetencia);

  dbCompetencias_Cursos.create({
    idCompetencia: id,
    idCurso: curso.id,
    codigo: codigoModalCriaCompetencia.value,
  });

  modalCriaCompetencia.close();
  mostraTabela();
};

// --------------------------------------------------------------
// Pesquisa competências
// --------------------------------------------------------------
let pesquisaCompetencias = function () {
  // Recupera as competência dos cursos aos quais o usuário tem acesso
  let cursosDoUsuario = dbCursos_Usuarios.cursosUsuario(usuarioLogado.id);
  let competencias = [];
  let i, j;
  for (let i in cursosDoUsuario) {
    let competenciasDoCurso = dbCompetencias_Cursos.competencias(
      cursosDoUsuario[i].id
    );
    for (let j in competenciasDoCurso) {
      let k = competencias.findIndex((c) => c.id == competenciasDoCurso[j].id);
      if (k == -1)
        competencias.push({
          id: competenciasDoCurso[j].id,
          cursos: [cursosDoUsuario[i].id],
        });
      else competencias[k].cursos.push(cursosDoUsuario[i].id);
    }
  }

  competencias = competencias
    .map((c) => ({
      ...dbCompetencias.competencia(c.id),
      cursos: c.cursos,
    }))
    .sort((a, b) => a.nome.localeCompare(b.nome));

  filtroCursos.innerHTML =
    '<option value="-1">Todos</option>' +
    cursosDoUsuario
      .map((c) => dbCursos.curso(c.id))
      .sort((a, b) => a.nome.localeCompare(b.nome))
      .map((c) => `<option value=${c.id}>${c.nome}</option>`)
      .join("");
  filtroCursos.onchange = () => aplicaFiltros(competencias);

  filtroTexto.value = "";
  filtroTexto.oninput = () => aplicaFiltros(competencias);

  mostraTabelaPesquisa(competencias);
  modalPesquisaCompetencia.showModal();
  filtroTexto.focus();
};

// Mostra a tabela de pesquisa de competências
let mostraTabelaPesquisa = function (competencias) {
  tabelaPesquisaCompetencias.innerHTML = "";
  competencias.forEach((competencia) => {
    tabelaPesquisaCompetencias.innerHTML += `
    <tr>
      <td>${competencia.nome}</td>
      <td class="clicavel">
        <span class="simbolo" 
          onclick="exibeCompetencia('${competencia.id}')"
          title="Visualizar">
          <img src="./imagens/visibility.svg" />
        </span>
        <span class="simbolo" 
          onclick="importaCompetencia('${competencia.id}')"
          title="Importar">
          <img src="./imagens/download.svg" />
        </span>
      </td>
    </tr>
  `;
  });
};

// Filtro de competências
let aplicaFiltros = function (competencias) {
  let condicaoCurso = (cursos) =>
    filtroCursos.value == -1
      ? true
      : cursos.indexOf(parseInt(filtroCursos.value)) != -1;
  let condicaoTexto = (nome) =>
    filtroTexto.value.length == 0
      ? true
      : desacentua(filtroTexto.value)
          .split(" ")
          .reduce((acc, val) => acc && desacentua(nome).includes(val), true);

  let competenciasFiltradas = competencias.filter(
    (c) => condicaoCurso(c.cursos) && condicaoTexto(c.nome)
  );
  mostraTabelaPesquisa(competenciasFiltradas);
};

// Importa a competência
let importaCompetencia = function (idCompetencia) {
  // Testa se a competência já existe
  if (
    dbCompetencias_Cursos
      .competencias(curso.id)
      .findIndex((c) => c.id == idCompetencia) != -1
  ) {
    erro("Essa competência já faz parte do seu curso");
  } else {
    dbCompetencias_Cursos.create({
      idCompetencia: idCompetencia,
      idCurso: curso.id,
      codigo: "",
    });
    alerta(
      "Competência vinculada ao curso. Na próxima tela, informe o código que será usado neste curso.<br/><br/>Alterações nos demais campos afetarão todos os cursos vinculados a esta competência.",
      function () {
        editaCompetenciaContinuacao(idCompetencia);
        codigoModalEditaCompetencia.focus();
      }
    );
    modalPesquisaCompetencia.close();
    modalCriaCompetencia.close();
  }
};

// --------------------------------------------------------------
// Remove a competência deste curso
// --------------------------------------------------------------
let removeCompetencia = function (id) {
  let competencia = dbCompetencias.competencia(id);
  let codigo = dbCompetencias_Cursos.codigo(id, curso.id);
  codigoModalRemoveCompetencia.innerHTML = codigo;
  nomeModalRemoveCompetencia.innerHTML = competencia.nome;

  btnFecharRemocao.onclick = () => remover(id);
  modalRemoveCompetencia.showModal();
  nomeModalRemoveCompetencia.style.height = "auto";
  nomeModalRemoveCompetencia.style.height =
    nomeModalRemoveCompetencia.scrollHeight + 10 + "px";
  btnFecharRemocao.focus();
  btnFecharRemocao.focus();
};
// Remove a competência
let remover = function (idCompetencia) {
  dbCompetencias_Cursos.delete(idCompetencia, curso.id);
  modalRemoveCompetencia.close();
  mostraTabela();
};

// --------------------------------------------------------------
// Funções auxiliares
// --------------------------------------------------------------
// Mostra o modal de alerta
let alerta = function (mensagem, fn) {
  mensagemAlerta.innerHTML = mensagem;
  modalAlerta.showModal();
  btnOkAlerta.onclick = () => {
    modalAlerta.close();
    fn();
  };
  btnOkAlerta.focus();
};

// Mostra o modal de erro
let erro = function (mensagem) {
  mensagemErro.innerHTML = mensagem;
  modalErro.showModal();
  btnOkErro.focus();
};

// Atribui funcionalidade aos elementos das janelas modais
btnAdicionar.onclick = () => criaCompetencia();
btnPesquisar.onclick = () => pesquisaCompetencias();
iconeFecharExibicao.onclick = () => modalExibeCompetencia.close();
btnFecharExibicao.onclick = () => modalExibeCompetencia.close();
iconeFecharEdicao.onclick = () => modalEditaCompetencia.close();
btnCancelarEdicao.onclick = () => modalEditaCompetencia.close();
iconeFecharCriacao.onclick = () => modalCriaCompetencia.close();
btnCancelarCriacao.onclick = () => modalCriaCompetencia.close();
iconeFecharPesquisa.onclick = () => modalPesquisaCompetencia.close();
btnFecharPesquisa.onclick = () => modalPesquisaCompetencia.close();
iconeFecharRemocao.onclick = () => modalRemoveCompetencia.close();
btnCancelarRemocao.onclick = () => modalRemoveCompetencia.close();
btnOkErro.onclick = () => modalErro.close();

// Testes de validade dos campos
nomeModalEditaCompetencia.oninput = function () {
  nomeModalEditaCompetencia.setAttribute(
    "aria-invalid",
    nomeModalEditaCompetencia.value.length == 0
  );
};
codigoModalEditaCompetencia.oninput = function () {
  codigoModalEditaCompetencia.setAttribute(
    "aria-invalid",
    codigoModalEditaCompetencia.value.length == 0
  );
};

// Mostra a tabela de competências
mostraTabela();
