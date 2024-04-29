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
let mostraTabela = function () {
  // Recupera as competências do curso
  let competenciasDoCurso = dbCompetencias_Cursos
    .competencias(curso.id)
    .map((c) => ({
      ...dbCompetencias.competencia(c.id),
      codigo: c.codigo,
    }))
    .sort((a, b) => a.codigo.localeCompare(b.codigo));

  // Recupera os componentes de competência
  let componentesCompetenciasDoCurso = [];
  competenciasDoCurso.forEach((competencia) => {
    let lista = dbComponentesCompetencias_Competencias.componentesCompetencia(
      competencia.id
    );
    for (let j in lista) {
      let k = componentesCompetenciasDoCurso.findIndex(
        (cc) => cc.id == lista[j]
      );
      if (k == -1)
        componentesCompetenciasDoCurso.push({
          id: lista[j],
          competencias: [competencia.id],
        });
      else componentesCompetenciasDoCurso[k].competencias.push(competencia.id);
    }
  });
  componentesCompetenciasDoCurso = componentesCompetenciasDoCurso
    .map((cc) => ({
      ...dbComponentesCompetencias.componenteCompetencias(cc.id),
      competencias: cc.competencias,
    }))
    .sort((a, b) =>
      a.tipo == b.tipo ? a.nome.localeCompare(b.nome) : a.tipo - b.tipo
    );

  // Monta o cabeçalho da tabela
  let idsCompetencias = competenciasDoCurso.map((c) => c.id);
  tabelaDados.innerHTML = `
    <thead>
      <tr>
        <th>Componente de Competência</th>
        <th><div>Tipo</div></th>
        ${competenciasDoCurso
          .map(
            (c) =>
              `<th scope="col"><div>${c.codigo + " - " + c.nome}</div></th>`
          )
          .join("")}
      </tr>
    </thead>
    `;

  // Monta o corpo da tabela
  let corpoTabela = "<tbody>";
  for (let i in componentesCompetenciasDoCurso) {
    corpoTabela += `<tr><td>${componentesCompetenciasDoCurso[i].nome}</td>`;
    corpoTabela += `<td>${
      iniciaisTiposComponentesCompetencias[
        componentesCompetenciasDoCurso[i].tipo
      ]
    }</td>`;
    corpoTabela += idsCompetencias
      .map(
        (c) =>
          `<td>${
            componentesCompetenciasDoCurso[i].competencias.indexOf(c) != -1
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
