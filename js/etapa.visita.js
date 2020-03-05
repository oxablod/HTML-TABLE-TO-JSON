$(document).ready(function(){

	var current_fs, next_fs, previous_fs, filha; //fieldsets
	var opacity;
	
	$('option').mousedown(function(e) {
        e.preventDefault();
        $(this).prop('selected', !$(this).prop('selected'));
		//console.log($(this).prop('selected'));
		if($(this).prop('selected')){
			$(this).addClass("selected");
		}
        return false;
    });

	$(".next").click(function(){
		current_fs = $(this).parent();
		//console.log($(this).parent()[0].children[0]);
		next_fs = $(this).parent().next();
		filha= $(this).closest('fieldset').find(':input').val();
		//console.log(filha);
		if((filha != null && filha.length > 0)){
			$(this).closest('fieldset').find(':input').removeClass("required");
			$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
			$(".step").eq($("fieldset").index(next_fs)).addClass("active");
			$(".step").eq($("fieldset").index(current_fs)).addClass("finish");	
			//console.log(current_fs);
				next_fs.show();
				if($(".step").eq($("fieldset").index(current_fs)).hasClass("finish")){
					setTimeout(function () {
					$(".check-icon").show();
				  }, 10);
				}
				if($(".step").eq($("fieldset").index(current_fs)).hasClass("multipla")){
					$(this).closest('fieldset').find(':input').removeClass("required");
				}
				
				current_fs.animate({opacity: 0}, {
					step: function(now) {
						opacity = 1 - now;
						
						current_fs.css({
						'display': 'none',
						'position': 'relative'
						});
						next_fs.css({'opacity': opacity});
					},
					duration: 600
				});
		}else{
			$(this).closest('fieldset').find(':input').addClass("required");
		}
	});



	$(".previous").click(function(){
		current_fs = $(this).parent();
		previous_fs = $(this).parent().prev();

		$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
		$(".step").eq($("fieldset").index(previous_fs)).removeClass("finish");
		$(".step").eq($("fieldset").index(current_fs)).removeClass("active");
		$(".step").eq($("fieldset").index(current_fs)).removeClass("finish");
		previous_fs.show();

		current_fs.animate({opacity: 0}, {
			step: function(now) {
				opacity = 1 - now;

				current_fs.css({
				'display': 'none',
				'position': 'relative'
				});
				previous_fs.css({'opacity': opacity});
			},
			duration: 600
		});
	});

	$('.radio-group .radio').click(function(){
		$(this).parent().find('.radio').removeClass('selected');
		$(this).addClass('selected');
	});
	
	$(".submit").click(function(){	;
		var url = window.location.href;
		var arr = url.split("/");
		var result = arr[0] + "//" + arr[2];
		var $form = $("form");
		//console.log(html2json());
		html2json();
		return true;
	});	
	
	function html2json() {
	   var json = '{';
	   var otArr = [];
	   var tabelas = document.getElementsByTagName("table");
	   	   
	   for(i=0; i < tabelas.length; i++){
		var tab = document.getElementsByTagName("table")[i];
		var nomeTabela = tab.getAttribute('name');
		var idTabela = tab.getAttribute('id');
		var tabela = document.getElementById(idTabela);	
			$(tabela).each(function(i) {		
				x = $(this).children();
				var itArr = [];
				$(x.children()).each(function(i) {					
					y = $(this).children();		
					//console.log(y);	
					nomeCampo = y.children()[0].getAttribute('name');
					valorCampo = y.children()[0].value;
					//console.log(nomeCampo);
					if(nomeCampo.indexOf('[]') > 0){
						for(i=0; i < y.children()[0].length; i++){
							nomeCampo = y.children()[0][i].getAttribute('name');
							valorCampo = y.children()[0][i].value;
							if(y.children()[0][i].className == "selected"){
								itArr.push('{"name":'+'"'+nomeCampo+'",'+'"value'+'":"'+valorCampo+'"}');
							}
						}						
					}else{
						itArr.push('{"name":'+'"'+nomeCampo+'",'+'"value'+'":"'+valorCampo+'"}');
					}
				});			
				otArr.push('"' + nomeTabela + '": [' + itArr.join(',') + ']');
			});			 
	   };
	    json += otArr.join(",") + '}'
		console.log(json);
	   return json;
	}

});