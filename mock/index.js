var indexJson = require('./data/bookcity.json');
var loadmore = require('./data/loadmore.json');

var hotkeyJson = require('./data/search-hot.json');

var searchJson = require('./data/search.json');

var detailJson = require('./data/352876.json');

var chapterJson = require('./data/chapter-list.json');

var chapter1 = require('./data/artical/data1.json');
var chapter2 = require('./data/artical/data2.json');
var chapter3 = require('./data/artical/data3.json');
var chapter4 = require('./data/artical/data4.json');



var obj = {
    '/api/index': indexJson,
    '/api/hotkey':hotkeyJson,
    '/api/detail?fiction_id=352876':detailJson,
    '/api/chapter?fiction_id=352876':chapterJson,
    '/api/articalurl?fiction_id=352876&chapter_id=1':chapter1,
    '/api/articalurl?fiction_id=352876&chapter_id=2':chapter2,
    '/api/articalurl?fiction_id=352876&chapter_id=3':chapter3,
    '/api/articalurl?fiction_id=352876&chapter_id=4':chapter4
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