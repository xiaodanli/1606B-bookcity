define(['jquery'], function($) {
    var cache = {};
    var get = function(url) {
        return new Promise(function(reslove, reject) {
            if (cache[url]) {
                reslove(cache[url]);
                return
            }
            $.ajax({
                url: url,
                dataType: 'text',
                success: function(res) {
                    cache[url] = res;
                    reslove(res)
                },
                error: function(error) {
                    reject(error)
                }
            })
        })
    }

    return get
})