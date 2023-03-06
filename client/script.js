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
        
        data.map((d) => {
            const list = document.getElementById("list");
            const entry = document.createElement("li");
            entry.appendChild(document.createTextNode(d.name));
            list.appendChild(entry);
        }) 
    }, 1000)
}
getAPI();