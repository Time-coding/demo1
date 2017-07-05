//产品列表
//1、查看接口文档，url地址，有参数，参数怎么获取？
//关键点1、参数可以通过上一个html文档（在category.html的模板中a的href中）中传入，在地址栏会显示！
//关键点2、怎么获取地址栏传入的参数----location.search
//2、所以先获取参数
function getId(){
    //以防万一，一般需判断,在控制台打印location.search再进行后续操作
    var str=location.search.length>1?location.search.substr(1):'';//去除？号；
    var strArrem=str.split('&');//分割字符串
    var obj={},key,value,item;//创建一个对象作为返回值，方便调取
    for (var i = 0; i < strArrem.length; i++) {
         item = strArrem[i].split('=');
         key=item[0];
         value = item[1];
         obj[key] = value;
    }
    return obj;
}
var searchId = getId();
var categoryid=searchId.categoryid;//参数已获取到
var pageid =parseInt(searchId.pageid) || 1;//！important这个参数不是传过来的，咱们项目中这个参数前面是无法获取的，这个是设置的。
//3、渲染导航条
$.ajax({
    url:'http://182.254.146.100:3000/api/getcategorybyid?categoryid='+categoryid,
    type:'get',
    dataType:'json',
    success:function(data){
        console.log(data)
        //导航条的分类随全部分类的点击动态生成
        var shopname=data.result[0].category;
        $('#product_search .breadcrumb li:nth-child(3)').html(shopname);
    }
})
//4、商品列表渲染
$.ajax({
    url:'http://182.254.146.100:3000/api/getproductlist?categoryid='+categoryid+'&pageid='+pageid,
    type:'get',
    dataType:'json',
    success:function(data){
        console.log(data);
        //渲染模板
        var html=template('low_price_data',data);
        $('#videoview').html(html);
        //设置分页
         var pages=Math.ceil(data.totalCount / data.pagesize);//获取总页数
         //上一页
         var prev_href = "productList.html?categoryid="+categoryid+"&pageid="+(pageid-1>1?pageid-1:1);//pageId会动态跟着改变
         console.log(pageid);
         $("#pagination .prev").attr("href",prev_href);
         //下一页
         var next_href =  "productList.html?categoryid="+categoryid+"&pageid="+(pageid+1<pages?(pageid+1):pages);//pageId会动态跟着改变
         $("#pagination .next").attr("href",next_href);
         //中间页码
         var lisStr = "";
         for (var i = 0; i < pages; i++) {
             lisStr += '<li><a href=productList.html?categoryid=' + categoryid + '&pageid=' + (i + 1)+'>'+(i+1)+'/'+pages+'</a></li>';       
         }
         $("#pagination .dropdown .btn").html('1/'+pages);//默认1
         $("#pagination .dropdown-menu").html(lisStr);//动态渲染下拉页
         $("#pagination .dropdown .btn").html(pageid+'/'+pages);//动态变化
    }
})