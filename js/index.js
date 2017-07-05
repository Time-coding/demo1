//为了规范代码，采用严格模式
// "use strict";
//1、需要渲染菜单栏
$.ajax({
    url:"http://182.254.146.100:3000/api/getindexmenu",
    type:'get',
    dataType:'json',
    success:function(data){
        console.log(data);
        //进行模板渲染
        var html=template('menu',data);
        $('#nav_menu .row').html(html);
        //实现功能隐藏
        $("#nav_menu .row>div:nth-last-child(-n+4)").hide();
        //添加点击事件，让其显示隐藏
        $('#nav_menu .row>div:nth-last-child(5)').click(function(){
            //便于切换
            $("#nav_menu .row>div:nth-last-child(-n+4)").toggle(200);
        })
    },
})
//2、渲染商品列表
$.ajax({
    url:'http://182.254.146.100:3000/api/getmoneyctrl',
    type:'get',
    dataType:'json',
    success:function(data){
        //进行模板渲染
        var html=template('low_price_list',data);
        $('#product_list .list_container').html(html);
    }
})