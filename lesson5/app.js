var async = require('async');

var concurrencyCount = 0;
var fetchURL = function (url, callback) {
    var delay = parseInt((Math.random * 10000000) % 2000, 10);
    console.log('concurrency count is ', concurrencyCount, ', fetch url is ', url, ', cost time is ', delay);
    setTimeout(() => {
        concurrencyCount--;
        callback(null, url + 'html content');
    }, delay);
};

var urls = [];
for (var i = 0; i < 30; i++) {
    urls.push('http://datasource_' + i);
}

async.mapLimit(urls, 5, (url, callback) => {
    fetchURL(url, callback);
}, (err, result) => {
    console.log('final:');
    console.log(result);
});