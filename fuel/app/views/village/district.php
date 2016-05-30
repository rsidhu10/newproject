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
<h5>Basic Report - District wise Status of Circle :  </h5> 
</center>

<div class="container">	
<div><a href="/village/wingwise_status_habs" >Back</a></div>
	<table class="table table-striped">
		<thead>
			<th>#</th>
			<th>District </th>
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
						<td><a href="/village/block/<?php echo $row->district_id; ?>" ><?php echo $row->district_name ; ?></a>
						</td>
						
						<td style="text-align: center;"><?php echo $row->dis_division_count; ?>	</td>				
						<td style="text-align: center;"><?php echo $row->dis_block_count; ?>		</td>				
						<td style="text-align: center;"><?php echo $row->dis_scheme_count; ?>		</td>				
						<td style="text-align: center;"><?php echo $row->dis_panchayat_count; ?>	</td>				
						<td style="text-align: center;"><?php echo $row->dis_village_count; ?>	</td>
						<td style="text-align: center;"><?php echo $row->dis_habitation_count; ?>	</td>
					
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
<script type="text/javascript">

$(function(){
	//alert(0);
		$('#back').click(function(){
		
	});
});