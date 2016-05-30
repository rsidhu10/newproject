<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
	<?php echo Asset::css('bootstrap.css'); ?>
	<?php echo Asset::css('jquery-ui.css'); ?>
	<?php echo Asset::js('jquery.js'); ?>
	<?php echo Asset::js('jquery-ui.js'); ?>	
	<?php echo Asset::css('bootstrap.css') ?>
</head>
<body>
<center>
<h3>Department of Water Supply & Sanitation Punjab </h3>
<h4>Basic Report - Circle wise Status </h4> 
</center>
<div class="container">

	<table class="table table-striped">
		<thead>
			<th>#</th>
			<th>Circles </th>
			<th style="text-align: center;">Districts </th>
			<th style="text-align: center;">Divisions</th>
			<th style="text-align: center;">Blocks</th>
			<th style="text-align: center;">Schemes</th>
			<th style="text-align: center;">Panchayats</th>
			<th style="text-align: center;">Villages</th>
			<th style="text-align: center;">Habitations</th>
		</thead>
		<tbody>
			<?php
			$num = 1; 
				foreach ($q as $row) 
				
				{
			
			?>
					<tr>
						<td><?php echo $num; ?> </td>
						<td><a href="/village/district/<?php echo $row->circle_id; ?>" ><?php echo $row->circle_name ; ?></a>
						</td>
						<td style="text-align: center;"><?php echo $row->cir_district_count; ?>	</td>
						<td style="text-align: center;"><?php echo $row->cir_division_count; ?>	</td>				
						<td style="text-align: center;"><?php echo $row->cir_block_count; ?>		</td>				
						<td style="text-align: center;"><?php echo $row->cir_scheme_count; ?>		</td>				
						<td style="text-align: center;"><?php echo $row->cir_panchayat_count; ?>	</td>				
						<td style="text-align: center;"><?php echo $row->cir_village_count; ?>	</td>
						<td style="text-align: center;"><?php echo $row->cir_habitation_count; ?>	</td>
					
					</tr>
				<?php 
				$num++; 
				}
				   ?>
		</tbody>
	</table>
</div>
</body>
</html>