# CESDE — Ruta Estratégica 2026

Mini-landing de presentación estratégica de pauta digital para CESDE.

## URLs (GitHub Pages)
- **Inicio:** `/index.html`
- **Ruta estratégica:** `/ruta.html`
- **Ruta de sostenimiento septiembre:** `/ruta-sostenimiento-septiembre.html`
- **Línea de tiempo TECPER:** `/linea-de-tiempo-tecper.html`
- **Reporte implementación:** `/pages/reporte-implementacion.html`
- **Privacidad:** `/privacy.html` *(requerida por Meta App Review)*
- **Términos:** `/terms.html` *(requerida por Meta App Review)*

## Estructura
```
assets/
  css/
    index.css                  ← estilos landing principal
    ruta.css                   ← estilos presentación interactiva
    reporte.css                ← estilos reporte de anuncios
    legal.css                  ← estilos compartidos privacy + terms
    linea-de-tiempo-tecper.css ← estilos línea de tiempo TECPER
  js/
    ruta.js                    ← lógica slides, mapa y filtros
    linea-de-tiempo-tecper.js  ← series semanales, columnas y tabla
pages/
  reporte-implementacion.html
index.html
ruta.html
ruta-sostenimiento-septiembre.html
linea-de-tiempo-tecper.html
privacy.html
terms.html
tiktokA7w...txt                ← verificación TikTok (no borrar)
```

## Línea de tiempo TECPER (may–jul 2026)

Evolución semanal del CPA de las 37 campañas `TECPERF*` (Medellín, Bello, Rionegro) del semestre 2026-2, con cada ajuste fechado y atribuido a la aplicación que lo ejecutó.

| | |
|---|---|
| **Cuenta** | ADCOM 2023 - CESDE (`act_236065353543774`) |
| **Ventana** | 6 may — 31 jul 2026 (13 semanas) |
| **Inversión** | $80.263.177 |
| **Leads** | 16.097 (`onsite_conversion.lead_grouped`) |
| **CPA promedio** | $4.986 · pico $8.475 (15–21 jun) · cierre $2.694 (27–31 jul) |

**Hitos.** Rotación de piezas `_29/05` el 1 jun · recorte y reconstrucción de presupuestos 22 y 25 jun · **reemplazo de los 33 formularios el 30 jun** (se quitan 4 preguntas de perfilamiento, entran 2 filtros de admisión) · piezas «Últimos cupos» y escalado 6–7 jul · estandarización de nomenclatura 22 jul · piezas «Sold out» 27 jul · cierre a presupuesto mínimo 28 jul.

**Atribución.** Meta registra qué aplicación hizo cada cambio: 2.952 de 6.133 eventos salieron de `App Marketing Adcom` (Meta Ads CLI), y las fechas coinciden con los scripts de `scripts/clients/cesde/` en el repo de la herramienta. El resto se hicieron a mano desde Power Editor.

## Cliente
**CESDE** · sebastian@adcom.group
