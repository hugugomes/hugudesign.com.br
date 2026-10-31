/**
 * Contrato de arquitetura (AGENTS.md §4).
 * Roda com `npm run arch`. Uma regra quebrada faz a CI falhar.
 * @type {import('dependency-cruiser').IConfiguration}
 */
module.exports = {
  forbidden: [
    {
      name: "lib-nao-importa-ui",
      comment: "src/lib é lógica pura: não pode depender de componentes, layouts ou páginas.",
      severity: "error",
      from: { path: "^src/lib" },
      to: { path: "^src/(components|layouts|pages)" },
    },
    {
      name: "componentes-nao-importam-paginas",
      comment: "Componentes e layouts são reutilizáveis: não podem depender de páginas.",
      severity: "error",
      from: { path: "^src/(components|layouts)" },
      to: { path: "^src/pages" },
    },
    {
      name: "i18n-e-config-sao-folhas",
      comment: "src/i18n e src/config só guardam dados: não importam UI.",
      severity: "error",
      from: { path: "^src/(i18n|config)" },
      to: { path: "^src/(components|layouts|pages)" },
    },
    {
      name: "sem-ciclos",
      severity: "error",
      from: {},
      to: { circular: true },
    },
    {
      name: "sem-orfaos",
      comment: "Arquivo em src/lib que ninguém usa é código morto.",
      severity: "warn",
      from: { orphan: true, path: "^src/lib" },
      to: {},
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    includeOnly: "^src",
    tsPreCompilationDeps: true,
    tsConfig: { fileName: "tsconfig.json" },
    enhancedResolveOptions: {
      extensions: [".ts", ".js", ".mjs", ".astro"],
    },
  },
};
