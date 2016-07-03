<!DOCTYPE html>
<html>
<head>
	<title>DWSS Punjab</title>
	<?php echo Asset::js('jquery-1.8.0.min.js'); ?>
	<?php echo Asset::css('bootstrap.css'); ?>
	<?php echo Asset::css('jquery-ui.css'); ?>
	<?php echo Asset::js('jquery-ui.js'); ?>
	
	<?php echo Asset::js('vmap.js'); ?>
</head>
<body>
	<?php if(Session::get_flash('success')) :  ?>
	    <div class="alert alert-success"><?php echo Session::get_flash('success');?></div>
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
						<th style="width: 10%;">DISTRICT</th>
						<th style="width: 30%;">
							<select name="district" id = "district" class="form-control district">
								
							</select>
						</th>
						<th style="width: 10%;"> <div id="mess_district"></div></th>
						<?php Log::debug('Combofill Survey:t6: '. microtime(true));?>
						<th style="width: 10%;">Block</th>
						<th style="width: 30%;">
							<select name="block" id = "block" class="form-control block">
							</select>
						</th>
						<th style="width: 10%;"> <div id="mess_block"></div></th>
						<?php Log::debug('Combofill2 Survey:t7: '. microtime(true));?>
						
					</tr>
					<tr>
						<th style="width: 10%;">MIS Habitation</th>
						<th style="width: 25%;">
							<select id = "mis_village" name = "mis_village" class="form-control mis_village">
							</select>
						</th>
						<th style="width: 10%;"> <div id="mess_mishab"></div></th>
						<?php Log::debug('Combofill Survey:t6: '. microtime(true));?>
						<th style="width: 10%;">IMIS Habitation</th>
						<th style="width: 25%;">
							<select id = "imis_village" name = "imis_village" class="form-control imis_village">
							</select>
						</th>
						<th style="width: 10%;"> <div id="mess_imishab"></div></th>
						<?php Log::debug('Combofill2 Survey:t7: '. microtime(true));?>
						
						<th style="width: 10%;"><input type="submit" value="MAP" name="save" id="save" class="btn btn-primary" style="width: 100px" ></input>	
						</th>
						
					</tr>
					
				</fieldset>
			</thead>	
		</table>
	</div>
	</form>
				<table class="table table-striped table-condensed table-hover">
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
	
	
</body>
</html>

