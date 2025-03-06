const http = require('node:http')
const port = process.env.port ?? 3000
const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    if(request.url === '/') {
        response.statusCode(200)
        response.end('<h1>Bienvenido a mi pagina de inicio</h1>')
    }else if(request.url === '/contacto') {
        response.statusCode(200)
        response.end('<h1>Contactanos</h1>')
    }else{
        request.statusCode(404)
        response.end('<h1>404 Not Found</h1>')
    }
})
server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${port}`)
})