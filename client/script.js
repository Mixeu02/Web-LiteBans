async function getAPI(){
    function httpGet(theUrl)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
        xmlHttp.send( null );
        return xmlHttp.responseText;
    };

    setTimeout(() => {
        const data = JSON.parse(httpGet("http://localhost:3001/banlist"));
        
        data.map(async (d) => {
            const list = document.getElementById("list");
            const entry = document.createElement("li");
            const bg = document.createElement("div");
            bg.className = "slotBg";
            const head = document.createElement("img");
            head.src = `https://api.mineatar.io/face/${d.uuid}?scale=4`
            const nameText = document.createElement("p");
            nameText.className = "nameText";
            nameText.innerHTML = d.name
            entry.appendChild(bg);
            bg.appendChild(nameText);
            bg.appendChild(head);
            list.appendChild(entry);
        }) 
    }, 1000)
}
getAPI();