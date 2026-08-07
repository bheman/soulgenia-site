# Funil API

Local reusable service for qualification funnels.

Current bounded scope:

- `slug=soulgenia-v1`
- local-only backend foundation for VOC-171
- scoring source of truth: `soulgenia-v1-2026-06-23`
- CAPI disabled/stub by default
- no production migrations, deploy, Meta mutation, or WhatsApp send

## Commands

```powershell
npm install
npm run build
npm test
npm run lint
npm start
```

Local smoke:

```powershell
$baseUrl = "http://localhost:3109"
Invoke-RestMethod "$baseUrl/funil/soulgenia-v1/config"
```

Submit a fixture:

```powershell
$sample = @{
  answers = @{
    profession = "clinic_owner"
    message_volume = "16-40"
    main_pain = "follow_up"
    whatsapp_business = "yes"
    guided_setup = "yes"
    workflow_this_week = "Follow up with leads who asked for pricing this week"
  }
  contact = @{
    name = "Lead Test"
    whatsapp = "48999999999"
    consent_contact = $true
    privacy_ack = $true
  }
  utm = @{
    utm_source = "local"
    utm_medium = "smoke"
    utm_campaign = "voc_171"
  }
} | ConvertTo-Json -Depth 6

Invoke-RestMethod -Method Post "$baseUrl/funil/soulgenia-v1/submit" -Body $sample -ContentType "application/json"
```

## Production Gates

Bruno approval is required before:

- applying migrations to production;
- deploying or restarting production services;
- enabling live CAPI credentials;
- changing Meta campaign destination, status, audience, placement, or budget;
- sending or automating WhatsApp messages.
