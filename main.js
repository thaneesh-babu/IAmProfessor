let api_url = "https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow"
let api_url_unanswered = "https://api.stackexchange.com/2.3/questions/no-answers?order=desc&sort=activity&site=stackoverflow"
//change equal of site, set as var
let resultsArr = []

class resultsFromQuery {
    constructor(i, q, l){
        this._index = i
        this._questionName = q
        this._linkString = l
    }
    getIndex(){
        return this._index
    }
    getQuestion(){
        return this._questionName
    }
    getLink(){
        return this._linkString
    }
    setIndex(index){
        this._index = index
    }
    setQuestion(q){
        this._questionName = 1
    }
    setLink(l){
        this._linkString = l
    }
}

let temp = new resultsFromQuery(0, "", "")

function displayOnWeb(data, keyword) {
    var length = Object.keys(data.items).length;
    var flag = false;
    for (let i = 0; i < length; i++) {
        if (JSON.stringify(data.items[i].title).includes(keyword)) {
            flag = true;
            temp.setIndex(i)
            temp.setLink(JSON.stringify(data.items[i].link))
            temp.setQuestion(JSON.stringify(data.items[i].title))
            resultsArr.push(temp)
            document.write(JSON.stringify(data.items[i].title) + " - " + JSON.stringify(data.items[i].link));
            document.write("<br>");
        }
    }
    if (flag == false) {
        document.write('No Results')
    }
}



async function getKeyword() {
    let inputKeyword = document.getElementById("searchbar").value
    fetch(api_url_unanswered).then(response=>response.json()).then(data=>displayOnWeb(data, inputKeyword))
}
