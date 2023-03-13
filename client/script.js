const list = document.getElementById("list");
const container = document.getElementById("container");
const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementById("searchBtn");
const warningText = document.getElementById("warning");

let lastID = 0;

function httpGet(theUrl, params)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false)
    xmlHttp.send(params);
    return xmlHttp.responseText;
};

async function httpPost(url, params)
{
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(params), // body data type must match "Content-Type" header
    });
    return await response.json();
};

async function getAPI(){
    lastID += 25;
    let data = [];
    httpPost("http://localhost:3001/banlist", { lastID: lastID }).then(result => {
        data = result;

        data.map(async (d) => {
            const entry = document.createElement("li");
            const bg = document.createElement("div");
            bg.className = "slotBg";
    
            const head = document.createElement("img");
            head.className = "head";
            head.src = `https://api.mineatar.io/face/${d.uuid}?scale=4`;
    
            const nameText = document.createElement("p");
            nameText.className = "nameText";
            nameText.innerHTML = d.name;
    
            const reasonText = document.createElement("p");
            reasonText.className = "reasonText";
            reasonText.innerHTML = d.reason;
    
            const moderatorText = document.createElement("p");
            moderatorText.className = "moderatorText";
            moderatorText.innerHTML = d.moderator;
    
            const untilText = document.createElement("p");
            untilText.className = "untilText";
                
            if (d.until <= 0){
                untilText.innerHTML = "Permanent";
            }
            else{
                untilText.innerHTML = d.until;
            }
    
            let newDate = "";
    
            for (i = 0; i < 10; i++){
                newDate += d.date[i];
            };
    
            const dateText = document.createElement("p");
            dateText.className = "dateText";
            dateText.innerHTML = newDate;
    
            entry.appendChild(bg);
            bg.appendChild(head);
            bg.appendChild(nameText);
            bg.appendChild(reasonText);
            bg.appendChild(moderatorText);
            bg.appendChild(untilText);
            bg.appendChild(dateText);
            list.appendChild(entry);
        });

        const newShowMoreBtn = document.createElement("button");
        newShowMoreBtn.id = "showMoreBtn";
        newShowMoreBtn.innerHTML = "Show more";
    
        list.appendChild(newShowMoreBtn);
    
        newShowMoreBtn.addEventListener("click", () => {
            list.style.marginTop = `${lastID}px`
            getAPI();
            newShowMoreBtn.remove();
        });
        console.log(data);
    });
};

getAPI();

async function searchBan(){
    setTimeout(async () => {
        if (!searchBar.value){
            warningText.innerHTML = "The search prompt cannot be empty";
            return;
        }

        let data = {};
        data = await httpPost("http://localhost:3001/bansearch", { name: searchBar.value });

        if (!data){
            warningText.innerHTML = "Player not found";
            return;
        }

        warningText.innerHTML = null;

        list.innerHTML = null;

        const entry = document.createElement("li");
        entry.className = "searchResult";
        const bg = document.createElement("div");
        bg.className = "slotBg";

        const head = document.createElement("img");
        head.className = "head";
        head.src = `https://api.mineatar.io/face/${data.uuid}?scale=4`;

        const nameText = document.createElement("p");
        nameText.className = "nameText";
        nameText.innerHTML = data.name;

        const reasonText = document.createElement("p");
        reasonText.className = "reasonText";
        reasonText.innerHTML = data.reason;

        const moderatorText = document.createElement("p");
        moderatorText.className = "moderatorText";
        moderatorText.innerHTML = data.moderator;

        const untilText = document.createElement("p");
        untilText.className = "untilText";
            
        if (data.until <= 0){
            untilText.innerHTML = "Permanent";
        }
        else{
            untilText.innerHTML = data.until;
        }

        let newDate = "";

        for (i = 0; i < 10; i++){
            newDate += data.date[i];
        };

        const dateText = document.createElement("p");
        dateText.className = "dateText";
        dateText.innerHTML = newDate;

        entry.appendChild(bg);
        bg.appendChild(head);
        bg.appendChild(nameText);
        bg.appendChild(reasonText);
        bg.appendChild(moderatorText);
        bg.appendChild(untilText);
        bg.appendChild(dateText);
        document.body.appendChild(entry);
    }, 1000);
};

searchBtn.addEventListener("click", searchBan);