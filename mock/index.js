var indexJson = require('./data/bookcity.json');
var loadmore = require('./data/loadmore.json');

var hotkeyJson = require('./data/search-hot.json');

var searchJson = require('./data/search.json');
var obj = {
    '/api/index': indexJson,
    '/api/hotkey':hotkeyJson
};

var url = require('url');

module.exports = function(pathurl) {
    var pathname = url.parse(pathurl).pathname;

    if(pathname === '/api/loadmore'){ //分页的数据
        var params = url.parse(pathurl,true).query;

        var pagenum = params.pagenum,
            limit = params.limit;

        // (pagenum-1)*limit  pagenum*limit

        var target = loadmore.items.slice((pagenum-1)*limit,pagenum*limit);

        var total = Math.ceil(loadmore.items.length/limit);

        return {target:target,total:total}
    }else if(pathname === '/api/search'){
        var key = url.parse(pathurl,true).query.key;

        var result = searchJson.items.filter(function(item){
            return item.title.match(key);
        })

        return result
    }else{
        return obj[pathurl]
    }

    
}