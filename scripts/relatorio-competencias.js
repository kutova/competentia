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
              <th class="dadosExtras escondido">Descrição</th>
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
      <td class="dadosExtras escondido">${cc.descricao}</td>
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

// --------------------------------------------------------------
// Gerencia a visualização da coluna de descrição
// --------------------------------------------------------------
btnMostraDescricao.onchange = () => {
  let celulas = document.querySelectorAll(".dadosExtras");
  if (btnMostraDescricao.checked) {
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

  let competencias = dbCompetencias_Cursos.competencias(curso.id);
  competencias.sort((a, b) => a.codigo.localeCompare(b.codigo));
  competencias = competencias.map((c) => ({
    codigo: c.codigo,
    ...dbCompetencias.competencia(c.id),
  }));
  competencias.forEach((competencia) => {
    let listaComponentesCompetencias = dbComponentesCompetencias_Competencias
      .componentesCompetencia(competencia.id)
      .map((cc) => dbComponentesCompetencias.componenteCompetencias(cc))
      .sort((a, b) =>
        a.tipo == b.tipo ? a.nome.localeCompare(b.nome) : a.tipo - b.tipo
      );
    doc.autoTable({
      head: [
        [
          {
            content: competencia.codigo + " - " + competencia.nome,
            colSpan: 4,
          },
        ],
        ["Nome", "Tipo", "Área", "Descrição"],
      ],
      body: listaComponentesCompetencias.map((c) => [
        c.nome,
        tiposComponentesCompetencias[c.tipo],
        dbAreas.area(c.area).nome,
        c.descricao,
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
    });
  });
  // Total page number plugin only available in jspdf v1.0+
  if (typeof doc.putTotalPages === "function") {
    doc.putTotalPages(totalPagesExp);
  }
  doc.save("competencias.pdf");
};

// --------------------------------------------------------------
// Mostra a tabela de competências
// --------------------------------------------------------------
mostraTabela();
