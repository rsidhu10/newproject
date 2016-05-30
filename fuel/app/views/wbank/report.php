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

<h4>Service Delivery Progress on Component 2.a Participating Villages</h4> 
</center>

<div class="container">	
	<div>
		<center>
			<input type="radio" name="myreport" value="0"> Component-1a &nbsp;&nbsp;
	  		<input type="radio" name="myreport" value="1"> Component-2a &nbsp; &nbsp;
	  		<input type="radio" name="myreport" value="2" checked> Component-2b
  		</center>
  	</div>
	<table class="table table-bordered" style="width =100%">
		<thead>
			<tr style="height: 7px; ">
				<th rowspan="2" style="width:5%">#</th>
				<th rowspan="2" style="width:15%">Name of Circle </th>
				<th rowspan="2" style="text-align: center; width:10%";">No. of Villages</th>
				<th rowspan="2" style="text-align: center;">No. of Connections</th>
				<th colspan="3" style="text-align: center;">Supply Hours</th>
				<th colspan="3" style="text-align: center;">Connections Coverage</th>
				<th colspan="3" style="text-align: center;">Cost Recovery</th>
			</tr>
			<tr>
				<th style="text-align: center; width:7%";>24 hrs</th>
				<th style="text-align: center; width:7%";>> 10 hrs</th>
				<th style="text-align: center; width:7%";>< 10 hrs</th>
				<th style="text-align: center; width:7%";>100%</th>
				<th style="text-align: center; width:7%";>70-99%</th>
				<th style="text-align: center; width:7%";>< 70%</th>
				<th style="text-align: center; width:7%";>100%</th>
				<th style="text-align: center; width:7%";>70-99%</th>
				<th style="text-align: center; width:7%";>< 70%</th>
			</tr>
		</thead>
		<?php 
			$num = 1; 
			$flag =1;
			$pwing =''; 
			$mysum_vill=0;
			$mysum_conn=0;
			$mysum_sup24=0;
			$mysum_sup23=0;
			$mysum_sup09=0;
			$mysum_conn100 =0;
			$mysum_conn99 =0;
			$mysum_conn70 =0;
			$mysum_cost100 =0;
			$mysum_cost99 =0;
			$mysum_cost70 =0;
			$gtsum_vill=0;
			$gtsum_conn=0;
			$gtsum_sup24=0;
			$gtsum_sup23=0;
			$gtsum_sup09=0;
			$gtsum_conn100 =0;
			$gtsum_conn99 =0;
			$gtsum_conn70 =0;
			$gtsum_cost100 =0;
			$gtsum_cost99 =0;
			$gtsum_cost70 =0;
		?>	
		<tbody>
			<?php 
				foreach ($q as $model) : 
					$mywing = $model->wing_name;   
					if($pwing != $mywing){
						if($flag != 1){ ?>
							<tr>
								<td colspan="2" style="text-align: right; font-weight: bold;"><?php echo $pwing ;?>  Wing Total</td>
								<td style="text-align: center; font-weight: bold;"><?php echo $mysum_vill;  ?></td>
								<td style="text-align: center; font-weight: bold;"><?php echo $mysum_conn; ?></td>
								<td style="text-align: center; font-weight: bold;"><?php echo $mysum_sup24; ?></td>
								<td style="text-align: center; font-weight: bold;"><?php echo $mysum_sup23; ?></td>
								<td style="text-align: center; font-weight: bold;"><?php echo $mysum_sup09; ?></td>
								<td style="text-align: center; font-weight: bold;"><?php echo $mysum_conn100; ?></td>
								<td style="text-align: center; font-weight: bold;"><?php echo $mysum_conn99; ?></td>
								<td style="text-align: center; font-weight: bold;"><?php echo $mysum_conn70; ?></td>
								<td style="text-align: center; font-weight: bold;"><?php echo $mysum_cost100; ?></td>
								<td style="text-align: center; font-weight: bold;"><?php echo $mysum_cost99; ?></td>
								<td style="text-align: center; font-weight: bold;"><?php echo $mysum_cost70; ?></td>
							</tr>
						<?php
						}
							$mysum_vill	=0;
							$mysum_conn	=0;
							$mysum_sup24=0;
							$mysum_sup23=0;
							$mysum_sup09=0;
							$mysum_conn100 =0;
							$mysum_conn99 =0;
							$mysum_conn70 =0;
							$mysum_cost100 =0;
							$mysum_cost99 =0;
							$mysum_cost70 =0;
							$flag =0;
						?>
						<tr>
							<td colspan="13"  style="text-align: center; font-weight: bold;"> <?php echo $mywing; ?> Wing</td>
						</tr>
					<?php 
					};
						$pwing = $mywing;
						$mysum_vill = $mysum_vill  + $model->vill_count;
						$mysum_conn = $mysum_conn  + $model->conn_count;
						$mysum_sup24= $mysum_sup24 + $model->supply_24;
						$mysum_sup23= $mysum_sup23 + $model->supply_10_23;
						$mysum_sup09= $mysum_sup09 + $model->supply_0_9;
						$mysum_conn100 	= $mysum_conn100 + $model->conn_100;
						$mysum_conn99 	= $mysum_conn99  + $model->conn_70_99;
						$mysum_conn70 	= $mysum_conn70  + $model->conn_1_69;
						$mysum_cost100 	= $mysum_cost100 + $model->cost_100;
						$mysum_cost99 	= $mysum_cost99  + $model->cost_70_99;
						$mysum_cost70 	= $mysum_cost70  + $model->cost_1_69;
						$gtsum_vill = $gtsum_vill  + $model->vill_count;
						$gtsum_conn = $gtsum_conn  + $model->conn_count;
						$gtsum_sup24= $gtsum_sup24 + $model->supply_24;
						$gtsum_sup23= $gtsum_sup23 + $model->supply_10_23;
						$gtsum_sup09= $gtsum_sup09 + $model->supply_0_9;
						$gtsum_conn100 	= $gtsum_conn100 + $model->conn_100;
						$gtsum_conn99 	= $gtsum_conn99  + $model->conn_70_99;
						$gtsum_conn70 	= $gtsum_conn70  + $model->conn_1_69;
						$gtsum_cost100 	= $gtsum_cost100 + $model->cost_100;
						$gtsum_cost99 	= $gtsum_cost99  + $model->cost_70_99;
						$gtsum_cost70 	= $gtsum_cost70  + $model->cost_1_69;
					?>
					<tr>
						<td><?php echo $num; ?></td>
						<td><?php echo $model->circle_name; ?></td>
				    	<td style="text-align: center";><?php echo $model->vill_count; ?></td>
				    	<td style="text-align: center";><?php echo $model->conn_count; ?></td>
				    	<td style="text-align: center";><?php echo $model->supply_24; ?></td>
				    	<td style="text-align: center";><?php echo $model->supply_10_23; ?></td>
				    	<td style="text-align: center";><?php echo $model->supply_0_9; ?></td>
				    	<td style="text-align: center";><?php echo $model->conn_100; ?></td>
				    	<td style="text-align: center";><?php echo $model->conn_70_99; ?></td>
				    	<td style="text-align: center";><?php echo $model->conn_1_69; ?></td>
				    	<td style="text-align: center";><?php echo $model->cost_100; ?></td>
				    	<td style="text-align: center";><?php echo $model->cost_70_99; ?></td>
				    	<td style="text-align: center";><?php echo $model->cost_1_69; ?></td>
					</tr>
					<?php $num++ ; ?>

			<?php  endforeach;  ?>
			<tr>
				<td colspan="2" style="text-align: right; font-weight: bold;"><?php echo $pwing ;?>  Wing Total</td>
				<td style="text-align: center; font-weight: bold;"><?php echo $mysum_vill;  ?></td>
				<td style="text-align: center; font-weight: bold;"><?php echo $mysum_conn; ?></td>
				<td style="text-align: center; font-weight: bold;"><?php echo $mysum_sup24; ?></td>
				<td style="text-align: center; font-weight: bold;"><?php echo $mysum_sup23; ?></td>
				<td style="text-align: center; font-weight: bold;"><?php echo $mysum_sup09; ?></td>
				<td style="text-align: center; font-weight: bold;"><?php echo $mysum_conn100; ?></td>
				<td style="text-align: center; font-weight: bold;"><?php echo $mysum_conn99; ?></td>
				<td style="text-align: center; font-weight: bold;"><?php echo $mysum_conn70; ?></td>
				<td style="text-align: center; font-weight: bold;"><?php echo $mysum_cost100; ?></td>
				<td style="text-align: center; font-weight: bold;"><?php echo $mysum_cost99; ?></td>
				<td style="text-align: center; font-weight: bold;"><?php echo $mysum_cost70; ?></td>
			</tr>
			<tr>
				<td colspan="2" style="text-align: right; font-weight: bold;">Grand Total</td>
				<td style="text-align: center; font-weight: bold;"><?php echo $gtsum_vill;  ?></td>
				<td style="text-align: center; font-weight: bold;"><?php echo $gtsum_conn; ?></td>
				<td style="text-align: center; font-weight: bold;"><?php echo $gtsum_sup24; ?></td>
				<td style="text-align: center; font-weight: bold;"><?php echo $gtsum_sup23; ?></td>
				<td style="text-align: center; font-weight: bold;"><?php echo $gtsum_sup09; ?></td>
				<td style="text-align: center; font-weight: bold;"><?php echo $gtsum_conn100; ?></td>
				<td style="text-align: center; font-weight: bold;"><?php echo $gtsum_conn99; ?></td>
				<td style="text-align: center; font-weight: bold;"><?php echo $gtsum_conn70; ?></td>
				<td style="text-align: center; font-weight: bold;"><?php echo $gtsum_cost100; ?></td>
				<td style="text-align: center; font-weight: bold;"><?php echo $gtsum_cost99; ?></td>
				<td style="text-align: center; font-weight: bold;"><?php echo $gtsum_cost70; ?></td>
			</tr>
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