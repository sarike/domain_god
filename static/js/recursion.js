var letters = 'abcdefghijklmnopqrstuvwxyz',
	digitals = '0123456789';	

String.prototype.times = function(n) {  
    return Array.prototype.join.call({length:n+1}, this);  
};  

var multi_arr = function(origin_arr, multiple){
	var result = [];
	for (var i = 0; i < origin_arr.length; i++) {
		result.push(origin_arr[i].times(multiple));
	};
	return result;
};

var domain_gen_pre = function(pattern){
	var maybe_list = []
	for (var i = 0; i < pattern.length; i++) {
		var cur = pattern.charAt(i);
		if(cur === 'w'){
			maybe_list.push(letters.split(''));
		}
		if(cur === 'd'){
			maybe_list.push(digitals.split(''));	
		}
		if(cur === '('){
			var pre_bracket_index = i,
				reg = /\(([wd]+)\)/;
			var match = pattern.substring(pre_bracket_index).match(reg);
			if(match){
				var sub_pattern = match[1];
				var sub_cur = sub_pattern.charAt(0);
				if(sub_cur === 'w'){
					maybe_list.push(multi_arr(letters.split(''), sub_pattern.length));
				}
				if(sub_cur === 'd'){
					maybe_list.push(multi_arr(digitals.split(''), sub_pattern.length));	
				}
			}
			
			i += pattern.substring(pre_bracket_index).indexOf(')');
		}
	};
	return maybe_list;
};

var domain_gen = function (maybe_list, start_index) {
	var domain_list = [];

	if(start_index === maybe_list.length - 1){
		return maybe_list[start_index].split('');
	}

	var sub_domain_list = domain_gen(maybe_list, start_index + 1);

	for (var i = 0; i < sub_domain_list.length; i++) {
		domain_list.p
	};

	var cur_chars = maybe_list[start_index].split('');

	for (var i = 0; i < cur_chars.length; i++) {
		for (var j = 0; j < sub_domain_list.length; j++) {
			domain_list.push(cur_chars[i] + sub_domain_list[j]);
		};
	};

	return domain_list;
};