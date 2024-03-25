let usuario = localStorage.getItem("usuario");
let ultimoAcesso = localStorage.getItem("ultimoAcesso");

localStorage.clear();

localStorage.setItem("usuario", usuario);
localStorage.setItem("ultimoAcesso", ultimoAcesso);

usuariosService.install();
logInstall.innerHTML += "<p>Usuários... OK</p>";

cursosService.install();
logInstall.innerHTML += "<p>Cursos... OK</p>";

cursosUsuariosService.install();
logInstall.innerHTML += "<p>Cursos dos usuários... OK</p>";

areasService.install();
logInstall.innerHTML += "<p>Áreas... OK</p>";

competenciasService.install();
logInstall.innerHTML += "<p>Competências... OK</p>";

competenciasCursosService.install();
logInstall.innerHTML += "<p>Competências do curso... OK</p>";
