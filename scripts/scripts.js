// --------------------------------------------------------
// Identifica o usuário logado (se houver) e prepara a sua interface
// --------------------------------------------------------
// Testa se há um usuário logado
let pathName = document.location.pathname.split("/");
pagina = pathName.pop();
if (!localStorage.getItem("usuario")) {
  if (pagina != "login.html") window.location = "./login.html";
}

// Testa se não ocorreu timeout do login
let ultimoAcesso = parseInt(localStorage.getItem("ultimoAcesso")) || 0;
if (new Date().getTime() - ultimoAcesso > 1800000) {
  if (pagina != "login.html") window.location = "./login.html";
} else localStorage.setItem("ultimoAcesso", new Date().getTime()); // Atualiza o momento do último acesso

// Recupera os dados do usuário
let usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
nomeUsuarioLogado.innerHTML = usuarioLogado.nome;

// Acrescenta o menu de Administrador, se for o caso
if (usuarioLogado.tipo == 0)
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
    `<li>${tiposUsuario[usuarioLogado.tipo]}<\li` + topMenu.innerHTML;

// Atribui a funcionalidade de saída (logout) do sistema
btnLogout.onclick = () => {
  localStorage.removeItem("ultimoAcesso");
  localStorage.removeItem("usuario");
  window.location = "./login.html";
};

// --------------------------------------------------------
// Carrega o curso do URL, se existir e o usuário tiver acesso a ele
// Caso contrário, redireciona para a página principal
// --------------------------------------------------------
function carregaCursoDoURL() {
  let params = new URLSearchParams(document.location.search);
  let idCurso = params.get("curso");
  let cursosDoUsuario = cursosUsuariosService.cursosUsuario(usuarioLogado.id);

  let curso = cursosService.curso(idCurso);
  if (
    curso == null ||
    (usuarioLogado.tipo != 0 &&
      cursosDoUsuario.findIndex((c) => c.id == idCurso) == -1)
  )
    window.location = "./index.html";

  return curso;
}

// --------------------------------------------------------
// Controla o menu lateral em telas pequenas
// --------------------------------------------------------
let controleMenu = document.querySelector("#menuToggle");
if (controleMenu) {
  controleMenu.onclick = () =>
    document.querySelector("#sideMenu").classList.toggle("ativo");
}
