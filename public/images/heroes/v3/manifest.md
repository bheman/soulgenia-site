# Heroes v3 — asset manifest

Origem: `workspaces/media/soul-genia-heros/shots-gpt/` (GPT-image-2, conta própria; texto queimado removido por crop).
Crops gerados 2026-07-05 (script: scratchpad `hero-crops/make_crops.py` + `finalize_assets.py`). WebP q88; `next/image` gera derivativos responsivos/AVIF em runtime.

| Arquivo | Fonte | Crop (x0,y0,x1,y1 em 1672×941) | Dim | Peso | Borda de blend | Cor da borda |
|---|---|---|---|---|---|---|
| orquestra-desktop.webp | H02-white-future-atelier-standing-conductor.png | 0,0,1190,941 | 1190×941 | 61KB | right | `#f1eff2` |
| orquestra-mobile.webp | idem | 150,0,1090,941 | 940×941 | 56KB | - | - |
| visao-desktop.webp | H06-over-shoulder-pov-seeing-what-she-sees.png | 0,0,1672,700 | 1672×700 | 101KB | bottom | `#423d38`* |
| visao-mobile.webp | idem | 400,0,1340,700 | 940×700 | 60KB | - | - |
| aprova-desktop.webp | H12-hand-touches-panel-macro-intimacy.png | 330,0,1672,941 **v2 (ciclo 2)**: faixa x 0-105 y 330-610 do texto queimado remendada com blur do fundo vizinho (fica sob o véu) | 1342×941 | ~90KB | left | `#05161f` |
| aprova-mobile.webp | idem | 470,0,1410,941 | 940×941 | 75KB | - | - |
| deverdade-desktop.webp | H18-sage-green-daylight-atelier-human-scale.png | 0,0,1030,941 | 1030×941 | 93KB | right | `#d0c0ad` |
| deverdade-mobile.webp | idem | 180,0,1020,941 | 840×941 | 79KB | - | - |

\* média da faixa inferior inclui a banda de luz do console; para blend escuro use tom mais escuro (~`#0a0805`) e gradiente mais longo, ou trate a banda de luz como término natural da arte.

**Técnica de blend (decisão F1):** assets puros, SEM fade alfa baked. O blend com o fundo da hero é feito em CSS por gradiente sobreposto na borda indicada (ex.: `linear-gradient(to left, var(--v3-<slug>-bg), transparent 18%)`), ajustável nos ciclos de polish sem regenerar asset.

**Orçamento:** arquivo servido (otimizado pelo Next) ≤ 200KB no maior breakpoint; LCP alvo < 2.5s. A sonda dos ciclos mede.
