// --------------------------------------------------------------
// Identifica o curso a partir do URL, atualiza o título da
// página e os links do menu lateral
// --------------------------------------------------------------
curso = carregaCursoDoURL();
nomeCurso.innerHTML =
  curso.nome +
  (curso.status == 1
    ? ' <sup><img src="./imagens/inventory.svg" title="Arquivado" /></sup>'
    : "");

let linksMenu = document.querySelectorAll(".linkDoCurso");
for (let i in linksMenu) {
  linksMenu[i].href += "?curso=" + curso.id;
}

// --------------------------------------------------------------
// Mostra a tabela de componentes curriculares do curso
// --------------------------------------------------------------
let mostraTabela = function () {
  corpoTabela.innerHTML = "";
  let componentes = dbComponentesCurriculares_Cursos.componentesCurriculares(
    curso.id
  );
  componentes = componentes.map((c) => ({
    semestre: c.semestre,
    ...dbComponentesCurriculares.componenteCurricular(c.idComponenteCurricular),
  }));
  componentes.sort((a, b) =>
    a.semestre == b.semestre
      ? a.nome.localeCompare(b.nome)
      : a.semestre - b.semestre
  );
  componentes.forEach((componente) => {
    corpoTabela.innerHTML += `
    <tr>
      <td>${componente.nome}</td>
      <td>${componente.cargaHoraria}</td>
      <td>${componente.semestre}</td>
      <td>${tiposComponentesCurriculares[componente.tipo]}</td>
      <td>${dbAreas.area(componente.area).nome}</td>
      <td class="clicavel">
        <span class="simbolo" 
          onclick="exibeComponente('${componente.id}')"
          title="Exibe os dados e cursos do componente curricular">
          <img src="./imagens/visibility.svg" />
        </span>
        <span class="simbolo" 
          onclick="editaComponente('${componente.id}')"
          title="Altera os dados do componente curricular">
          <img src="./imagens/edit.svg" />
        </span>
        <span class="simbolo" 
          onclick="removeComponente('${componente.id}')"
          title="Remove o componente curricular deste curso">
          <img src="./imagens/close.svg" />
        </span>
      </td>
    </tr>
  `;
  });
};

// --------------------------------------------------------------
// Exibe o modal para visualização dos dados do componente
// --------------------------------------------------------------
let exibeComponente = function (idComponenteCurricular) {
  let componente = dbComponentesCurriculares.componenteCurricular(
    idComponenteCurricular
  );
  nomeModalExibeComponente.value = componente.nome;
  cargaHorariaModalExibeComponente.value = componente.cargaHoraria;
  tipoModalExibeComponente.value =
    tiposComponentesCurriculares[componente.tipo];
  semestreModalExibeComponente.value =
    dbComponentesCurriculares_Cursos.semestre(idComponenteCurricular, curso.id);
  areaModalExibeComponente.value = dbAreas.area(componente.area).nome;

  cursosModalExibeComponente.innerHTML = dbComponentesCurriculares_Cursos
    .cursos(idComponenteCurricular)
    .map((elem) => dbCursos.curso(elem.idCurso).nome)
    .sort((a, b) => a.localeCompare(b))
    .map((elem) => `<tr><td>${elem}</td></tr>`)
    .join("\n");

  let componentesCompetencias =
    dbComponentesCompetencias_ComponentesCurriculares
      .componentesCompetencias(idComponenteCurricular)
      .map((idComponenteCompetencia) =>
        dbComponentesCompetencias.componenteCompetencias(
          idComponenteCompetencia
        )
      );
  conhecimentosModalExibeComponente.innerHTML = componentesCompetencias
    .filter((c) => c.tipo == 0)
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .map(
      (elem) =>
        `<tr><td>${elem.nome}</td><td>${dbAreas.area(elem.area).nome}</td></tr>`
    )
    .join("");
  habilidadesModalExibeComponente.innerHTML = componentesCompetencias
    .filter((c) => c.tipo == 1)
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .map(
      (elem) =>
        `<tr><td>${elem.nome}</td><td>${dbAreas.area(elem.area).nome}</td></tr>`
    )
    .join("");
  atitudesModalExibeComponente.innerHTML = componentesCompetencias
    .filter((c) => c.tipo == 2)
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .map(
      (elem) =>
        `<tr><td>${elem.nome}</td><td>${dbAreas.area(elem.area).nome}</td></tr>`
    )
    .join("");

  modalExibeComponente.showModal();

  nomeModalExibeComponente.style.height = "auto";
  nomeModalExibeComponente.style.height =
    nomeModalExibeComponente.scrollHeight + 10 + "px";

  nomeModalExibeComponente.focus();
};

// --------------------------------------------------------------
// Exibe o modal para edição dos dados do componente curricular
// --------------------------------------------------------------
// Testa se há mais cursos vinculados a este componente curricular
let editaComponente = function (idComponenteCurricular) {
  let n = dbComponentesCurriculares_Cursos.cursos(
    idComponenteCurricular
  ).length;
  if (n == 1) {
    editaComponenteContinuacao(idComponenteCurricular);
  } else {
    alerta(
      (n == 2
        ? "Existe <strong>mais 1 curso</strong> vinculado"
        : `Existem <strong>mais ${n - 1} cursos/strong> vinculados`) +
        " a esta competência. As alterações feitas aqui valerão para todos os cursos. Apenas o campo código é específico deste curso.",
      () => editaComponenteContinuacao(idComponenteCurricular)
    );
  }
};

// Mostra o modal
let editaComponenteContinuacao = function (idComponenteCurricular) {
  let componenteCurricular = dbComponentesCurriculares.componenteCurricular(
    idComponenteCurricular
  );
  nomeModalEditaComponente.value = componenteCurricular.nome;
  cargaHorariaModalEditaComponente.value = componenteCurricular.cargaHoraria;
  tipoModalEditaComponente.innerHTML = tiposComponentesCurriculares
    .map(
      (t, i) =>
        `<option value=${i} ${
          componenteCurricular.tipo == i ? "selected" : ""
        }>${t}</option>`
    )
    .join("");
  areaModalEditaComponente.innerHTML = dbAreas
    .areas(componenteCurricular.area)
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .map(
      (t) =>
        `<option value=${t.id} ${
          componenteCurricular.area == t.id ? "selected" : ""
        }>${t.nome}</option>`
    )
    .join("");
  semestreModalEditaComponente.value =
    dbComponentesCurriculares_Cursos.semestre(idComponenteCurricular, curso.id);

  // Recupera as competências do curso e seus componentes
  let competencias = dbCompetencias_Cursos
    .competencias(curso.id)
    .map((c) => c.id);
  let idsComponentesCompetencias = [];
  for (let i in competencias) {
    let componentesDaCompetencia =
      dbComponentesCompetencias_Competencias.componentesCompetencia(
        competencias[i]
      );
    for (let j in componentesDaCompetencia) {
      if (
        idsComponentesCompetencias.findIndex(
          (c) => c == componentesDaCompetencia[j]
        ) == -1
      )
        idsComponentesCompetencias.push(componentesDaCompetencia[j]);
    }
  }
  let componentesCompetencias = idsComponentesCompetencias
    .map((cc) => dbComponentesCompetencias.componenteCompetencias(cc))
    .sort((a, b) =>
      a.tipo == b.tipo ? a.nome.localeCompare(b.nome) : a.tipo - b.tipo
    );

  let marcados =
    dbComponentesCompetencias_ComponentesCurriculares.componentesCompetencias(
      idComponenteCurricular
    );

  conteudoComponentesCompetenciasEdicao.innerHTML = componentesCompetencias
    .map(
      (cc) => `<tr>
       <td><input class="marcacoes" id="cb_${cc.id}" type="checkbox" ${
        marcados.indexOf(cc.id) != -1 ? "checked" : ""
      }></td>
       <td>${cc.nome}</td>
       <td>${tiposComponentesCompetencias[cc.tipo]}</td>
       <td>${dbAreas.area(cc.area).nome}</td>
       <td class="clicavel">
        <span class="simbolo" 
          onclick="exibeDescricao('${cc.nome}', '${cc.descricao}')"
          title="Exibe a descrição componente de competência">
          <img src="./imagens/visibility.svg" />
        </span></td>
       </tr>`
    )
    .join("");

  nomeModalEditaComponente.removeAttribute("aria-invalid");
  cargaHorariaModalEditaComponente.removeAttribute("aria-invalid");
  semestreModalEditaComponente.removeAttribute("aria-invalid");

  btnFecharEdicao.onclick = () => salvar(componenteCurricular);
  modalEditaComponente.showModal();
  nomeModalEditaComponente.focus();
};

// Salva as alterações
let salvar = function (componenteCurricular) {
  if (
    nomeModalEditaComponente.value.length == 0 ||
    cargaHorariaModalEditaComponente.value.length == 0 ||
    semestreModalEditaComponente.value.length == 0
  ) {
    erro("Nenhum campo pode ficar vazio.");
    return;
  }

  // atualiza dados do componente curricular
  componenteCurricular.nome = nomeModalEditaComponente.value;
  componenteCurricular.cargaHoraria = cargaHorariaModalEditaComponente.value;
  componenteCurricular.tipo = tipoModalEditaComponente.value;
  componenteCurricular.area = areaModalEditaComponente.value;
  dbComponentesCurriculares.update(componenteCurricular);

  // atualiza o semestre
  dbComponentesCurriculares_Cursos.update({
    idComponenteCurricular: componenteCurricular.id,
    idCurso: curso.id,
    semestre: semestreModalEditaComponente.value,
  });

  // atualiza os componentes de competências marcados
  let marcados = Array.from(document.querySelectorAll(".marcacoes"))
    .filter((c) => c.checked)
    .map((c) => parseInt(c.id.substring(3)));
  dbComponentesCompetencias_ComponentesCurriculares.update(
    componenteCurricular.id,
    marcados
  );

  modalEditaComponente.close();
  mostraTabela();
};

// Mostra da descrição do componente de competência
let exibeDescricao = function (titulo, desc) {
  tituloDescricao.innerHTML = titulo;
  mensagemDescricao.innerHTML = desc;
  modalDescricao.showModal();
};

// --------------------------------------------------------------
// Exibe o modal para criação de um novo componente curricular
// --------------------------------------------------------------
let criaComponente = function () {
  nomeModalCriaComponente.value = "";
  cargaHorariaModalCriaComponente.value = "";
  tipoModalCriaComponente.innerHTML = tiposComponentesCurriculares
    .map((t, i) => `<option value=${i}>${t}</option>`)
    .join("");
  areaModalCriaComponente.innerHTML = dbAreas
    .areas()
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .map((t) => `<option value=${t.id}>${t.nome}</option>`)
    .join("");
  semestreModalCriaComponente.value = "";

  // Recupera as competências do curso e seus componentes
  let competencias = dbCompetencias_Cursos
    .competencias(curso.id)
    .map((c) => c.id);
  let idsComponentesCompetencias = [];
  for (let i in competencias) {
    let componentesDaCompetencia =
      dbComponentesCompetencias_Competencias.componentesCompetencia(
        competencias[i]
      );
    for (let j in componentesDaCompetencia) {
      if (
        idsComponentesCompetencias.findIndex(
          (c) => c == componentesDaCompetencia[j]
        ) == -1
      )
        idsComponentesCompetencias.push(componentesDaCompetencia[j]);
    }
  }
  let componentesCompetencias = idsComponentesCompetencias
    .map((cc) => dbComponentesCompetencias.componenteCompetencias(cc))
    .sort((a, b) =>
      a.tipo == b.tipo ? a.nome.localeCompare(b.nome) : a.tipo - b.tipo
    );

  conteudoComponentesCompetenciasCriacao.innerHTML = componentesCompetencias
    .map(
      (cc) => `<tr>
       <td><input class="marcacoes" id="cb_${cc.id}" type="checkbox"></td>
       <td>${cc.nome}</td>
       <td>${tiposComponentesCompetencias[cc.tipo]}</td>
       <td>${dbAreas.area(cc.area).nome}</td>
       <td class="clicavel">
        <span class="simbolo" 
          onclick="exibeDescricao('${cc.nome}', '${cc.descricao}')"
          title="Exibe a descrição componente de competência">
          <img src="./imagens/visibility.svg" />
        </span></td>
       </tr>`
    )
    .join("");

  nomeModalCriaComponente.removeAttribute("aria-invalid");
  cargaHorariaModalCriaComponente.removeAttribute("aria-invalid");
  semestreModalCriaComponente.removeAttribute("aria-invalid");
  btnFecharCriacao.onclick = () => adicionar();
  modalCriaComponente.showModal();
  nomeModalCriaComponente.focus();
};

// Grava a nova competência
let adicionar = function () {
  if (
    nomeModalCriaComponente.value.length == 0 ||
    cargaHorariaModalCriaComponente.value.length == 0 ||
    semestreModalCriaComponente.value.length == 0
  ) {
    erro("Nenhum campo pode ficar vazio.");
    return;
  }
  let novoComponente = {
    nome: nomeModalCriaComponente.value,
    cargaHoraria: cargaHorariaModalCriaComponente.value,
    tipo: tipoModalCriaComponente.value,
    area: areaModalCriaComponente.value,
  };
  idComponente = dbComponentesCurriculares.create(novoComponente);

  dbComponentesCurriculares_Cursos.create({
    idComponenteCurricular: idComponente,
    idCurso: curso.id,
    semestre: semestreModalCriaComponente.value,
  });

  // atualiza os componentes de competências marcados
  let marcados = Array.from(document.querySelectorAll(".marcacoes"))
    .filter((c) => c.checked)
    .map((c) => parseInt(c.id.substring(3)));
  dbComponentesCompetencias_ComponentesCurriculares.update(
    idComponente,
    marcados
  );

  modalCriaComponente.close();
  mostraTabela();
};

// --------------------------------------------------------------
// Pesquisa competências
// --------------------------------------------------------------
let pesquisaComponentes = function () {
  // Recupera os componentes curriculares dos cursos aos quais o usuário tem acesso
  let cursosDoUsuario = dbCursos_Usuarios.cursosUsuario(usuarioLogado.id);
  let componentes = [];
  let i, j;
  for (let i in cursosDoUsuario) {
    let componentesDosCursos =
      dbComponentesCurriculares_Cursos.componentesCurriculares(
        cursosDoUsuario[i].id
      );
    for (let j in componentesDosCursos) {
      let k = componentes.findIndex(
        (c) => c.id == componentesDosCursos[j].idComponenteCurricular
      );
      if (k == -1)
        componentes.push({
          id: componentesDosCursos[j].idComponenteCurricular,
          cursos: [cursosDoUsuario[i].id],
        });
      else componentes[k].cursos.push(cursosDoUsuario[i].id);
    }
  }

  componentes = componentes
    .map((c) => ({
      ...dbComponentesCurriculares.componenteCurricular(c.id),
      cursos: c.cursos,
    }))
    .sort((a, b) => a.nome.localeCompare(b.nome));

  filtroTipos.innerHTML =
    '<option value="-1">Todos</option>' +
    tiposComponentesCurriculares
      .map((t, i) => `<option value=${i}>${t}</option>`)
      .join("");
  filtroTipos.onchange = () => aplicaFiltros(componentes);

  filtroAreas.innerHTML =
    '<option value="-1">Todos</option>' +
    dbAreas
      .areas()
      .sort((a, b) => a.nome.localeCompare(b.nome))
      .map((c) => `<option value=${c.id}>${c.nome}</option>`)
      .join("");
  filtroAreas.onchange = () => aplicaFiltros(componentes);

  filtroCursos.innerHTML =
    '<option value="-1">Todos</option>' +
    cursosDoUsuario
      .map((c) => dbCursos.curso(c.id))
      .sort((a, b) => a.nome.localeCompare(b.nome))
      .map((c) => `<option value=${c.id}>${c.nome}</option>`)
      .join("");
  filtroCursos.onchange = () => aplicaFiltros(componentes);

  filtroTexto.value = "";
  filtroTexto.oninput = () => aplicaFiltros(componentes);

  mostraTabelaPesquisa(componentes);
  modalPesquisaComponentes.showModal();
  filtroTipos.focus();
};

// Mostra a tabela de pesquisa de competências
let mostraTabelaPesquisa = function (componentes) {
  tabelaPesquisaComponentes.innerHTML = "";
  componentes.forEach((componente) => {
    tabelaPesquisaComponentes.innerHTML += `
    <tr>
      <td>${componente.nome}</td>
      <td>${componente.cargaHoraria}</td>
      <td>${tiposComponentesCurriculares[componente.tipo]}</td>
      <td>${dbAreas.area(componente.area).nome}</td>
      <td class="clicavel">
        <span class="simbolo" 
          onclick="exibeComponente('${componente.id}')"
          title="Exibe os dados do componente curricular">
          <img src="./imagens/visibility.svg" />
        </span>
        <span class="simbolo" 
          onclick="importaComponente('${componente.id}')"
          title="Vincula este componente curricular ao curso">
          <img src="./imagens/download.svg" />
        </span>
      </td>
    </tr>
  `;
  });
};

// Filtro de tipos
let aplicaFiltros = function (competencias) {
  let condicaoTipo = (tipo) =>
    filtroTipos.value == -1 ? true : tipo == filtroTipos.value;
  let condicaoAreas = (area) =>
    filtroAreas.value == -1 ? true : area == parseInt(filtroAreas.value);
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
    (c) =>
      condicaoTipo(c.tipo) &&
      condicaoAreas(c.area) &&
      condicaoCurso(c.cursos) &&
      condicaoTexto(c.nome)
  );
  mostraTabelaPesquisa(competenciasFiltradas);
};

// Importa o componente
let importaComponente = function (idComponente) {
  // Testa se o componente já existe
  if (
    dbComponentesCurriculares_Cursos
      .componentesCurriculares(curso.id)
      .findIndex((c) => c.id == idComponente) != -1
  ) {
    erro("Esse componente curricular já faz parte do seu curso");
  } else {
    dbComponentesCurriculares_Cursos.create({
      idComponenteCurricular: idComponente,
      idCurso: curso.id,
      semestre: "",
    });
    alerta(
      "Componente curricular vinculado ao curso. Na próxima tela, informe a que semestre esse componente curricular será vinculado.<br/><br/>Alterações nos demais campos afetarão todos os cursos vinculados a este componente curricular.",
      function () {
        editaComponenteContinuacao(idComponente);
        semestreModalEditaCompetencia.focus();
      }
    );
    modalPesquisaComponentes.close();
    modalCriaComponente.close();
  }
};

// --------------------------------------------------------------
// Remove o componente deste curso
// --------------------------------------------------------------
let removeComponente = function (idComponente) {
  let componente = dbComponentesCurriculares.componenteCurricular(idComponente);

  nomeModalRemoveComponente.innerHTML = componente.nome;

  btnFecharRemocao.onclick = () => remover(idComponente);
  modalRemoveComponente.showModal();
  nomeModalRemoveComponente.style.height = "auto";
  nomeModalRemoveComponente.style.height =
    nomeModalRemoveComponente.scrollHeight + 10 + "px";
  btnFecharRemocao.focus();
};
// Remove a competência
let remover = function (idComponente) {
  dbComponentesCurriculares_Cursos.delete(idComponente, curso.id);
  modalRemoveComponente.close();
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
btnAdicionar.onclick = () => criaComponente();
btnPesquisar.onclick = () => pesquisaComponentes();
iconeFecharExibicao.onclick = () => modalExibeComponente.close();
btnFecharExibicao.onclick = () => modalExibeComponente.close();
iconeFecharEdicao.onclick = () => modalEditaComponente.close();
btnCancelarEdicao.onclick = () => modalEditaComponente.close();
btnOkDescricao.onclick = () => modalDescricao.close();
iconeFecharCriacao.onclick = () => modalCriaComponente.close();
btnCancelarCriacao.onclick = () => modalCriaComponente.close();
iconeFecharPesquisa.onclick = () => modalPesquisaComponentes.close();
btnFecharPesquisa.onclick = () => modalPesquisaComponentes.close();
iconeFecharRemocao.onclick = () => modalRemoveComponente.close();
btnCancelarRemocao.onclick = () => modalRemoveComponente.close();
btnOkErro.onclick = () => modalErro.close();

// Testes de validade dos campos
nomeModalEditaComponente.oninput = function () {
  nomeModalEditaComponente.setAttribute(
    "aria-invalid",
    nomeModalEditaComponente.value.length == 0
  );
};
cargaHorariaModalEditaComponente.oninput = function () {
  cargaHorariaModalEditaComponente.setAttribute(
    "aria-invalid",
    cargaHorariaModalEditaComponente.value.length == 0
  );
};
semestreModalEditaComponente.oninput = function () {
  semestreModalEditaComponente.setAttribute(
    "aria-invalid",
    semestreModalEditaComponente.value.length == 0
  );
};
nomeModalCriaComponente.oninput = function () {
  nomeModalCriaComponente.setAttribute(
    "aria-invalid",
    nomeModalCriaComponente.value.length == 0
  );
};
cargaHorariaModalCriaComponente.oninput = function () {
  cargaHorariaModalCriaComponente.setAttribute(
    "aria-invalid",
    cargaHorariaModalCriaComponente.value.length == 0
  );
};
semestreModalCriaComponente.oninput = function () {
  semestreModalCriaComponente.setAttribute(
    "aria-invalid",
    semestreModalCriaComponente.value.length == 0
  );
};

// Mostra a tabela de competências
mostraTabela();
