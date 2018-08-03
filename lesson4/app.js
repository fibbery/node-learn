var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');

var geturl = 'https://cnodejs.org/';
superagent.get(geturl).end(function (err, res) {
    if (err) {
        console.error(err);
    }
    var links = [];
    var $ = cheerio.load(res.text);
    $('#topic_list .topic_title').each(function (index, element) {
        var $element = $(element);
        links.push(url.resolve(geturl, $element.attr('href')));
    });

    var ep = eventproxy();
    ep.after("topic", links.length, function (topics) {
        var returnDatas = topics.map(function (topic) {
            var $ = cheerio.load(topic.html);
            return {
                title: $('.topic_full_title').text().trim(),
                href: topic.link,
                comment: $('.reply_content').eq(0).text().trim()
            };
        });
        console.log(returnDatas);
    });

    links.forEach(function (link) {
        superagent.get(link).end(function (err, response) {
            ep.emit('topic', { link: link, html: response.text });
        })
    });
});

