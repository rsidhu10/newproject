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
<form action="<?php echo Uri::create('funds/save'); ?>" method="post">
	<div class="container">
		<table class="table table-stripped">
			<thead>
				<th colspan="10"><center>NRDWP FUNDS RELEASE</center></th>
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
					<td>Normal + QA</td>
					<td>
						<input type="text" class="form-control normal"  name="normal" id="normal" size="5"  style="text-align: right;" placeholder="0.000" onblur= "mynormal()" >
					</td>	
					<td>Sustainability</td>
					<td>
						<input type="text" class="form-control sustain"  name="sustain" id="sustain" size="5" style="text-align: right;" placeholder="0.000" >
					</td>
					<td>Earmark</td>
					<td>
						<input type="text" class="form-control earmark"  name="earmark" id="earmark" size="5" style="text-align: right;" placeholder="0.000" >
					</td>
					<td>O & M</td>
					<td>
						<input type="text" class="form-control omfunds"  name="omfunds" id="omfunds" size="5" style="text-align: right;" placeholder="0.000">
					</td>
				</tr>
				<tr>
					<td>
						<input type="hidden" name="wing_id" id="wing_id" value="" ></input>

					</td>
					<td colspan="6" align="center">
						<a href ="/funds"> <input type="button" value="Back" name="back" class="btn btn-primary" style="width: 100px"  ></a>
						<input type="button" value="Cancel" name="cancel" class="btn btn-primary" style="width: 100px"  onclick="location.reload()">
						<input type="submit" value="Save" name="save" class="btn btn-primary" style="width: 100px" ></input>	
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
