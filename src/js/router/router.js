require(['page', 'config'], function(page, config) {
    // /index
    page('*', config.start);

    page('/', '/index');

    page('/index', config.index);

    page('/detail/:fiction_id', config.detail);

    page('/search',config.search);

    page('/chapter/:fiction_id/:chapter_id',config.chapter);

    page('/artical/:fiction_id/:chapter_id',config.artical);

    page('/login',config.login);

    page('/my',config.my);

    page('*', config.script);

    page(); //开启路由
})