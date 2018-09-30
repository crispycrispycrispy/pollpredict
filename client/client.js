let list = document.getElementsByClassName('left_info_container');

const getTweetsApi = "/gettweets";
const getScoresApi = "/scoremeta";

//const listElement = document.querySelector('#listing_table');
const listElement = document.querySelector('#append_zone');
const loadingGif = document.querySelector('#loading_gif');
loadingGif.style.display = "none";
// const datalistdiv = document.querySelector('#reload_more_button');
// datalistdiv.style.display = "none";


fetchTweetData = (name) => {
    listElement.innerHTML = "";
    loadingGif.style.display = ""
    fetch(getTweetsApi+"?name="+name)
    .then(response => response.json())
    .then((tweets) => {
        //console.log(tweets);
        listElements(tweets);
        loadingGif.style.display = "none";
    })

}

getPercentages = (scoreMeta) => {
    for(let i=0; i<scoreMeta.length; i++){
        let forVote = Math.floor((scoreMeta[i].pVoters / scoreMeta[i].total) * 100);
        let againstVote = Math.floor((scoreMeta[i].nVoters / scoreMeta[i].total) * 100);
        let neutralVote = 100-forVote-againstVote;
        let progBar = document.getElementById(scoreMeta[i].cname+"_progress");
        progBar.innerHTML = progressBarHTML(forVote, againstVote, neutralVote, scoreMeta[i]);
    }
    
}

progressBarHTML = (pos, neg, neu, meta) => {
    return "<div class='progress'><div class='progress-bar bg-success' role='progressbar' style='width: "+pos+"%' aria-valuenow='"+pos+"' aria-valuemin='0' aria-valuemax='100'>"+pos+"%</div><div class='progress-bar bg-danger' role='progressbar' style='width: "+neg+"%' aria-valuenow='"+neg+"' aria-valuemin='0' aria-valuemax='100'>"+neg+"%</div><div class='progress-bar bg-info' role='progressbar' style='width: "+neu+"%' aria-valuenow='"+neu+"' aria-valuemin='0' aria-valuemax='100'>"+neu+"%</div></div>"+
    "<br><p>+ive tweets: <span class='badge badge-pill badge-success'>"+meta.pVoters+"</span></p>    "+
    "<p>-ive tweets: <span class='badge badge-pill badge-danger'>"+meta.nVoters+"</span></p>    "+
    "<p>neutral tweets: <span class='badge badge-pill badge-info'>"+meta.neutral+"</span></p>    "+
    "<br><p>Total tweets: <span class='badge badge-pill badge-light'>"+meta.total+"</span></p>";
}

fetchScoreMeta = () => {
    fetch(getScoresApi)
    .then(response => response.json())
    .then((scoreMeta) => {
        console.log(scoreMeta);
        getPercentages(scoreMeta);
    })

}

listElements = (tweets) => {
    for( let i=0; i< tweets.length; i++){
        let tweet = tweets[i];
        let tr = document.createElement('tr');
        let td_handle = document.createElement('td');
        td_handle.innerHTML = "<a href='"+tweet.tweet_url+"'>"+tweet.twitter_handle+"</a>";
        
        let td_tweet = document.createElement('td');
        td_tweet.innerHTML = "<p>"+tweet.text+"</p>";
        
        let td_score = document.createElement('td');
        td_score.innerHTML = "<p>"+tweet.sentiment.valence_score+"<br><span class='badge badge-secondary'>"+tweet.sentiment.label+"</span></p>";
        
        tr.appendChild(td_handle);
        tr.appendChild(td_tweet);
        tr.appendChild(td_score);
        listElement.appendChild(tr);
    }
    // datalistdiv.style.display = "";
}

document.addEventListener('DOMContentLoaded', fetchScoreMeta, false);

for(var i=0; i<list.length; i++){
    list[i].addEventListener('click', fetchTweetData.bind(this, list[i].getAttribute('name')), false);
}