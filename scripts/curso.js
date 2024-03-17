let params = new URLSearchParams(document.location.search);
let idCurso = params.get("id");

let curso = cursosService.curso(idCurso);
nomeCurso.innerHTML = curso.nome;
