# Arquitetura - Postgrad Companion

## Stack
- Frontend e backend: Next.js (App Router) em Vercel
- Banco de dados: Supabase Postgres
- Sync externo: GitHub REST API

## Fluxos principais
1. Interface consulta /api/subjects, /api/updates e /api/progress.
2. API tenta ler do Supabase; se nao houver configuracao, usa seed local.
3. Vercel Cron chama /api/cron/sync semanalmente.
4. Sync consulta repositórios curados no GitHub e registra atividade em repo_updates.

## Decisoes de MVP
- Idioma padrao: PT-BR com alternancia para EN.
- Escopo inicial de disciplinas: Agentes, LLMs e Visao Computacional.
- Atualizacao automatizada semanal com fallback resiliente.

## Proximos passos
- Seed automatico do Supabase.
- Endpoint de administracao para cadastro de novos repositorios.
- Autenticacao para painel de edicao pessoal.
