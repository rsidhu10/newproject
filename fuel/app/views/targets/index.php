<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
	<?php echo Asset::css('bootstrap.css'); ?>
	<?php echo Asset::css('jquery-ui.css'); ?>
	<?php echo Asset::js('jquery.js'); ?>
	<?php echo Asset::js('jquery-ui.js'); ?>	<?php echo Asset::css('bootstrap.css') ?>
</head>
<body>
<center>

<h4>Basic Report - Divisionwise Targets and Achievement (During 2016-17)</h4> 
</center>
<div class="container">
	<table class="table table-striped table-condensed table-hover table-bordered">
		<thead>
		<tr>
			<th rowspan ="2"  >#</th>
			<th rowspan ="2" >District</th>
			<th rowspan ="2" >Division</th>
			<th rowspan ="2" style="text-align: center; width: 13%;">Targets</th>
			<th colspan ="3" style="text-align: center; width: 39%;">Achievement (During 2016-17)</th>
			<th rowspan ="2" style="text-align: center; width: 13%;">Gap </br>(Targets - Reported on MIS)</th>
		</tr>
		<tr>
			<th style="text-align: center;">Reported on MIS</th>
			<th style="text-align: center;">Reported on IMIS</th>
			<th style="text-align: center;">Not Reported</th>
		</tr>	
		</thead>
		<tbody>
			<?php
			$num = 1; 
			$wb = 0;
			$mis = 0;
			$imis = 0;
			$gt_gap = 0;
			$gt_gap1 = 0;
				foreach ($q as $row) 
				{
					$wb = $wb + $row->targets; 
					$mis = $mis + $row->mis_progress;
					$imis = $imis + $row->imis_progress;
					$gap = $row->targets - $row->mis_progress;
					$gap1 = $row->mis_progress - $row->imis_progress;
					$gt_gap = $gt_gap + $gap;
					$gt_gap1 = $gt_gap1 + $gap1;


			?>
					<tr>
						<td ><?php echo $num; ?> </td>
						<td>
							<?php echo $row->district_name ; ?></td>
						<td><?php echo $row->division_name; ?>	</td>				
						<td style="text-align: center;"><?php echo $row->targets; ?>	</td>
						<td style="text-align: center;"><?php echo $row->mis_progress; ?>	</td>
						<td style="text-align: center;"><?php echo $row->imis_progress; ?>	</td>
						<td style="text-align: center;"><?php echo $gap1; ?>	</td>
						<td style="text-align: center;"><?php echo $gap; ?>	</td>
						
					</tr>
				<?php 
				$num++; 
				}
				   ?>
		</tbody>
		<tfoot>
			<th colspan ="3" style="text-align: right;">Total</th>
			<th style="text-align: center;"><?php echo $wb ; ?>	</th>
			<th style="text-align: center;"><?php echo $mis ; ?>	</th>
			<th style="text-align: center;"><?php echo $imis ; ?>	</th>
			<th style="text-align: center;"><?php echo $gt_gap1 ; ?>	</th>
			<th style="text-align: center;"><?php echo $gt_gap ; ?>	</th>
			
		</tfoot>
	</table>
</div>
</body>
</html>