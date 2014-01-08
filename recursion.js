var letters = 'abcdefghijklmnopqrstuvwxyz',
	digitals = '0123456789';	

var domain_gen_pre = function(pattern){
	var maybe_list = []
	for (var i = 0; i < pattern.length; i++) {
		var cur = pattern.charAt(i);
		if(cur === 'w'){
			if(pattern.charAt(i+1) == '{'){
				var opts = pattern.substring(i+1, pattern.substring(i).indexOf('}')).split[','];
				if(opts.length > 0){
					var min = opts.split[','][0],
						max = opts.length > 1? opts[1]:min;
				}
				for (var i = min; i <= max; i++) {
					maybe_list.push(letters);
				};
					
			}else{
				maybe_list.push(letters);
			}
		}
		if(cur === 'd'){
			if(pattern.charAt(i+1) == '{'){
				var opts = pattern.substring(i+1, pattern.substring(i).indexOf('}')).split[','];
				if(opts.length > 0){
					var min = opts.split[','][0],
						max = opts.length > 1? opts[1]:min;
				}
				for (var i = min; i <= max; i++) {
					maybe_list.push(digitals);
				};
			}else{
				maybe_list.push(digitals);
			}
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