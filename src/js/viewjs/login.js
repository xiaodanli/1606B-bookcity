define(['jquery','get'],function($,get){
    var init = function(params){
        $('.submit').on('click',function(){
            var username = $('#username').val();
            var pwd = $("#pwd").val();

            if(!username || !pwd){
                alert('输入内容不能为空');
            }else{
                // get(params.api,{username:username,pwd:pwd},'post').then(function(res){
                //     console.log(res);
                //     var data = JSON.parse(res);
                //     if(data.code === 1){
                //         window.localStorage.setItem('code',data.code);
                //         history.go(-1);
                //     }else{
                //         alert(data.msg);
                //     }
                // }).catch(function(error){
                //     console.warn(error);
                // })

                $.ajax({
                    url:params.api,
                    dataType:'json',
                    type:'post',
                    data:{username:username,pwd:pwd},
                    success:function(res){
                        if(res.code === 1){
                            window.localStorage.setItem('code',res.code);
                            history.go(-1);
                        }else{
                            alert(res.msg);
                        }
                    },
                    error:function(error){
                        console.warn(error);
                    }
                })
            }
        })
    }
    return init
})