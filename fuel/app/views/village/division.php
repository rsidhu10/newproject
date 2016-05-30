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
<h5>Basic Report - Block wise Status :  </h5> 
</center>

<div class="container">	
<div><a href="/village/wingwise_status_habs" >Back</a></div>
	<table class="table table-striped">
		<thead>
			<th>#</th>
			<th>Blocks </th>
			<th style="text-align: center;">Block</th>
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
						<td><?php echo $row->division_name ; ?>
						</td>
						<td style="text-align: center;"><a href="/village/dblock/<?php echo $row->circle_id; ?>" ><?php echo $row->divn_block_count; ?></a>		</td>				
						<td style="text-align: center;"><a href="/village/division/<?php echo $row->circle_id; ?>" ><?php echo $row->divn_scheme_count; ?></a>		</td>				
						<td style="text-align: center;"><a href="/village/panchayat/<?php echo $row->division_id; ?>" ><?php echo $row->divn_panchayat_count; ?></a>	</td>				
						<td style="text-align: center;"><a href="/village/village /<?php echo $row->division_id; ?>" ><?php echo $row->divn_village_count; ?>	</a></td>
						<td style="text-align: center;"><a href="/village/habitation /<?php echo $row->division_id; ?>" ><?php echo $row->divn_habitation_count; ?>	</a></td>
					
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