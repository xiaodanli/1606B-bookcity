define(['jquery', 'handlebars'], function($, handlebars) {
    var render = function(tpl, data, target, isAppend) {
        var source = $(tpl).html();

        var template = handlebars.compile(source);

        handlebars.registerHelper('addIndex', function(index) {
            return index + 1
        })

        var html = template(data);

        if (isAppend) {
            $(target).append(html);
        } else {
            $(target).html(html);
        }
    }

    return render
})