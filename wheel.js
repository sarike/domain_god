var Wheel = function(options){
	this.elements = options.elements || [];
	this.on_circle = options.on_circle || function(){};
	this.on_step = options.on_step || function(){};
	this.name = options.name;

	this.size = this.elements.length;
	this.circles = 0;
	this.position = 0;
	this.over = false;

	this.step = function(){
		this.position = (this.position + 1) % this.size;
		
		if(this.postion === 0 && this.circles != 0 && this.next){
			this.circles +=1;
			this.next.step();
		}
		this.on_step();
	};

	this.value = function(){
		console.info(this.name + " : " + this.position)
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

	init: function(){
		for (var i = 0; i < 10; i++) {
			var w = new Wheel({
				elements: '0123456789'.split(''),
				name: 'wheel_' + i
			})
			if(i!=0){
				this.wheels[i-1].next = w;
			}
			this.wheels.push(w);
		}
	},

	value: function () {
		var result = "";
		for (var i = this.wheels.length - 1; i >= 0; i--) {
			result += this.wheels[i].value();
		};
		return result;
	},

	go: function(){
		this.init();
		console.info(this.wheels);
		var self = this;
		this.wheels[0].on_step=function () {
			console.info(self.value());
		}
		this.wheels[0].run();
	}
};