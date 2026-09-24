# IFR · Evaluación de inglés

Aplicación web estática en preparación para revisión docente. Contiene 45 ejercicios breves, nueve por cada uno de cinco temas. No tiene límite de tiempo ni requiere contratar una API.

Al iniciar, cada alumno escribe su **nombre completo y cuatrimestre**. El resultado y el PDF incluyen esos datos, folio, calificación y detalle de respuestas. En todas las páginas del PDF aparece: **Evaluación elaborada por el Profesor Morales Mendoza Raul**.

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

Usa las voces de inglés estadounidense disponibles mediante `speechSynthesis`, sin micrófono. Prioriza nombres de voces femeninas conocidas. El navegador no informa consistentemente el género: hay que escuchar y confirmar la selección. No se garantiza la misma voz ni disponibilidad en todos los celulares. Una incidencia de audio queda pendiente de revisión docente.

## Datos y evaluación individual

Respuestas y datos se guardan en el navegador del alumno. No hay cuentas, panel docente ni envío automático. Los órdenes se mezclan por intento. Cada alumno descarga y entrega su PDF. El banco es público y el PDF no tiene firma verificable: la aplicación necesita supervisión del profesor y no constituye un sistema de examen seguro.

## Vercel

Preparada para importarse como sitio estático: Framework Preset **Other**, sin Build Command, Output Directory **.**. `vercel.json` incluye la configuración. **No publicar para alumnos todavía:** quedan ajustes solicitados por el profesor y validación real en Android/iOS.
