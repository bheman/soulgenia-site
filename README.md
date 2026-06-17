# {PRODUTO} — Landing App

Next.js 16 + Tailwind 4 landing page com 4 variantes, trial signup e pipeline de lead capture.

---

## Requisitos

- Node.js 22+
- npm 10+
- PostgreSQL 16+ (local ou remoto)

---

## Setup local

### 1. Instalar dependências

```bash
cd workspaces/business/products/aurea/landing-app
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Edite `.env` com seus valores reais:

| Variável | Descrição |
|---|---|
| `DATABASE_URL` | `postgres://user:pass@localhost:5432/produto_landing` |
| `RESEND_API_KEY` | Chave da API Resend (resend.com) |
| `RESEND_FROM_EMAIL` | Email de envio (ex: `noreply@seudominio.com.br`) |
| `RESEND_NOTIFY_EMAIL` | Email para notificação de novo lead |
| `TELEGRAM_BOT_TOKEN` | Token do bot Telegram para notificações |
| `TELEGRAM_CHAT_ID` | Chat ID do Telegram (seu ID pessoal ou grupo) |
| `POSTHOG_KEY` | Chave PostHog (server-side) |
| `NEXT_PUBLIC_POSTHOG_KEY` | Chave PostHog (client-side, injetada no bundle) |
| `NEXT_PUBLIC_APP_URL` | URL base do app (ex: `http://localhost:3000`) |

### 3. Criar o banco e rodar migrations

```bash
# Criar banco (se não existir)
createdb produto_landing

# Rodar migration
psql $DATABASE_URL -f db/migrations/001_leads.sql
```

### 4. Iniciar em desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:3000`.

**Rotas disponíveis:**

| Rota | Variante hero |
|---|---|
| `/` | A — Dor direta (default) |
| `/exausto` | A — Dor direta (explícita) |
| `/escala` | B — Aspiração |
| `/conta` | C — Contraste econômico |
| `/trial` | Formulário de signup |
| `/trial/obrigado` | Pós-signup |
| `/api/lead` | POST endpoint (API interna) |

---

## Deploy no VPS (Docker)

### Pré-requisitos no VPS

1. Docker e Docker Compose instalados
2. Rede Nginx proxy criada: `docker network create nginx-proxy`
3. Nginx configurado com Let's Encrypt para o domínio
4. Postgres acessível (container ou externo)

### Configurar .env no VPS

```bash
# No VPS:
scp .env.example user@vps:/srv/produto-landing/.env
ssh user@vps
nano /srv/produto-landing/.env  # preencher valores de produção
```

### Build e deploy

```bash
# No VPS, na pasta do projeto:
git pull
docker compose up -d --build
```

### Nginx config (exemplo)

```nginx
server {
    listen 443 ssl;
    server_name seudominio.com.br;

    ssl_certificate /etc/letsencrypt/live/seudominio.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seudominio.com.br/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## Substituir {PRODUTO} pelo nome final

Quando Bruno decidir o nome final, rodar o script abaixo para substituir todos os placeholders:

```bash
# Exemplo: substituir {PRODUTO} por "Áurea"
NOME="Aurea"

# Linux/macOS:
find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.md" -o -name "*.json" \) \
  -not -path "./node_modules/*" \
  -not -path "./.next/*" \
  -exec sed -i "s/{PRODUTO}/$NOME/g" {} +

# Windows (PowerShell):
Get-ChildItem -Recurse -Include *.tsx,*.ts,*.md,*.json |
  Where-Object { $_.FullName -notmatch "node_modules|\.next" } |
  ForEach-Object {
    (Get-Content $_.FullName -Raw) -replace '\{PRODUTO\}', $NOME |
    Set-Content $_.FullName
  }

echo "Substituição concluída. Reinicie o dev server."
```

---

## Estrutura do projeto

```
landing-app/
├── app/
│   ├── layout.tsx              # Root layout (Inter, footer, OG metadata)
│   ├── page.tsx                # / → variante A (dor)
│   ├── exausto/page.tsx        # /exausto → variante A explícita
│   ├── escala/page.tsx         # /escala → variante B (aspiração)
│   ├── conta/page.tsx          # /conta → variante C (econômico)
│   ├── trial/
│   │   ├── page.tsx            # Formulário de signup
│   │   └── obrigado/page.tsx   # Pós-cadastro
│   └── api/lead/route.ts       # POST → Postgres + Resend + Telegram
├── components/
│   ├── hero/                   # HeroBase + 3 variantes
│   ├── sections/               # 10 seções com copy real
│   ├── ui/                     # Button, Card, Container, Section
│   ├── forms/                  # TrialSignupForm
│   └── video/                  # DemoEmbed (Loom ou MP4)
├── lib/
│   ├── analytics.ts            # PostHog helpers
│   ├── db.ts                   # Postgres (postgres.js)
│   ├── leadCapture.ts          # Lead capture server function
│   └── utm.ts                  # UTM capture + sessionStorage
├── db/migrations/
│   └── 001_leads.sql           # Schema da tabela leads
├── Dockerfile                  # Multi-stage Alpine build
├── docker-compose.yml          # Deploy no VPS
└── .env.example                # Template de variáveis
```

---

## Decisões técnicas

- **Server Components por padrão:** apenas `FAQ.tsx` (accordion) e `TrialSignupForm.tsx` são Client Components. Tudo mais é RSC — sem JS desnecessário no bundle.
- **useActionState + useFormStatus:** formulário usa React 19 server actions. Sem biblioteca de form externa.
- **postgres.js vs pg:** escolhido `postgres` (npm: `postgres`) por ser mais leve, ter suporte nativo a TypeScript e connection pooling automático.
- **Sem framer-motion:** animações do hero via CSS (`@keyframes hero-fade-up`) em `globals.css`. Zero KB adicionado ao bundle.
- **output: standalone:** ativa o modo standalone do Next.js, que copia apenas os arquivos necessários para o container Docker — reduz imagem final de ~400MB para ~120MB.
- **Porta 3001 no VPS:** o container expõe na 3001 (bind apenas 127.0.0.1) para não conflitar com outros serviços existentes no VPS.
