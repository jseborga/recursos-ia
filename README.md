# Recursos de Física con IA

Simulaciones web y cuadernos de Google Colab, publicados gratis desde GitHub. Cada recurso trae su propia verificación.
Material de demostración del Módulo 8, «El auxiliar aumentado» (Curso de Actualización Pedagógica en Tiempos de la IA, FCPN).

```
docs/                                ← sitio web (GitHub Pages o Cloudflare)
├── index.html                       ← portada
├── tiro-parabolico/index.html       ← simulación RK4 con arrastre
└── banco-problemas/index.html       ← práctica con datos por estudiante
notebooks/                           ← cuadernos para Google Colab
├── 01_verificacion_taller.ipynb     ← verifica las dos páginas web
├── 02_fisica_clasica.ipynb          ← 6 ejemplos de Física Básica
└── 03_fisica_avanzada.ipynb         ← 5 ejemplos de métodos numéricos
wrangler.jsonc                       ← solo para la ruta Cloudflare Workers
```

## Cuadernos de Colab

Haga clic en el botón para abrir una copia editable. *Entorno de ejecución → Ejecutar todo* corre cada cuaderno en menos de un minuto en el plan gratuito. Cada control imprime `✔`; si algo no coincide, el cuaderno se detiene con `✘` y explica qué falló.

| Cuaderno | Contenido | Abrir |
|---|---|---|
| 01 · Verificación del taller | La simulación web y el banco de problemas, recalculados en Python | [![Abrir en Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/jseborga/recursos-ia/blob/main/notebooks/01_verificacion_taller.ipynb) |
| 02 · Física clásica | Péndulo de amplitud grande, caída con aire, resonancia, circuito RC, choques, ajuste de *g* con incertidumbres | [![Abrir en Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/jseborga/recursos-ia/blob/main/notebooks/02_fisica_clasica.ipynb) |
| 03 · Física avanzada | Kepler (Verlet frente a RK4), péndulo doble caótico, ecuación del calor y estabilidad, oscilador cuántico, incertidumbre por Monte Carlo | [![Abrir en Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/jseborga/recursos-ia/blob/main/notebooks/03_fisica_avanzada.ipynb) |

Los botones abren los cuadernos directamente desde este repositorio público. Colab abre una copia: ejecutarla no modifica el repositorio. Para guardar cambios: *Archivo → Guardar una copia en Drive* o *Guardar una copia en GitHub*.

## Publicar el sitio web

**GitHub Pages:** *Settings → Pages → Deploy from a branch → main → /docs → Save*. En 1–2 minutos queda en `https://jseborga.github.io/recursos-ia/`.
Límites documentados: sitio ≤ 1 GB, ancho de banda «blando» de 100 GB/mes, 10 compilaciones/hora.

**Cloudflare** (subdominio gratuito; Cloudflare **no regala dominios propios**):
- *Pages*: **Workers & Pages → Create → Pages → Connect to Git** → elegir el repositorio → *Framework preset*: None · *Build command*: vacío · *Build output directory*: `docs`. Resultado: `https://recursos-ia.pages.dev` (si ese nombre está libre) (500 compilaciones/mes gratis).
- *Workers* (la ruta que Cloudflare recomienda para proyectos nuevos): **Workers & Pages → Create → Import a repository**; `wrangler.jsonc` ya apunta a `./docs`.

## Cómo se hicieron con IA (y cómo se verificaron)

- El código se generó con un asistente de IA a partir de pedidos en lenguaje natural (ver la guía de prompts del taller).
- Ningún resultado se aceptó sin un control independiente: solución analítica, ley de conservación o una segunda implementación en otro lenguaje.
- Los datos de laboratorio del cuaderno 02 son **sintéticos** (generados con *g* conocido) y están marcados como tales.
- Cualquier cambio de fórmulas debe volver a pasar los controles.

## Licencia

CC BY 4.0: se puede usar y adaptar citando la fuente.
