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
// Mostra a tabela de competências do curso
// --------------------------------------------------------------
let mostraTabela = function () {
  corpoTabela.innerHTML = "";
  let competencias = competenciasCursosService.competencias(curso.id);
  competencias.sort((a, b) => a.codigo.localeCompare(b.codigo));
  competencias = competencias.map((c) => ({
    codigo: c.codigo,
    ...competenciasService.competencia(c.id),
  }));
  competencias.forEach((competencia) => {
    corpoTabela.innerHTML += `
    <tr>
      <td>${competencia.codigo}</td>
      <td>${competencia.nome}</td>
      <td>${tiposCompetencia[competencia.tipo]}</td>
      <td class="clicavel">
        <span class="simbolo" onclick="exibeCurso('${competencia.id}')">
          <img src="./imagens/visibility.svg" />
        </span>
        <span class="simbolo" onclick="editaCurso('${competencia.id}')">
          <img src="./imagens/edit.svg" />
        </span>
        <span class="simbolo" onclick="apagaCurso('${competencia.id}')">
          <img src="./imagens/delete.svg" />
        </span>
      </td>
    </tr>
  `;
  });
};

mostraTabela();
