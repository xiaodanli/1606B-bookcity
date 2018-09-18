define(['jquery','render','get','base64'],function($,render,get,base64){
    var init = function(params){

        let _articalModel = $('.artical-model'),
            _setStyle = $('.set-style'),
            _fzChange = $('.fz-change');
        //点击内容
        $('.artical-con').on('click',function(){
            _articalModel.show();
        })
        //点击model-c
        $('.model-center').on('click',function(){
            _setStyle.hide();
            _articalModel.hide();
            _fzChange.removeClass('active');
        })
        //点击字体
        _fzChange.on('click',function(){
            _setStyle.toggle();
            _fzChange.toggleClass('active');
        })

        var storage = window.localStorage;
        
        //点击大，小
        var initSize = storage.getItem('fz')*1 || 14,
            maxSize = 32,
            minSize = 10;
        
        

        //点击大    
        $('.big-btn').on('click',function(){
            if(initSize < maxSize){
                initSize += 2;
                storage.setItem('fz',initSize);
                $('.artical-con p').css('fontSize',(initSize/37.5)+'rem');
            }
        })

        //点击小
        $('.small-btn').on('click',function(){
            if(initSize > minSize){
                initSize -= 2;
                storage.setItem('fz',initSize);
                $('.artical-con p').css('fontSize',(initSize/37.5)+'rem');
            }
        })

        //初始是白天的状态  ----- 夜间的字样  status = true

        //夜间的状态 ----- 白天的字样   status = false



        var txt = storage.getItem('status') || '夜间',
            status =  txt === '夜间' ? true : false,
            bg = storage.getItem('bg') || '#f7eee5',
            index = storage.getItem('index') || 0;

        var _dd = $('.day-btn dd'),
            _dayBtn = $('.day-btn'),
            _articalCon = $('.artical-con'),
            _lis = $('.set-bg li');
        
        statusFun(status);
        function statusFun(status){
            if(status){
                _dd.html('夜间');
                _dayBtn.removeClass('light');
                _articalCon.css('backgroundColor',bg);
                storage.setItem('status','夜间');
                _lis.eq(index).addClass('active').siblings().removeClass('active');
            }else{
                _dd.html('白天');
                _dayBtn.addClass('light');
                _articalCon.css('backgroundColor','#0f1410');
                storage.setItem('status','白天');
                _lis.eq(5).addClass('active').siblings().removeClass('active');
            }
        }

        
        
        //设置背景
        $('.set-bg').on('click','li',function(){
            bg = $(this).attr('data-bg');
            if(status){
                _articalCon.css('backgroundColor',bg);
            }
            index = $(this).index();
            storage.setItem('bg',bg);
            storage.setItem('index',index);
            $(this).addClass('active').siblings().removeClass('active');
        })


        //点击day
        $('.day-btn').on('click',function(){
            status = !status;
            statusFun(status);
        })

        //请求章节
        get(params.chapterList).then(function(res){
            var data = JSON.parse(res);
            console.log(data);
            if(data.code === 1){
                $('.total').html(data.data.item.toc.length);
            }
        }).catch(function(error){
            console.warn(error);
        })

        var fiction_id = params.fiction_id,
            chapter_id = storage.getItem(fiction_id) || params.chapter_id;
        
            $('.cur').html(chapter_id);

        //请求内容数据
        getArtical(fiction_id,chapter_id);
        function getArtical(fiction_id,chapter_id){
            var articalUrl = params.articalUrl+'?fiction_id='+fiction_id+'&chapter_id='+chapter_id;
            get(articalUrl).then(function(res){
                console.log(res);
                var data = JSON.parse(res);
                if(data.code === 1){
                    var script = document.createElement('script');
    
                    script.src = data.data.jsonp;
    
                    document.body.appendChild(script);
    
    
                    window.duokan_fiction_chapter = function(res){
                        console.log($.base64().decode(res));
                        var articalCon = JSON.parse($.base64().decode(res));
                        render('#artical-tpl',articalCon,'.artical-con');
                        $('.artical-con p').css('fontSize',(initSize/37.5)+'rem');
                    }
                }
            }).catch(function(error){
                console.warn(error)
            })
        }

       

        //点击下一章
        $('.next-btn').on('click',function(){
            if( chapter_id < 4){
                chapter_id++;
                getArtical(fiction_id,chapter_id);
                $('.cur').html(chapter_id);
                storage.setItem(fiction_id,chapter_id);
            }else{
                alert("已经是最后一章")
            }
        })

        //点击上一章
        $('.prev-btn').on('click',function(){
            if( chapter_id > 1){
                chapter_id--;
                getArtical(fiction_id,chapter_id);
                $('.cur').html(chapter_id);
                storage.setItem(fiction_id,chapter_id);
            }else{
                alert("已经是第一章")
            }
        })

        //go 目录界面
        $('.go-chapter').on('click',function(){
            location.href="/chapter/"+fiction_id+'/'+chapter_id;
        })

        $('.back').on('click',function(){
            location.href="/detail/"+fiction_id;
        })
    }
    return init
})