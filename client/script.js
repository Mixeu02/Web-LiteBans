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
            const response = await fetch(`http://cravatar.eu/head/${d.name}/128.png`)
            const data1 = await response.text()
            console.log(data1)

            const img = new Image();
            img.src = data1
            const list = document.getElementById("list");
            const entry = document.createElement("li");
            const bg = document.createElement("div");
            bg.className = "slotBg";
            const head = document.createElement("img");
            head.src = img
            const nameText = document.createElement("p");
            nameText.className = "nameText";
            nameText.innerHTML = d.name
            entry.appendChild(bg);
            bg.appendChild(nameText);
            bg.appendChild(img);
            list.appendChild(entry);
        }) 
    }, 1000)
}
getAPI();