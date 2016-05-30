<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
	<?php echo Asset::css('bootstrap.css'); ?>
	<?php echo Asset::css('jquery-ui.css'); ?>
	<?php echo Asset::js('jquery.js'); ?>
	<?php echo Asset::js('jquery-ui.js'); ?>
</head>
<body>
	<form action="<?php echo Uri::create('survey/save') ?>" method="post">
		<center>
			<h3>Department of Water Supply & Sanitation Punjab </h3>
			<h5>Basic Survey Data Entry  </h5> 
		</center>
		<div class="container">	
			<table class="table table-striped"> 
				<fieldset>
					<!--<legend>Select</legend>-->
					<thead>
						<th class="">Constituency</th>
						<th>:</th>
						<th>
							<select name="constituency" id="constituency" class="form-control constituency">
							<!--<?php 
								//foreach ($r as $row) {
									//<?php echo $row->id;?>
									//<?php //echo $row->productname;?>
									?> -->
									<option value="0">Select Constituency</option>
							</select>
						</th>
						<th>District</th>
						<th>:</th>
						<th>
							<select name="district" id="district" class="form-control district">
								<option value="0">Select District</option>
							</select>
						</th>
						<th>Division</th>
						<th>:</th>
						<th>
							<select name="division" id="division" class="form-control division">
								<option value="0">Select Division</option>
							</select>
						</th>
						<th>Block</th>
						<th>:</th>
						<th>
							<select name="block" id="block" class="form-control block">
								<option value="0">Select Block</option>
							</select>
						</th>
					</thead>
				</fieldset>	
			</table>
			<table class="table">	
				<tbody>
					<tr>
						<td>Scheme</td>
						<td>:</td>
						<td>
							<select name="scheme" id="scheme" class="form-control scheme">
								<option value="0">Select Scheme</option>
							</select>
						</td>
						<td>Program</td>
						<td>:</td>
						<td>
							<select name="programe" id="programe" class="form-control programe">
								<option value="0">Select Program</option>
							</select>
						</td>
						<td>Mode</td>
						<td>:</td>
						<td>
							<select name="mode" id="mode" class="form-control mode">
								<option value="0">Select Mode</option>
								<option value="1">SWAP 	</option>
								<option value="2">Non SWAP 	</option>
								
							</select>

						</td>
						<td>Operated By</td>
						<td>:</td>
						<td>
							<select name="operateby" id="operateby" class="form-control operateby">
								<option value="0">Select Operated By</option>
								<option value="1">DWSS</option>
								<option value="2">GP</option>
								<option value="3">GPWSC</option>
								<option value="4">Others</option>
								
							</select>
						</td>
					</tr>	
					<tr>
						<td>Run By</td>
						<td>:</td>
						<td>
							<select name="runby" id="runby" class="form-control runby">
								<option value="0">Select Run By</option>
								<option value="1">Contractor</option>
								<option value="2">Self</option>
							</select>
						</td>
						<td>Commission Date</td>
						<td>:</td>
						<td>
							<input type="text" class="form-control" name="date_of_com" id="date_of_com">
							
						</td>
						<td>Design LPCD</td>
						<td>:</td>
						<td>
							<select name="dlpcd" id="dlpcd" class="form-control dlpcd">
								<option value="0">Select LPCD</option>
								<option value="1">40 LPCD 	</option>
								<option value="2">70 LPCD 	</option>
								<option value="3">100 LPCD	</option>
							</select>
	

						</td>
						<td>Operated By</td>
						<td>:</td>
						<td>
							<select name="operateby" id="operateby" class="form-control operateby">
								<option value="0">Select Operated By</option>
								<option value="1">DWSS</option>
								<option value="2">GP</option>
								<option value="3">GPWSC</option>
								<option value="4">Others</option>
								
							</select>
						</td>
					</tr>

				</tbody>
			</table>
		</div>
	</form>	
</body>
</html>
<script type="text/javascript">

$(function(){
	alert(0);
		$('#date_of_com').datepicker({ dateFormat : 'dd/m/yy'});
});
</script>






