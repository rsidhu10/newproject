<?php
//var_dump($q);

?>
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
	<?php if(Session::get_flash('success')) :  ?>
	    <div class="alert alert-success"><?php echo Session::get_flash('success');?>
		</div>
	<?php elseif(Session::get_flash('error')) : ?>
	    <div class="alert alert-danger"><?php echo Session::get_flash('error');?></div>
	<?php endif; ?>
<form action="<?php echo Uri::create('imis/save'); ?>" method="post">
	<div class="container">
		<table class="table table-condensed">
			<thead>
				<th colspan="10">
					<center>MAPPING IMIS VILLAGES WITH MIS VILLAGES
					</center>
				</th>
		<table class="table table-condensed">
		<thead>
			<th></th>
			<th>Sr.</th>
			<th>Wing</th>
			<th>Funds 1a</th>
			<th>Funds 2a</th>
			<th>Funds 2b</th>
			<th>Funds Comp4</th>
			<th>Normal</th>
			<th>Sustain</th>
			<th>Earmark</th>
			<th>O&M</th>
			<th>Mapped</th>



			<th style="text-align: center;">ACTION</th>
		</thead>
		<?php $num = 1; ?>
		<tbody>
			<?php foreach ($q as $model) : ?>

			<tr>
				<td><input type="hidden" value="<?php #echo $model->id; ?>"></input></td>
				<td><?php# echo $num; ?> </td>
		    	<td><?php echo $model->wing; ?></td>
		    	<td><?php echo $model->fund1a; ?></td>
		    	<td><?php echo $model->fund2a; ?></td>
		    	<td><?php echo $model->fund2b; ?></td>
		    	<td><?php echo $model->fundcom4; ?></td>
		    	<td><?php if($model->normal===NULL) {
		    		echo  '0.000'; }
		    		else {
		    			echo $model->normal; }?>
		    			</td>
		    	<td><?php if($model->sustain===NULL) {
		    		echo '0.000'; }
		    		else {
		    			echo $model->sustain;	
		    		}
		    		 ?></td>
		    	<td><?php if($model->earmark===NULL) {
		    		echo '0.000'; }
		    		else {
		    			echo $model->earmark;	
		    		}

		    		 ?></td>
		    	<td><?php if($model->omfunds===NULL) {
		    		echo '0.000'; }
		    		else {
		    			echo $model->omfunds;	
		    		}

				 ?></td>
		    	<td><?php if($model->mapnum===NULL) {
		    		echo 0; 
		    	} 
		    	else {


		    	echo $model->mapnum;
		    }
		    	 ?></td>
		    		



		    	<td><?php #echo $model->village_name; ?></td>
		    	<td  style="text-align: center;"><a class="btn btn-danger" href="/imis/delete/<?php# echo $model->id; ?>" >Unmap</a></td>

			</tr>
			<?php $num++ ; ?>
			<?php  endforeach;  ?>
		</tbody>
		
	</table>
	</div>

</body>
</html>
