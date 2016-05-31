<body>
	<center>
<!--		<h3>Department of Water Supply & Sanitation Punjab </h3>-->
		<h4>CIRCLE WISE SERVICE LEVEL REPORT</h4> 
	</center>
	<div class="container-fluid container_main">
		<footer class="bottombar">
        	<hr>
        	<p>© PunjabWater.net 2016</p>
    	</footer>
	</div>
	<?php echo Asset::js('jquery-1.8.0.min.js');?>
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
			<th>Wing</th>
			<th>Circle</th>
			<th>District</th>
			<th>Division</th>
			<th>Habitation</th>
			<th style="text-align: left;">Component</th>
			<th style="text-align: left;">Supply Hours</th>
			<th style="text-align: left;">Cost Recovery</th>
			<th style="text-align: center;">Action</th>
		</thead>
			<?php $num =1; ?>
				<tbody>
			<?php foreach ($q as $slevel) : ?>

			<tr>
			<?php 	if($slevel->component==1 ){
						$component ="Component-1a";
					}elseif($slevel->component==2 ){
						$component ="Component-2a";
					}elseif($slevel->component==3 ){	
						$component ="Component-2b";
					}else{
						$component ="";
					}

					if($slevel->supply_hours==1 ){
						$shours ="24 Hours";
					}elseif($slevel->supply_hours==2 ){
						$shours ="More than 10Hrs";
					}elseif($slevel->supply_hours==3 ){	
						$shours ="Less than 10Hrs";
					}else{
						$shours ="";
					}		
					if($slevel->cost_recovery==1 ){
						$rcost ="Recovery 100%";
					}elseif($slevel->cost_recovery==2 ){
						$rcost ="Recovery 70-99%";
					}elseif($slevel->cost_recovery==3 ){	
						$rcost ="Recovery 70%";
					}else{
						$rcost ="";
					}			
			?>
				<td><?php echo $num; ?> </td>
				<td align="left"><?php echo $slevel->district_name; ?></td>
				<td align="left"><?php echo $slevel->district_name; ?></td>
		    	<td align="left"><?php echo $slevel->district_name; ?></td>
		    	<td align="left"><?php echo $slevel->division_name; ?></td>
		    	<td align="left"><?php echo $slevel->village_name; ?></td>
		    	<td align="left"><?php echo $component ; ?></td>
		    	<td align="left"><?php echo $shours ; ?></td>
		    	<td align="left"><?php echo $rcost ; ?></td>
 	
		    	<td style="text-align: center;"><a class="btn btn-default" href="survey/edit/<?php echo $slevel->id; ?>" >Update</a> <a class="btn btn-danger" href="/survey/delete/<?php echo $slevel->id; ?>" >Delete</a></td>

			</tr>
			<?php $num = $num+1; ?>
			<?php  endforeach;  ?>
		</tbody>
		

	</table>
</div>		