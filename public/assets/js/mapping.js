$(document).ready(function(){
	// document.getElementById('mess_division').innerHTML ="";
	var surcode = 'D13B05';
	surcode = surcode.trim();
	console.log("Sending Post "+ surcode);
	var target = '/mapsur';
	var data = {
		surveyid: surcode,
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
			$("#imis_village").empty();
			$("#imis_village").append( $('<option></option>').val("0").html("Select Habitation") );
			$.each(data.vill,function(){
			console.log(this);
			$("#imis_village").append( $('<option></option>').val(this.value1).html(this.text1) );
			});
		}
	});

});


$(document).ready(function(){
	// document.getElementById('mess_division').innerHTML ="";
	var habcode = 'D13B05';
	habcode = habcode.trim();
	console.log("Sending Post for MIS Village "+ habcode);
	var target = '/maphab';
	var data = {
		villageid: habcode,
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
			$("#mis_village").empty();
			$("#mis_village").append( $('<option></option>').val("0").html("Select Habitation") );
			$.each(data.vill,function(){
			console.log(this);
			$("#mis_village").append( $('<option></option>').val(this.value2).html(this.text2) );
			});
		}
	});

});


// Habitation Message Clear
$(document).ready(function(){
	$('#mis_village').change(function(){
		document.getElementById('mess_mis_village').innerHTML ="";
	});
});

// Component Message Clear
$(document).ready(function(){
	$('#imis_village').change(function(){
		document.getElementById('mess_imis_village').innerHTML ="";
	});
});

// function checkdata(){
	
// 	var $e_district 	= parseInt(document.getElementById("district").value);
// 	var $e_division   	= parseInt(document.getElementById("division").value);
// 	var $e_habitation 	= parseInt(document.getElementById("habitation").value);
// 	var $e_component    = parseInt(document.getElementById("component").value);
// 	var $e_supply_hr    = parseInt(document.getElementById("supply_hr").value);
// 	var $e_recovery    	= parseInt(document.getElementById("recovery").value);
	
// 	if($e_district =="0"){
// 		document.getElementById('mess_district').innerHTML ="*(required)";
// 		document.getElementById('district').focus();
// 		return false;
		
// 	}
// 	if($e_division =="0"){
// 		document.getElementById('mess_division').innerHTML ="*(required)";
// 		document.getElementById('division').focus();
// 		return false;
// 	}

// 	if($e_habitation =="0"){
// 		document.getElementById('mess_habitation').innerHTML ="*(required)";
// 		document.getElementById('habitation').focus();
// 		return false;
		
// 	}

// 	if($e_component =="0"){
// 		document.getElementById('mess_component').innerHTML ="*(required)";
// 		document.getElementById('district').focus();
// 		return false; 
// 	}
// 	if($e_supply_hr =="0"){
// 		document.getElementById('mess_supply_hr').innerHTML ="*(required)";
// 		document.getElementById('division').focus();
// 		return false;
// 	}

// 	if($e_recovery =="0"){
// 		document.getElementById('mess_recovery').innerHTML ="*(required)";
// 		document.getElementById('habitation').focus();
// 		return false;
// 	}
// }

