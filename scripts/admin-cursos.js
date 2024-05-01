// --------------------------------------------------------------
// Mostra a tabela de cursos
// --------------------------------------------------------------
let mostraTabela = function () {
  let arquivados = chkArquivados.checked;
  dadosCursos.innerHTML = "";
  let cursos = dbCursos.cursos();
  cursos.sort((a, b) => a.nome.localeCompare(b.nome));
  cursos.forEach((curso) => {
    if (arquivados || (!arquivados && curso.status != 0)) {
      dadosCursos.innerHTML += `
    <tr${curso.status == 0 ? ' class="arquivado"' : ""}>
      <td>${curso.nome}</td>
      <td>${graus[curso.grau]}</td>
      <td>${modalidades[curso.modalidade]}</td>
      <td>${curso.versao}</td>
      <td>${curso.ano}</td>
      <td class="clicavel">
        <span class="simbolo" 
          onclick="exibeCurso('${curso.id}')"
          title="Visualizar">
          <img src="./imagens/visibility.svg" />
        </span>
        ${
          curso.status != 0
            ? `
        <span class="simbolo" 
          onclick="editaCurso('${curso.id}')"
          title="Editar">
          <img src="./imagens/edit.svg" />
        </span>
        <span class="simbolo" 
          onclick="arquivaCurso('${curso.id}')"
          title="Arquivar">
          <img src="./imagens/archive.svg" />
        </span>`
            : ""
        }
      </td>
    </tr>
  `;
    }
  });
};

// --------------------------------------------------------------
// Exibe o modal para visualização dos dados do curso
// --------------------------------------------------------------
let exibeCurso = function (id) {
  let curso = dbCursos.curso(id);
  nomeModalExibeCurso.value = curso.nome;
  semestresModalExibeCurso.value = curso.semestres;
  grauModalExibeCurso.value = graus[curso.grau];
  modalidadeModalExibeCurso.value = modalidades[curso.modalidade];
  areaModalExibeCurso.value = dbAreas.area(curso.idarea).nome;
  versaoModalExibeCurso.value = curso.versao;
  anoModalExibeCurso.value = curso.ano;
  observacoesModalExibeCurso.value = curso.observacoes;

  btnFecharExibicao.onclick = () => modalExibeCurso.close();
  modalExibeCurso.showModal();
  btnFecharExibicao.focus();
};

// --------------------------------------------------------------
// Exibe o modal para edição dos dados do curso
// --------------------------------------------------------------
let editaCurso = function (id) {
  let curso = dbCursos.curso(id);
  nomeModalEditaCurso.value = curso.nome;
  semestresModalEditaCurso.value = curso.semestres;
  grauModalEditaCurso.innerHTML = graus
    .map(
      (t, i) =>
        `<option value=${i} ${curso.grau == i ? "selected" : ""}>${t}</option>`
    )
    .join("");
  modalidadeModalEditaCurso.innerHTML = modalidades
    .map(
      (t, i) =>
        `<option value=${i} ${
          curso.modalidade == i ? "selected" : ""
        }>${t}</option>`
    )
    .join("");
  areaModalEditaCurso.innerHTML = dbAreas
    .areas()
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .map(
      (elem) =>
        `<option value=${elem.id} ${
          curso.idArea == elem.id ? "selected" : ""
        }>${elem.nome}</option>`
    )
    .join("");
  versaoModalEditaCurso.value = curso.versao;
  anoModalEditaCurso.value = curso.ano;
  observacoesModalEditaCurso.value = curso.observacoes;

  btnFecharEdicao.onclick = () => {
    salvar(curso);
    modalEditaCurso.close();
  };

  modalEditaCurso.showModal();
  nomeModalEditaCurso.focus();
};

// --------------------------------------------------------------
// Salva os dados editados pelo curso
// --------------------------------------------------------------
let salvar = function (curso, cursos) {
  if (
    nomeModalEditaCurso.value.length == 0 ||
    semestresModalEditaCurso.value.length == 0
  ) {
    erro("Nenhum campo pode ficar vazio.");
    return;
  }

  curso.nome = nomeModalEditaCurso.value;
  curso.semestres = semestresModalEditaCurso.value;
  curso.grau = grauModalEditaCurso.value;
  curso.modalidade = modalidadeModalEditaCurso.value;
  curso.idArea = areaModalEditaCurso.value;
  curso.versao = versaoModalEditaCurso.value;
  curso.ano = anoModalEditaCurso.value;
  curso.observacoes = observacoesModalEditaCurso.value;
  dbCursos.update(curso);

  mostraTabela();
};

// --------------------------------------------------------------
// Exibe o modal para criação de um novo curso
// --------------------------------------------------------------
let criaCurso = function () {
  grauModalCriaCurso.innerHTML = graus
    .map((t, i) => `<option value=${i}>${t}</option>`)
    .join("");
  modalidadeModalCriaCurso.innerHTML = modalidades
    .map((t, i) => `<option value=${i}>${t}</option>`)
    .join("");
  areaModalCriaCurso.innerHTML = dbAreas
    .areas()
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .map((elem) => `<option value=${elem.id}>${elem.nome}</option>`)
    .join("");
  nomeModalCriaCurso.value = "";
  semestresModalCriaCurso.value = 8;
  grauModalCriaCurso.value = 0;
  modalidadeModalCriaCurso.value = 0;
  versaoModalCriaCurso.value = 1;
  anoModalCriaCurso.value = new Date().getFullYear();
  observacoesModalCriaCurso.value = "";

  btnFecharCriacao.onclick = () => {
    adicionar();
  };
  modalCriaCurso.showModal();
  nomeModalCriaCurso.focus();
};

// --------------------------------------------------------------
// Inclui um novo curso
// --------------------------------------------------------------
let adicionar = function () {
  if (
    nomeModalCriaCurso.value.length == 0 ||
    semestresModalCriaCurso.value.length == 0
  ) {
    erro("Nenhum campo pode ficar vazio.");
    return;
  }

  let curso = {
    nome: nomeModalCriaCurso.value,
    semestres: semestresModalCriaCurso.value,
    modalidade: modalidadeModalCriaCurso.value,
    grau: grauModalCriaCurso.value,
    idArea: areaModalCriaCurso.value,
    versao: versaoModalCriaCurso.value,
    ano: anoModalCriaCurso.value,
    observacoes: observacoesModalCriaCurso.value,
    status: 1,
  };
  dbCursos.create(curso);
  modalCriaCurso.close();
  mostraTabela();
};

// --------------------------------------------------------------
// Exibe o modal para confirmar a arquivamento do curso
// --------------------------------------------------------------
let arquivaCurso = function (id) {
  let curso = dbCursos.curso(id);
  cursoAArquivar.innerHTML = curso.nome;

  btnArquivar4.onclick = () => arquivar(id);
  modalArquivaCurso.showModal();
  btnArquivar4.focus();
};

// --------------------------------------------------------------
// Arquiva o curso e remove seus usuários
// --------------------------------------------------------------
let arquivar = function (id) {
  dbCursos.archive(id);
  dbCursos_Usuarios.deleteCurso(id);
  modalArquivaCurso.close();
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

// Atribui funcionalidade aos elementos das janelas modais
btnAdicionar.onclick = () => criaCurso();
iconeFecharExibicao.onclick = () => modalExibeCurso.close();
iconeFecharEdicao.onclick = () => modalEditaCurso.close();
iconeFecharCriacao.onclick = () => modalCriaCurso.close();
iconeFecharExclusao.onclick = () => modalArquivaCurso.close();
iconeFecharErro.onclick = () => modalErro.close();
btnCancelar2.onclick = () => modalEditaCurso.close();
btnCancelar3.onclick = () => modalCriaCurso.close();
btnCancelar4.onclick = () => modalArquivaCurso.close();
btnOkErro.onclick = () => modalErro.close();

// Testes de validade dos campos
nomeModalEditaCurso.oninput = function () {
  nomeModalEditaCurso.setAttribute(
    "aria-invalid",
    nomeModalEditaCurso.value.length == 0
  );
};
semestresModalEditaCurso.oninput = function () {
  semestresModalEditaCurso.setAttribute(
    "aria-invalid",
    semestresModalEditaCurso.value.length == 0
  );
};
versaoModalEditaCurso.oninput = function () {
  versaoModalEditaCurso.setAttribute(
    "aria-invalid",
    versaoModalEditaCurso.value.length == 0
  );
};
anoModalEditaCurso.oninput = function () {
  anoModalEditaCurso.setAttribute(
    "aria-invalid",
    anoModalEditaCurso.value.length == 0
  );
};

nomeModalCriaCurso.oninput = function () {
  nomeModalCriaCurso.setAttribute(
    "aria-invalid",
    nomeModalCriaCurso.value.length == 0
  );
};
semestresModalCriaCurso.oninput = function () {
  semestresModalCriaCurso.setAttribute(
    "aria-invalid",
    semestresModalCriaCurso.value.length == 0
  );
};
versaoModalCriaCurso.oninput = function () {
  versaoModalCriaCurso.setAttribute(
    "aria-invalid",
    versaoModalCriaCurso.value.length == 0
  );
};
anoModalCriaCurso.oninput = function () {
  anoModalCriaCurso.setAttribute(
    "aria-invalid",
    anoModalCriaCurso.value.length == 0
  );
};

// Mostra a tabela de cursos
chkArquivados.onchange = () => mostraTabela();
mostraTabela();
