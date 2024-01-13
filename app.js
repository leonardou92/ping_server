const http = require('http');
const ping = require('ping');
const socketio = require('socket.io');
const axios = require('axios');

const listaIPs = ['38.10.248.39', '45.179.164.22', '45.179.164.6', '38.10.248.41'];

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<html><head><style>');
    res.write('body { margin: 0; padding: 0; font-size: 16px; }');
    res.write('table { width: 100%; border-collapse: collapse; table-layout: fixed; overflow-x: auto; }');
    res.write('th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; word-wrap: break-word; }');
    res.write('th { background-color: #f2f2f2; }');
    res.write('tr:hover { background-color: #f5f5f5; }');
    res.write('td.up { color: green; }');
    res.write('td.down { color: red; }');
    res.write('</style><script src="/socket.io/socket.io.js"></script></head><body>');
    res.write('<table><tr><th>IP</th><th>Status</th></tr></table>');

    const io = socketio(server);
    io.on('connection', (socket) => {
      function verificarEstadoIPs() {
        listaIPs.forEach(ip => {
          ping.sys.probe(ip, (estado) => {
            const status = estado ? 'UP' : 'DOWN';
            socket.emit('update', { ip, status });
          });
        });
      }

      verificarEstadoIPs();
      setInterval(verificarEstadoIPs, 5000);
    });

    res.write('<script>var socket = io();socket.on("update", function(data) {var row = document.querySelector("table tr td[data-ip=\'" + data.ip + "\']");if (row) {var statusCell = row.nextElementSibling;statusCell.innerHTML = data.status;if (data.status === "UP") {statusCell.classList.remove("down");statusCell.classList.add("up");} else {statusCell.classList.remove("up");statusCell.classList.add("down");}} else {var table = document.querySelector("table");var newRow = table.insertRow(table.rows.length);var cell1 = newRow.insertCell(0);var cell2 = newRow.insertCell(1);cell1.innerHTML = data.ip;cell1.setAttribute("data-ip", data.ip);cell2.innerHTML = data.status;if (data.status === "UP") {cell2.classList.add("up");} else {cell2.classList.add("down");}}});</script>');
    res.write('<script>if ("Notification" in window) {if (Notification.permission !== "denied") {Notification.requestPermission().then(function (permission) {if (permission === "granted") {socket.on("update", function(data) {if (data.status === "DOWN") {var notifTitle = "IP " + data.ip + " esta DOWN";var notifBody = "Verifica la conexion con esta IP";var notifOptions = {body: notifBody,};var notification = new Notification(notifTitle, notifOptions);}});}});}}</script>');

    // Realizar una solicitud a la API de Speedtest
    axios.get('https://www.speedtest.net/api/embed')
      .then(response => {
        console.log('Velocidad de descarga:', response.data.result.download);
        console.log('Velocidad de carga:', response.data.result.upload);
      })
      .catch(error => {
        console.error('Error al realizar la prueba de velocidad:', error.message);
      });

    res.write('</body></html>');
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
