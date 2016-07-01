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
	<!-- <script src="//cdnjs.cloudflare.com/ajax/libs/numeral.js/1.4.5/numeral.min.js"></script> -->
	
</head>
<body>
	<?php if(Session::get_flash('success')) :  ?>
	    <div class="alert alert-success"><?php echo Session::get_flash('success');?>
		</div>
	<?php elseif(Session::get_flash('error')) : ?>
	    <div class="alert alert-danger"><?php echo Session::get_flash('error');?></div>
	<?php endif; ?>
<form action="<?php echo Uri::create('exp/save'); ?>" id ="form1" method="post">
	<div class="container">
		<table class="table table-stripped" style="width: 100%;">
			<thead>
				<th colspan="10"><center>NRDWP PROGRAMME FUNDS RELEASE</center></th>
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
							} ?>
							</select>
						</th>
						<th style="width: 10%;">
							<span> 
								<font color="red"><p id = "mess_district"></p> 
								</font>
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
							NORMAL + QA
						</td> 
						<td style="width: 200px;">
							<input type="text" class="form-control normal"  name="normal" id="normal" size="5"  style="text-align: right;" placeholder="0.000" >
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
							SUSTAINABILITY
						</td>	
						<td>
							<input type="text" class="form-control WB2a"  name="sustain" id="sustain" size="5" style="text-align: right;" placeholder="0.000">
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
							EARMARK
						</td>
						<td>
							<input type="text" class="form-control WB2b"  name="earmark" id="earmark" size="5" style="text-align: right;" placeholder="0.000" >
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
							O&M
						</td>
						<td >
							<input type="text" class="form-control omfunds"  name="omfunds" id="omfunds" size="5" style="text-align: right;" placeholder="0.000">
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
		var $wb_1a_ent    = parseFloat(document.getElementById("normal").value);
		var $wb_2a_ent    = parseFloat(document.getElementById("sustain").value);
		var $wb_2b_ent    = parseFloat(document.getElementById("earmark").value);
		var $wb_com4_ent  = parseFloat(document.getElementById("omfunds").value);
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
		$('#normal').change(function(){

			var $amt_normal   = parseFloat(document.getElementById("normal").value);
			var $amt_sustain  = parseFloat(document.getElementById("sustain").value);
			var $amt_earmark  = parseFloat(document.getElementById("earmark").value);
			var $amt_omfunds  = parseFloat(document.getElementById("omfunds").value);
			if(isNaN($amt_normal)){$amt_normal =0;}
			if(isNaN($amt_sustain)){$amt_sustain =0;}
			if(isNaN($amt_earmark)){$amt_earmark =0;}
			if(isNaN($amt_omfunds)){$amt_omfunds =0;}
			var $mytotal = $amt_normal + $amt_sustain + $amt_earmark + $amt_omfunds;
			console.log('Total Amount  : ' + $mytotal);
			console.log('Normal Amount : ' + $amt_normal);
			$amt = parseInt($amt_normal);
			console.log('Normal Value : ' + $amt_normal);
			
			if ($amt >= 1){
				console.log("Greater than 1");
				var $normal_len = $amt_normal.toString().length;
				console.log('Length Normal : ' + $normal_len);
				$normal_len = $normal_len + 3 ;
			}else {
				console.log('less than 1');
				$normal_len = 3;
				console.log('Length Normal zero : ' + $normal_len);
			}
			
			
			

			console.log('Length Normal + 3 : ' + $normal_len);
			document.getElementById("normal").value = 
			$amt_normal.toPrecision($normal_len) ;
			var $l = $mytotal.toString().length;
			console.log($l);		
			var $len = $l +3;	
			console.log($len);	
			document.getElementById('gtamount').value = $mytotal.toPrecision($len);
			//document.getElementById('gtamount').value = <?php #echo $english_format_number = number_format($mytotal, 3, '.', ''); ?>;


			// document.getElementById('gtamount');

		});
});
</script>

<script type="text/javascript">
	$(document).ready(function(){
		$('#sustain').change(function(){
			var $amt_normal   = parseFloat(document.getElementById("normal").value);
			var $amt_sustain  = parseFloat(document.getElementById("sustain").value);
			var $amt_earmark  = parseFloat(document.getElementById("earmark").value);
			var $amt_omfunds  = parseFloat(document.getElementById("omfunds").value);
			if(isNaN($amt_normal)){$amt_normal =0;}
			if(isNaN($amt_sustain)){$amt_sustain =0;}
			if(isNaN($amt_earmark)){$amt_earmark =0;}
			if(isNaN($amt_omfunds)){$amt_omfunds =0;}
			var $mytotal = $amt_normal + $amt_sustain + $amt_earmark + $amt_omfunds;
			document.getElementById('gtamount').value = $mytotal;
			document.getElementById('gtamount').fixed
		});
});
</script>
<script type="text/javascript">
	$(document).ready(function(){
		$('#earmark').change(function(){
			var $amt_normal   = parseFloat(document.getElementById("normal").value);
			var $amt_sustain  = parseFloat(document.getElementById("sustain").value);
			var $amt_earmark  = parseFloat(document.getElementById("earmark").value);
			var $amt_omfunds  = parseFloat(document.getElementById("omfunds").value);
			if(isNaN($amt_normal)){$amt_normal =0;}
			if(isNaN($amt_sustain)){$amt_sustain =0;}
			if(isNaN($amt_earmark)){$amt_earmark =0;}
			if(isNaN($amt_omfunds)){$amt_omfunds =0;}
			var $mytotal = $amt_normal + $amt_sustain + $amt_earmark + $amt_omfunds;
			document.getElementById('gtamount').value = $mytotal;
			document.getElementById('gtamount').fixed
		});
});
</script>
<script type="text/javascript">
	$(document).ready(function(){
		$('#omfunds').change(function(){
			var $amt_normal   = parseFloat(document.getElementById("normal").value);
			var $amt_sustain  = parseFloat(document.getElementById("sustain").value);
			var $amt_earmark  = parseFloat(document.getElementById("earmark").value);
			var $amt_omfunds  = parseFloat(document.getElementById("omfunds").value);
			if(isNaN($amt_normal)){$amt_normal =0;}
			if(isNaN($amt_sustain)){$amt_sustain =0;}
			if(isNaN($amt_earmark)){$amt_earmark =0;}
			if(isNaN($amt_omfunds)){$amt_omfunds =0;}
			var $mytotal = $amt_normal + $amt_sustain + $amt_earmark + $amt_omfunds;
			document.getElementById('gtamount').value = $mytotal;
			document.getElementById('gtamount').fixed
		});
});
</script>
