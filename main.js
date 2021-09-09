let api_url = "https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow"

function displayOnWeb(data, keyword) {
    var length = Object.keys(data.items).length;
    var flag = false;
    for (let question = 0; question < length; question++) {
        if (JSON.stringify(data.items[question].title).includes(keyword)) {
            flag = true;
            document.write(JSON.stringify(data.items[question].title) + " - " + JSON.stringify(data.items[question].link));
            document.write("<br>");
        }
    }
    if (flag == false) {
        document.write('No Results')
    }
}

function getKeywordFromInput() {

    let inputKeyword = document.getElementById("searchbar").value

    fetch(api_url) 
    .then(response=>response.json())

    .then(data=>displayOnWeb(data, inputKeyword))

}
