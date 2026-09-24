# IFR · Evaluación de inglés

Aplicación web estática en preparación para revisión docente. Contiene 45 ejercicios breves, nueve por cada uno de cinco temas. No tiene límite de tiempo ni requiere contratar una API.

Al iniciar, cada alumno escribe su **nombre completo y cuatrimestre**. El resultado y el PDF incluyen esos datos, calificación y detalle de respuestas. En todas las páginas del PDF aparece: **Evaluación elaborada por el Profesor Morales Mendoza Raul**.

## Ejecutar

Desde esta carpeta: `python3 -m http.server 8080`. Abrir `http://localhost:8080`. No requiere compilación.

Prueba de calificación: `node tests/scoring.cjs`.

## Archivos

- `questions.js`: banco de 45 ejercicios, respuestas previstas y explicaciones.
- `scoring.js`: reglas de corrección, variantes y crédito parcial.
- `app.js`: identificación, navegación, audio, recuperación y PDF.
- `styles.css`: azul, verde y blanco IFR, tarjetas redondeadas e interacción táctil.
- `docs/ACUERDOS_Y_PLAN.txt`: decisiones y alcance.
- `docs/AVANCES.txt`: estado, verificaciones y pendientes.
- `vendor/jspdf.umd.min.js`: jsPDF 3.0.3, licencia incluida en el archivo.

## Audio y dispositivos

Voz sintética femenina estadounidense Heart (`af_heart`), generada localmente con Kokoro v1.0 y kokoro-onnx 0.6.1. Los catorce WAV se sirven desde `assets/audio`: diez audios individuales, tres deletreos del ejercicio de relacionar y una prueba. No hay API de pago, claves ni dependencia de voces instaladas. Los botones permiten reproducir, escuchar a 0.5x y detener; la reproducción comienza con una interacción del alumno.

Fuentes: https://huggingface.co/hexgrad/Kokoro-82M (modelo Apache 2.0), https://github.com/thewh1teagle/kokoro-onnx (herramienta MIT). El modelo y las dependencias de generación no se distribuyen con el sitio. `scripts/generate_heart.py` permite regenerar los WAV proporcionando una carpeta con `kokoro-v1.0.onnx` y `voices-v1.0.bin`. Entorno local: `kokoro-onnx==0.6.1`, `soundfile==0.14.0`. Las letras se generan individualmente a velocidad 0.8, con cierre de frase y un segundo de silencio añadido entre ellas. Para regenerar solo los deletreos usa --refresh-spelling.

## Datos y evaluación individual

Respuestas y datos se guardan en el navegador del alumno. No hay cuentas, panel docente ni envío automático. Los órdenes se mezclan por intento. Cada alumno descarga y entrega su PDF. El banco es público y el PDF no tiene firma verificable: la aplicación necesita supervisión del profesor y no constituye un sistema de examen seguro.

## Vercel

Preparada para importarse como sitio estático: Framework Preset **Other**, sin Build Command, Output Directory **.**. `vercel.json` incluye la configuración. Reproducción y diseño comprobados en navegador; la prueba física en Android/iOS sigue pendiente.

## Entrega y retroalimentación

Durante la evaluación no se muestran indicadores de progreso, calificación ni correcciones. Tras entregar aparece la calificación en porcentaje, la descarga PDF y los 45 ejercicios completos. Los correctos aparecen en verde; los incorrectos y parciales, en rojo con explicación y corrección. Los audios con incidencia quedan pendientes de revisión docente.

## Navegación de la prueba
Iniciar prueba abre el primer ejercicio. Siguiente se habilita cuando la respuesta está completa; al avanzar se bloquea la anterior. El ejercicio 45 conduce a la entrega. No hay reinicio, retroceso, cuadrícula ni acceso por tema. Recargar conserva el intento y el ejercicio pendiente. Solo se obtiene resultado/PDF al completar y entregar los 45. No se genera ni se muestra folio. La permanencia del intento depende del almacenamiento del navegador; no hay identificación en servidor.

Pruebas del flujo y audios: `node tests/flow.cjs`.

La revisión de dificultad sustituye doce ejercicios simples por deletreo de nombres, orden alfabético de palabras, grupos de consonantes y contrastes numéricos. Los tres deletreos tienen controles independientes y opciones que se mezclan por intento. El banco actualizado se aplica también a los intentos en curso, conservando su posición y respuestas.
