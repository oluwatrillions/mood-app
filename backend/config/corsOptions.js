const whitelist = ["http://localhost:5173", "https://mood-app-v1.vercel.app/"];
const corsOptions = {
  origin: whitelist,
  credentials: true,
  withCredentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Origin",
    "X-Requested-With",
    "Accept",
    "x-client-key",
    "x-client-token",
    "x-client-secret",
    "Authorization",
  ],
};

module.exports = corsOptions;
