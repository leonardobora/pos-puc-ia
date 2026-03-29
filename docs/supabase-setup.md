# Setup Supabase - Postgrad Companion

## 1) Criar projeto no Supabase
- Crie um projeto no plano Free.
- Guarde os valores de Project URL e Service Role Key.

## 2) Criar schema
No SQL Editor do Supabase, execute:

- `supabase/schema.sql`

## 3) Popular dados iniciais
No SQL Editor, execute:

- `supabase/seed.sql`

## 4) Configurar variáveis na Vercel
No projeto da Vercel, configure as variáveis de ambiente:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GITHUB_TOKEN`
- `CRON_SECRET`

## 5) Validar integração
1. Abra a aplicação em produção.
2. Acesse `/subjects`, `/updates` e `/progress`.
3. Confirme que os dados aparecem.
4. Dispare o sync manual com:

```bash
curl -H "Authorization: Bearer <CRON_SECRET>" https://pos-puc-ia.vercel.app/api/cron/sync
```

## 6) Observações de free tier
- Free pode pausar projeto após inatividade.
- Ajuste o cron para frequências moderadas para evitar consumo desnecessário.
- Mantenha `GITHUB_TOKEN` para aumentar margem de rate limit.
