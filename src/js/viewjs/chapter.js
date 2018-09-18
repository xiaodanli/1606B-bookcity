define(['jquery','render','get','bscroll'],function($,render,get,bscroll){
    var init = function(params){
        var chapter = new bscroll('.chapter-con',
            {click:true}
        );

        get(params.api).then(function(res){
            var data = JSON.parse(res);
            console.log(data);
            if(data.code === 1){
                render('#chapter-tpl',data.data.item.toc,'.chapter-list');
                chapter.refresh();
                var index = params.chapter_id !=0 ? params.chapter_id : data.data.item.toc.length - 1;
                chapter.scrollToElement($('.chapter-list li').eq(index)[0]);
            }
        }).catch(function(error){
            console.warn(error);
        })

        $('.icon-back').on('click',function(){
            history.go(-1);
        })   
        
        //点击列表
        $('.chapter-list').on('click','li',function(){
            var chapter_id = $(this).attr('data-id');
            window.localStorage.setItem(params.fiction_id,chapter_id);
            location.href="/artical/"+params.fiction_id+'/'+chapter_id;
        })
    }

    return init
})