// --------------------------------------------------------
// Carrega os cursos do painel de cursos (página principal)
// --------------------------------------------------------
cursos = cursosService.cursos();
cursos.sort((a, b) => a.nome.localeCompare(b.nome));

cursos.forEach((c) => {
  painelCursos.innerHTML += `
    <article onclick="abreCurso(${c.id})">
      ${c.nome}
    </article>`;
});

let abreCurso = function (id) {
  window.location = "./curso.html?id=" + id;
};
