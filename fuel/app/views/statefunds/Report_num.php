<body>
	<center>
<!--		<h3>Department of Water Supply & Sanitation Punjab </h3>-->
		<h4>FINANCIAL REPORT-(Letterwise)  - STATE FUNDS RELEASED (DURING 2016-17) </h4> 
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
			<th>Letter No</th>
			<th>Letter Date</th>
			<th>Funds</th>
			<th style="text-align: right;">WBank-1a</th>
			<th style="text-align: right;">WBank-2a</th>
			<th style="text-align: right;">WBank-2b</th>
			<th style="text-align: right;">Component4</th>
			<th style="text-align: right;">Total</th>
	
		</thead>
		<tbody>
		<?php $num =1; ?>
			<?php foreach ($q as $fund) : ?>
				<?php $total = $fund->funds_1a + $fund->funds_2a 
				+ $fund->funds_2b + $fund->funds_com4; ?>
			<tr>
			<?php if($fund->funds_type==1 ){
				$ftype ="Central";
			}else
			{
				$ftype ="State";
			}
			$newDate = date("d-m-Y", strtotime($fund->funds_date));
			?>
				<td><?php echo $num; ?> </td>
		    	<td align="center"><?php echo $fund ->funds_num; ?></td>
		    	<td><?php echo $newDate ?></td>
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
	</table>
</div>		