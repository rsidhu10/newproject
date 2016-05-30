<div class="navbar navbar-inverse navbar-fixed-top" id="content_topbar">
</div>

<div class="container-fluid container_main">
    <div class="row-fluid">
        <div class="span3" id="content_sidebar">
        </div>
        <div class="span9" id="content_body">
        </div>
    </div>


    <footer class="bottombar">
        <hr>
        <p>© PunjabWater.net 2016</p>
    </footer>
</div>
<script data-main="assets/js/main" src="assets/js/libs/require.js"></script><?php if(Session::get_flash('success')) :  ?>

    <div class="alert alert-success"> <?php echo Session::get_flash('success'); ?></div>

<?php endif; ?>

<?php if(Session::get_flash('error')) :  ?>

    <div class="alert alert-danger"><?php echo Session::get_flash('error'); ?></div>

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
			<th align="right">Normal</th>
			<th align="right">Sustain</th>
			<th align="right">Earmark</th>
			<th align="right">OM</th>
			<th align="right">Total</th>
			<th>Remarks</th>
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
		    	<td><?php echo $fund->district_name; ?></td>
		    	<td><?php echo $fund ->division_name; ?></td>
		    	<td align="right"><?php echo $english_format_number = number_format($fund->funds_1a, 3, '.', ''); ?></td>
		    	<td align="right"><?php echo $english_format_number = number_format($fund->funds_2a, 3, '.', ''); ?></td>
		    	<td align="right"><?php echo $english_format_number = number_format($fund->funds_2b, 3, '.', ''); ?></td>
		    	<td align="right"><?php echo $english_format_number = number_format($fund->funds_com4, 3, '.', ''); ?></td>
		    	<td align="right"><?php echo $english_format_number = number_format($total, 3, '.', ''); ?></td>
		    	<td><a class="btn btn-default" href="/funds/editfunds/<?php echo $fund->funds_id; ?>" >Update</a> <a class="btn btn-danger" href="/funds/delete/<?php echo $fund->funds_id; ?>" >Delete</a></td>

			</tr>
			<?php $num = $num+1; ?>
			<?php  endforeach;  ?>
		</tbody>
	</table>
</div>		