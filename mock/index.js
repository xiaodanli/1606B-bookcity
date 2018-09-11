var indexJson = require('./data/bookcity.json');
var detail = require('./data/detail.json');
var obj = {
    '/api/index': indexJson,
    '/api/detail/1': detail
};

module.exports = function(url) {
    return obj[url]
}