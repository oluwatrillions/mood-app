const whitelist =['https://localhost:4000', 'http://localhost:5173', 'www.mydomain.com']
const corsOptions = {
    origin: whitelist,
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
};

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authortization');
//     res.setHeader('Acces-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
// })

module.exports = corsOptions