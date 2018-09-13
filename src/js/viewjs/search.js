define(['jquery','render','get'],function($,render,get){
    var init = function(params){

        //请求热门搜索关键词
        get(params.api.hotkey).then(function(res){
            console.log(res);
            var data = JSON.parse(res);

            if(data.code === 1){
                render('#hotkey-tpl',data.data.ads,'.hot-key');
            }
        }).catch(function(error){
            console.warn(error);
        })

        //点击搜索
        $('.search-btn').on('click',function(){
            var val = $('.ipt').val();

            if(!val){
                alert('输入内容为空');
            }else{
                $('.keys').hide();
                searchFun(val);
            }
        })

        var storage = window.localStorage;

        var history = JSON.parse(storage.getItem('history')) || [];

        if(history.length){
            render('#hotkey-tpl',history,'.history');
        }

        function searchFun(val){
            var url = params.api.search+'?key='+val;

            var isHas = history.some(function(item){
                return item.ad_name === val
            })

            if(!isHas){
                history.push({ad_name:val});
                storage.setItem('history',JSON.stringify(history));
                render('#hotkey-tpl',history,'.history');
            }

            get(url).then(function(res){
                var resultData = JSON.parse(res);
                if(resultData.code === 1 && resultData.data.length){
                    render("#result-tpl",resultData.data,'.result');
                }else if(resultData.code === 1 && !resultData.data.length){
                    $('.result').html('<p>没有匹配的数据</p>')
                }
                $('.result').show();
            }).catch(function(error){
                console.warn(error);
            })
        }

        //input
        $('.ipt').on('input',function(){
            var val = $(this).val();
            if(!val){
                $('.result').hide();
                $('.keys').show();
            }
        })

        //点击label
        $('.label-list').on('click','li',function(){
            var key = $(this).html();
            $('.ipt').val(key);
            searchFun(key);
            $('.result').show();
            $('.keys').hide();
        })

        //点击返回
        $('.icon-back').on('click',function(){
            location.href="/";
        })
    }

    return init
})