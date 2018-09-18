define(['jquery','render','get','text!labelTpl','text!listTB'],function($,render,get,labelTpl,listTB) {
    $('body').append(labelTpl);
    $('body').append(listTB);
    var init = function(params) {
        // alert('detail')
        //请求详情数据
       get(params.api).then(function(res){
           
            var data = JSON.parse(res);
            console.log(data);
            if(data.code === 1){
                render('#detail-tpl',data.data.item,'.detail-top');

                var labelArr = [];

                data.data.item.tags.forEach(function(item){
                    labelArr.push({ad_name:item})
                })
                render("#label-tpl",labelArr,'.label');

                render('#t-b-tpl',data.data.related,'.other');

                $('.read-btn').on('click',function(){
                    var code = window.localStorage.getItem('code') || 0;
                    if(code){
                        location.href="/artical/"+params.fiction_id+"/1";
                    }else{
                        location.href="/login";
                    }
                })
            }
       }).catch(function(error){
           console.warn(error);
       })

       $('.icon-back').on('click',function(){
           location.href="/";
       })
    }
    return init
})