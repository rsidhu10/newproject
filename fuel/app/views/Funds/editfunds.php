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
<form action="<?php echo Uri::create('funds/update'); ?>" method="post">
	<input type="hidden" name="id" value="<?php echo $q->funds_id; ?>" ></input>
	<div class="container">
		<table class="table table-stripped">
			<thead>
				<th colspan="10"><center>NRDWP FUNDS RELEASE</center></th>
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
					<td><label class="form-label"> Normal + QA</label></td>
					<td>
						<input type="text" class="form-control normal"  name="normal" id="normal" size="5"  style="text-align: right;" placeholder="0.000" value ="<?php echo $q->funds_cen_normal; ?>" >
					</td>	
					<td><label> Sustainability</label></td>
					<td>
						<input type="text" class="form-control sustain"  name="sustain" id="sustain" size="5" style="text-align: right;" placeholder="0.000" value ="<?php echo $q->funds_cen_sustain; ?>">
					</td>
					<td><label class="form-label"> Earmark</label></td>
					<td>
						<input type="text" class="form-control earmark"  name="earmark" id="earmark" size="5" style="text-align: right;" placeholder="0.000" value ="<?php echo $q->funds_cen_earmark; ?>">
					</td>
					<td><label class="form-label"> O & M</label></td>
					<td>
						<input type="text" class="form-control omfunds"  name="omfunds" id="omfunds" size="5" style="text-align: right;" placeholder="0.000" value ="<?php echo $q->funds_cen_om; ?>">
					</td>
				</tr>
				
				<tr>
					<td colspan="8" align="center">
						<input type="submit" value="Update" name="update" class="btn btn-default"></input>	
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
