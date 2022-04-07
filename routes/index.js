const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {

  axios({method:'get', url:'https://euro-millions.com'}).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    //console.log(html);

    const dateRow = $('.dateRow').first().text();
    //const balls = $('.balls').first().text();

    /*

    can't style separately 

    const balls = []

    $('.balls').first().each(function(){
        balls.push($(this).text())
    })
    */

    let balls = [];

    $('.ball').each(function (i, _elem) {
      balls[i] = $(this).text();
    });

    //console.log('balls 1', balls)
    balls = balls.slice(0, 5);

    //console.log('balls 2', balls)
    let stars = [];

    $('.lucky-star').each(function(i, _elem){
      stars[i] = $(this).text();
    })

    stars = stars.slice(0, 2);

    //balls = balls.concat(stars);

    const raffleCode = $('.raffleCode').first().text();

    const object = {
      dateRow, balls, stars, raffleCode 
    }

    res.render('index', { title: 'Cheerio Scraper', info: object });
  }).catch(err => console.error(err));
});

module.exports = router;
