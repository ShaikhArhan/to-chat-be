// const express = require("express")
// const mongoose = require("mongoose")
// const bodyParser = require("body-parser");
// const cors = require("cors")

// require("dotenv").config()
// const app = express()

// //configuring middleware
// app.use(express.json())
// app.use(cors({
//     origin: ["http://localhost:5173", "http://localhost:5174"],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
// }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.options("*", cors());

// //api
// const combineRoute = require("./routes/combineRoute")
// app.use("/api",combineRoute)

// //mongoo DB
// mongoose.connect(process.env.MONGODB_URI).then(() => {
//     console.log("Connected to MongoDB")
// }).catch((error) => {
//     console.log("Error connecting to MongoDB", error);
// });
// //port 
// const PORT = process.env.PORT

// //server
// app.listen(PORT, () => {
//     console.log(`Server running on ${PORT}`);
// })


const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.options("*", cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//////////////////////////
// Routes
const combineRoute = require("./routes/combineRoute");
app.get("/api/test", (req, res) => {
    // console.log(">>>>Backend Running<<<<")
    return res.json({ status: ">>>>Backend Running<<<<" })
})
app.get("/", (req, res) => {
    res.send("Welcome to the backend!");
});
app.use("/api", combineRoute);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("Error connecting to MongoDB", error));

// Start the server
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
// Socket server setup
const setupSocket = require("./socket/socket");
setupSocket(server)
