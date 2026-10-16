# Recursos de Física con IA

Simulaciones web y cuadernos de Google Colab, publicados gratis desde GitHub. Cada recurso trae su propia verificación.
Material de demostración del Módulo 8, «El auxiliar aumentado» (Curso de Actualización Pedagógica en Tiempos de la IA, FCPN).

```
docs/                                ← sitio web: https://jseborga.github.io/recursos-ia/
├── index.html                       ← portada con vistas previas animadas
├── pendulo-doble/                   ← caos determinista (control: energía)
├── orbitas/                         ← Kepler, RK4 frente a Verlet (control: energía por órbita)
├── calor/                           ← ecuación del calor y estabilidad r ≤ ½ (control: serie de Fourier)
├── resonancia/                      ← oscilador forzado (control: amplitud analítica)
├── elementos-finitos/               ← FEM 1D, FIS-243/MAT-132 (control: orden de convergencia h²)
├── algebra-lineal/                  ← matrices 2×2 y modos normales (control: área = |det A|, fórmula cerrada)
├── herramientas/                    ← guía de herramientas de IA con fuentes y fechas
├── tiro-parabolico/                 ← arrastre del aire en La Paz (control: caso sin aire)
├── banco-problemas/                 ← práctica con datos por estudiante
└── assets/                          ← estilo y utilidades de gráficas compartidas
notebooks/                           ← cuadernos para Google Colab
├── 01_verificacion_taller.ipynb     ← verifica las dos páginas básicas
├── 02_fisica_clasica.ipynb          ← 6 ejemplos de Física Básica
├── 03_fisica_avanzada.ipynb         ← 5 ejemplos de métodos numéricos
├── 04_metodos_numericos.ipynb       ← 6 ejemplos ligados al plan 2009 (12 controles)
├── 05_matrices_tensores.ipynb       ← SymPy y NumPy: sistemas, Hilbert, tensores, Lorentz (18 controles)
├── 06_ia_abierta.ipynb              ← un modelo abierto (Qwen3) en Colab, calificado por Python
└── 07_asistente_programacion.ipynb  ← Ollama + Qwen2.5-Coder en Colab; el código generado se prueba
wrangler.jsonc                       ← solo para la ruta Cloudflare Workers
```

## Simulaciones en el navegador

Sitio: **https://jseborga.github.io/recursos-ia/**. Cada simulación muestra en pantalla su propio control de verificación:

| Simulación | Qué muestra | Control |
|---|---|---|
| [Péndulo doble](https://jseborga.github.io/recursos-ia/pendulo-doble/) | Una diferencia de 10⁻⁹ rad se vuelve visible a los ~19 s | Energía conservada (error < 10⁻⁶) |
| [Órbitas de Kepler](https://jseborga.github.io/recursos-ia/orbitas/) | RK4 deriva; Verlet queda acotado pero precesa | Error de energía por órbita |
| [Ecuación del calor](https://jseborga.github.io/recursos-ia/calor/) | r = 0,50 exacto, r = 0,52 explota | Serie de Fourier exacta |
| [Resonancia](https://jseborga.github.io/recursos-ia/resonancia/) | Transitorio, régimen estacionario y curva A(ω) | Amplitud analítica (diferencia < 0,01 %) |
| [Elementos finitos 1D](https://jseborga.github.io/recursos-ia/elementos-finitos/) | Rectas por tramos frente a la solución exacta; carga puntual | Orden de convergencia medido ≈ 2 |
| [Matrices que se ven](https://jseborga.github.io/recursos-ia/algebra-lineal/) | Transformación lineal 2×2, autovectores; modos normales de N masas | Área medida = \|det A\|; frecuencias = fórmula cerrada |
| [Tiro parabólico](https://jseborga.github.io/recursos-ia/tiro-parabolico/) | Arrastre del aire con ρ de La Paz | Caso sin aire = fórmula analítica |
| [Banco de problemas](https://jseborga.github.io/recursos-ia/banco-problemas/) | Datos distintos por estudiante | Respuestas recalculadas en Python |

La guía [Herramientas de IA](https://jseborga.github.io/recursos-ia/herramientas/) resume para qué sirve cada herramienta (Perplexity, Gemini Notebook, ChatGPT/Codex, Claude/Claude Code, Z.ai, Colab, Copilot), con planes consultados el 16 oct 2026 y sus fuentes.

Los resultados numéricos de las simulaciones coinciden con los cuadernos de Python (por ejemplo, la separación del péndulo doble supera 0,1 rad a los 19,0 s en ambos).

## Cuadernos de Colab

Haga clic en el botón para abrir una copia editable. *Entorno de ejecución → Ejecutar todo* corre cada cuaderno en menos de un minuto en el plan gratuito. Cada control imprime `✔`; si algo no coincide, el cuaderno se detiene con `✘` y explica qué falló.

| Cuaderno | Contenido | Abrir |
|---|---|---|
| 01 · Verificación del taller | La simulación web y el banco de problemas, recalculados en Python | [![Abrir en Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/jseborga/recursos-ia/blob/main/notebooks/01_verificacion_taller.ipynb) |
| 02 · Física clásica | Péndulo de amplitud grande, caída con aire, resonancia, circuito RC, choques, ajuste de *g* con incertidumbres | [![Abrir en Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/jseborga/recursos-ia/blob/main/notebooks/02_fisica_clasica.ipynb) |
| 03 · Física avanzada | Kepler (Verlet frente a RK4), péndulo doble caótico, ecuación del calor y estabilidad, oscilador cuántico, incertidumbre por Monte Carlo | [![Abrir en Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/jseborga/recursos-ia/blob/main/notebooks/03_fisica_avanzada.ipynb) |
| 04 · Métodos numéricos (plan 2009) | Elementos finitos 1D, Laplace 2D, fenómeno de Gibbs, onda y Courant, pozo finito, Ising frente a Onsager | [![Abrir en Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/jseborga/recursos-ia/blob/main/notebooks/04_metodos_numericos.ipynb) |
| 05 · Ecuaciones, matrices y tensores | Kirchhoff con SymPy, matriz de Hilbert, modos normales, tensor de inercia con einsum, Levi-Civita, Lorentz | [![Abrir en Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/jseborga/recursos-ia/blob/main/notebooks/05_matrices_tensores.ipynb) |
| 06 · Una IA abierta, calificada por Python | Qwen3 (0,6B o 1,7B) dentro de Colab: 8 preguntas de física con clave verificada, consistencia y comprobación de DOI | [![Abrir en Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/jseborga/recursos-ia/blob/main/notebooks/06_ia_abierta.ipynb) |
| 07 · Asistente de programación gratuito | Ollama y Qwen2.5-Coder dentro de Colab escriben trapecio, RK4, bisección y el período exacto del péndulo; cada función pasa una prueba | [![Abrir en Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/jseborga/recursos-ia/blob/main/notebooks/07_asistente_programacion.ipynb) |

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
