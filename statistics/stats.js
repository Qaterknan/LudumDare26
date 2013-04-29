var statistics = {
	send : function(id, data){
		var data = data === undefined ? 1 : data;

		var post = {};
		post[id] = data;

		$.ajax({
			cache : true,
			url : "statistics/stats.php",
			data : post,
			complete : function(xhr){
				console.log(xhr.responseText);
			}
		});
	}
}