// --------------------------------------------------------------
// Mostra a tabela de áreas
// --------------------------------------------------------------
let mostraTabela = function () {
  dadosAreas.innerHTML = "";
  let areas = dbAreas.areas();
  areas.sort((a, b) => a.nome.localeCompare(b.nome));
  areas.forEach((area) => {
    dadosAreas.innerHTML += `
    <tr>
      <td>${area.nome}</td>
      <td class="clicavel">
        <span class="simbolo" 
          onclick="exibeArea('${area.id}')"
          title="Exibe os cursos da área">
          <img src="./imagens/visibility.svg" />
        </span>
        <span class="simbolo" 
          onclick="editaArea('${area.id}')"
          title="Edita o nome da área">
          <img src="./imagens/edit.svg" />
        </span>
        <span class="simbolo" 
          onclick="apagaArea('${area.id}')"
          title="Exclui a área, se não tiver cursos">
          <img src="./imagens/delete.svg" />
        </span>
      </td>
    </tr>
  `;
  });
};

// --------------------------------------------------------------
// Exibe o modal para visualização dos dados da área
// --------------------------------------------------------------
let exibeArea = function (id) {
  let area = dbAreas.area(id);
  nomeModalExibeArea.value = area.nome;
  nomeModalExibeArea.readOnly = true;

  cursosModalExibeArea.value = dbCursos
    .cursosDaArea(id)
    .map((elem) => elem.nome)
    .sort((a, b) => a.localeCompare(b))
    .join("\n");

  modalExibeArea.showModal();
  btnFecharExibicao.focus();
};

// --------------------------------------------------------------
// Exibe o modal para edição dos dados da área
// --------------------------------------------------------------
let editaArea = function (id) {
  let area = dbAreas.area(id);
  nomeModalEditaArea.value = area.nome;

  btnFecharEdicao.onclick = () => {
    salvar(area);
    modalEditaArea.close();
  };
  modalEditaArea.showModal();
  nomeModalEditaArea.focus();
};

// --------------------------------------------------------------
// Salva os dados editados pelo usuário
// --------------------------------------------------------------
let salvar = function (area) {
  if (nomeModalEditaArea.value.length == 0) {
    erro("Nenhum campo pode ficar vazio.");
    return;
  }
  area.nome = nomeModalEditaArea.value;
  dbAreas.update(area);

  mostraTabela();
};

// --------------------------------------------------------------
// Exibe o modal para inclusão de uma nova área
// --------------------------------------------------------------
let criaArea = function () {
  nomeModalCriaArea.value = "";
  nomeModalCriaArea.readOnly = false;

  btnFecharCriacao.onclick = () => {
    adicionar();
  };

  modalCriaArea.showModal();
  nomeModalCriaArea.focus();
};

// --------------------------------------------------------------
// Inclui uma nova área
// --------------------------------------------------------------
let adicionar = function () {
  if (nomeModalCriaArea.value.length == 0) {
    erro("Nenhum campo pode ficar vazio.");
    return;
  }
  let area = {
    nome: nomeModalCriaArea.value,
  };
  dbAreas.create(area);
  modalCriaArea.close();
  mostraTabela();
};

// --------------------------------------------------------------
// Exibe o modal para confirmar a exclusão da área
// --------------------------------------------------------------
let apagaArea = function (id) {
  let cursosDaArea = dbCursos.cursosDaArea(id);
  if (cursosDaArea.length > 0) {
    erro(
      "Existem cursos vinculados a esta área. Altere os cursos dessa área antes de excluí-la."
    );
    return;
  }

  let area = dbAreas.area(id);
  areaAExcluir.innerHTML = area.nome;

  btnExcluir.onclick = () => excluir(id);
  modalApagaArea.showModal();
  btnExcluir.focus();
};

// --------------------------------------------------------------
// Apaga a área
// --------------------------------------------------------------
let excluir = function (id) {
  dbAreas.delete(id);
  modalApagaArea.close();
  mostraTabela();
};

// --------------------------------------------------------------
// Funções auxiliares
// --------------------------------------------------------------
// Mostra o modal de erro
let erro = function (mensagem) {
  mensagemErro.innerHTML = mensagem;
  modalErro.showModal();
  btnOkErro.focus();
};

// Testes de validade dos campos
nomeModalEditaArea.oninput = function () {
  nomeModalEditaArea.setAttribute(
    "aria-invalid",
    nomeModalEditaArea.value.length == 0
  );
};
nomeModalCriaArea.oninput = function () {
  nomeModalCriaArea.setAttribute(
    "aria-invalid",
    nomeModalCriaArea.value.length == 0
  );
};

// Atribui funcionalidade aos elementos das janelas modais
btnAdicionar.onclick = () => criaArea();
iconeFecharExibicao.onclick = () => modalExibeArea.close();
iconeFecharEdicao.onclick = () => modalEditaArea.close();
iconeFecharCriacao.onclick = () => modalErro.close();
iconeFecharExclusao.onclick = () => modalApagaArea.close();
btnFecharExibicao.onclick = () => modalExibeArea.close();
btnCancelar2.onclick = () => modalEditaArea.close();
btnCancelar3.onclick = () => modalCriaArea.close();
btnCancelar4.onclick = () => modalApagaArea.close();
btnOkErro.onclick = () => modalErro.close();

// Mostra a tabela de usuários
mostraTabela();
