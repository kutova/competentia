let usuario = localStorage.getItem("usuario");
let ultimoAcesso = localStorage.getItem("ultimoAcesso");

localStorage.clear();

localStorage.setItem("usuario", usuario);
localStorage.setItem("ultimoAcesso", ultimoAcesso);

dbUsuarios.install();
logInstall.innerHTML += "<p>Usuários.</p>";

dbCursos.install();
logInstall.innerHTML += "<p>Cursos.</p>";

dbCursos_Usuarios.install();
logInstall.innerHTML += "<p>Cursos dos usuários.</p>";

dbAreas.install();
logInstall.innerHTML += "<p>Áreas.</p>";

dbCompetencias.install();
logInstall.innerHTML += "<p>Competências.</p>";

dbCompetencias_Cursos.install();
logInstall.innerHTML += "<p>Vínculos das ompetências aos cursos.</p>";

dbComponentesCompetencias.install();
logInstall.innerHTML += "<p>Componentes da competência.</p>";

dbComponentesCompetencias_Competencias.install();
logInstall.innerHTML +=
  "<p>Vínculos dos conhecimentos, habilidades e atitudes às competências.</p>";

dbComponentesCompetencias_ComponentesCurriculares.install();
logInstall.innerHTML +=
  "<p>Vínculos dos conhecimentos, habilidades e atitudes aos componentes curriculares.</p>";

dbComponentesCurriculares.install();
logInstall.innerHTML += "<p>Componentes curriculares.</p>";

dbComponentesCurriculares_Cursos.install();
logInstall.innerHTML +=
  "<p>Vínculso dos componentes curriculares aos cursos.</p>";
