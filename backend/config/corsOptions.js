const whitelist =['https://localhost:4000', 'http://localhost:5173', 'www.mydomain.com']
const corsOptions = {
    origin: whitelist,
    credentials: true,
    optionsSuccessStatus: 200,
    exposedHeaders: ['Set-Cookie', 'Date', 'ETag']
};

module.exports = corsOptions