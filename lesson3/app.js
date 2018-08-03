var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();

app.get('/', function(req,res,next){
    superagent.get('https://cnodejs.org/').end(function(err, response){
        if(err){
            return next(err);
        }
        var items = [];
        var $ = cheerio.load(response.text);
        $('#topic_list .topic_title').each(function(index, element){
            var $element = $(element);
            items.push({
                title : $element.attr('title'),
                href: $element.attr('href')
            });
        });
        res.send(items);
    });
});

app.listen(3000, function(){
    console.log('app running at port 3000');
})
