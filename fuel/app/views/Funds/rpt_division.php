<body>
	<center>
<!--		<h3>Department of Water Supply & Sanitation Punjab </h3>-->
		<h4>FINANCIAL REPORT-(Divisionwise)  - NRDWP FUNDS RELEASED (DURING 2016-17) </h4> 
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
	
	
	<table class="table table-stripped">
		<thead>
			<th>Sr.</th>
			<th>Division Name</th>
			
			<th>Funds</th>
			<th style="text-align: right;">Normal+QA</th>
			<th style="text-align: right;">Sustainbility</th>
			<th style="text-align: right;">Earmark</th>
			<th style="text-align: right;">O&M</th>
			<th style="text-align: right;">Total</th>
	
		</thead>
		<tbody>
		<?php 
			$num =1;
			$normal =0;
			$sustain=0;
			$earmark=0;
			$om 	=0;
			$gtotal =0;
		?>
			<?php foreach ($q as $fund) : ?>
				<?php $total = $fund->normal + $fund->sustain 
				+ $fund->earmark + $fund->om; 
				$normal = $normal 	+ $fund->normal;
				$sustain= $sustain 	+ $fund->sustain;
				$earmark= $earmark 	+ $fund->earmark;
				$om 	= $om 		+ $fund->om;
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
		    	
		    	<td style="text-align: left;"><?php echo $fund->division_name ; ?></td>
		    	<td><?php echo $ftype ?></td>
		    	<td align="right"><?php echo $english_format_number = number_format($fund->normal, 3, '.', ''); ?></td>
		    	<td align="right"><?php echo $english_format_number = number_format($fund->sustain, 3, '.', ''); ?></td>
		    	<td align="right"><?php echo $english_format_number = number_format($fund->earmark, 3, '.', ''); ?></td>
		    	<td align="right"><?php echo $english_format_number = number_format($fund->om, 3, '.', ''); ?></td>
		    	<td align="right"><?php echo $english_format_number = number_format($total, 3, '.', ''); ?></td>
			</tr>
			<?php $num = $num+1; ?>
			<?php  endforeach;  ?>

			<th colspan="3" style="text-align: right;">Grand Total</th>
			<th style="text-align: right;"><?php echo $english_format_number = number_format($normal, 3, '.', ''); ?></th>
			<th style="text-align: right;"><?php echo $english_format_number = number_format($sustain, 3, '.', ''); ?></th>
			<th style="text-align: right;"><?php echo $english_format_number = number_format($earmark, 3, '.', ''); ?></th>
			<th style="text-align: right;"><?php echo $english_format_number = number_format($om, 3, '.', ''); ?></th>
			<th style="text-align: right;"><?php echo $english_format_number = number_format($gtotal, 3, '.', ''); ?></th>
		</tbody>
		<tfoot>
			
		</tfoot>
	</table>
</div>		