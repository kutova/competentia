// --------------------------------------------------------
// Identifica o usuário logado (se houver) e prepara a sua interface
// --------------------------------------------------------
// Testa se há um usuário logado
let pathName = document.location.pathname.split("/");
let pagina = pathName.pop();
if (!localStorage.getItem("usuario")) {
  if (pagina != "login.html") window.location = "./login.html";
}

// Testa se não ocorreu timeout do login
let ultimoAcesso = parseInt(localStorage.getItem("ultimoAcesso")) || 0;
if (new Date().getTime() - ultimoAcesso > 1800000) {
  if (pagina != "login.html") window.location = "./login.html";
} else localStorage.setItem("ultimoAcesso", new Date().getTime()); // Atualiza o momento do último acesso

let usuarioLogado;
if (pagina != "login.html") {
  // Recupera os dados do usuário
  usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
  nomeUsuarioLogado.innerHTML = usuarioLogado.nome;

  // Acrescenta o menu de Administrador, se for o caso
  if (usuarioLogado.tipo == 0)
    topMenu.innerHTML =
      `<li>
    <details class="dropdown">
        <summary class="secondary">Administrador</summary>
        <!-- role="button"  -->
        <ul>
        <li><a href="./admin-usuarios.html">Usuários</a></li>
        <li><a href="./admin-areas.html">Áreas</a></li>
        <li><a href="./admin-cursos.html">Cursos</a></li>
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
}

// --------------------------------------------------------
// Carrega o curso do URL, se existir e o usuário tiver acesso a ele
// Caso contrário, redireciona para a página principal
// --------------------------------------------------------
let permissaoUsuario = -1;
function carregaCursoDoURL() {
  let params = new URLSearchParams(document.location.search);
  let idCurso = params.get("curso");
  let cursosDoUsuario = dbCursos_Usuarios.cursosUsuario(usuarioLogado.id);

  let curso = dbCursos.curso(idCurso);
  if (
    curso == null ||
    (usuarioLogado.tipo != 0 &&
      cursosDoUsuario.findIndex((c) => c.id == idCurso) == -1)
  )
    window.location = "./index.html";

  // Define a permissão do usuário para este curso
  permissaoUsuario = dbCursos_Usuarios.permissao(usuarioLogado.id, curso.id);

  return curso;
}

// --------------------------------------------------------
// Cria o menu de cursos, quando for o caso
// --------------------------------------------------------
if (typeof navMenuCursos != "undefined") {
  let params = new URLSearchParams(document.location.search);
  let idCurso = params.get("curso");
  navMenuCursos.innerHTML = "<ul>";
  navMenuCursos.innerHTML += listaOpcoesDoMenu
    .map((o) =>
      typeof o.url != "undefined"
        ? `
        <li>
          <a href="./${o.url}?curso=${idCurso}" ${
            pagina != o.url ? 'class="secondary"' : ""
          }>
            ${o.titulo}
          </a>
        </li>
      `
        : `
        <li>
          <details open>
            <summary>${o.titulo}</summary>
            <ul>
              ${o.lista
                .map(
                  (s) =>
                    `<li class="submenu">
                      <a
                        class="linkDoCurso${
                          pagina != s.url ? " secondary" : ""
                        }"
                        href="./${s.url}"
                        >${s.titulo}</a
                      >
                    </li>`
                )
                .join("")}
            </ul>
          </details>
        </li>
      `
    )
    .join("");

  navMenuCursos.innerHTML += "</ul>";
}

// --------------------------------------------------------
// Controla o menu lateral em telas pequenas
// --------------------------------------------------------
let controleMenu = document.querySelector("#menuToggle");
if (controleMenu) {
  controleMenu.onclick = () =>
    document.querySelector("#sideMenu").classList.toggle("ativo");
}

// --------------------------------------------------------
// Remove os acentos de uma string
// --------------------------------------------------------
let desacentua = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
