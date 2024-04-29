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
// Mostra a tabela de competências do curso e seus componentes
// --------------------------------------------------------------
let mostraTabela = function (nSemestre) {
  if (nSemestre == undefined) nSemestre = -1;
  listaSemestres.innerHTML = "";
  for (let i = 1; i <= curso.semestres; i++) {
    // let listaComponentesCompetencias =
    //   dbComponentesCompetencias_Competencias.componentesCompetencia(
    //     competencia.id
    //   );

    listaSemestres.innerHTML +=
      `
    <article>
      <details ${i == nSemestre ? "open" : ""}>
        <summary>${i}&ordm; Semestre</summary>
        <table class="tabelaComponentesCurriculares_Semestre">
          <thead>
            <tr>
              <th>Componente Curricular</th>
              <th>CH</th>
              <th>Tipo</th>
              <th>Área</th>
              <th class="colunaIcones"></th>
            </tr>
          </thead>
          <tbody>` +
      //         ${listaComponentesCompetencias
      //           .map((idComponenteCompetencia) =>
      //             dbComponentesCompetencias.componenteCompetencias(
      //               idComponenteCompetencia
      //             )
      //           )
      //           .sort((a, b) =>
      //             a.tipo == b.tipo
      //               ? a.nome.localeCompare(b.nome)
      //               : a.tipo - b.tipo
      //           )
      //           .map(
      //             (cc) => `
      // <tr>
      //   <td>${cc.nome}</td>
      //   <td>${tiposComponentesCompetencias[cc.tipo]}</td>
      //   <td>${dbAreas.area(cc.area).nome}</td>
      //   <td class="clicavel">
      //     <span class="simbolo"
      //       onclick="exibeComponente(${cc.id})"
      //       title="Visualizar">
      //       <img src="./imagens/visibility.svg" />
      //     </span>
      //     <span class="simbolo"
      //       onclick="editaComponente(${cc.id}, ${competencia.id})"
      //       title="Editar">
      //       <img src="./imagens/edit.svg" />
      //     </span>
      //     <span class="simbolo"
      //       onclick="removeComponente(${cc.id}, ${competencia.id})"
      //       title="Remover">
      //       <img src="./imagens/close.svg" />
      //     </span>
      //   </td>
      // </tr>`
      //           )
      //           .join("")}
      ` </tbody>
        </table>
      <footer>
        <button onclick="criaComponente(${nSemestre})">Adicionar</button>
      </footer>
      </details>
    </article>
  `;
  }
};

/*

// --------------------------------------------------------------
// Exibe o modal para visualização dos dados do compomente de competência
// --------------------------------------------------------------
let exibeComponente = function (id) {
  let componenteCompetencias =
    dbComponentesCompetencias.componenteCompetencias(id);
  nomeModalExibeComponente.value = componenteCompetencias.nome;
  tipoModalExibeComponente.value =
    tiposComponentesCompetencias[componenteCompetencias.tipo];
  areaModalExibeComponente.value = dbAreas.area(
    componenteCompetencias.area
  ).nome;
  descricaoModalExibeComponente.value = componenteCompetencias.descricao;

  let competencias = dbComponentesCompetencias_Competencias
    .competencias(id)
    .map((idCompetencia) => dbCompetencias.competencia(idCompetencia));
  competenciasModalExibeComponente.innerHTML = competencias
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .map((elem) => `<tr><td>${elem.nome}</td></tr>`)
    .join("");

  modalExibeComponente.showModal();

  nomeModalExibeComponente.style.height = "auto";
  nomeModalExibeComponente.style.height =
    nomeModalExibeComponente.scrollHeight + 10 + "px";

  descricaoModalExibeComponente.style.height = "auto";
  descricaoModalExibeComponente.style.height =
    descricaoModalExibeComponente.scrollHeight + 10 + "px";

  nomeModalExibeComponente.focus();
};

// --------------------------------------------------------------
// Exibe o modal para edição dos dados da competência
// --------------------------------------------------------------
// Testa se há mais competências ou cursos vinculados a este componente de competências
let editaComponente = function (idComponenteCompetencia, idCompetencia) {
  let n1 = dbComponentesCompetencias_Competencias.competencias(
    idComponenteCompetencia
  ).length;
  let n2 =
    dbComponentesCompetencias_ComponentesCurriculares.componentescurriculares(
      idComponenteCompetencia
    ).length;
  let mensagem = "";
  if (n1 == 1 && n2 == 0) {
    editaComponenteContinuacao(idComponenteCompetencia, idCompetencia);
  } else {
    if (n1 >= 2)
      mensagem +=
        (n1 == 2
          ? "Existe <strong>mais 1 competência</strong> vinculada"
          : `Existem <strong>mais ${n1 - 1} competências</strong> vinculadas`) +
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
      editaComponenteContinuacao(idComponenteCompetencia, idCompetencia)
    );
  }
};

// Mostra o modal
let editaComponenteContinuacao = function (id, idCompetencia) {
  let componenteCompetencias =
    dbComponentesCompetencias.componenteCompetencias(id);
  nomeModalEditaComponente.value = componenteCompetencias.nome;
  tipoModalEditaComponente.innerHTML = tiposComponentesCompetencias
    .map(
      (t, i) =>
        `<option value=${i} ${
          componenteCompetencias.tipo == i ? "selected" : ""
        }>${t}</option>`
    )
    .join('');
  areaModalEditaComponente.innerHTML = dbAreas
    .areas()
    .map(
      (t) =>
        `<option value=${t.id} ${
          componenteCompetencias.area == t.id ? "selected" : ""
        }>${t.nome}</option>`
    )
    .join('');

  descricaoModalEditaComponente.value = componenteCompetencias.descricao;
  btnFecharEdicao.onclick = () => salvar(componenteCompetencias, idCompetencia);
  modalEditaComponente.showModal();
  nomeModalEditaComponente.focus();
};

// Salva as alterações
let salvar = function (componenteCompetencias, idCompetencia) {
  if (nomeModalEditaComponente.value.length == 0) {
    erro("O campo de nome não pode ficar vazio.");
    return;
  }
  componenteCompetencias.nome = nomeModalEditaComponente.value;
  componenteCompetencias.tipo = tipoModalEditaComponente.value;
  componenteCompetencias.area = areaModalEditaComponente.value;
  componenteCompetencias.descricao = descricaoModalEditaComponente.value;
  dbComponentesCompetencias.update(componenteCompetencias);

  modalEditaComponente.close();
  mostraTabela(idCompetencia);
};

// --------------------------------------------------------------
// Exibe o modal para criação de uma nova competência
// --------------------------------------------------------------
let criaComponente = function (idCompetencia) {
  nomeModalCriaComponente.value = "";
  tipoModalCriaComponente.innerHTML = tiposComponentesCompetencias
    .map((t, i) => `<option value=${i}>${t}</option>`)
    .join('');
  areaModalCriaComponente.innerHTML = dbAreas
    .areas()
    .map((t) => `<option value=${t.id}>${t.nome}</option>`)
    .join('');
  descricaoModalCriaComponente.value = "";
  nomeModalCriaComponente.removeAttribute("aria-invalid");

  btnPesquisar.onclick = () => pesquisaComponentes(idCompetencia);
  btnFecharCriacao.onclick = () => adicionar(idCompetencia);
  modalCriaComponente.showModal();
  nomeModalCriaComponente.focus();
};

// Grava a nova competência
let adicionar = function (idCompetencia) {
  if (nomeModalCriaComponente.value.length == 0) {
    erro("Nome do componente de competência não pode ficar vazio.");
    return;
  }
  let novoComponente = {
    nome: nomeModalCriaComponente.value,
    tipo: tipoModalCriaComponente.value,
    area: areaModalCriaComponente.value,
    descricao: descricaoModalCriaComponente.value,
  };
  idComponente = dbComponentesCompetencias.create(novoComponente);

  dbComponentesCompetencias_Competencias.create({
    idComponenteCompetencia: idComponente,
    idCompetencia: idCompetencia,
  });

  modalCriaComponente.close();
  mostraTabela(idCompetencia);
};

// --------------------------------------------------------------
// Pesquisa componentes de competências
// --------------------------------------------------------------
let pesquisaComponentes = function (idCompetencia) {
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
      .join('');
  filtroTipos.onchange = () => aplicaFiltros(componentes);

  filtroAreas.innerHTML =
    '<option value="-1">Todas</option>' +
    dbAreas
      .areas()
      .sort((a, b) => a.nome.localeCompare(b.nome))
      .map((a) => `<option value=${a.id}>${a.nome}</option>`)
      .join('');
  filtroAreas.onchange = () => aplicaFiltros(componentes, idCompetencia);

  filtroTexto.value = "";
  filtroTexto.oninput = () => aplicaFiltros(componentes, idCompetencia);

  mostraTabelaPesquisa(componentes, idCompetencia);
  modalPesquisaComponente.showModal();
  filtroTipos.focus();
};

// Mostra a tabela de pesquisa de componentes das competências
let mostraTabelaPesquisa = function (componentes, idCompetencia) {
  tabelaPesquisaComponentes.innerHTML = "";
  componentes.forEach((componente) => {
    tabelaPesquisaComponentes.innerHTML += `
    <tr>
      <td>${componente.nome}</td>
      <td>${tiposComponentesCompetencias[componente.tipo]}</td>
      <td>${dbAreas.area(componente.area).nome}</td>
      <td class="clicavel">
        <span class="simbolo" 
          onclick="exibeComponente(${componente.id})"
          title="Visualizar">
          <img src="./imagens/visibility.svg" />
        </span>
        <span class="simbolo" 
          onclick="importaComponente(${componente.id}, ${idCompetencia})"
          title="Importar">
          <img src="./imagens/download.svg" />
        </span>
      </td>
    </tr>
  `;
  });
};

// Filtro de tipos
let aplicaFiltros = function (componentes, idCompetencia) {
  let condicaoTipo = (tipo) =>
    filtroTipos.value == -1 ? true : tipo == filtroTipos.value;
  let condicaoArea = (area) =>
    filtroAreas.value == -1 ? true : area == filtroAreas.value;
  let condicaoTexto = (nome) =>
    filtroTexto.value.length == 0
      ? true
      : desacentua(filtroTexto.value)
          .split(" ")
          .reduce((acc, val) => acc && desacentua(nome).includes(val), true);

  let componentesFiltrados = componentes.filter(
    (c) => condicaoTipo(c.tipo) && condicaoArea(c.area) && condicaoTexto(c.nome)
  );
  mostraTabelaPesquisa(componentesFiltrados, idCompetencia);
};

// Importa o componente
let importaComponente = function (idComponente, idCompetencia) {
  // Testa se o componente já existe na competência
  if (
    dbComponentesCompetencias_Competencias
      .componentesCompetencia(idCompetencia)
      .findIndex((c) => c.id == idComponente) != -1
  ) {
    erro("Esse componente já faz parte desta competência.");
  } else {
    dbComponentesCompetencias_Competencias.create({
      idComponenteCompetencia: idComponente,
      idCompetencia: idCompetencia,
    });
    alerta("Componente de competência vinculado à competência.", () => {
      modalPesquisaComponente.close();
      modalCriaComponente.close();
    });

    mostraTabela(idCompetencia);
  }
};

// --------------------------------------------------------------
// Remove a componente de competência deste curso
// --------------------------------------------------------------
let removeComponente = function (idComponente, idCompetencia) {
  let componenteCompetencias =
    dbComponentesCompetencias.componenteCompetencias(idComponente);
  artigoModalRemoveComponente.innerHTML =
    artigosTiposComponentesCompetencias[componenteCompetencias.tipo];
  tipoModalRemoveComponente.innerHTML =
    tiposComponentesCompetencias[componenteCompetencias.tipo].toLowerCase();
  nomeModalRemoveComponente.innerHTML = componenteCompetencias.nome;

  btnFecharRemocao.onclick = () => remover(idComponente, idCompetencia);
  modalRemoveComponente.showModal();

  nomeModalRemoveComponente.style.height = "auto";
  nomeModalRemoveComponente.style.height =
    nomeModalRemoveComponente.scrollHeight + 10 + "px";
  btnFecharRemocao.focus();
};
// Remove a competência
let remover = function (idComponente, idCompetencia) {
  dbComponentesCompetencias_Competencias.delete(idComponente, idCompetencia);
  modalRemoveComponente.close();
  mostraTabela(idCompetencia);
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
iconeFecharExibicao.onclick = () => modalExibeComponente.close();
btnFecharExibicao.onclick = () => modalExibeComponente.close();
iconeFecharEdicao.onclick = () => modalEditaComponente.close();
btnCancelarEdicao.onclick = () => modalEditaComponente.close();
iconeFecharCriacao.onclick = () => modalCriaComponente.close();
btnCancelarCriacao.onclick = () => modalCriaComponente.close();
iconeFecharPesquisa.onclick = () => modalPesquisaComponente.close();
btnFecharPesquisa.onclick = () => modalPesquisaComponente.close();
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

*/

// Mostra a tabela de competências
mostraTabela();
