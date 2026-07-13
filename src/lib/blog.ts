export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  tags: string[]
  published: string
  readTime: number
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'construyendo-fiaocontrol',
    title: 'Construyendo FiaoControl: El cuaderno digital del colmado dominicano',
    excerpt: 'Cómo pasé de una libreta física a un sistema digital en 48 horas, y lo que aprendí sobre desarrollo de producto en el proceso.',
    content: `
## El Problema

En República Dominicana, los colmados (tiendas de barrio) operan en gran parte con un sistema de crédito informal llamado "fiado". El dueño anota en una libreta lo que cada cliente debe, y al final de la semana o mes, el cliente paga.

Este sistema tiene problemas obvios: las libretas se pierden, las letras son ilegibles, los clientes disputan montos, y el dueño no tiene visibilidad de su negocio en tiempo real.

## La Solución

FiaoControl nació como un MVP construido en 48 horas. La premisa: el dueño abre la app, escribe el nombre del cliente, el monto, y listo. El balance se calcula solo. Si quiere enviar comprobante, un botón abre WhatsApp con el mensaje ya formateado.

## Stack Técnico

- **Next.js 16** con Server Actions
- **Supabase** (PostgreSQL + Auth)
- **Tailwind CSS** para el diseño
- **App Android nativa** en Kotlin + Jetpack Compose

## Lo que Aprendí

1. **El producto primero**: En 48 horas no construyes un sistema perfecto, construyes algo que funciona. El resto se itera.
2. **Server Actions > REST**: Para un equipo de 1 persona, las Server Actions de Next.js reducen drásticamente el boilerplate.
3. **WhatsApp como canal**: No necesitas una app compleja. Un link wa.me bien formateado resuelve el 80% del problema de comunicación.
    `,
    tags: ['react', 'nextjs', 'supabase', 'producto'],
    published: '2025-12-15',
    readTime: 5,
  },
  {
    id: '2',
    slug: 'disenando-para-adhd',
    title: 'Diseñando NEST: Productividad para mentes neurodivergentes',
    excerpt: 'Por qué las apps de productividad tradicionales fallan con el ADHD, y cómo NEST aborda el problema desde el diseño sensorial.',
    content: `
## El Fracaso de las Apps Tradicionales

Las apps de productividad主流 están diseñadas para neurotípicos: listas interminables, calendarios rígidos, notificaciones invasivas. Para una mente con ADHD, esto es paralizante.

## El Enfoque de NEST

NEST no lucha contra el ADHD — lo abraza:

- **Micro-interacciones**: Cada acción pequeña da feedback inmediato
- **Gamificación**: Logros, streaks, confetti
- **Modos flexibles**: Simple Mode, Ataraxia Mode
- **Sin juicio**: No hay "días perdidos", solo oportunidades

## Arquitectura Offline-First

Toda la data vive en localStorage. Firebase solo para notificaciones push y sincronización. Esto significa que la app funciona sin internet, sin latencia, sin esperar.

## Temas y Personalización

Dos themes completos (Default NEST vibrante, NEST Calm terroso), cada uno con modo oscuro/claro. Colores extraídos del logo original: verde cerebro, azul cerebro, rojo cerebro.
    `,
    tags: ['react', 'typescript', 'firebase', 'ux', 'adhd'],
    published: '2026-01-20',
    readTime: 6,
  },
  {
    id: '3',
    slug: 'terminal-como-identidad',
    title: 'La Terminal como Identidad de Marca',
    excerpt: 'Por qué elegí una interfaz de terminal como elemento central de mi portafolio, y cómo define la filosofía MAKIAVELOH.',
    content: `
## Más que una Moda

La terminal no es solo un elemento estético. Es una declaración de intenciones: transparencia, eficiencia, control. Cada línea de comando es una acción explícita, sin abstracciones innecesarias.

## Filosofía MAKIAVELOH

MAKIAVELOH no es una empresa ni un studio. Es un alter ego, una forma de operar. Construir herramientas que funcionan, con interfaces que no estorban.

## El Portfolio como Sistema

Este portafolio no es una página estática. Es un sistema vivo:

- Terminal interactiva que responde a comandos reales
- Telemetría de habilidades con animaciones
- Proyectos que se expanden como procesos del sistema
- Filosofía "strategic hub" — un centro de operaciones

## El Futuro

La terminal seguirá evolucionando. Más comandos, más integraciones, más easter eggs. La idea es que cada visita sea una experiencia diferente.
    `,
    tags: ['design', 'philosophy', 'terminal', 'brand'],
    published: '2026-03-08',
    readTime: 4,
  },
]

export const postBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug)
