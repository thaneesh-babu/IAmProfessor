let api_url_unanswered = "https://api.stackexchange.com/2.3/questions/no-answers?order=desc&sort=activity&site="

//create array of all sites
let api_getSites = "https://api.stackexchange.com/2.3/sites"
let apiSitesArray = []
let siteLength = 0

function getAllSites(data){
    for (let i = 0; i < data.items.length; i++){
        apiSitesArray.push(JSON.stringify(data.items[i].api_site_parameter).replace(/["]+/g, ''))
    }
}

//results class and array to store all instances 
let resultsArr = []

class resultsFromQuery {
    constructor(i, q, l, s, an, v, u, d){
        this._index = i
        this._questionName = q
        this._linkString = l
        this._site = s
        this._askerName = an
        this._views = v
        this._upvotes = u
        this._date = d
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
    getSite(){
        return this._site
    }
    getAskerName(){
        return this._askerName
    }
    getViews(){
        return this._views
    }
    getUpvotes(){
        return this._upvotes
    }
    getDate(){
        return this._date
    }
    setIndex(index){
        this._index = index
    }
    setQuestion(q){
        this._questionName = q
    }
    setLink(l){
        this._linkString = l
    }
    setSite(s){
        this._site = s
    }
    setAskerName(an){
        this._askerName = an
    }
    setViews(v){
        this._views = v
    }
    setUpvotes(u){
        this._upvotes
    }
    setDate(d){
        let d1 = new Date(d)
        d1 = d1.toString()
        let d2 = d1.split(" ", 4).join(" ")
        this._date = d2
    }
}

//puts search result into a class and pushes it into an array

let temp = new resultsFromQuery(0, "", "", "", "", 0, 0, "")

function setupTemp(dataItem, i, site) {
    temp.setIndex(i)
    temp.setLink(dataItem.link)
    temp.setQuestion(dataItem.title)
    temp.setSite(site)
    temp.setAskerName(dataItem.owner.display_name)
    temp.setViews(dataItem.view_count)
    temp.setUpvotes(dataItem.score)
    temp.setDate(dataItem.creation_date)
    console.log(temp)
    return temp
}

function displayOnWeb(data, keyword, site) {
    var length = Object.keys(data.items).length;
    for (let i = 0; i < length; i++) {
        if (JSON.stringify(data.items[i].title).includes(keyword)) {
            temp = setupTemp(JSON.stringify(data.items[i]), i, site)
            resultsArr.push(temp)
        }
    }
}

async function getKeyword() {
    let inputKeyword = document.getElementById("searchbar").value
    for (let i = 0; i < apiSitesArray.length; i++){
        fetch(api_url_unanswered + apiSitesArray[i])
        .then(response=>response.json())
        .then(data=>displayOnWeb(data, inputKeyword, apiSitesArray[i]))
    }
    
}

//start of code ---------------------------------------

fetch(api_getSites)
  .then(response => response.json())
  .then(data=>getAllSites(data))
