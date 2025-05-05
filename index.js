const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/Authrouter");

require("dotenv").config();
const PORT = process.env.PORT || 4000;
app.use(express.json());

app.listen(PORT, () => {
  console.log(`server stated at SUCCESFULLy ${PORT}`);
});

const dbConnect = require("./config/database");
const event = require("./models/event");
dbConnect();

app.use(bodyParser.json());
app.use(cors());

// const cors = require("cors");

// Allow requests from your frontend domain
app.use(cors({
  origin: "https://event-w-f.vercel.app",
  credentials: true // only if you're using cookies
}));


app.use("/api/v1", userRoutes);


app.get("/", (req, res) => {
  res.send(`<h1>This
       is hoMEPAGE </h1>`);
});
