Tab("#parameters");//调用点击active--自己封装的js插件
//创建一个获取当前ID的方法
function getId(){
    var gi=location.search.length>1?location.search.substr(1):"";
    var items=gi.length>1?gi.split("&"):[];
    var obj={},key,value,item;
    for ( var i = 0;i<items.length;i++ ){
        item = items[i].split("=");//[categoryid,112]
        key = item[0];
        value = item[1];
        obj[key] = value;
    }
    return obj;
}
var getCp=getId();
var categoryid=parseInt(getCp.categoryid) || 0;//从上一个页面传入的数据
var productid=parseInt(getCp.productid) || 0;//从上一个页面传入的数据
var productListid=parseInt(getCp.productListid) || 0;//从上一个页面传入的数据
var productCom=getCp.productCom;
//路径导航li:nth-child(3)点击
$.ajax({
    url:'http://182.254.146.100:3000/api/getproduct?productid='+productid,
    type:'get',
    dataType:'json',
    success:function(data){
        console.log(data);
        //操作字符串，截取关键字添加到路径导航li:nth-child(3)
        var str=data.result[0].productName.split(" ");
        if(str[0].length>12){
            str[0]=str[0].slice(0,12)
        }
     $("#product_search .breadcrumb li:nth-child(3)").html(str[0]); 
    }
})
//导航条li:nth-child(2)的设置
$.ajax({
    url:"http://182.254.146.100:3000/api/getcategorybyid?categoryid="+getCp.categoryid,
    type:"get",
    dataType:"json",
    success:function(data){
        //导航条的分类随全部分类的点击动态生成
        $("#product_search .breadcrumb li:nth-child(2) a").html(data.result[0].category); 
        $("#product_search .breadcrumb li:nth-child(2) a").href="productList.html?categoryid="+getCp.categoryid;
    }
});
//图片信息和比价
$.ajax({
    url:'http://182.254.146.100:3000/api/getproduct?productid='+productid,
    type:'get',
    dataType:'json',
    success:function(data){
        var html=template("leshi",data)
            $("#details").html(html); 
        var bjshop=template("bjshop", data);
            $("#home").html(bjshop);
            //修改最低价格
        var price='当前最低'+($('#home').find('td.red').text())
            $(".de_info_left").html(price);
            //操作字符串，修改评论条数与上一页相对应
            var po=productCom.slice(-6);
            var mo=po.replace(/[^0-9]/ig,"");
             $(".de_info .de_info_right").html('评论('+mo+')');

    }
})
//评论
$.ajax({
    url:'http://182.254.146.100:3000/api/getproductcom?productid='+productid,
    type:'get',
    dataType:'json',
    success:function(data){
      var html=template("discuss",data)
            $("#messages").html(html);
    }
})
