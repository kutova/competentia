appName.innerHTML = "Competentia";

let tiposUsuario = ["Administrador", "Professor"];
let graus = ["Bacharelado", "Licenciatura", "Tecnólogo"];
let modalidades = ["Presencial", "A Distância"];
let tiposCompetencia = ["Humanística", "Técnica", "Comportamental"];
let statusCurso = ["Ativo", "Arquivado"];
let tiposComponentesCurriculares = [
  "Disciplina teórica",
  "Disciplina prática",
  "TCC",
  "Estágio",
  "Projeto",
  "ACG",
];

let tiposComponentesCompetencias = ["Conhecimento", "Habilidade", "Atitude"];
let artigosTiposComponentesCompetencias = ["o", "a", "a"];
let iniciaisTiposComponentesCompetencias = ["C", "H", "A"];

let listaOpcoesDoMenu = [
  { url: "index.html", titulo: "Painel de Cursos" },
  { url: "curso.html", titulo: "Curso" },
  { url: "competencias.html", titulo: "Competências" },
  {
    url: "componentes-competencias.html",
    titulo: "Componentes das Competências",
  },
  {
    url: "componentes-curriculares.html",
    titulo: "Componentes Curriculares",
  },
  {
    titulo: "Relatórios",
    lista: [
      { url: "relatorio-competencias.html", titulo: "Competências" },
      {
        url: "tabela-componentes-competencias.html",
        titulo: "Componentes de Competência X Competências",
      },
      { url: "relatorio-curriculo.html", titulo: "Componentes Curriculares" },
      {
        url: "matriz-componentes.html",
        titulo: "Componentes Curriculares X Componentes de Competência",
      },
      {
        url: "tabela-componentes-curriculares.html",
        titulo: "Componentes Currilares X Competências",
      },
    ],
  },
];
