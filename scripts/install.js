let usuario = localStorage.getItem("usuario");
let ultimoAcesso = localStorage.getItem("ultimoAcesso");

localStorage.clear();

localStorage.setItem("usuario", usuario);
localStorage.setItem("ultimoAcesso", ultimoAcesso);

dbUsuarios.install();
logInstall.innerHTML += "<p>Usuários.</p>";

dbCursos.install();
logInstall.innerHTML += "<p>Cursos.</p>";

dbCursosUsuarios.install();
logInstall.innerHTML += "<p>Cursos dos usuários.</p>";

dbAreas.install();
logInstall.innerHTML += "<p>Áreas.</p>";

dbCompetencias.install();
logInstall.innerHTML += "<p>Competências.</p>";

dbCompetenciasCursos.install();
logInstall.innerHTML += "<p>Vínculos das ompetências aos cursos.</p>";

dbCHA.install();
logInstall.innerHTML += "<p>Conhecimentos, habilidades e atitudes.</p>";

dbCHACompetencias.install();
logInstall.innerHTML +=
  "<p>Vínculos dos conhecimentos, habilidades e atitudes às competências.</p>";
