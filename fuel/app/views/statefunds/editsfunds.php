<!DOCTYPE html>
<html>
<head>
	<title>DWSS Punjab</title>
	<?php echo Asset::js('funds.js'); ?>
	<?php echo Asset::css('bootstrap.css'); ?>
	<?php echo Asset::css('jquery-ui.css'); ?>
	<?php echo Asset::js('jquery.js'); ?>
	<?php echo Asset::js('jquery-ui.js'); ?>
	
</head>
<body>
<form action="<?php echo Uri::create('statefunds/update'); ?>" method="post">
	<input type="hidden" name="id" value="<?php echo $q->funds_id; ?>" ></input>
	<div class="container">
		<table class="table table-stripped">
			<thead>
				<th colspan="10"><center>STATE FUNDS RELEASE</center></th>
				<fieldset>
					<tr>
						<th><label class="form-label"> Financial Year</label></th>
						<th>
							<select name="financialyear" id = "financialyear" class="form-control financialyear" value ="<?php echo $q->funds_year; ?>" >
							<option value="1">2016-17</option>
							</select>
						</th>
						<th><label class="form-label">District</label></th>
						<th>
							<input type="text" class="form-control district"  name="district" disabled="true" id="district" style="text-align: left;"  value ="<?php echo $q->district_name; ?>" >
						</th>
						<th><label class="form-label"> Division</label></th>
						<th>
							<input type="text" class="form-control division"  name="division" disabled="true" id="division" style="text-align: left;"  value ="<?php echo $q->division_name; ?>" >
						</th>
						<th><label class="form-label"> Letter Num</label></th>
						<th>
							<input type="text" class="form-control lnum"  name="letter_num" id="letter_num" size="3" style="text-align: right;" placeholder="0" value ="<?php echo $q->funds_num; ?>">
							
						</th>
						<th><label class="form-label"> Date</label></th>
						<th>
							<input type="text" class="form-control"  name="letter_date" id="letter_date" size="6" style="text-align: right;" placeholder="____/__/__" value ="<?php echo $q->funds_date; ?>">
							
						</th>
					</tr>	
				</fieldset>
			</thead>
		</table>
		<table class="table">	
			<tbody>
				<tr>
					<td><label class="form-label">WBank-1a </label></td>
					<td>
						<input type="text" class="form-control normal"  name="wbank1a" id="wbank1a" size="5"  style="text-align: right;" placeholder="0.000" value ="<?php echo $q->funds_1a; ?>" >
					</td>	
					<td><label>WBank-2a</label></td>
					<td>
						<input type="text" class="form-control sustain"  name="wbank2a" id="wbank2a" size="5" style="text-align: right;" placeholder="0.000" value ="<?php echo $q->funds_2a; ?>">
					</td>
					<td><label class="form-label"> WBank-2b</label></td>
					<td>
						<input type="text" class="form-control earmark"  name="wbank1b" id="wbank1b" size="5" style="text-align: right;" placeholder="0.000" value ="<?php echo $q->funds_2b; ?>">
					</td>
					<td><label class="form-label">Component4</label></td>
					<td>
						<input type="text" class="form-control omfunds"  name="component4" id="component4" size="5" style="text-align: right;" placeholder="0.000" value ="<?php echo $q->funds_com4; ?>">
					</td>
				</tr>
					
				<tr>
				<td>
					
				</td>
					<td colspan="6" align="center">
						<input type="submit" value="Update" name="update" class="btn btn-default"></input>	
					</td>
					<td>
						
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
