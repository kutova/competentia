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
for (i in linksMenu) {
  linksMenu[i].href += "?curso=" + curso.id;
}

// --------------------------------------------------------------
// Mostra a tabela de perídos do curso e seus componentes curriculares
// --------------------------------------------------------------
let mostraTabela = function () {
  let listaComponentesCurriculares = dbComponentesCurriculares_Cursos
    .componentesCurriculares(curso.id)
    .map((componenteCurricular_Curso) => ({
      ...dbComponentesCurriculares.componenteCurricular(
        componenteCurricular_Curso.idComponenteCurricular
      ),
      semestre: componenteCurricular_Curso.semestre,
    }))
    .sort((a, b) =>
      a.semestre == b.semestre
        ? a.nome.localeCompare(b.nome)
        : a.semestre - b.semestre
    );

  for (sem = 1; sem <= curso.semestres; sem++) {
    let listaComponentesSemestre = listaComponentesCurriculares.filter(
      (c) => c.semestre == sem
    );

    listaPeriodos.innerHTML += `
    <article>
      <details open>
        <summary>${sem}&ordm; Semestre</summary>
        <table class="tabelaComponentesCompetenciasComp">
          <thead>
            <tr>
              <th>Componente Curricular</th>
                <th scope="col">CH</th>
                <th scope="col">Tipo</th>
                <th scope="col">Área</th>
            </tr>
          </thead>
          <tbody>
            ${listaComponentesSemestre
              .map(
                (cc) => `
                    <tr>
                    <td>${cc.nome}</td>
                    <td>${cc.cargaHoraria}</td>
                    <td>${tiposComponentesCurriculares[cc.tipo]}</td>
                    <td>${dbAreas.area(cc.area).nome}</td>
                    </tr>`
              )
              .join("")}
          </tbody>
        </table>
      
      </details>
    </article>
  `;
  }
};

// Mostra a tabela de competências
mostraTabela();
