
    



<!DOCTYPE html>
<html>
<head>
	<title>DWSS Punjab</title>
	<?php echo Asset::js('jquery-1.8.0.min.js');?>
	<?php //echo Asset::js('funds.js'); ?>
	<?php //echo Asset::js('test.js'); ?>
	
	<?php echo Asset::css('bootstrap.css'); ?>
	<?php echo Asset::css('jquery-ui.css'); ?>
	<?php echo Asset::css('datepicker.css'); ?>
	
	<?php echo Asset::js('jquery-ui.js'); ?>

</head>
<body>
	<?php if(Session::get_flash('success')) :  ?>
	    <div class="alert alert-success"><?php echo Session::get_flash('success');?>
		</div>
	<?php elseif(Session::get_flash('error')) : ?>
	    <div class="alert alert-danger"><?php echo Session::get_flash('error');?></div>
	<?php endif; ?>
<form action="<?php echo Uri::create('survey/save_survey'); ?>" id ="form1" method="post">
	<div class="container">
		<table class="table table-stripped" style="width: 100%;">
			<thead>
				<th colspan="10"><center>Information Required For Aide Memoire Table</center></th>
				<fieldset>
					<tr>
						<th style="width: 6%;" id="dist_lbl">District</th>
						<th style="width: 15%">
							<select name="district" id = "district" class="form-control district">
								<option value="0">Select District</option>
								<?php foreach ($q as $model) : ?>
								<option value="<?php echo $model->id; ?>"><?php echo $model->district_name; ?></option>
								<?php  endforeach;  ?>
								
							</select>
						</th>
						<th style="width: 10%;">
							<span>
							<font color="red"><p id = "mess_district"  >
							</p></font>
							</span>
						</th>
						<th style="width: 10%;" id="divn_lbl">Division</th>
						<th style="width: 15%;">
							<select name="division" id = "division" class="form-control division">
							<option  value="0">Select Division</option>
							</select>
						</th>
						<th style="width: 10%;">
							<span>
							<font color="red"><p id = "mess_division"  >
							</p></font>
							</span>

						</th>
						<th style="width: 10%;">Habitation</th>
						<th style="width: 15%;">
							 <select name="habitation" id = "habitation" class="form-control habitation">
							<option  value="0">Select Habitation</option>
							</select>
						</th>
						<th style="width: 10%;">
							<span >
							<font color="red"><p id = "mess_habitation"  >
							
							</p></font>
							</span>

						</th>
						
					</tr>	
				</fieldset>
			</thead>
		</table>
		<center>
			<table class="table table-striped" style="align-self: center; width: 70%;">	
				<tbody style="align-self: center;">
					<tr>
						<td style=" padding-left: 50px;" >
							Component
						</td> 
						<td style="width: 300px;">
							<select name="component" id = "component" class="form-control Component">
							<option  value="0">Select Component</option>
							<option  value="1">1a-Component</option>
							<option  value="2">2a-Component</option>
							<option  value="3">2b-Component</option>
							</select>
						</td>
						<td>
							<span>
							<font color="red"><p id = "mess_component"  >
							</p></font>
							</span>
						</td>
					</tr>
			<!-- 		<tr>
						<td style=" padding-left: 50px;" style="width: 50%;" >
							Number of Connections
						</td> 
						<td style="width: 25%;" >
							<input type="text" class="form-control lnum"  name="connections" id="connections" size="3" style="text-align: right;" placeholder="0">
						</td>
						<td style="width: 25%;">
							<span>
							<font color="red"><p id = "mess_connections"  >
							</p></font>
							</span>
						</td>
					</tr> -->
					<tr>
						<td style=" padding-left: 50px;" >
							Supply Hours
						</td> 
						<td style="width: 300px;">
							<select name="supply_hr" id = "supply_hr" class="form-control supply_hr">
							<option  value="0">Select Supply Hours</option>
							<option  value="1">24 Hours</option>
							<option  value="2">> 10 Hours</option>
							<option  value="3">< 10 Hours</option>
							</select>
						</td>
						<td>
							<span>
							<font color="red"><p id = "mess_supply_hr"  >
							</p></font>
							</span>
						</td>
					</tr>
				<!-- 	<tr>
						<td style=" padding-left: 50px;" >
							Connections Coverage
						</td> 
						<td style="width: 300px;">
							<select name="coverage" id = "coverage" class="form-control coverage">
							<option  value="0">Select Coverage</option>
							<option  value="1">Connections-100%  </option>
							<option  value="2">Connections-70-99%</option>
							<option  value="3">Connections<70% </option>
							</select>
						</td>
						<td>
							<span>
							<font color="red"><p id = "mess_coverage"  >
							</p></font>
							</span>
						</td>
					</tr> -->
					<tr>
						<td style=" padding-left: 50px;" >
							Cost Recovery
						</td> 
						<td style="width: 300px;">
							<select name="recovery" id = "recovery" class="form-control recovery">
							<option  value="0">Select Cost Recovery</option>
							<option  value="1">Recovery 100%  </option>
							<option  value="2">Recovery 70-99%</option>
							<option  value="3">Recovery <70%  </option>
							</select>
						</td>
						<td>
							<span>
							<font color="red"><p id = "mess_recovery"  >
							</p></font>
							</span>
						</td>
					</tr>
					<tr>
						<td colspan="3">
							<center>
							<input type="hidden" name="wing_id" id="wing_id" value="" style="width: 10%"></input>
							<a href ="/"> 
								<input type="button" value="Back" name="back" class="btn btn-primary" style="width: 100px" >
							</a>
							<input type="button" value="Cancel" name="cancel" class="btn btn-primary" style="width: 100px"  onclick="location.reload()"></input>
							<input type="submit" value="Save" name="save_survey" class="btn btn-primary" style="width: 100px" onclick="checkdata()" ></input>
							<!-- <input type="button" value="Test" name="add" class="btn btn-primary" style="width: 100px" on onclick="return checkdata(this);" ></input> -->
							<input type="hidden" name="circle_id" id="circle_id" value="" style="width: 10%;" ></input>
							</center>
						</td>
						
					</tr>
					<tr>	
						<td colspan="3" align="center">
						</td>
					</tr>	
				</tbody>
			</table>
			<div id="result"></div>
		</center>
	</div>




</body>
</html>






<script type="text/javascript">
$(document).ready(function(){
	$('#district').change(function(){
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
</script>

<script type="text/javascript">
$(document).ready(function(){
	$('#division').change(function(){
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
</script>


<script type="text/javascript">
	function checkdata(){
		
		var $e_district 	= parseInt(document.getElementById("district").value);
		var $e_division   	= parseInt(document.getElementById("division").value);
		var $e_habitation 	= parseInt(document.getElementById("habitation").value);
		var $e_component    = parseFloat(document.getElementById("component").value);
		var $e_supply_hr    = parseFloat(document.getElementById("supply_hr").value);
		var $e_recovery    	= parseFloat(document.getElementById("recovery").value);
		
		if($e_district =="0"){
			document.getElementById('mess_district').innerHTML ="*(required)";
			document.getElementById('district').focus();
			return 
		}
		if($e_division =="0"){
			document.getElementById('mess_division').innerHTML ="*(required)";
			document.getElementById('division').focus();
			return
		}

		if($e_habitation =="0"){
			document.getElementById('mess_habitation').innerHTML ="*(required)";
			document.getElementById('habitation').focus();
			return
		}

		if($e_component =="0"){
			document.getElementById('mess_component').innerHTML ="*(required)";
			document.getElementById('district').focus();
			return false
		}
		if($e_supply_hr =="0"){
			document.getElementById('mess_supply_hr').innerHTML ="*(required)";
			document.getElementById('division').focus();
			return
		}

		if($e_recovery =="0"){
			document.getElementById('mess_recovery').innerHTML ="*(required)";
			document.getElementById('habitation').focus();
			return
		}

		
	
	

		

	}

</script>
