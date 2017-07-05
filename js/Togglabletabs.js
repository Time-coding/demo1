//标签页组件
//要求依托bootstrap样式
////必须要有class='nav-tabs'下面要有li.class='tab-content'下面要有div
//01、先创建一个Tab实例
function Tab(selector,options){
	return new Tab.prototype.init(selector,options);
}
Tab.prototype={
	constructor:Tab,
	init:function(selector,options){
		this.options=options||{};
		this.options.interval=this.options.interval||1000;
		var togglableTabsElment=document.querySelector(selector);
		this.liElements=togglableTabsElment.querySelectorAll('.nav-tabs>li');
		this.tabPaneElements=togglableTabsElment.querySelectorAll('.tab-content>div');
		if(this.options.autoPlay){
			this.autoPlay();
		};
		this.toggle()
	}
}
Tab.fn=Tab.prototype.init.prototype
Tab.fn.autoPlay=function(){
	var count=0;
	var _this=this;
	setInterval(function(){
		count++
		if(count===_this.liElements.length){
			count=0;
		}
		for(var i=0;i<_this.liElements.length;i++){
			_this.liElements[i].className='';
			_this.tabPaneElements[i].style.display="none";
		}
		_this.liElements[count].className='active';
		_this.tabPaneElements[count].style.display="block";
	},this.options.interval);
};
Tab.fn.toggle=function(){
	var _this=this;
	for(var i=0;i<this.liElements.length;i++){
		(function(i){
			var li=_this.liElements[i];
			li.addEventListener('click',function(e){
				for(var j=0;j<_this.liElements.length;j++){
					_this.liElements[j].className="";
					_this.tabPaneElements[j].style.display='none';
				}
				this.className="active";
				_this.tabPaneElements[i].style.display='block';
			})
		}(i))
	}
}


