$(document).ready(function(){
	$('#district').change(function(){
		document.getElementById('mess_district').innerHTML ="";
		var discode = $(this).val();
		discode = discode.trim();
		console.log("Sending Post "+ discode);
		var target = '/mydivn';
		var data = {
			districtid: discode,
		};
		$.ajax({
			url: target,
			dataType: 'json',
			data:data,
			type: 'POST',
			success:function(data,textstatus,XMLhttpRequest){
				//if(data.valid){
					console.log(data);
				//}
				$("#division").empty();
				$("#division").append( $('<option></option>').val("0").html("Select Division") );
				$.each(data.message,function(){
					console.log(this);
					$("#division").append( $('<option></option>').val(this.value).html(this.text) );
				});
			}
		});

	});
});


$(document).ready(function(){
	$('#division').change(function(){
		document.getElementById('mess_division').innerHTML ="";
		var divcode = $(this).val();
		divcode = divcode.trim();
		console.log("Sending Post "+ divcode);
		var target = '/myvill';
		var data = {
			divisionid: divcode,
		};
		$.ajax({
			url: target,
			dataType: 'json',
			data:data,
			type: 'POST',
			success:function(data,textstatus,XMLhttpRequest){
				//if(data.valid){
					console.log(data);
				//}
				$("#habitation").empty();
				$("#habitation").append( $('<option></option>').val("0").html("Select Habitation") );
				$.each(data.vill,function(){
					console.log(this);
					$("#habitation").append( $('<option></option>').val(this.value).html(this.text) );
				});
			}
		});

	});
});

// Habitation Message Clear
$(document).ready(function(){
	$('#habitation').change(function(){
		document.getElementById('mess_habitation').innerHTML ="";
	});
});

// Component Message Clear
$(document).ready(function(){
	$('#component').change(function(){
		document.getElementById('mess_component').innerHTML ="";
	});
});

// Supply Hours Message Clear
$(document).ready(function(){
	$('#supply_hr').change(function(){
		document.getElementById('mess_supply_hr').innerHTML ="";
	});
});

// Recovery Message Clear
$(document).ready(function(){
	$('#recovery').change(function(){
		document.getElementById('mess_recovery').innerHTML ="";
	});
});





function checkdata(){
	
	var $e_district 	= parseInt(document.getElementById("district").value);
	var $e_division   	= parseInt(document.getElementById("division").value);
	var $e_habitation 	= parseInt(document.getElementById("habitation").value);
	var $e_component    = parseInt(document.getElementById("component").value);
	var $e_supply_hr    = parseInt(document.getElementById("supply_hr").value);
	var $e_recovery    	= parseInt(document.getElementById("recovery").value);
	
	if($e_district =="0"){
		document.getElementById('mess_district').innerHTML ="*(required)";
		document.getElementById('district').focus();
		return false;
		
	}
	if($e_division =="0"){
		document.getElementById('mess_division').innerHTML ="*(required)";
		document.getElementById('division').focus();
		return false;
	}

	if($e_habitation =="0"){
		document.getElementById('mess_habitation').innerHTML ="*(required)";
		document.getElementById('habitation').focus();
		return false;
		
	}

	if($e_component =="0"){
		document.getElementById('mess_component').innerHTML ="*(required)";
		document.getElementById('district').focus();
		return false; 
	}
	if($e_supply_hr =="0"){
		document.getElementById('mess_supply_hr').innerHTML ="*(required)";
		document.getElementById('division').focus();
		return false;
	}

	if($e_recovery =="0"){
		document.getElementById('mess_recovery').innerHTML ="*(required)";
		document.getElementById('habitation').focus();
		return false;
	}
}

