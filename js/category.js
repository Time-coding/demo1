//比价搜索
$.ajax({
    url:'http://182.254.146.100:3000/api/getcategorytitle',
    type:'get',
    dataType:'json',
    success:function(data){
        console.log(data);
        //渲染模板
        var html=template('bijia_source',data);
        $('#bijia_menu #accordion').html(html);
        //需要实现的业务----点击实现大标题下的列表
        $('#bijia_menu #accordion .panel-default .panel-heading .panel-title a').click(function(){
            //获取分页列表
            //1、需要根据大标题的ID来动态加载响应的下拉菜单
            //2、怎么动态设置---自定义属性---在模板中添加自定义属性---就可以动态获取到相对应的titleid
            var titleid=$(this).data('titleid');
            //4、获取需要渲染的部分的父级
            var $row=$(this).parent().parent().siblings().find('.panel-body .row');
            //3、判断下拉列表为空，就加载相应内容
            if($row.children().length==0){
                //加载，获取数据
                $.ajax({
                    //2、查看接口文档--需要获取titleid，便于数据的获取
                    url:' http://182.254.146.100:3000/api/getcategory?titleid='+titleid,
                    type:'get',
                    dataType:'json',
                    success:function(data){
                        console.log(data);
                        //创建模板，添加到相应的大标题下
                        var html=template('columns',data);
                        //4、需要动态获取上级列表--由于在点击事件内部，可根据this获取
                        $row.html(html);
                    }
                })
            }

        })
    }
})