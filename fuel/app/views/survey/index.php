<body>
	<center>
<!--		<h3>Department of Water Supply & Sanitation Punjab </h3>-->
		<h4>FINANCIAL REPORT - STATE FUNDS RELEASED (DURING 2016-17) </h4> 
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
	<table>
		<td><a class="btn btn-default" href="/statefunds/addsfunds" >Add New</a></td>
	<!--
		<td width="30">  </td>
		<td><label>Financial Year</label></td>	
		<td><input class="form-control fyear"></input></td>
		<td><label>District</label></td>	
		<td><input class="form-control fyear"></input></td>
		<td><label>Division</label></td>
		<td><input class="form-control fyear"></input></td>
	-->
	</table>
	
	<table class="table table-striped">
		<thead>
			<th>Sr.</th>
			<th>Letter No</th>
			<th>Letter Date</th>
			<th>Funds</th>
			<th>District</th>
			<th>Division</th>
			<th style="text-align: right;">WBank-1a</th>
			<th style="text-align: right;">WBank-2a</th>
			<th style="text-align: right;">WBank-2b</th>
			<th style="text-align: right;">Component4</th>
			<th style="text-align: right;">Total</th>
			<th style="text-align: center;">Action</th>
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
			$newDate = date("d-m-Y", strtotime($fund->funds_date));
			?>
				<td><?php echo $num; ?> </td>
		    	<td align="center"></td>


		    	<td></td>
		    	<td></td>
		    	<td></td>
		    	<td></td>
		    	<td align="right"></td>
		    	<td align="right"></td>
		    	<td align="right"></td>
		    	<td align="right"></td>
		    	<td align="right"></td>
		    	<td style="text-align: center;"><a class="btn btn-default" href="/statefunds/editsfunds/<?php echo $fund->funds_id; ?>" >Update</a> <a class="btn btn-danger" href="/statefunds/delete/<?php echo $fund->funds_id; ?>" >Delete</a></td>

			</tr>
			<?php $num = $num+1; ?>
			<?php  endforeach;  ?>
		</tbody>
		<tfoot>
			
		</tfoot>
	</table>
</div>		