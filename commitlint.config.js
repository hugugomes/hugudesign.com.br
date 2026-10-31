// Conventional Commits (AGENTS.md §2.3): feat, fix, chore, docs, refactor, test, perf, style…
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Mensagens em português usam acentos e maiúsculas em nomes próprios.
    "subject-case": [0],
    "body-max-line-length": [0],
    "footer-max-line-length": [0],
  },
};
