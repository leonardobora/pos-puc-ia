# Postgrad Companion

Hub academico bilíngue para acompanhar estudos de pós-graduação em Inteligência Artificial e Ciência de Dados.

## Objetivo

- Organizar disciplinas e trilhas técnicas em um único lugar.
- Curar repositórios open source relevantes para cada assunto.
- Monitorar atualizações de repositórios para manter o estudo vivo.
- Registrar progresso pessoal e gerar material para publicação no LinkedIn.

## Stack

- Next.js App Router (frontend + backend)
- Vercel (deploy e cron)
- Supabase (Postgres para dados e histórico)

## Escopo do MVP

- Disciplinas iniciais: Agentes Inteligentes, Large Language Models e Visão Computacional.
- Interface PT-BR e EN com seletor de idioma.
- Endpoints para catálogo, updates e progresso.
- Cron semanal de sync com GitHub API em `/api/cron/sync`.

## Rodando localmente

1. Instale dependências:

```bash
npm install
```

2. Configure variáveis de ambiente:

```bash
cp .env.example .env.local
```

3. Inicie o app:

```bash
npm run dev
```

4. Acesse:

- http://localhost:3000

## Supabase

O schema inicial está em:

- `supabase/schema.sql`

Sem variáveis de Supabase, o app usa fallback local via seed em:

- `src/lib/data/seed.ts`

## Deploy na Vercel

1. Importar repositório na Vercel.
2. Definir variáveis de ambiente do arquivo `.env.example`.
3. Confirmar cron em `vercel.json`.
4. Deploy automático por branch principal.

## Documentação adicional

- Arquitetura: `docs/architecture.md`
- Template de postagem: `docs/linkedin-template.md`
- Setup Supabase: `docs/supabase-setup.md`
- Regras de operação com agentes: `.github/AGENTS.md`
