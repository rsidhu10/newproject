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
<form action="<?php echo Uri::create('statefunds/save'); ?>" method="post">
	<div class="container">
		<table class="table table-stripped">
			<thead>
				<th colspan="10"><center>STATE FUNDS RELEASE</center></th>
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
		<center>
		<table >	
			<tbody>
				<tr style="height: 50px;">
					<td>
						<label class="form form-label">WB Second 1a</label> </td>
					<td><label class="form form-label" style="padding-left: 30px; padding-right: 30px">  :  </label></td>
					<td>
						<input type="text" class="form-control WB1a"  name="wb_1a" id="wb_1a" size="5"  style="text-align: right;" placeholder="0.000" >
					</td>	
				</tr>
				<tr  style="height: 50px;">
					
					<td>
						<label class="form form-label" style="text-align: right;">WB Second 2a</label> </td>
					<td><label class="form form-label" style="padding-left: 30px; padding-right: 30px">  :  </label></td>
					<td>
						<input type="text" class="form-control WB2a"  name="wb_2a" id="wb_2b" size="5" style="text-align: right;" placeholder="0.000" >
					</td>
				</tr>
				<tr style="height: 50px;">
					<td>
						<label class="form form-label">WB Second 2b</label> </td>
					<td><label class="form form-label" style="padding-left: 30px; padding-right: 30px">  :  </label></td>
					<td>
						<input type="text" class="form-control WB2b"  name="wb_2b" id="wb_2b" size="5" style="text-align: right;" placeholder="0.000" >
					</td>
				</tr>
				<tr style="height: 50px;">
					<td>
						<label class="form form-label">WB Second Component4</label> </td>
					<td><label class="form form-label" style="padding-left: 30px; padding-right: 30px">  :  </label></td>
					<td>
						<input type="text" class="form-control component4"  name="component4" id="component4" size="5" style="text-align: right;" placeholder="0.000">
					</td>
				</tr>
				<tr >
					<td>
						<input type="hidden" name="wing_id" id="wing_id" value="" ></input>
					</td>
					<td  align="center">
						
					</td>
					<td>
						<input type="hidden" name="circle_id" id="circle_id" value="" ></input>
					</td>
				</tr>	
				<tr style="height: 50px;">
					<td colspan="3" align="center">
						<input type="submit" value="Save" name="save" class="btn btn-primary" style="width: 170px"></input>	
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
		
		$('#letter_date').datepicker( "bounce", "showAnim", $( this ).val() 
		);



	function mynormal(){
    	
    var x = document.getElementById("#normal");
    alert("gotit");
    //x.value = x.value.toUpperCase();
    }
});
</script>		
