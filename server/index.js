const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/banlist", (req, res) => {
    res.send("testeeee");
});

app.listen(3001, () => {
    console.log("Backend On");
});