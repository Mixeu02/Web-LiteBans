async function getAPI(){
    function httpGet(theUrl)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
        xmlHttp.send( null );
        return xmlHttp.responseText;
    };

    setTimeout(() => {
        console.log(httpGet("http://localhost:3001/banlist"));
    }, 1000)
}
getAPI();