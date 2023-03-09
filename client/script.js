const list = document.getElementById("list");
const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementById("searchBtn");

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
    setTimeout(() => {
        const data = JSON.parse(httpGet("http://localhost:3001/banlist", null));
        
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
        }) 
    }, 1000);
};

getAPI();

async function searchBan(){
    setTimeout(() => {
        const data = httpPost("http://localhost:3001/bansearch", { name: searchBar.value });
        list.innerHTML = null;
        
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
        }) 
    }, 500);
};

searchBtn.addEventListener("click", searchBan);