Necesito integrar la librería de íconos Streamline Pixel en este proyecto. 

Por favor realiza los siguientes pasos:
1. Instala el paquete de Streamline correspondiente o la librería oficial de iconos (@streamlinehq/streamline-icons o el paquete específico de pixel si está disponible vía npm/private registry).
2. Si se requiere token de autenticación para @streamlinehq, configura las variables en un archivo .npmrc local.
3. Crea un componente reusable standalone `StreamlineIconComponent` (o `AppIcon`) que acepte inputs para:
   - name: string (nombre del ícono)
   - size: number/string (opcional, por defecto 24)
   - color: string (opcional, 'currentColor')
4. Asegúrate de sanitizar el SVG o renderear el contenido de manera segura usando DomSanitizer o un registro interno de SVGs.
5. Exporta el componente en un archivo index/barrel para poder usarlo fácilmente en los demás componentes standalone.
6. Siempre que pueda, utiliza los iconos en vez de emojis.