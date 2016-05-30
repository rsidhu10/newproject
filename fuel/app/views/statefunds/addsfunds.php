<!DOCTYPE html>
<html>
<head>
	<title>DWSS Punjab</title>
	<?php echo Asset::js('funds.js'); ?>
	<?php echo Asset::css('bootstrap.css'); ?>
	<?php echo Asset::css('jquery-ui.css'); ?>
	<?php echo Asset::css('datepicker.css'); ?>
	<?php echo Asset::js('jquery.js'); ?>
	<?php echo Asset::js('jquery-ui.js'); ?>
	
</head>
<body>
	<?php if(Session::get_flash('success')) :  ?>
	    <div class="alert alert-success"><?php echo Session::get_flash('success');?>
		</div>
	<?php elseif(Session::get_flash('error')) : ?>
	    <div class="alert alert-danger"><?php echo Session::get_flash('error');?></div>
	<?php endif; ?>
<form action="<?php echo Uri::create('statefunds/save'); ?>" id ="form1" method="post">
	<div class="container">
		<table class="table table-stripped" style="width: 100%;">
			<thead>
				<th colspan="10"><center>STATE FUNDS RELEASE</center></th>
				<fieldset>
					<tr>
						<th style="width: 12%;" >Financial Year</th>
						<th style="width: 13%;">
							<select name="financialyear" id = "financialyear" class="form-control financialyear" value ="1" >
							<option value="1">2016-17</option>
							</select>
						</th>
						<th style="width: 10%;">District</th>
						<th style="width: 15%">
							<select name="district" id = "district" class="form-control district">
								<option value="0">Select District</option>
								<?php 
									foreach ($q as $row) {
								?>
									<option value="<?php echo $row->id;?> "><?php echo $row->district_name;?></option>
							<?php 
							}
							?>


							</select>
						</th>
						<th style="width: 10%;">
							<span>
							<font color="red"><p id = "mess_district"  >
							</p></font>
							</span>

						</th>
						<th style="width: 10%;">Division</th>
						<th style="width: 20%;">
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
						
					</tr>	
				</fieldset>
			</thead>
		</table>
		<center>
			<table class="table table-striped" style="align-self: center; width: 50%;">	
				<tbody style="align-self: center;">
					<tr>
						<td style=" padding-left: 50px;" style="width: 50%;" >
							Letter Number
						</td> 
						<td style="width: 25%;" >
							<input type="text" class="form-control lnum"  name="letter_num" id="letter_num" size="3" style="text-align: right;" placeholder="0">
						</td>
						<td style="width: 25%;">
							<span>
							<font color="red"><p id = "mess_num"  >
							</p></font>
							</span>
						</td>
					</tr>
					<tr>
						<td style=" padding-left: 50px;" >
							Letter Date
						</td> 
						<td style="width: 200px;">
							<input type="text" class="form-control"  name="letter_date" id="letter_date" size="5" style="text-align: right;" placeholder="____/__/__">
						</td>
						<td>
							<span>
							<font color="red"><p id = "mess_date"  >
							</p></font>
							</span>
						</td>
					</tr>
					



					<tr>
						<td style=" padding-left: 50px;" >
							World Bank Second 1a
						</td> 
						<td style="width: 200px;">
							<input type="text" class="form-control WB1a"  name="wb_1a" id="wb_1a" size="5"  style="text-align: right;" placeholder="0.000" >
						</td>
						<td>
							<span>
							<font color="red"><p id = "mess_1a"  >
							</p></font>
							</span>
						</td>
					</tr>
					<tr>
						<td style=" padding-left: 50px;" >
							World Bank Second 2a
						</td>	
						<td>
							<input type="text" class="form-control WB2a"  name="wb_2a" id="wb_2a" size="5" style="text-align: right;" placeholder="0.000">
						</td>
						<td>
							<span>
							<font color="red"><p id = "mess_2a"  >
							</p></font>
							</span>
						</td>
					</tr>
					<tr>
						<td style=" padding-left: 50px;" >
							World Bank Second 2b
						</td>
						<td>
							<input type="text" class="form-control WB2b"  name="wb_2b" id="wb_2b" size="5" style="text-align: right;" placeholder="0.000" >
						</td>
						<td>
							<span>
							<font color="red"><p id = "mess_2b"  >
							</p></font>
							</span>
						</td>		
					</tr>
					<tr>	
						<td style=" padding-left: 50px;" >
							World Bank Component4
						</td>
						<td >
							<input type="text" class="form-control component4"  name="component4" id="component4" size="5" style="text-align: right;" placeholder="0.000">
						</td>
						<td>
							<span>
							<font color="red"><p id = "mess_com4"  >
							</p></font>
							</span>
						</td>
					</tr>
					<tr>	
						<td style=" padding-left: 50px;" >
							Total Funds Released
						</td>
						<td >
							<input type="text" class="form-control totalfunds"  name="gtamount" id="gtamount" size="5" style="text-align: right;" placeholder="0.000" disabled="true">
						</td>
						<td>
							<span>
							<font color="red"><p id = "mess_com4"  >
							</p></font>
							</span>
						</td>
					</tr>
			
					<tr>
						<td colspan="3">
							<center>
							<input type="hidden" name="wing_id" id="wing_id" value="" style="width: 10%"></input>
							<a href ="/statefunds"> 
								<input type="button" value="Back" name="back" class="btn btn-primary" style="width: 60px" >
							</a>
							<input type="button" value="Cancel" name="cancel" class="btn btn-primary" style="width: 60px"  onclick="location.reload()"></input>
							<input type="submit" value="Save" name="save" class="btn btn-primary" style="width: 60px"  ></input>
							<input type="button" value="Test" name="add" class="btn btn-primary" style="width: 60px" on onclick="return checkdata(this);" ></input>
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
		</center>
	</div>

</body>
</html>
<script type="text/javascript">
	$(function(){
		//alert(0);
		$('#letter_date').datepicker({ dateFormat : 'yy-m-d',
			changeMonth: true,
			changeYear: true}
		);
		
	

		




	function mynormal(){
    	
    var x = document.getElementById("#normal");
    alert("gotit");
    //x.value = x.value.toUpperCase();
    }


});
</script>		


<script type="text/javascript">
	function checkdata(){
		
		var $district_ent = document.getElementById("district").value;
		var $division_ent = document.getElementById("division").value;
		var $numleter_ent = parseInt(document.getElementById("letter_num").value);
		var $numdate_ent  = document.getElementById("letter_date").value;
		var $wb_1a_ent    = parseFloat(document.getElementById("wb_1a").value);
		var $wb_2a_ent    = parseFloat(document.getElementById("wb_2a").value);
		var $wb_2b_ent    = parseFloat(document.getElementById("wb_2b").value);
		var $wb_com4_ent  = parseFloat(document.getElementById("component4").value);
		var $sum          = parseFloat(document.getElementById("gtamount").value);
		
		var total = $wb_1a_ent + $wb_2a_ent + $wb_2b_ent + $wb_com4_ent;

		if($district_ent =="0"){
			document.getElementById('mess_district').innerHTML ="*(required)";
			document.getElementById('district').focus();
			return
		}
		if($division_ent =="0"){
			document.getElementById('mess_division').innerHTML ="*(required)";
			document.getElementById('division').focus();
			return
		}

		if(isNaN($numleter_ent)){
			document.getElementById('mess_num').innerHTML ="*(required)";
			document.getElementById('letter_num').focus();
			return
			
		}


		if($sum == 0 || isNaN($sum)) {
				document.getElementById('mess_1a').innerHTML ="*(required)";
				document.getElementById('mess_2a').innerHTML ="*(required)";
				document.getElementById('mess_2b').innerHTML ="*(required)";
				document.getElementById('mess_com4').innerHTML ="*(required)";
				document.getElementById('wb_1a').focus();
				return
		}
	
	

		

	}

</script>


<script type="text/javascript">
	$(document).ready(function(){
		$('#letter_date').change(function(){
			var num1 = document.getElementById('letter_date').value;
			
			//alert(num1);
		});
	});
</script>


<script type="text/javascript">
	$(document).ready(function(){
		$('#letter_num').change(function(){
			var num1 = document.getElementById('letter_num').value;
			if(isNaN(num1)){

			}else {
				document.getElementById('mess_num').innerHTML ="";
			}
		});
	});
</script>

<script type="text/javascript">

	$(document).ready(function(){
		$('#division').change(function(){
			document.getElementById('mess_division').innerHTML ="";
		});
	});


</script>


		
<script type="text/javascript">
	$(document).ready(function(){
		$('#component4').change(function(){
			var $amt_wb1a   = parseFloat(document.getElementById("wb_1a").value);
			var $amt_wb2a   = parseFloat(document.getElementById("wb_2a").value);
			var $amt_wb2b   = parseFloat(document.getElementById("wb_2b").value);
			var $amt_com4 	= parseFloat(document.getElementById("component4").value);
			if(isNaN($amt_wb1a)){$amt_wb1a =0;}
			if(isNaN($amt_wb2a)){$amt_wb2a =0;}
			if(isNaN($amt_wb2b)){$amt_wb2b =0;}
			if(isNaN($amt_com4)){$amt_com4 =0;}
			var $mytotal = $amt_wb1a + $amt_wb2a + $amt_wb2b + $amt_com4;
			document.getElementById('gtamount').value = $mytotal;
			document.getElementById('gtamount').fixed
		});
});
</script>

<script type="text/javascript">
	$(document).ready(function(){
		$('#wb_1a').change(function(){
			var $amt_wb1a   = parseFloat(document.getElementById("wb_1a").value);
			var $amt_wb2a   = parseFloat(document.getElementById("wb_2a").value);
			var $amt_wb2b   = parseFloat(document.getElementById("wb_2b").value);
			var $amt_com4 	= parseFloat(document.getElementById("component4").value);
			if(isNaN($amt_wb1a)){$amt_wb1a =0;}
			if(isNaN($amt_wb2a)){$amt_wb2a =0;}
			if(isNaN($amt_wb2b)){$amt_wb2b =0;}
			if(isNaN($amt_com4)){$amt_com4 =0;}
			var $mytotal = $amt_wb1a + $amt_wb2a + $amt_wb2b + $amt_com4;
			document.getElementById('gtamount').value = $mytotal;
		});
});
</script>
<script type="text/javascript">
	$(document).ready(function(){
		$('#wb_2a').change(function(){
			var $amt_wb1a   = parseFloat(document.getElementById("wb_1a").value);
			var $amt_wb2a   = parseFloat(document.getElementById("wb_2a").value);
			var $amt_wb2b   = parseFloat(document.getElementById("wb_2b").value);
			var $amt_com4 	= parseFloat(document.getElementById("component4").value);
			if(isNaN($amt_wb1a)){$amt_wb1a =0;}
			if(isNaN($amt_wb2a)){$amt_wb2a =0;}
			if(isNaN($amt_wb2b)){$amt_wb2b =0;}
			if(isNaN($amt_com4)){$amt_com4 =0;}
			var $mytotal = $amt_wb1a + $amt_wb2a + $amt_wb2b + $amt_com4;
			document.getElementById('gtamount').value = $mytotal;
		});
});
</script>
<script type="text/javascript">
	$(document).ready(function(){
		$('#wb_2b').change(function(){
			var $amt_wb1a   = parseFloat(document.getElementById("wb_1a").value);
			var $amt_wb2a   = parseFloat(document.getElementById("wb_2a").value);
			var $amt_wb2b   = parseFloat(document.getElementById("wb_2b").value);
			var $amt_com4 	= parseFloat(document.getElementById("component4").value);
			if(isNaN($amt_wb1a)){$amt_wb1a =0;}
			if(isNaN($amt_wb2a)){$amt_wb2a =0;}
			if(isNaN($amt_wb2b)){$amt_wb2b =0;}
			if(isNaN($amt_com4)){$amt_com4 =0;}
			var $mytotal = $amt_wb1a + $amt_wb2a + $amt_wb2b + $amt_com4;
			document.getElementById('gtamount').value = $mytotal;
		});
});
</script>
