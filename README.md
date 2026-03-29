# Postgrad Companion

Hub academico bilingue para acompanhar estudos da pos em IA e Ciencia de Dados, com foco pratico em execucao de projetos.

## Direcao atual do projeto

### Foco principal (agora)
- Organizacao pessoal da pos.
- Portfolio tecnico publico com entregas reais.
- Ritmo de pratica com registro de progresso semanal.

### Foco secundario (depois)
- Evoluir para produto colaborativo entre colegas, se fizer sentido.

## Objetivos de valor

- Acelerar producao de projetos da pos com trilhas e caderno por modulo.
- Fortalecer networking com historico tecnico publico (GitHub + publicacoes).
- Manter consistencia de estudo com acompanhamento de tarefas e marcos.

## Stack

- Next.js App Router (frontend + backend)
- Supabase Postgres (dados e historico)
- Vercel (deploy e cron)

## Funcionalidades ja entregues

- Home com resumo estrategico e timeline academica.
- Catalogo de disciplinas e repositorios curados.
- Feed de atualizacoes de repositorios.
- Calendario consolidado da turma.
- Caderno por modulo com checklist de tarefas.
- API interna para subjects, updates, progress, schedule e notebook.
- UI bilingue PT-BR e EN.

## Estrutura atual do projeto

```text
src/
  app/
    page.tsx
    subjects/page.tsx
    updates/page.tsx
    schedule/page.tsx
    progress/page.tsx
    api/
      subjects/route.ts
      updates/route.ts
      progress/route.ts
      schedule/route.ts
      notebook/route.ts
      cron/sync/route.ts
  components/
    hero.tsx
    language-switcher.tsx
    locale-provider.tsx
    top-nav.tsx
  lib/
    i18n.ts
    types.ts
    data-store.ts
    supabase-admin.ts
    data/seed.ts
supabase/
  schema.sql
  seed.sql
docs/
  architecture.md
  supabase-setup.md
  linkedin-template.md
```

## Rodando localmente

1. Instale dependencias.

```bash
npm install
```

2. Crie `.env.local` a partir de `.env.example`.

```bash
cp .env.example .env.local
```

3. Configure variaveis obrigatorias.
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY` (leitura)
- `SUPABASE_SERVICE_ROLE_KEY` (escrita server-side)
- `NOTEBOOK_ADMIN_SECRET` (protecao de POST/PATCH em `/api/notebook`)

4. Rode o app.

```bash
npm run dev
```

5. Acesse `http://localhost:3000`.

## Seguranca

- Nunca commitar segredos no repositório.
- `SUPABASE_SERVICE_ROLE_KEY` deve existir apenas no servidor/ambiente privado.
- Operacoes de escrita no caderno usam `x-admin-secret` no backend.
- Sem `SUPABASE_SERVICE_ROLE_KEY`, a aplicacao continua em modo leitura remota/fallback.

## Fluxo de uso recomendado

1. Definir foco semanal por modulo no caderno.
2. Converter foco em tarefas objetivas.
3. Executar mini entregas (codigo, notebook, benchmark, demo).
4. Registrar update no portfolio publico.
5. Revisar status no fim da semana.

## Backlog orientado (pratica primeiro)

### Agora (prioridade alta)
- [x] Leitura remota no Supabase com fallback local.
- [x] Calendario da pos integrado.
- [x] Caderno com edicao de status/resumo/foco.
- [x] Atualizacao de status de tarefas pela interface.
- [ ] Criacao de novas tarefas no caderno via UI.
- [ ] Edicao de titulo das tarefas via UI.
- [ ] Melhor feedback de erro/sucesso por acao.

### Proxima fase
- [ ] Autenticacao real de usuario (substituir segredo estatico).
- [ ] Privacidade por usuario (RLS por owner_id).
- [ ] Historico de alteracoes no caderno.
- [ ] Tela de projetos com vinculo por modulo.

### Fase de produto futuro
- [ ] Compartilhamento opcional de caderno entre colegas.
- [ ] Espaco de networking e feedback de projetos.
- [ ] Curadoria colaborativa de repositorios.

## Checklist tecnico antes de publicar entregas

- `npm run lint`
- `npm run build`
- Verificar rotas `/api/notebook`, `/api/schedule` e `/api/subjects`
- Revisar conteudo bilingue PT-BR/EN

## Documentacao adicional

- [docs/architecture.md](docs/architecture.md)
- [docs/supabase-setup.md](docs/supabase-setup.md)
- [docs/linkedin-template.md](docs/linkedin-template.md)
