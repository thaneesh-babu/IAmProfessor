let api_url = "https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow"

function getKeyword() {
    let inputKeyword = document.getElementById("searchbar").value
    document.write(inputKeyword) //printing keyword just to see if the button function works
}

//Figure out a way to fetch the API URL in JS. Refer to the API link to see how the JSON data looks like. 
