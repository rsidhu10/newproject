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
<form>
<!--
<form action="<?php #echo Uri::create('sbm/save'); ?>" method="post">
-->	<div class="container">
		<table class="table">
			<thead>
				<th colspan="10"><center>SBM STATE FUNDS RELEASE</center></th>
				<fieldset>
					<tr>
						<th>Financial Year</th>
						<th>
							<select name="financialyear" id = "financialyear" class="form-control financialyear" value ="1" >
							<option value="1">2016-17</option>
							</select>
						</th>
						<th>District</th>
						<th>
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
						<th>Division</th>
						<th>
							<select name="division" id = "division" class="form-control division">
							<option  value="0">Select Division</option>
							</select>
						</th>
						<th>Letter Num</th>
						<th>
							<input type="text" class="form-control lnum"  name="letter_num" id="letter_num" size="3" style="text-align: right;" placeholder="0">
							
						</th>
						<th>Date</th>
						<th>
							<input type="text" class="form-control"  name="letter_date" id="letter_date" size="5" style="text-align: right;" placeholder="____/__/__">
							
						</th>
					</tr>	
				</fieldset>
			</thead>
		</table>
		<table class="table">	
			<tbody>
				<tr>
					<td><input type="text" id="message2"></input></td>
					<td><div name="message1" id="message1"></div></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>

				</tr>
				<tr>
					<td>WB Second 1a</td>
					<td>
						<input type="text" class="form-control WB1a"  name="wb_1a" id="wb_1a" size="5"  style="text-align: right;" placeholder="0.000" >
					</td>	
					<td>WB Second 2a</td>
					<td>
						<input type="text" class="form-control WB2a"  name="wb_2a" id="wb_2a" size="5" style="text-align: right;" placeholder="0.000" >
					</td>
					<td>WB Second 2b</td>
					<td>
						<input type="text" class="form-control WB2b"  name="wb_2b" id="wb_2b" size="5" style="text-align: right;" placeholder="0.000" >
					</td>
					<td>Component4</td>
					<td>
						<input type="text" class="form-control component4"  name="component4" id="component4" size="5" style="text-align: right;" placeholder="0.000">
					</td>
				</tr>
				<tr>
					<td>
						<input type="hidden" name="wing_id" id="wing_id" value="" ></input>
					</td>
					<td colspan="6" align="center">
						<input type="submit" value="Save" name="ave" onclick=myvalid(); class="btn btn-primary"></input>	
					</td>
					<td>
						<input type="hidden" name="circle_id" id="circle_id" value="" ></input>
					</td>
						
				</tr>	
			</tbody>
		</table>
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
		
		$('#letter_date').datepicker( "bounce", "showAnim", $( this ).val() 
		);



	function mynormal(){
    	
    var x = document.getElementById("#normal");
    alert("gotit");
    //x.value = x.value.toUpperCase();
    }


});
</script>		
<script type="text/javascript">
	    function myvalid(){
    	var num1 = parseFloat(document.getElementById("wb_1a").value);
    	var num2 = parseFloat(document.getElementById("wb_2a").value);
    	var num3 = parseFloat(document.getElementById("wb_2b").value);
    	var num4 = parseFloat(document.getElementById("component4").value);
    	if(isNaN(num1)) {
    		document.getElementById("message1").value = "Please any value";
    		document.getElementById("message1").innerHTML = "Hello JavaScript!";

    		
    	}
    	else
    	{
    		alert(num1);
    		document.getElementById("message1").value = "Please any value";
    		document.getElementById("message2").value = "Please any value";
    	}	
    }

</script>

