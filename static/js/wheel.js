var Wheel = function(options){
	this.elements = options.elements || [];
	this.on_step = options.on_step || function(){};
	this.on_stop = options.on_stop || function(){};
	this.on_all_finish = options.on_all_finish || function(){};
	this.name = options.name;

	this.size = this.elements.length;
	this.position = 0;

	this.step = function(){
		this.on_step();

		// 判断当前轮子是否完成
		if(this.position == this.size - 1 && !this.next){
			// 判断是否所有轮子完成
			if(!this.pre){
				clearInterval(this.timer);
				this.on_all_finish();
				return;
			}
			//如果当前轮子完成，从链表中移除
			this.pre.next = null;
		}else{
			this.position = (this.position + 1) % this.size;
			if(this.position === this.size - 1 && this.next){
				this.next.step();	
			}
		}
	};

	this.value = function(){
		return this.elements[this.position];
	};

	this.run = function(delay) {
		var self = this;
		this.timer = setInterval(function(){
			self.step(); 
		}, delay || 1000);
	};

	this.pause = function(){
		clearInterval(this.timer);
	}
};

var WheelContainer = {
	wheels: [],

	/**
	*	 w[0] --next-->  w[1] --next-->  w[2] --next-->  w[3] --next-->  w[4]
	**/
	init: function(maybe_list){
		this.wheels = [];
		for (var i = 0; i < maybe_list.length; i++) {
			var w = new Wheel({
				elements: maybe_list[i],
				name: 'wheel_' + i
			})
			if(i!=0){
				this.wheels[i-1].next = w;
				w.pre = this.wheels[i-1];
			}
			this.wheels.push(w);
		}
	},

	on_all_finish: function(){},

	value: function () {
		var result = "";
		for (var i = 0; i < this.wheels.length; i++) {
			result += this.wheels[i].value();
		};
		return result;
	},

	go: function(){
		self = this;
		this.wheels[0].run(100);
		this.wheels[0].on_all_finish = function(){
			self.on_all_finish();
			for (var i = 0; i < self.wheels.length; i++) {
				self.wheels[i].position = 0;
			};
		};
	},

	pause: function(){
		this.wheels[0].pause();
	}
};