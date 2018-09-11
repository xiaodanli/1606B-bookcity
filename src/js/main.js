require.config({
    baseUrl: '/js/',
    paths: {
        //库文件
        'jquery': './libs/jquery-2.1.1.min',
        'page': './libs/page',

        //common
        'get': './common/get',

        //路由
        'router': './router/index',
        'config': './router/config',

        //view
        'index': './view/index',
        'detail': './view/detail'
    }
})

require(['router'])