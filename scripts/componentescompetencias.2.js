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

// --------------------------------------------------------------
// Mostra a tabela de componentes de competências do curso
// --------------------------------------------------------------
let mostraTabela = function () {
  // Recupera as competências dos cursos
  let competencias = dbCompetencias_Cursos.competencias(curso.id);
  competencias.sort((a, b) => a.codigo.localeCompare(b.codigo));
  competencias = competencias.map((c) => ({
    codigo: c.codigo,
    ...dbCompetencias.competencia(c.id),
  }));

  // Recupera os componentes de competências dessas competências
  let componentesCompetencias = [];
  for (let i in competencias) {
    let idsComponentesCompetencias =
      dbComponentesCompetencias_Competencias.componentesCompetencia(
        competencias[i].id
      );
    for (let j in idsComponentesCompetencias)
      if (componentesCompetencias.indexOf(idsComponentesCompetencias[j]) == -1)
        componentesCompetencias.push(idsComponentesCompetencias[j]);
  }
  let componentes = componentesCompetencias
    .map((id) => dbComponentesCompetencias.componenteCompetencias(id))
    .sort((a, b) =>
      a.tipo == b.tipo ? a.nome.localeCompare(b.nome) : a.tipo - b.tipo
    );

  // Monta a tabela
  corpoTabela.innerHTML = "";
  componentes.forEach((componente) => {
    corpoTabela.innerHTML += `
    <tr>
      <td>${componente.nome}</td>
      <td>${tiposComponentesCompetencias[componente.tipo]}</td>
      <td>${dbAreas.area(componente.area).nome}</td>
      <td class="clicavel">
        <span class="simbolo" 
          onclick="exibeComponente('${componente.id}')"
          title="Visualizar">
          <img src="./imagens/visibility.svg" />
        </span>
        <span class="simbolo" 
          onclick="editaComponente('${componente.id}')"
          title="Editar">
          <img src="./imagens/edit.svg" />
        </span>
        <span class="simbolo" 
          onclick="removeComponente('${componente.id}')"
          title="Remover">
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
let exibeComponente = function (idComponenteCompetencia) {
  let componente = dbComponentesCompetencias.componenteCompetencias(
    idComponenteCompetencia
  );
  nomeModalExibeComponente.value = componente.nome;
  tipoModalExibeComponente.value =
    tiposComponentesCompetencias[componente.tipo];
  areaModalExibeComponente.value = dbAreas.area(componente.area).nome;
  descricaoModalExibeComponente.value = componente.descricao;

  competenciasModalExibeComponente.innerHTML =
    dbComponentesCompetencias_Competencias
      .competencias(idComponenteCompetencia)
      .map((elem) => ({
        ...dbCompetencias.competencia(elem),
        codigo: dbCompetencias_Cursos.codigo(elem, curso.id),
      }))
      .sort((a, b) => a.codigo.localeCompare(b.codigo))
      .map((elem) => `<tr><td>${elem.codigo}</td><td>${elem.nome}</td></tr>`)
      .join("\n");

  let componentesCurriculares =
    dbComponentesCompetencias_ComponentesCurriculares
      .componentesCurriculares(idComponenteCompetencia)
      .map((idComponenteCurricular) =>
        dbComponentesCurriculares.componenteCurricular(idComponenteCurricular)
      );
  componentesCurricularesModalExibeComponente.innerHTML =
    componentesCurriculares
      .map(
        (elem) =>
          `<tr>
           <td>${elem.nome}</td>
           <td>${elem.cargaHoraria}</td>
           <td>${tiposComponentesCurriculares[elem.tipo]}</td>
           <td>${dbAreas.area(elem.area).nome}</td>
        </tr>`
      )
      .join("");

  modalExibeComponente.showModal();

  nomeModalExibeComponente.style.height = "auto";
  nomeModalExibeComponente.style.height =
    nomeModalExibeComponente.scrollHeight + 10 + "px";

  nomeModalExibeComponente.focus();
};

// --------------------------------------------------------------
// Exibe o modal para edição dos dados do componente de competências
// --------------------------------------------------------------
// Testa se há mais competências vinculadas a este componente de competências
// Testa se há mais competências ou cursos vinculados a este componente de competências
let editaComponente = function (idComponenteCompetencias) {
  let n1 = dbComponentesCompetencias_Competencias.competencias(
    idComponenteCompetencias
  ).length;
  let n2 =
    dbComponentesCompetencias_ComponentesCurriculares.componentesCurriculares(
      idComponenteCompetencias
    ).length;
  let mensagem = "";
  if (n1 == 1 && n2 == 0) {
    editaComponenteContinuacao(idComponenteCompetencias);
  } else {
    if (n1 >= 2)
      mensagem +=
        `Existem <strong>${n1} competências</strong> vinculadas` +
        ` a este componente de competência. `;
    if (n2 > 0)
      mensagem +=
        (n2 == 1
          ? `Existe ${
              n1 >= 2 ? "também " : ""
            }<strong>1 componente curricular</strong> vinculado`
          : `Existem ${
              n1 >= 2 ? "também " : ""
            }<strong>${n2} componentes curriculares</strong> vinculados`) +
        ` a este componente de competência. `;
    mensagem += `As alterações feitas aqui valerão 
          para as competências e todos os componentes curriculares.`;
    alerta(mensagem, () =>
      editaComponenteContinuacao(idComponenteCompetencias)
    );
  }
};

// Mostra o modal
let editaComponenteContinuacao = function (idComponenteCompetencias) {
  let componenteCompetencias = dbComponentesCompetencias.componenteCompetencias(
    idComponenteCompetencias
  );
  nomeModalEditaComponente.value = componenteCompetencias.nome;
  descricaoModalEditaComponente.value = componenteCompetencias.descricao;
  tipoModalEditaComponente.innerHTML = tiposComponentesCompetencias
    .map(
      (t, i) =>
        `<option value=${i} ${
          componenteCompetencias.tipo == i ? "selected" : ""
        }>${t}</option>`
    )
    .join("");
  areaModalEditaComponente.innerHTML = dbAreas
    .areas(componenteCompetencias.area)
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .map(
      (t) =>
        `<option value=${t.id} ${
          componenteCompetencias.area == t.id ? "selected" : ""
        }>${t.nome}</option>`
    )
    .join("");

  // Recupera as competências do curso
  let competencias = dbCompetencias_Cursos.competencias(curso.id);
  competencias = competencias
    .map((elem) => ({
      ...dbCompetencias.competencia(elem.id),
      codigo: elem.codigo,
    }))
    .sort((a, b) => a.codigo.localeCompare(b.codigo));

  let marcados = dbComponentesCompetencias_Competencias.competencias(
    idComponenteCompetencias
  );

  conteudoCompetenciasEdicao.innerHTML = competencias
    .map(
      (cc) => `<tr>
       <td><input class="marcacoes" id="cb_${cc.id}" type="checkbox" ${
        marcados.indexOf(cc.id) != -1 ? "checked" : ""
      }></td>
       <td>${cc.codigo}</td>
       <td>${cc.nome}</td>
       <td>${tiposCompetencia[cc.tipo]}</td>
       <td class="clicavel">
        <span class="simbolo" 
          onclick="exibeDescricao('${cc.codigo + " - " + cc.nome}', '${
        cc.descricao
      }')"
          title="Visualizar">
          <img src="./imagens/visibility.svg" />
        </span></td>
       </tr>`
    )
    .join("");

  nomeModalEditaComponente.removeAttribute("aria-invalid");

  btnFecharEdicao.onclick = () => salvar(componenteCompetencias);
  modalEditaComponente.showModal();
  nomeModalEditaComponente.focus();
};

// Salva as alterações
let salvar = function (componenteCompetencias) {
  if (nomeModalEditaComponente.value.length == 0) {
    erro("Nenhum campo pode ficar vazio.");
    return;
  }

  // atualiza dados do componente curricular
  componenteCompetencias.nome = nomeModalEditaComponente.value;
  componenteCompetencias.tipo = tipoModalEditaComponente.value;
  componenteCompetencias.area = areaModalEditaComponente.value;
  componenteCompetencias.descricao = descricaoModalEditaComponente.value;
  dbComponentesCompetencias.update(componenteCompetencias);

  // atualiza os componentes de competências marcados
  let marcados = Array.from(document.querySelectorAll(".marcacoes"))
    .filter((c) => c.checked)
    .map((c) => parseInt(c.id.substring(3)));
  dbComponentesCompetencias_Competencias.update(
    componenteCompetencias.id,
    marcados
  );

  modalEditaComponente.close();
  mostraTabela();
};

// Mostra da descrição da competência
let exibeDescricao = function (titulo, desc) {
  tituloDescricao.innerHTML = titulo;
  mensagemDescricao.innerHTML = desc;
  modalDescricao.showModal();
};

// --------------------------------------------------------------
// Exibe o modal para criação de um novo componente de competencias
// --------------------------------------------------------------
let criaComponente = function () {
  nomeModalCriaComponente.value = "";
  tipoModalCriaComponente.innerHTML = tiposComponentesCompetencias
    .map((t, i) => `<option value=${i}>${t}</option>`)
    .join("");
  areaModalCriaComponente.innerHTML = dbAreas
    .areas()
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .map((t) => `<option value=${t.id}>${t.nome}</option>`)
    .join("");
  descricaoModalCriaComponente.value = "";

  // Recupera as competências do curso
  let competencias = dbCompetencias_Cursos.competencias(curso.id);
  competencias = competencias
    .map((elem) => ({
      ...dbCompetencias.competencia(elem.id),
      codigo: elem.codigo,
    }))
    .sort((a, b) => a.codigo.localeCompare(b.codigo));

  conteudoCompetenciasCriacao.innerHTML = competencias
    .map(
      (cc) => `<tr>
       <td><input class="marcacoes" id="cb_${cc.id}" type="checkbox"></td>
       <td>${cc.codigo}</td>
       <td>${cc.nome}</td>
       <td>${tiposCompetencia[cc.tipo]}</td>
       <td class="clicavel">
        <span class="simbolo" 
          onclick="exibeDescricao('${cc.codigo + " - " + cc.nome}', '${
        cc.descricao
      }')"
          title="Visualizar">
          <img src="./imagens/visibility.svg" />
        </span></td>
       </tr>`
    )
    .join("");

  nomeModalCriaComponente.removeAttribute("aria-invalid");
  btnFecharCriacao.onclick = () => adicionar();
  modalCriaComponente.showModal();
  nomeModalCriaComponente.focus();
};

// Grava a nova competência
let adicionar = function () {
  if (nomeModalCriaComponente.value.length == 0) {
    erro("O nome não pode ficar vazio.");
    return;
  }
  let novoComponente = {
    nome: nomeModalCriaComponente.value,
    tipo: tipoModalCriaComponente.value,
    area: areaModalCriaComponente.value,
    descricao: descricaoModalCriaComponente.value,
  };
  idComponente = dbComponentesCompetencias.create(novoComponente);

  // atualiza as competências marcadas
  let marcados = Array.from(document.querySelectorAll(".marcacoes"))
    .filter((c) => c.checked)
    .map((c) => parseInt(c.id.substring(3)));
  dbComponentesCompetencias_Competencias.update(idComponente, marcados);

  modalCriaComponente.close();
  mostraTabela();
};

// --------------------------------------------------------------
// Pesquisa competências
// --------------------------------------------------------------
let pesquisaComponentes = function () {
  // Recupera as competências dos cursos aos quais o usuário tem acesso
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

  // Recupera os componentes dessas competências
  let componentes = [];
  for (let i in competencias) {
    let componentesDaCompetencia =
      dbComponentesCompetencias_Competencias.componentesCompetencia(
        competencias[i].id
      );
    for (let j in componentesDaCompetencia)
      if (
        componentes.findIndex((id) => id == componentesDaCompetencia[j]) == -1
      )
        componentes.push(componentesDaCompetencia[j]);
  }
  componentes = componentes
    .map((id) => dbComponentesCompetencias.componenteCompetencias(id))
    .sort((a, b) =>
      a.tipo == b.tipo ? a.nome.localeCompare(b.nome) : a.tipo - b.tipo
    );

  filtroTipos.innerHTML =
    '<option value="-1">Todos</option>' +
    tiposComponentesCompetencias
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
      <td>${tiposComponentesCompetencias[componente.tipo]}</td>
      <td>${dbAreas.area(componente.area).nome}</td>
      <td class="clicavel">
        <span class="simbolo" 
          onclick="exibeComponente('${componente.id}')"
          title="Visualizar">
          <img src="./imagens/visibility.svg" />
        </span>
        <span class="simbolo" 
          onclick="importaComponente('${componente.id}')"
          title="Vincula este componente de competência ao curso">
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
  let condicaoTexto = (nome) =>
    filtroTexto.value.length == 0
      ? true
      : desacentua(filtroTexto.value)
          .split(" ")
          .reduce((acc, val) => acc && desacentua(nome).includes(val), true);

  let competenciasFiltradas = competencias.filter(
    (c) =>
      condicaoTipo(c.tipo) && condicaoAreas(c.area) && condicaoTexto(c.nome)
  );
  mostraTabelaPesquisa(competenciasFiltradas);
};

// Importa o componente
let importaComponente = function (idComponente) {
  // Testa se o componente já existe
  let competencias =
    dbComponentesCompetencias_Competencias.competencias(idComponente);
  for (let i in competencias) {
    console.log(competencias[i]);
    console.log(dbCompetencias_Cursos.cursos(competencias[i]));
    if (dbCompetencias_Cursos.cursos(competencias[i]).length > 0) {
      erro("Esse componente de competências já faz parte do seu curso");
      return;
    }
  }
  dbComponentesCompetencias_Competencias.create({
    idComponenteCurricular: idComponente,
    idCompetencia: -1,
  });
  alerta(
    "Componente de competências vinculado ao curso. Na próxima tela, informe a que competências esse componente será vinculado.<br/><br/>Alterações nos demais campos afetarão todos os cursos que tenham competências vinculadas a este componente.",
    function () {
      editaComponenteContinuacao(idComponente);
    }
  );
  modalPesquisaComponentes.close();
  modalCriaComponente.close();
};

// --------------------------------------------------------------
// Remove o componente deste curso
// --------------------------------------------------------------
let removeComponente = function (idComponente) {
  let componente =
    dbComponentesCompetencias.componenteCompetencias(idComponente);

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
  // Recupera as competências dos cursos aos quais o usuário tem acesso
  let cursosDoUsuario = dbCursos_Usuarios.cursosUsuario(usuarioLogado.id);
  let competencias = [];
  let i, j;
  for (let i in cursosDoUsuario) {
    let competenciasDoCurso = dbCompetencias_Cursos.competencias(
      cursosDoUsuario[i].id
    );
    for (let j in competenciasDoCurso)
      if (
        competencias.findIndex((c) => c.id == competenciasDoCurso[j].id) == -1
      )
        competencias.push(competenciasDoCurso[j].id);
  }
  for (let i in competenciasDoCurso)
    dbComponentesCompetencias_Competencias.delete(
      idComponente,
      competenciasDoCurso[i]
    );
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
nomeModalCriaComponente.oninput = function () {
  nomeModalCriaComponente.setAttribute(
    "aria-invalid",
    nomeModalCriaComponente.value.length == 0
  );
};

// Mostra a tabela de competências
mostraTabela();
