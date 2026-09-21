---
name: devforge-sync-manifest
description: Regenera MANIFEST.md a partir da lista real de arquivos do repositório, mantendo a ordem alfabética por pasta. Use quando o usuário pedir "atualiza o manifest", "sincroniza o manifest", ou como passo final de qualquer skill devforge-* que tenha criado arquivos novos.
---

# devforge-sync-manifest

`MANIFEST.md` é a lista plana e alfabética de todos os arquivos versionados relevantes do repositório (documentação e conteúdo — não `node_modules`, `dist`, `.git`, nem o que estiver no `.gitignore`).

## Passos

1. **Listar todos os arquivos versionáveis** do repositório, excluindo o que está no `.gitignore` e a própria pasta `.git` e `.claude`.

2. **Comparar com as entradas atuais de `MANIFEST.md`** — identificar arquivos novos (adicionar), removidos (remover) e renomeados (atualizar o caminho).

3. **Reescrever `MANIFEST.md`** mantendo o mesmo formato: uma entrada Markdown por arquivo, em crase, caminho relativo à raiz, ordenado alfabeticamente (a ordenação atual intercala pastas e arquivos de raiz por ordem alfabética simples — preservar esse critério, não agrupar por pasta com cabeçalhos).

4. **Não incluir** arquivos de configuração do próprio Claude Code (`.claude/`) nem artefatos de build/dependências no manifest — ele documenta o conteúdo de estudo do repo, não tooling.

5. **Rodar como último passo** de qualquer fluxo (`devforge-new-vacancy`, `devforge-new-challenge`, `devforge-interview-retro`, `devforge-study-plan`) que tenha criado arquivo novo, em vez de o usuário precisar pedir separadamente.
