// --------------------------------------------------------
// Carrega os cursos do painel de cursos (página principal)
// --------------------------------------------------------
cursos = dbCursos.cursos();
cursos.sort((a, b) => a.nome.localeCompare(b.nome));

// --------------------------------------------------------
// Carrega os cursos aos quais o usuário tem acesso
// --------------------------------------------------------
let cursosDoUsuario = dbCursos_Usuarios.cursosUsuario(usuarioLogado.id);

cursos.forEach((c) => {
  if (
    cursosDoUsuario.findIndex((c1) => c1.id == c.id) >= 0 ||
    usuarioLogado.tipo == 0
  )
    painelCursos.innerHTML += `
    <article 
      onclick="abreCurso(${c.id})" 
      ${c.status == 0 ? 'class="pico-background-slate-100"' : ""}>
        ${c.nome} &nbsp; 
        ${
          c.status == 0
            ? '<img src="./imagens/inventory.svg" title="Arquivado" />'
            : ""
        }
    </article>`;
});

let abreCurso = function (id) {
  window.location = "./curso.html?curso=" + id;
};
