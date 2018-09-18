define(['jquery', 'swiper', 'get', 'render', 'text!listTB', 'text!listLR'], function($, swiper, get, render, listTB, listLR) {

    console.log(listTB);
    $('body').append(listTB);
    $('body').append(listLR);
    //tab切换
    function tabChange(curIndex) {
        $('.tab-item').eq(curIndex).addClass('active').siblings().removeClass('active');
        if (curIndex == 0) {
            $('.line').removeClass('move');
        } else {
            $('.line').addClass('move');
        }
    }

    function renderIndex(data) {
        //渲染顶部的数据
        var top = data.items[0].data.data;

        //swiper
        var swiperData = top.filter(function(item) {
            return item.size != 0
        })

        render('#swiper-tpl', swiperData, '.banner');

        new swiper('.banner-swiper');
        //分类
        var classifyData = top.filter(function(item) {
            return item.size == 0
        })

        render('#classify-tpl', classifyData, '.classify-wrap');

        //hot
        var hotData = data.items[1].data.data;

        render('#t-b-tpl', hotData, '.hot');


        // [{},{},{},{},{}]  一维数组

        // format(2){

        // }

        //[[{},{}],[{},{}]]  2

        //[[{},{},{},{},{}],[{},{},{},{},{}]] 3

        // <ul>
        //     {{#each this}}
        //     <li>
        //         {{#each this}}
        //         <dl>
        //             <dt></dt>
        //             <dd></dd>
        //         </dl>
        //         {{/each}}
        //     </li>
        //     {{/each}}
        // </ul>

        //重磅推荐
        var recommendData = data.items[2].data.data;
        var formatData = format(recommendData, 5);

        var len;

        function format(dataArr, num) {
            console.log("dataArr", dataArr);
            var target = [];
            len = Math.ceil(dataArr.length / num);
            console.log(len);
            for (var i = 0; i < len; i++) {
                target.push(dataArr.splice(0, num));
            }
            return target
        }

        render('#recommend-tpl', formatData[0], '.recommend-list');

        var i = 0;

        //换一换
        $('.change-btn').on('click',function(){
            if(i<(len-1)){
                i++;
            }else{
                i = 0;
            }
            render('#recommend-tpl', formatData[i], '.recommend-list');
        })

    }

    //点击switch-btn

    $('.switch-btn').on('click',function(){
        $(this).toggleClass('list-style');
        $('.shelf-list').toggleClass('list-style');
    })

    //go search

    $('.not-input').on('click',function(){
        location.href="/search";
    })

    var init = function(params) {

        var wrapSwiper = new swiper('.wrap-swiper', {
            onSlideChangeStart: function(swiper) {
                // alert(swiper.activeIndex);
                var activeIndex = swiper.activeIndex;
                tabChange(activeIndex);
            }
        });

        //请求首页数据
         get(params.api[0]).then(function(res) {

            var data = JSON.parse(res);
            console.log(data);
            if (data.code === 1) {
                renderIndex(data.data);
            }
        }).catch(function(error) {
            console.warn(error);
        })

        //pagenum  limit  

        var pagenum = 1,
            limit = 10,
            total;

        //请求loadmore数据
        getLoadmore(pagenum);
        function getLoadmore(pagenum){
            var url = params.api[1]+'?pagenum='+pagenum+'&limit='+limit;
            get(url).then(function(res){
                console.log(res);
    
                var loadmoreData = JSON.parse(res);
    
                if(loadmoreData.code === 1){
                    total = loadmoreData.data.total;
    
                    render("#l-r-tpl",loadmoreData.data.target,'.loadmore',true);
                    $('.bookcity').on('scroll',loadmoreFun)
                }
            }).catch(function(error){
                console.warn(error)
            })
        }
        

        var boxHeight = $('.bookcity').height();

        function loadmoreFun(){
            var conHeight = $('.content').height();

            var maxScroll = conHeight - boxHeight;

            if($(this).scrollTop() > maxScroll -44){
                if(pagenum < total){
                    pagenum++;
                    $('.bookcity').off('scroll');
                    getLoadmore(pagenum);
                }
            }
        }

        // data:{
        //     pagenum:1,
        //     limit:10
        // }

        // 

        //点击header
        $('.tab-wrap').on('click', '.tab-item', function() {
            var index = $(this).index();
            wrapSwiper.slideTo(index);
            tabChange(index);
        })

        //点击person
        $('.icon-person').on('click',function(){
            var code = window.localStorage.getItem('code') || 0;
            if(code){
                location.href="/my";
            }else{
                location.href="/login";
            }
        })
    }
    return init
})