<body>
	<center>
<!--		<h3>Department of Water Supply & Sanitation Punjab </h3>-->
		<h4>FINANCIAL REPORT - EXPENDITURE REPORTED UNDER NRDWP FUNDS (DURING 2016-17) </h4> 
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
			<td><a class="btn btn-primary" href="/exp/nrdwp" >Add New</a></td>
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
	
		<table class="table table-striped table-condensed table-hover table-bordered">
			<thead>
				<th>Sr.</th>
				<th>Month</th>
				<th>Funds</th>
				<th>District</th>
				<th>Division</th>
				<th style="text-align: right;">Normal</th>
				<th style="text-align: right;">Sustain</th>
				<th style="text-align: right;">Earmark</th>
				<th style="text-align: right;">OM</th>
				<th style="text-align: right;">Total</th>
				<th style="text-align: center;">Action</th>
			</thead>
			<tbody>
			<?php $num =1; ?>
				<?php foreach ($q as $exp) : ?>
				<?php $total = $exp->omfunds + $exp->sustain 
					+ $exp->earmark + $exp->normal; ?>
				<tr>
				<?php if($exp->exp_type==1 ){
					$ftype ="Central";
				}else
				{
					$ftype ="State";
				}
				$newDate = date("M", strtotime($exp->exp_date));
				?>
					<td><?php echo $num; ?> </td>
			    	<td><?php echo $newDate ?></td>
			    	<td><?php echo $ftype ?></td>
			    	<td><?php echo $exp->district_name; ?></td>
			    	<td><?php echo $exp->division_name; ?></td>
			    	<td align="right"><?php echo $english_format_number = number_format($exp->normal, 3, '.', ''); ?></td>
			    	<td align="right"><?php echo $english_format_number = number_format($exp->sustain, 3, '.', ''); ?></td>
			    	<td align="right"><?php echo $english_format_number = number_format($exp->earmark, 3, '.', ''); ?></td>
			    	<td align="right"><?php echo $english_format_number = number_format($exp->omfunds, 3, '.', ''); ?></td>
			    	<td align="right"><?php echo $english_format_number = number_format($total, 3, '.', ''); ?></td>
			    	<td style="text-align: center;"><a class="btn btn-default" href="/exp/edit/<?php echo $exp->nrdwp_id; ?>" >Update</a> <a class="btn btn-danger" href="/exp/delete/<?php echo $exp->nrdwp_id; ?>" >Delete</a></td>

				</tr>
				<?php $num = $num+1; ?>
				<?php  endforeach;  ?>
			</tbody>
		</table>
	</div>	
</body>	