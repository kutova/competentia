let params = new URLSearchParams(document.location.search);
let idCurso = params.get("id");

let curso = cursosService.curso(idCurso);
nomeCurso.innerHTML = curso.nome;
grauCurso.innerHTML = graus[curso.grau];
modalidadeCurso.innerHTML = modalidades[curso.modalidade];
peridosCurso.innerHTML = curso.periodos;
areaCurso.innerHTML = areasService.area(curso.area).nome;
let usuarios = cursosUsuariosService.usuarios(curso.id);
editoresCurso.innerHTML = usuarios
  .map((id) => usuariosService.usuario(id).nome)
  .join("<br />");

let linksMenu = document.querySelectorAll(".linkDoCurso");
for (i in linksMenu) {
  linksMenu[i].href += "?id=" + idCurso;
}
