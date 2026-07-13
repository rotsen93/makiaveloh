# Jerarquía de modelos

## Tu modelo por defecto
Eres **opencode/deepseek-v4-flash-free** (gratuito, vía OpenCode Zen).
Úsalo para el 90% de tareas: desarrollo normal, refactors simples, features estándar.

## Cuándo usar @deepseek
Usa el agente `@deepseek` (deepseek/deepseek-chat, API directa pagada) SOLO para:
- Refactors arquitectónicos complejos
- Debugging de bugs muy difíciles
- Código crítico de seguridad o rendimiento
- Planeación de arquitectura de sistemas grandes
- Cualquier tarea donde DeepSeek Flash Free no dé la respuesta correcta

## Cuándo usar @explore
Usa el agente `@explore` para tareas que solo requieren LEER:
- Buscar archivos y entender estructuras
- Leer documentación
- Investigar cómo funciona algo
- Navegar el código sin modificarlo

---

# Documentación del proyecto (Obsidian vault)

Este proyecto tiene un vault de Obsidian dedicado para documentación.
**SIEMPRE que inicies una sesión, LEE los archivos del vault para obtener contexto.**

## Ubicación del vault
```
/home/makiaveloh/Documents/Obsidian/Mi-web/
```

## Archivos clave (leer al inicio de cada sesión)
1. **`Estado-Actual.md`** — qué funciona, qué falta, bugs conocidos
2. **`Historial-de-Sesión.md`** — última sesión de trabajo registrada
3. **`Roadmap.md`** — próximos pasos y prioridades
4. **`Arquitectura.md`** — estructura del proyecto y decisiones
5. **`Componentes.md`** — catálogo de componentes

## Reglas de documentación
- Al finalizar cada sesión de trabajo, actualizar `Historial-de-Sesión.md`
- Mantener `Estado-Actual.md` sincronizado con el progreso real
- Documentar decisiones arquitectónicas importantes en `Arquitectura.md`
- Actualizar `Roadmap.md` cuando se completen hits o cambien prioridades
