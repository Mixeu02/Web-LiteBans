const express = require("express");
const app = express();

app.get("/banlist", (req, res) => {
    res.send("testeeee");
});

app.listen(3001, () => {
    console.log("Backend On");
});