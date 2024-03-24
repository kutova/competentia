// --------------------------------------------------------------
// Mostra a tabela de cursos
// --------------------------------------------------------------
let mostraTabela = function () {
  dadosCursos.innerHTML = "";
  let cursos = cursosService.cursos();
  cursos.sort((a, b) => a.nome.localeCompare(b.nome));
  cursos.forEach((curso) => {
    dadosCursos.innerHTML += `
    <tr>
      <td>${curso.nome}</td>
      <td>${graus[curso.grau]}</td>
      <td>${modalidades[curso.modalidade]}</td>
      <td class="clicavel">
        <span class="simbolo" onclick="exibeCurso('${curso.id}')">
          <img src="./imagens/visibility.svg" />
        </span>
        <span class="simbolo" onclick="editaCurso('${curso.id}')">
          <img src="./imagens/edit.svg" />
        </span>
        <span class="simbolo" onclick="apagaCurso('${curso.id}')">
          <img src="./imagens/delete.svg" />
        </span>
      </td>
    </tr>
  `;
  });
};

// --------------------------------------------------------------
// Exibe o modal para visualização dos dados do curso
// --------------------------------------------------------------
let exibeCurso = function (id) {
  let curso = cursosService.curso(id);
  nomeModalCurso.value = curso.nome;
  periodosModalCurso.value = curso.periodos;

  grauModalCurso.innerHTML = graus
    .map(
      (t, i) =>
        `<option value=${i} ${curso.grau == i ? "selected" : ""}>${t}</option>`
    )
    .join();
  modalidadeModalCurso.innerHTML = modalidades
    .map(
      (t, i) =>
        `<option value=${i} ${
          curso.modalidade == i ? "selected" : ""
        }>${t}</option>`
    )
    .join();
  areaModalCurso.innerHTML = `<option value=${curso.area}>
  ${areasService.area(curso.area).nome}</option>`;

  nomeModalCurso.disabled = true;
  periodosModalCurso.disabled = true;
  grauModalCurso.disabled = true;
  modalidadeModalCurso.disabled = true;
  areaModalCurso.disabled = true;

  btnCancelar.style.display = "none";
  btnFechar.onclick = () => modalCurso.close();
  btnFechar.innerHTML = "Fechar";

  tituloModal.innerHTML = "Curso";
  modalCurso.showModal();
  btnFechar.focus();
};

// --------------------------------------------------------------
// Exibe o modal para edição dos dados do curso
// --------------------------------------------------------------
let editaCurso = function (id) {
  let curso = cursosService.curso(id);
  nomeModalCurso.value = curso.nome;
  periodosModalCurso.value = curso.periodos;
  grauModalCurso.innerHTML = graus
    .map(
      (t, i) =>
        `<option value=${i} ${curso.grau == i ? "selected" : ""}>${t}</option>`
    )
    .join();
  modalidadeModalCurso.innerHTML = modalidades
    .map(
      (t, i) =>
        `<option value=${i} ${
          curso.modalidade == i ? "selected" : ""
        }>${t}</option>`
    )
    .join();
  areaModalCurso.innerHTML = areasService
    .areas()
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .map(
      (elem) =>
        `<option value=${elem.id} ${curso.area == elem.id ? "selected" : ""}>${
          elem.nome
        }</option>`
    )
    .join();

  nomeModalCurso.disabled = false;
  periodosModalCurso.disabled = false;
  grauModalCurso.disabled = false;
  modalidadeModalCurso.disabled = false;
  areaModalCurso.disabled = false;

  btnCancelar.style.display = "block";
  btnFechar.innerHTML = "Salvar";
  btnFechar.onclick = () => {
    salvar(curso);
    modalCurso.close();
  };

  tituloModal.innerHTML = "Curso";
  modalCurso.showModal();
  nomeModalCurso.focus();
};

// --------------------------------------------------------------
// Salva os dados editados pelo curso
// --------------------------------------------------------------
let salvar = function (curso, cursos) {
  if (
    nomeModalCurso.value.length == 0 ||
    periodosModalCurso.value.length == 0
  ) {
    erro("Nenhum campo pode ficar vazio.");
    return;
  }

  curso.nome = nomeModalCurso.value;
  curso.periodos = periodosModalCurso.value;
  curso.grau = grauModalCurso.value;
  curso.modalidade = modalidadeModalCurso.value;
  curso.area = areaModalCurso.value;
  cursosService.update(curso);

  mostraTabela();
};

// --------------------------------------------------------------
// Exibe o modal para criação de um novo curso
// --------------------------------------------------------------
let criaCurso = function () {
  grauModalCurso.innerHTML = graus
    .map((t, i) => `<option value=${i}>${t}</option>`)
    .join();
  modalidadeModalCurso.innerHTML = modalidades
    .map((t, i) => `<option value=${i}>${t}</option>`)
    .join();
  areaModalCurso.innerHTML = areasService
    .areas()
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .map((elem) => `<option value=${elem.id}>${elem.nome}</option>`)
    .join();
  nomeModalCurso.value = "";
  periodosModalCurso.value = 8;
  grauModalCurso.value = 0;
  modalidadeModalCurso.value = 0;

  btnCancelar.style.display = "block";
  btnFechar.innerHTML = "Adicionar";
  btnFechar.onclick = () => {
    adicionar();
  };
  tituloModal.innerHTML = "Novo Curso";
  modalCurso.showModal();
  nomeModalCurso.focus();
};

// --------------------------------------------------------------
// Inclui um novo curso
// --------------------------------------------------------------
let adicionar = function () {
  if (
    nomeModalCurso.value.length == 0 ||
    periodosModalCurso.value.length == 0
  ) {
    erro("Nenhum campo pode ficar vazio.");
    return;
  }

  let curso = {
    nome: nomeModalCurso.value,
    periodos: periodosModalCurso.value,
    modalidade: modalidadeModalCurso.value,
    grau: grauModalCurso.value,
    area: areaModalCurso.value,
  };
  cursosService.create(curso);
  modalCurso.close();
  mostraTabela();
};

// --------------------------------------------------------------
// Exibe o modal para confirmar a exclusão do curso
// --------------------------------------------------------------
let apagaCurso = function (id) {
  let curso = cursosService.curso(id);
  cursoAExcluir.innerHTML = curso.nome;

  btnExcluir.onclick = () => excluir(id);
  modalDeleteCurso.showModal();
  btnExcluir.focus();
};

// --------------------------------------------------------------
// Apaga o curso e seus cursos
// --------------------------------------------------------------
let excluir = function (id) {
  cursosService.delete(id);
  cursosUsuariosService.deleteCurso(id);
  erro("Falta implementar a exclusão de competências e outros dados");
  modalDeleteCurso.close();
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
btnAdicionar.onclick = () => criaCurso();
iconeFechar.onclick = () => modalCurso.close();
iconeFechar3.onclick = () => modalErro.close();
iconeFechar4.onclick = () => modalDeleteCurso.close();
btnCancelar.onclick = () => modalCurso.close();
btnCancelar3.onclick = () => modalDeleteCurso.close();
btnOk.onclick = () => modalErro.close();

// Testes de validade dos campos
nomeModalCurso.oninput = function () {
  nomeModalCurso.setAttribute("aria-invalid", nomeModalCurso.value.length == 0);
};
periodosModalCurso.oninput = function () {
  periodosModalCurso.setAttribute(
    "aria-invalid",
    periodosModalCurso.value.length == 0
  );
};

// Mostra a tabela de cursos
mostraTabela();
