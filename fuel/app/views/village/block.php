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
						<td><?php echo $row->block_name ; ?>
						</td>
				
						<td style="text-align: center;"><a href="/village/scheme/<?php echo $row->block_id; ?>" ><?php echo $row->blo_scheme_count; ?></a>		</td>				
						<td style="text-align: center;"><a href="/village/panchayat/<?php echo $row->block_id; ?>" ><?php echo $row->blo_panchayat_count; ?></a>	</td>				
						<td style="text-align: center;"><a href="/village/village /<?php echo $row->block_id; ?>" ><?php echo $row->blo_village_count; ?>	</a></td>
						<td style="text-align: center;"><a href="/village/habitation /<?php echo $row->block_id; ?>" ><?php echo $row->blo_habitation_count; ?>	</a></td>
					
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