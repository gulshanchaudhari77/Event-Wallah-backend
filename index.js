const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/Authrouter");
require("dotenv").config();

// DB connection
const dbConnect = require("./config/database");
dbConnect();

// Middleware
app.use(express.json());
app.use(bodyParser.json());

const allowedOrigins = [
  "https://event-w-f.vercel.app",
  "https://nms-frontend-kappa.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Routes
app.use("/api/v1", userRoutes);

app.get("/", (req, res) => {
  res.send(`<h1>This is hoMEPAGE</h1>`);
});

// Server start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started successfully at ${PORT}`);
});
