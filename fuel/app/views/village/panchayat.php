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
			<th>Panchayat </th>

			<th style="text-align: center;">Villages</th>
			<th style="text-align: center;">Habitations</th>
			<th style="text-align: center;">SC Pop</th>
			<th style="text-align: center;">Gen Pop</th>
			<th style="text-align: center;">Population</th>
			<th style="text-align: center;">SC HH</th>
			<th style="text-align: center;">Gen HH</th>
			<th style="text-align: center;">House Holds</th>
			<th style="text-align: center;">Connections</th>
		</thead>
		<tbody>
			<?php
			$num = 1; 
				foreach ($q as $row) 
				
				{
			
			?>
					<tr>
						<td><?php echo $num; ?> </td>
						<td><?php echo $row->pan_name ; ?>
						</td>
			
						<td><a href="/village/village /<?php echo $row->district_id; ?>" ><?php echo $row->pan_name; ?>	</a></td>
						<td><a href="/village/village /<?php echo $row->district_id; ?>" ><?php echo $row->pan_name; ?>	</a></td>
						<td style="text-align: center;">50</td>
						<td style="text-align: center;">60</td>
						<td style="text-align: center;">110</td>
						<td style="text-align: center;">10</td>
						<td style="text-align: center;">12</td>
						<td style="text-align: center;">22</td>
						<td style="text-align: center;">22</td>
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