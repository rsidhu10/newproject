<!DOCTYPE html>
<html>
<head>
	<title>DWSS Punjab</title>
	<?php echo Asset::js('jquery-1.8.0.min.js'); ?>
	<?php echo Asset::css('bootstrap.css'); ?>
	<?php echo Asset::css('jquery-ui.css'); ?>
	<?php echo Asset::js('jquery-ui.js'); ?>
	<?php echo Asset::js('mapping.js'); ?>
</head>
<body>
	<?php if(Session::get_flash('success')) :  ?>
	    <div class="alert alert-success"><?php echo Session::get_flash('success');?>
		</div>
	<?php elseif(Session::get_flash('error')) : ?>
	    <div class="alert alert-danger"><?php echo Session::get_flash('error');?></div>
	<?php endif; ?>
<form action="<?php echo Uri::create('survey/save'); ?>" method="post">
	<div class="container">
		<table class="table table-condensed">
			<thead>
				<th colspan="10">
					<center>MAPPING IMIS VILLAGES WITH MIS VILLAGES</center>
				</th>
				<fieldset>
					<tr>
						<th>Survey VILLAGE</th>
						<th>
							<select name="imis_village" id = "imis_village" class="form-control imisvillage">
							</select>
						</th>
						<?php Log::debug('Combofill Survey:t6: '. microtime(true));?>
						<th>MIS VILLAGE</th>
						<th>
							<select name="mis_village" id = "mis_village" class="form-control misvillage">
							<option  value="0">Select MIS Village</option>
							</select>
						</th>
						<?php Log::debug('Combofill2 Survey:t7: '. microtime(true));?>
						<th><input type="submit" value="MAP" name="save" id="save" class="btn btn-primary" style="width: 100px" ></input>	
						</th>
					</tr>	
				</fieldset>
			</thead>	
		</table>
		<table class="table table-hover">
		<thead>
			<th></th>
			<th>Sr.</th>
			<th>CODE</th>
			<th>Survey VILLAGE</th>
			<th>MIS CODE</th>
			<th>MIS VILLAGE</th>
			<th style="text-align: center;">ACTION</th>
		</thead>
		<?php $num = 1; ?>
		<tbody>
		
			<?php foreach ($q as $model) : ?>

			<tr>
				<td><input type="hidden" value="<?php echo $model->id; ?>"></input></td>
				<td><?php echo $num; ?> </td>
		    	<td><?php echo $model->surveycode; ?></td>
		    	<td><?php echo $model->village; ?></td>
		    	<td><?php echo $model->misid; ?></td>
		    	<td><?php echo $model->village_name; ?></td>
		    	<td  style="text-align: center;"><a class="btn btn-danger" href="/survey/delete/<?php echo $model->id; ?>" >Unmap</a></td>

			</tr>
			<?php $num++ ; ?>
			<?php  endforeach;  ?>
		</tbody>
		
	</table>
	</div>

</body>
</html>
 
