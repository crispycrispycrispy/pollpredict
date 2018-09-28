# pollpredict
Sentimental analysis using tweets to determine future outcomes

This is an experimental project where I try to predict future outcomes, in this case, the 2019 Indian elections using the present sentiments depicted in recent tweets.

## How this works?

1. For this case, six official twitter handles have been considered, namely:
  * [BJP4India](https://twitter.com/BJP4India "BJP's official twitter handle")
  * [narendramodi](https://twitter.com/narendramodi "Narendra Modi's official twitter handle")
  * [INCIndia](https://twitter.com/INCIndia "Congress's official twitter handle")
  * [RahulGandhi](https://twitter.com/RahulGandhi "Rahul Gandhi's official twitter handle")
  * [NCPspeaks](https://twitter.com/NCPspeaks "NCP's official twitter handle")
  * [PawarSpeaks](https://twitter.com/PawarSpeaks "Sharad Pawar's official twitter handle")
    I have considered 2 representative twitter handles for each of the three largest national political parties in India.
    I could have considered more but was largely limited by twitters apis(Details below)
 
 2. Recent @mentions of the above twitter handles are fetched using the twitter api.(Problems faced using the twitter api are explained     below)
 
 3. These fetched tweets are then given a score based on the valence(Negative or positive psychological value) of the subject of the         tweet.(text and emojis)
 
 4. An aggregate of the scores is calculated for each twitter handle. This aggregate score depicts the public's cumulative "state" of       mind about that particular political figure.
 
 5. All the tweets along with the scores are depicted here: // add website here

## How are tweets scored?
 * Tweets are scored based on the [AFINN](http://neuro.compute.dtu.dk/wiki/AFINN). Simply put, sentences are tokenized and checked for      positive and negative words according to the AFINN dataset. Same applies to emojis.

## Assumptions:
 * Twitter is the network of choice.
 * English is the language of choice. (However, other languages can be added later)
 
## Problems:
 1. Twitter has started limiting developers after the Cambridge Analytica debacle. So I was given a limited number of times I could         request Twitter for data, plus, only a 100 tweets per request :-(.
 2. Since I used the free tier of the api, I was not able to request unique @mentions from the get go. I was able to only request tweets     which sent retweets, quoted tweets etc that I did not want to consider for this project. I wanted only unique twitter @mentions.
 3. Sorting through retweets was a hassle since tweets from big political figures tend to get retweeted a lot(couple tens of thousands).
    However I figured out a way to get some more data out of the requests instead of being completely useless for this project.

## Future increments:
  1. Additional languages can be added.
  2. Other social networks can be incorporated.
  3. Data from other twitter handles can be used.
  4. Add some way to deal with tweet shorthands and wrong spellings.  
