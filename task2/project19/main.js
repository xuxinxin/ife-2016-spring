
    var els = {}, data=[];
    var lInHandle, lOutHandle, rInHandle, rOutHandle, itemHandle;
    var push = Array.prototype.push,
    	pop  = Array.prototype.pop,
    	unshift = Array.prototype.unshift,
    	shift = Array.prototype.shift;
	var item = document.createElement('div');

    // els 保存dom节点
	els.input = document.querySelector("#input");
	els.lInBtn = document.querySelector(".left-in-button");
	els.lOutBtn = document.querySelector(".left-out-button");
	els.rInBtn = document.querySelector(".right-in-button");
	els.rOutBtn = document.querySelector(".right-out-button");
	els.sort    = document.querySelector('.sort');
	els.display = document.querySelector(".display");
	els.items  = els.display.children;
	
	data.els = els;
	// 重新封装data的push, pop, shift, unshift方法, 与dom的操作绑定
	data.push = function(value) {
		var divDom = document.createElement('div');

		push.call(data, value);

		divDom.style.height = value + '%';
		divDom.title = value;	
		this.els.display.appendChild(divDom);
	}

	data.unshift = function(value) {
		var divDom = document.createElement("div");
		var markEl =  els.items.length == 1 ? null :  els.items[1];
		
		unshift.call(data, value);
		divDom.style.height = value + "%";
		divDom.title = value;
		this.els.display.insertBefore(divDom, markEl);
	}

	data.pop = function(){

		pop.call(data);
		if(this.els.items.length > 1){
			this.els.display.removeChild(els.items[els.items.length-1]);
		}
	}

	data.shift = function(){
		shift.call(data);
		if(this.els.items.length > 1){
			this.els.display.removeChild(els.items[1]);
		}
	}

	// swap方法实现数据的交换，同时实现DOM的交换
	data.swap = function (index1, index2){

		if(index1 > index2){
			arguments.callee(index2,index1);
		}else if(index1 == index2){
			return;
		}

		var tmp = data[index1-1];
		data[index1-1] = data[index2-1];
		data[index2-1] = tmp;

		item1 = this.els.items[index1];
		item2 = this.els.items[index2];
		item1.style.left = (index2 -index1)*19 + 'px';
		item2.style.left = (index1- index2)*19 + 'px';

		(function(){
			setTimeout(function(){

				var divDom1 = document.createElement('div');
				var divDom2 = document.createElement('div');

				divDom1.style.height = data[index1-1] + "%";
				divDom1.title = data[index1-1];
				this.els.display.removeChild(this.els.items[index1]);
				this.els.display.insertBefore(divDom1,this.els.items[index1]);
				
				

				divDom2.style.height = data[index2-1] + "%";
				divDom2.title = data[index2-1];
				this.els.display.removeChild(this.els.items[index2]);
				this.els.display.insertBefore(divDom2,this.els.items[index2] || null);
							

			}.bind(this),300);
		})();		
	}

	data.del = function(index){
		data.splice(index, 1);
		this.els.display.removeChild(this.els.items[index+1]);
	}
	

	// 事件处理函数
	lInHandle = function(){
		var value = parseInt(els.input.value, 10);
		

		if(isNaN(value) || value<10 || value>100 ){
			window.alert("请输入10-100之间的数字");
		}else{
			if( data.length === 60){
				window.alert("最多为60个");
				return;
			}
			data.unshift(value);
			els.input.value = '';
		}
	}

	lOutHandle = function(){
		data.shift();
	}

	rInHandle = function(){
		var value = parseInt(els.input.value, 10);

		if(isNaN(value) || value<10 || value>100 ){
			window.alert("请输入10-100之间的数字");
		}else{
			if(data.length === 60){
				window.alert("最多为60个");
				return;
			}
			data.push(value);
			els.input.value = '';
			
		}
	}

	rOutHandle = function(){
		data.pop();
	}

	sortHandle = function(){
		
		for(var i = 0; i<data.length; i++){
			for(var j = 0 ; i+j<data.length; j++){

				(function(j){
					setTimeout(function(){
						if(data[j] > data[j+1]){
							data.swap(j+1,j+2);
						}
					},(i*(data.length-1)+j)*320);
				})(j);
				
			}
		}
	}

	itemHandle = function(event){
		event.preventDefault();
		var index = Array.prototype.indexOf.call(els.items,event.target)
		if( index != -1){
			data.del(index-1);
		}
	}

	// 绑定事件处理函数
	els.lInBtn.addEventListener('click',lInHandle);
	els.lOutBtn.addEventListener('click',lOutHandle);
	els.rInBtn.addEventListener('click',rInHandle);
	els.rOutBtn.addEventListener('click',rOutHandle);
	els.sort.addEventListener('click', sortHandle);
	els.display.addEventListener('click', itemHandle);


    // 初始化data
    for(var i=0; i<15; i++){
    	var value = Math.floor(Math.random()*90)+10;
    	data.push(value);
    }
