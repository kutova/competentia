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
// Mostra a tabela de competências do curso e seus componentes
// --------------------------------------------------------------
let mostraTabela = function () {
  // Recupera as competências do curso
  let competenciasDoCurso = dbCompetencias_Cursos.competencias(curso.id);
  // .map((c) => ({
  //   ...dbCompetencias.competencia(c.id),
  //   codigo: c.codigo,
  // }))
  // .sort((a, b) => a.codigo.localeCompare(b.codigo));

  // Recupera os componentes de competências dessas competências
  let idsComponentesCompetenciasDoCurso = [];
  for (let i in competenciasDoCurso) {
    let compComp =
      dbComponentesCompetencias_Competencias.componentesCompetencia(
        competenciasDoCurso[i].id
      );
    for (let j in compComp) {
      if (idsComponentesCompetenciasDoCurso.indexOf(compComp[j]) == -1)
        idsComponentesCompetenciasDoCurso.push(compComp[j]);
    }
  }
  let componentesCompetenciasDoCurso = idsComponentesCompetenciasDoCurso
    .map((id) => dbComponentesCompetencias.componenteCompetencias(id))
    .sort((a, b) =>
      a.tipo == b.tipo ? a.nome.localeCompare(b.nome) : a.tipo - b.tipo
    );
  idsComponentesCompetenciasDoCurso = componentesCompetenciasDoCurso.map(
    (c) => c.id
  );

  // Recupera os componentes curriculares do curso
  let componentesCurricularesDoCurso = dbComponentesCurriculares_Cursos
    .componentesCurriculares(curso.id)
    .map((c) => ({
      ...dbComponentesCurriculares.componenteCurricular(
        c.idComponenteCurricular
      ),
      semestre: c.semestre,
    }))
    .map((c) => ({
      ...c,
      componentesCompetencias:
        dbComponentesCompetencias_ComponentesCurriculares.componentesCompetencias(
          c.id
        ),
    }))
    .sort((a, b) =>
      a.semestre == b.semestre
        ? a.nome.localeCompare(b.nome)
        : a.semestre - b.semestre
    );

  // Recupera as competências desses componentes curriculares
  for (let i in componentesCurricularesDoCurso) {
    let comp = [];
    let idsCompComp = componentesCurricularesDoCurso[i].componentesCompetencias;
    for (let j in idsCompComp) {
      let idsCompetencias = dbComponentesCompetencias_Competencias.competencias(
        idsCompComp[j]
      );
      for (let k in idsCompetencias) {
        if (comp.indexOf(idsCompetencias[k]) == -1)
          comp.push(idsCompetencias[k]);
      }
    }
    componentesCurricularesDoCurso[i].competencias = comp;
  }

  // Monta o cabeçalho da tabela
  tabelaDados.innerHTML = `
    <thead>
      <tr>
        <th>Componente Curricular</th>
        <th><div>Semestre</div></th>
        ${componentesCompetenciasDoCurso
          .map(
            (c) =>
              `<th scope="col"><div>${
                iniciaisTiposComponentesCompetencias[c.tipo] + " - " + c.nome
              }</div></th>`
          )
          .join("")}
      </tr>
    </thead>
    `;

  // Monta o corpo da tabela
  let corpoTabela = "<tbody>";
  for (let i in componentesCurricularesDoCurso) {
    corpoTabela += `<tr><td>${componentesCurricularesDoCurso[i].nome}</td>`;
    corpoTabela += `<td>${componentesCurricularesDoCurso[i].semestre}</td>`;
    corpoTabela += idsComponentesCompetenciasDoCurso
      .map(
        (c) =>
          `<td>${
            componentesCurricularesDoCurso[i].componentesCompetencias.indexOf(
              c
            ) != -1
              ? '<img src="./imagens/check.svg" />'
              : ""
          }</td>`
      )
      .join("");
    corpoTabela += "</tr>";
  }
  corpoTabela += "</tbody>";
  tabelaDados.innerHTML += corpoTabela;
};

// Mostra a tabela de competências
mostraTabela();
