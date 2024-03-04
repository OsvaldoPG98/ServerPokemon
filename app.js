const http = require('node:http');
const dittoJSON = require('./ditto.json');

//commonJS -> modulos clasicos de node
const processRequest = (req, res) => {
    const { method, url } = req;

    switch (method) {
        case 'GET': {
            switch (url){
                case '/pokemon/ditto':{
                    res.setHeader('Content-Type', 'application/json; charset=utf-8');
                    return res.end(JSON.stringify(dittoJSON));
                }
                default:{
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                }
            }
        }
            
        case 'POST': {
            switch (url){
                case '/pokemon': {
                    let body = '';
                    //escuchando y recibiendo los datos
                    req.on('data', chunk => {
                        body += chunk.toString(); //chunk es un buffer. Lo convertimos a string
                    });

                    req.on('end', () => {
                        const data = JSON.parse(body);
                        res.writeHead(201, {'Content-Type': 'application/json; charset=utf-8'});
                        res.end(JSON.stringify(data)); //stringfy convierte un objeto a json
                    });
                    break;
                }
                default:{
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'texxt/html; charset=utf-8');
                    return res.end('<h1>404</h1>');
                }
            }
        }
    }
}

const server = http.createServer(processRequest);

server.listen( 3000, () => {
    console.log('Server listening on port http://localhost:3000');
});