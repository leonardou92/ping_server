# Monitor de Estado de IP

Este proyecto consiste en un simple monitor de estado de direcciones IP utilizando Node.js, Socket.IO, y Ping. Proporciona una interfaz web que muestra el estado actual de las direcciones IP especificadas en tiempo real.

## Requisitos

Asegúrate de tener Node.js y npm instalados en tu sistema antes de ejecutar este proyecto.

## Instalación

1. Clona este repositorio:

       git clone https://github.com/leonardou92/ping_server.git
   
2. Navega al directorio del proyecto:

       cd ping_server
        
3. Instala las dependencias:

       npm install
        
4. Inicia el servidor:

       node app.js
        
5. Abre tu navegador y visita http://localhost:3000 para ver el monitor de estado de IP en acción.

Funcionalidades
Monitorea el estado de las direcciones IP especificadas.
Actualiza el estado en tiempo real utilizando Socket.IO.
Notificaciones en el navegador para estados "DOWN" de IP.
Prueba de velocidad de conexión usando la API de Speedtest (opcional).
Contribuir
Si encuentras algún problema o tienes mejoras que sugerir, por favor, abre un problema o envía una solicitud de extracción.

Este es solo un ejemplo básico, puedes personalizarlo según las necesidades específicas de tu proyecto. Además, si tu proyecto tiene más características o configuraciones, asegúrate de proporcionar la documentación necesaria en el README.
