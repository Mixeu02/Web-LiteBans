const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = require("./mysql");

app.post("/banlist", async (req, res) => {
    const bans = [];
    const lastID = req.body.lastID;

    await db.query(`SELECT * FROM litebans_bans ORDER BY id DESC LIMIT 1`, async (err, data) => {
        if (err){
            console.log(err);
            return;
        }
        await db.query(`SELECT * FROM litebans_bans WHERE id <= ${data[0].id - lastID} AND id >= ${(data[0].id - lastID) - lastID} ORDER BY id DESC LIMIT 25`, (err1, data1) => {
            if (err1){
                console.log(err1);
                return;
            }
            data1.map(async (d) => {
                await db.query(`SELECT * FROM litebans_history WHERE uuid='${d.uuid}' ORDER BY id DESC`, (err2, data2) => {
                    if (err2){
                        console.log(err2);
                        return;
                    }
                    if (data1.length > 0){
                        bans.push({
                            id: data2[0].id,
                            name: data2[0].name,
                            uuid: data2[0].uuid,
                            date: data2[0].date,
                            reason: data1[0].reason,
                            ipban: data1[0].ipban,
                            moderator: data1[0].banned_by_name,
                            until: data1[0].until
                        });
                    }
                 });
            });
        });
    })

    setTimeout(() => {
        res.send(bans);
    }, 1000);
});

app.post("/bansearch", async (req, res) => {
    const name = req.body.name;

    await db.query(`SELECT * FROM litebans_history WHERE name='${name}'`, async (err, data) => {
        if (err){
            console.log(err);
            return;
        }
        if (data.length > 0){
            await db.query(`SELECT * FROM litebans_bans WHERE uuid='${data[0].uuid}'`, (err1, data1) => {
                if (err1){
                    console.log(err1);
                    return;
                }
                if (data1.length > 0){
                    res.send({
                        id: data1[0].id,
                        name: data[0].name,
                        uuid: data1[0].uuid,
                        date: data1[0].removed_by_date,
                        reason: data1[0].reason,
                        ipban: data1[0].ipban,
                        moderator: data1[0].banned_by_name,
                        until: data1[0].until
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