<!DOCTYPE html>
<html>
<head>
	<?php echo Asset::css('bootstrap.css'); ?>
	<?php echo Asset::css('jquery-ui.css'); ?>
	<?php echo Asset::js('jquery.js'); ?>
	<?php echo Asset::js('jquery-ui.js'); ?>	<?php echo Asset::css('bootstrap.css') ?>
	<?php $num =1; ?>
</head>
<body>
<div class="container">
	<table class="table table-striped">
		<thead>
			<th>#</th>
			<th>Circle</th>
			<th>District</th>
			<th>Division</th>
			<th>Block</th>
			<th>SchemeID</th>
			<th>Panchayat</th>
			<th>Village</th>
			<th>Vill Code</th>
			
			<th>Action</th>
		</thead>
		<tbody>
			<?php
			 
				foreach ($q as $row) 
				
				{
			
			?>
					<tr>
						<td><?php echo $num; ?> </td>
						<td><?php echo $row->circle_name; ?>		</td>				
						<td><?php echo $row->district_name; ?>	</td>				
						<td><?php echo $row->division_name; ?>	</td>				
						<td><?php echo $row->block_name; ?>		</td>				
						<td><?php echo $row->scheme_id; ?>		</td>				
						<td><?php echo $row->pan_name; ?>	</td>				
						<td><?php echo $row->village_name; ?>	</td>
						<td><?php echo $row->village_misid; ?>	</td>
					
						<td><?php echo HTML::anchor("village/edit".$row->village_id, "Edit ") ?>|<?php echo HTML::anchor("village/delete".$row->village_id, " Delete") ?></td>
					</tr>
				<?php 
				$num++; 
				}
				   ?>
		</tbody>
	<center>
			<?php $mynum = Pagination::instance('mypagination')->render();
			echo Pagination::instance('mypagination')->render(); 
			$num = ($mynum * 5) - 5 + 1; ?>
		</center>	
	</table>
</div>
</body>
</html>