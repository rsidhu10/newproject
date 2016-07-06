$(document).ready(function(){
	// $('#district').change(function(){
		document.getElementById('mess_district').innerHTML ="";
	//	var discode = $(this).val();
		var discode = "D01";
		discode = discode.trim();
		console.log("Sending Post "+ discode);
		var target = '/myblock';
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
				$("#block").empty();
				$("#block").append( $('<option></option>').val("0").html("Select Block") );
				$.each(data.message,function(){
					console.log(this);
					$("#block").append( $('<option></option>').val(this.value).html(this.text) );
				});
			}
		});
	});
// });

$(document).ready(function(){
	$('#block').change(function(){
		document.getElementById('mess_block').innerHTML ="";
		var habcode = $(this).val();
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
});

$(document).ready(function(){
	$('#block').change(function(){
		document.getElementById('mess_block').innerHTML ="";
		var surcode = $(this).val();
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
});


// $(document).ready(function(){
// 	document.getElementById('mess_district').innerHTML ="";
// 	var pcode = 'w01';
// 	pcode = pcode.trim();
// 	console.log("Sending Post "+ pcode);
// 	var target = '/dist';
// 	var data = {
// 		pbid: pcode,
// 	};
// 	$.ajax({
// 		url: target,
// 		dataType: 'json',
// 		data:data,
// 		type: 'POST',
// 		success:function(data,textstatus,XMLhttpRequest){
// 			//if(data.valid){
// 				console.log(data);
// 			//}
// 			$("#district").empty();
// 			$("#district").append( $('<option></option>').val("0").html("Select District") );
// 			$.each(data.vill,function(){
// 			console.log(this);
// 			$("#district").append( $('<option></option>').val(this.value3).html(this.text3) );
// 			});
// 		}
// 	});
// });
