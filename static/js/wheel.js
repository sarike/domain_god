var Wheel = function(options){
	this.elements = options.elements || [];
	this.on_step = options.on_step || function(){};
	this.name = options.name;

	this.size = this.elements.length;
	this.position = 0;
	this.over = false;

	this.step = function(){
		this.on_step();

		this.position = (this.position + 1) % this.size;

		if(this.position == this.size - 1 && !this.next){
			if(!this.pre){
				clearInterval(this.timer);
				this.on_step();
				return;
			}
			this.pre.next = null;
		}
		
		if(this.position === this.size - 1 && this.next){
			this.next.step();	
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
};

var WheelContainer = {
	wheels: [],

	init: function(maybe_list){
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

	value: function () {
		var result = "";
		for (var i = 0; i < this.wheels.length; i++) {
			result += this.wheels[i].value();
		};
		return result;
	},

	go: function(){
		this.wheels[0].run(100);
	}
};