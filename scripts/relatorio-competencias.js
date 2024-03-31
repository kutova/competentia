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
let mostraTabela = function (idCompetencia) {
  if (idCompetencia == undefined) idCompetencia = -1;
  listaCompetencias.innerHTML = "";
  let competencias = dbCompetencias_Cursos.competencias(curso.id);
  competencias.sort((a, b) => a.codigo.localeCompare(b.codigo));
  competencias = competencias.map((c) => ({
    codigo: c.codigo,
    ...dbCompetencias.competencia(c.id),
  }));
  competencias.forEach((competencia) => {
    let listaComponentesCompetencias =
      dbComponentesCompetencias_Competencias.componentesCompetencia(
        competencia.id
      );
    listaCompetencias.innerHTML += `
    <article>
      <details open>
        <summary>${competencia.codigo} - ${competencia.nome}</summary>
        <table class="tabelaComponentesCompetenciasComp">
          <thead>
            <tr>
              <th>Componente</th>
              <th>Tipo</th>
              <th>Área</th>
            </tr>
          </thead>
          <tbody>
            ${listaComponentesCompetencias
              .map((idComponenteCompetencia) =>
                dbComponentesCompetencias.componenteCompetencias(
                  idComponenteCompetencia
                )
              )
              .sort((a, b) =>
                a.tipo == b.tipo
                  ? a.nome.localeCompare(b.nome)
                  : a.tipo - b.tipo
              )
              .map(
                (cc) => `
    <tr>
      <td>${cc.nome}</td>
      <td>${tiposComponentesCompetencias[cc.tipo]}</td>
      <td>${dbAreas.area(cc.area).nome}</td>
    </tr>`
              )
              .join("")}
          </tbody>
        </table>
      
      </details>
    </article>
  `;
  });
};

// Mostra a tabela de competências
mostraTabela();
