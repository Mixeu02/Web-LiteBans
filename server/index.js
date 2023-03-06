const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const db = require("./mysql");

app.get("/banlist", async (req, res) => {
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

app.get("/bansearch", async (req, res) => {
    const name = req.name

    await db.query(`SELECT * FROM litebans_hisory WHERE name=${name}`, async (err, data) => {
        if (err){
            console.log(err);
            return;
        }
        if (data.length > 0){
            await db.query(`SELECT * FROM litebans_bans WHERE uuid=${data[0].uuid}`, (err1, data1) => {
                if (err1){
                    console.log(err1);
                    return;
                }
                if (data1.length > 0){
                    res.send({
                        id: data1[0].id,
                        name: data1[0].name,
                        date: data1[0].date,
                        reason: data[0].reason,
                        ipban: data[0].ipban
                    });
                }
                else{
                    res.send(false);
                }
            });
        }
        else{
            res.send(false);
        }
    });
});

app.listen(3001, () => {
    console.log("Backend On");
});