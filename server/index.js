const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/banlist", async (req, res) => {
    const db = require("./mysql");
    
    const bans = [];
    
    await db.query(`SELECT * FROM litebans_bans ORDER BY id DESC LIMIT 50`, (err, data) => {
        if (err){
            console.log(err);
            return;
        }
        data.map(async (d) => {
            await db.query(`SELECT * FROM litebans_history WHERE uuid='${d.uuid}' ORDER BY id DESC`, (err1, data1) => {
                if (err1){
                    console.log(err1);
                    return;
                }
                if (data1.length > 0){
                    bans.push({
                        id: data1[0].id,
                        name: data1[0].name,
                        date: data1[0].date,
                        reason: data[0].reason,
                        ipban: data[0].ipban
                    });
                }
             });
        });
    });

    setTimeout(() => {
        res.send(bans);
    }, 1000)
});

app.listen(3001, () => {
    console.log("Backend On");
});