# Carpeta de Librerías (/lib)

Esta carpeta está destinada a tus librerías personalizadas (.celib).
Las librerías te permiten extender la funcionalidad del editor y del motor.

## Cómo usar la nueva API Simplificada

Dentro de tu script JavaScript (IIFE), puedes usar estas funciones para crear interfaces increíbles:

```javascript
CreativeEngine.API.registrarVentana({
    nombre: "Mi Herramienta",
    estilo: "carl", // "carl" o "moderno"
    alAbrir: (panel) => {
        panel.texto("¡Hola Mundo!");
        panel.boton("Ejecutar", () => {
            window.Dialogs.showNotification("Aviso", "Acción ejecutada");
        });
    }
});
```

Para más detalles, consulta la sección "Ayuda" del editor.