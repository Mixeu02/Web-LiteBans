async function getAPI() {
    const response = await fetch("http://localhost:3001/banlist");
    const data = await response.text();
    console.log(data);
}
getAPI();