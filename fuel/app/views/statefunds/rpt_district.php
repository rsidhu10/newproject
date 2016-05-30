<html>
<head>
	   

</head>

<body>
	<center>
<!--		<h3>Department of Water Supply & Sanitation Punjab </h3>-->
		<h4>FINANCIAL REPORT-(Districtwise)  - STATE FUNDS RELEASED (DURING 2016-17) </h4> 
	</center>
	<div class="container-fluid container_main">
		<footer class="bottombar">
        	<hr>
        	<p>© PunjabWater.net 2016</p>
    	</footer>
	</div>
	<script data-main="assets/js/main" src="assets/js/libs/require.js"></script>
	<?php if(Session::get_flash('success')) :  ?>
	    <div class="alert alert-success"><?php echo Session::get_flash('success');?>
		</div>
	<?php elseif(Session::get_flash('error')) : ?>
	    <div class="alert alert-danger"><?php echo Session::get_flash('error');?></div>
	<?php endif; ?>
	<div class="container">
	
	
	<table class="table table-striped">
		<thead>
			<th>Sr.</th>
			<th>District</th>
			<th>Funds</th>
			<th style="text-align: right;">WBank-1a</th>
			<th style="text-align: right;">WBank-2a</th>
			<th style="text-align: right;">WBank-2b</th>
			<th style="text-align: right;">Component4</th>
			<th style="text-align: right;">Total</th>
	
		</thead>
		<tbody>
		<?php 
			$num =1;
			$wb1a =0;
			$wb2a =0;
			$wb2b =0;
			$wbcom4 =0;
			$gtotal =0;
		?>
			<?php foreach ($q as $fund) : ?>
				<?php $total = $fund->funds_1a + $fund->funds_2a 
				+ $fund->funds_2b + $fund->funds_com4; 
				$wb1a = $wb1a + $fund->funds_1a;
				$wb2a = $wb2a + $fund->funds_2a;
				$wb2b = $wb2b + $fund->funds_2b;
				$wbcom4 = $wbcom4 + $fund->funds_com4;
				$gtotal = $gtotal + $total;

				?>
			<tr>
			<?php if($fund->funds_type==1 ){
				$ftype ="Central";
			}else
			{
				$ftype ="State";
			}
			
			?>
				<td><?php echo $num; ?> </td>
		    	<td style="text-align: left;"><?php echo $fund ->district_name; ?></td>
		    	
		    	<td><?php echo $ftype ?></td>
		    	<td align="right"><?php echo $english_format_number = number_format($fund->funds_1a, 3, '.', ''); ?></td>
		    	<td align="right"><?php echo $english_format_number = number_format($fund->funds_2a, 3, '.', ''); ?></td>
		    	<td align="right"><?php echo $english_format_number = number_format($fund->funds_2b, 3, '.', ''); ?></td>
		    	<td align="right"><?php echo $english_format_number = number_format($fund->funds_com4, 3, '.', ''); ?></td>
		    	<td align="right"><?php echo $english_format_number = number_format($total, 3, '.', ''); ?></td>
			</tr>
			<?php $num = $num+1; ?>
			<?php  endforeach;  ?>

		</tbody>
		<tfoot>
			<th colspan="3" style="text-align: right;">Grand Total</th>
			<th style="text-align: right;"><?php echo $english_format_number = number_format($wb1a, 3, '.', ''); ?></th>
			<th style="text-align: right;"><?php echo $english_format_number = number_format($wb2a, 3, '.', ''); ?></th>
			<th style="text-align: right;"><?php echo $english_format_number = number_format($wb2b, 3, '.', ''); ?></th>
			<th style="text-align: right;"><?php echo $english_format_number = number_format($wbcom4, 3, '.', ''); ?></th>
			<th style="text-align: right;"><?php echo $english_format_number = number_format($gtotal, 3, '.', ''); ?></th>
			
		</tfoot>
	</table>
</div>		