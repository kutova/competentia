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

let usuarios = dbCursos_Usuarios.usuarios(curso.id);
editoresCurso.innerHTML = usuarios
  .map((id) => dbUsuarios.usuario(id).nome)
  .join("<br />");

let linksMenu = document.querySelectorAll(".linkDoCurso");
for (let i in linksMenu) {
  linksMenu[i].href += "?curso=" + curso.id;
}

// --------------------------------------------------------------
// Mostra os dados do curso
// --------------------------------------------------------------
grauCurso.innerHTML = graus[curso.grau];
modalidadeCurso.innerHTML = modalidades[curso.modalidade];
semestresCurso.innerHTML = curso.semestres;
areaCurso.innerHTML = dbAreas.area(curso.idArea).nome;
versaoCurso.innerHTML = curso.versao;
anoCurso.innerHTML = curso.ano;
observacoesCurso.innerHTML = curso.observacoes;
