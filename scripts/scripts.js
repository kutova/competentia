usuario = JSON.parse(
  localStorage.getItem("usuario") || "{nome: 'Usuário', tipo: 'Professor'}"
);
userName.innerHTML = usuario.nome;

// Testa se está logado e quando foi o último acesso
let ultimoAcesso = parseInt(localStorage.getItem("ultimoAcesso")) || 0;
if (new Date().getTime() - ultimoAcesso > 1800000) {
  let pathName = document.location.pathname.split("/");
  pagina = pathName.pop();
  if (pagina != "login.html") {
    window.location = "./login.html";
  }
} else {
  localStorage.setItem("ultimoAcesso", new Date().getTime());
}

// Inclui as opções de administrador
if (usuario.tipo == 0)
  topMenu.innerHTML =
    `<li>
    <details class="dropdown">
        <summary class="secondary">Administrador</summary>
        <!-- role="button"  -->
        <ul>
        <li><a href="./admin_usuarios.html">Usuários</a></li>
        <li><a href="./admin_areas.html">Áreas</a></li>
        <li><a href="./admin_cursos.html">Cursos</a></li>
        </ul>
    </details>
    </li>` + topMenu.innerHTML;
else
  topMenu.innerHTML =
    `<li>${tiposUsuario[usuario.tipo]}<\li` + topMenu.innerHTML;

// Atribui a funcionalidade de saída do sistema
btnLogout.onclick = () => {
  localStorage.removeItem("ultimoAcesso");
  localStorage.removeItem("usuario");
  window.location = "./login.html";
};
