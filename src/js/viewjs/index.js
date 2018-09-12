define(['jquery', 'swiper', 'get', 'render'], function($, swiper, get, render) {
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

        console.log(swiperData);

        console.log(classifyData);


    }
    var init = function(params) {

        var wrapSwiper = new swiper('.wrap-swiper', {
            onSlideChangeStart: function(swiper) {
                // alert(swiper.activeIndex);
                var activeIndex = swiper.activeIndex;
                tabChange(activeIndex);
            }
        });




        get(params.api).then(function(res) {

            var data = JSON.parse(res);
            console.log(data);
            if (data.code === 1) {
                renderIndex(data.data);
            }
        }).catch(function(error) {
            console.warn(error);
        })

        //点击header
        $('.tab-wrap').on('click', '.tab-item', function() {
            var index = $(this).index();
            wrapSwiper.slideTo(index);
            tabChange(index);
        })
    }
    return init
})