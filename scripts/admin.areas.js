// --------------------------------------------------------------
// Mostra a tabela de áreas
// --------------------------------------------------------------
let mostraTabela = function () {
  dadosAreas.innerHTML = "";
  let areas = areasService.areas();
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
  let area = areasService.area(id);
  nomeModalExibeArea.value = area.nome;
  nomeModalExibeArea.disabled = true;

  cursosModalExibeArea.value = cursosService
    .cursosDaArea(id)
    .map((elem) => elem.nome)
    .sort((a, b) => a.localeCompare(b))
    .join("\n");
  cursosModalExibeArea.disabled = true;

  modalExibeArea.showModal();
  btnFechar2.focus();
};

// --------------------------------------------------------------
// Exibe o modal para edição dos dados da área
// --------------------------------------------------------------
let editaArea = function (id) {
  let area = areasService.area(id);
  nomeModalArea.value = area.nome;
  nomeModalArea.disabled = false;

  btnCancelar.style.display = "block";
  btnFechar.innerHTML = "Salvar";
  btnFechar.onclick = () => {
    salvar(area);
    modalArea.close();
  };
  tituloModal.innerHTML = "Área de Conhecimento";
  modalArea.showModal();
  nomeModalArea.focus();
};

// --------------------------------------------------------------
// Salva os dados editados pelo usuário
// --------------------------------------------------------------
let salvar = function (area) {
  if (nomeModalArea.value.length == 0) {
    erro("Nenhum campo pode ficar vazio.");
    return;
  }
  area.nome = nomeModalArea.value;
  areasService.update(area);

  mostraTabela();
};

// --------------------------------------------------------------
// Exibe o modal para inclusão de uma nova área
// --------------------------------------------------------------
let criaArea = function () {
  nomeModalArea.value = "";
  nomeModalArea.disabled = false;

  btnCancelar.style.display = "block";
  btnFechar.innerHTML = "Adicionar";
  btnFechar.onclick = () => {
    adicionar();
  };

  tituloModal.innerHTML = "Nova Área de Conhecimento";
  modalArea.showModal();
  nomeModalArea.focus();
};

// --------------------------------------------------------------
// Inclui uma nova área
// --------------------------------------------------------------
let adicionar = function () {
  if (nomeModalArea.value.length == 0) {
    erro("Nenhum campo pode ficar vazio.");
    return;
  }
  let area = {
    nome: nomeModalArea.value,
  };
  areasService.create(area);
  modalArea.close();
  mostraTabela();
};

// --------------------------------------------------------------
// Exibe o modal para confirmar a exclusão da área
// --------------------------------------------------------------
let apagaArea = function (id) {
  let cursosDaArea = cursosService.cursosDaArea(id);
  if (cursosDaArea.length > 0) {
    erro(
      "Existem cursos vinculados a esta área. Altere os cursos dessa área antes de excluí-la."
    );
    return;
  }

  let area = areasService.area(id);
  areaAExcluir.innerHTML = area.nome;

  btnExcluir.onclick = () => excluir(id);
  modalDeleteArea.showModal();
  btnExcluir.focus();
};

// --------------------------------------------------------------
// Apaga a área
// --------------------------------------------------------------
let excluir = function (id) {
  areasService.delete(id);
  modalDeleteArea.close();
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

// Atribui funcionalidade aos elementos das janelas modais
btnAdicionar.onclick = () => criaArea();
iconeFechar.onclick = () => modalArea.close();
iconeFechar2.onclick = () => modalExibeArea.close();
iconeFechar3.onclick = () => modalErro.close();
iconeFechar4.onclick = () => modalDeleteArea.close();
btnCancelar.onclick = () => modalArea.close();
btnCancelar3.onclick = () => modalDeleteArea.close();
btnFechar2.onclick = () => modalExibeArea.close();
btnOk.onclick = () => modalErro.close();

// Testes de validade dos campos
nomeModalArea.oninput = function () {
  nomeModalArea.setAttribute("aria-invalid", nomeModalArea.value.length == 0);
};

// Mostra a tabela de usuários
mostraTabela();
