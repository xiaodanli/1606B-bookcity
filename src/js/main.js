require.config({
    baseUrl: '/js/',
    paths: {
        //库文件
        'jquery': './libs/jquery-2.1.1.min',
        'page': './libs/page',
        'swiper': './libs/swiper.min',
        'handlebars': './libs/handlebars-v4.0.11',
        'text': './libs/text',

        //common
        'get': './common/get',
        'render': './common/render',

        //路由
        'router': './router/router',
        'config': './router/config',

        //view
        'index': './viewjs/index',
        'detail': './viewjs/detail',
        'search':'./viewjs/search',

        //模板
        'listTB': '../view/tpl/list-t-b.html',
        'listLR': '../view/tpl/list-l-r.html'

    }
})

require(['router'])