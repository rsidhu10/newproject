<!DOCTYPE html>
<html>
<head>
	<title>DWSS Punjab</title>
	<?php echo Asset::js('jquery-1.8.0.min.js');?>
	<?php echo Asset::js('targets.js'); ?>
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
<form action="<?php echo Uri::create('targets/save'); ?>" id ="form1" method="post" onsubmit ="return checkdata(this)" >
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
							Habitation Reported on IMIS (Yes / No )
						</td> 
						<td style="width: 300px;">
							<select name="marked" id = "marked" class="form-control Marked">
							<option  value="2">Select Option</option>	
							<option  value="0">Not Reported</option>
							<option  value="1">Reported</option>
							
							</select>
						</td>
						<td>
							<span>
							<font color="red"><p id = "mess_marked"  >
							</p></font>
							</span>
						</td>
					</tr>
				</tr>
					<tr>
						<td colspan="3">
							<center>
							<input type="hidden" name="wing_id" id="wing_id" value="" style="width: 10%"></input>
							<a href ="/"> 
								<input type="button" value="Back" name="back" class="btn btn-primary" style="width: 100px" >
							</a>
							<input type="button" value="Cancel" name="cancel" class="btn btn-primary" style="width: 100px"  onclick="location.reload()"></input>
							<input type="submit" value="Save" name="save" class="btn btn-primary" style="width: 100px" ></input>
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




