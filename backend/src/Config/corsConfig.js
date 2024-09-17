// List of allowed domains
const allowedOrigins = [
  "http://localhost:5173",
  "https://apex-bets.vercel.app",
  "https://apexbets.onrender.com",
];

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

module.exports = { corsOptions };
