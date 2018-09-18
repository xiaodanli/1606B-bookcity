define(['jquery'], function($) {
    var cache = {};
    var get = function(url, data,type) {
        return new Promise(function(reslove, reject) {
            if (cache[url]) {
                reslove(cache[url]);
                return
            }
            $.ajax({
                url: url,
                dataType: 'text',
                type:type||'get',
                data: data || null,
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