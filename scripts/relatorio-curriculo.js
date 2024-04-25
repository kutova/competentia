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
                <th scope="col" class="dadosExtras escondido">Componentes de competências</th>
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
                    <td class="dadosExtras escondido">${dbComponentesCompetencias_ComponentesCurriculares
                      .componentesCompetencias(cc.id)
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
                        (c) =>
                          c.nome +
                          " (" +
                          iniciaisTiposComponentesCompetencias[c.tipo] +
                          ")"
                      )
                      .join(", ")}</td>
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

// --------------------------------------------------------------
// Gerencia a visualização da coluna de componentes de competências
// --------------------------------------------------------------
btnMostraDetalhes.onchange = () => {
  let celulas = document.querySelectorAll(".dadosExtras");
  if (btnMostraDetalhes.checked) {
    celulas.forEach((c) => c.classList.remove("escondido"));
  } else {
    celulas.forEach((c) => c.classList.add("escondido"));
  }
};

// --------------------------------------------------------------
// Cria a funcionalidade de impressão do relatório em PDF
// --------------------------------------------------------------
btnImprimir.onclick = () => {
  let doc = new jspdf.jsPDF({
    orientation: "p",
    unit: "pt",
    format: "a4",
  });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  let totalPagesExp = "{total_pages_count_string}";

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

    doc.autoTable({
      head: [
        [
          {
            content: sem + "º Semestre",
            colSpan: 5,
          },
        ],
        [
          "Componente Curricular",
          "CH",
          "Tipo",
          "Área",
          "Componentes de Competência",
        ],
      ],
      body: listaComponentesSemestre.map((c) => [
        c.nome,
        c.cargaHoraria,
        tiposComponentesCurriculares[c.tipo],
        dbAreas.area(c.area).nome,

        dbComponentesCompetencias_ComponentesCurriculares
          .componentesCompetencias(c.id)
          .map((idComponenteCompetencia) =>
            dbComponentesCompetencias.componenteCompetencias(
              idComponenteCompetencia
            )
          )
          .sort((a, b) =>
            a.tipo == b.tipo ? a.nome.localeCompare(b.nome) : a.tipo - b.tipo
          )
          .map(
            (cc) =>
              cc.nome +
              " (" +
              iniciaisTiposComponentesCompetencias[cc.tipo] +
              ")"
          )
          .join(", "),
      ]),
      willDrawPage: function (data) {
        doc.setFontSize(18);
        doc.text("COMPETENTIA - " + curso.nome, 40, 40);
      },
      didDrawPage: function (data) {
        // Footer
        var str = "Página " + doc.internal.getNumberOfPages();
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === "function") {
          str = str + " de " + totalPagesExp;
        }
        doc.setFontSize(10);

        // jsPDF 1.4+ uses getHeight, <1.4 uses .height
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10);
      },
      margin: { top: 60 },
      pageBreak: "avoid",
      rowPageBreak: "auto",
      bodyStyles: { valign: "top" },
      styles: {
        fontSize: 8,
      },
    });
  }
  // Total page number plugin only available in jspdf v1.0+
  if (typeof doc.putTotalPages === "function") {
    doc.putTotalPages(totalPagesExp);
  }
  doc.save("curriculo.pdf");
};

// --------------------------------------------------------------
// Mostra a tabela de competências
// --------------------------------------------------------------
mostraTabela();
