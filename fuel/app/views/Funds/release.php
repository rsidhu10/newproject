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
        <p>© PunjabWater.net 2013</p>
    </footer>
</div>
<script data-main="assets/js/main" src="assets/js/libs/getdistrict.js"></script>
<script data-main="assets/js/main" src="assets/js/libs/require.js"></script><?php if(Session::get_flash('success')) :  ?>

    <div class="alert alert-success"> <?php echo Session::get_flash('success'); ?></div>

<?php endif; ?>

<?php if(Session::get_flash('error')) :  ?>

    <div class="alert alert-danger"><?php echo Session::get_flash('error'); ?></div>

<?php endif; ?>
<div class="container">
	<table class="table table-striped">
		<thead>
			<th>Sr.</th>
			<th>Letter No</th>
			<th>Letter Date</th>
			<th>Funds</th>
			<th>Year</th>
			<th>District</th>
			<th>Division</th>
			<th>Normal+QA</th>
			<th>Sustain</th>
			<th>EarMark</th>
			<th>O&M</th>

			<th>Remarks</th>
		</thead>
		<tbody>
			<?php foreach ($funds as $fund) : ?>
			<tr>
				<td><?php echo $fund ->id; ?> </td>
		    	<td><?php echo $fund ->funds_num; ?></td>
		    	<td><?php echo date('d-M-Y', strtotime($fund->funds_date)); ?></td>
		    	<?php if($fund->funds_type ==1){
		    		$ftype ="Center";	
		    	}else{
		    		$ftype ="State";
		    	} ?>
		    	<td> <?php echo $ftype; ?> </td>
		    	
		    	<td><?php echo $fund ->funds_year; ?></td>
		    	<?php 
		    	    switch ($fund->funds_district) {
		    	    	case 'D01' :
		    	    		$district ="Gurdaspur";
		    	    		break;
		    	    	case 'D02' :
		    	    		$district ="Amritsar";
		    	    		break;
		    	    	case 'D03' :
		    	    		$district ="Tarn Taran";
		    	    		break;
		    	    	case 'D04' :
		    	    		$district ="Kapurthala";
		    	    		break;
		    	    	case 'D05' :
		    	    		$district ="Jalandhar";
		    	    		break;
		    	    	case 'D06' :
		    	    		$district ="Hoshiarpur";
		    	    		break;
		    	    	case 'D07' :
		    	    		$district ="SBS Nagar";
		    	    		break;
		    	    	case 'D08' :
		    	    		$district ="Rupnagar";
		    	    		break;
		    	    	case 'D09' :
		    	    		$district ="SAS Nagar";
		    	    		break;
		    	    	case 'D10' :
		    	    		$district ="Fatehgarh Sahib";
		    	    		break;
		    	    	case 'D11' :
		    	    		$district ="Ludhiana";
		    	    		break;
		    	    	case 'D12' :
		    	    		$district ="Moga";
		    	    		break;
		    	    	case 'D13' :
		    	    		$district ="Firozepur";
		    	    		break;
		    	    	case 'D14' :
		    	    		$district ="Muktsar";
		    	    		break;
		    	    	case 'D15' :
		    	    		$district ="Faridkot";
		    	    		break;
		    	    	case 'D16' :
		    	    		$district ="Bathinda";
		    	    		break;
		    	    	case 'D17' :
		    	    		$district ="Mansa";
		    	    		break;
		    	    	case 'D18' :
		    	    		$district ="Sangrur";
		    	    		break;
		    	    	case 'D19' :
		    	    		$district ="Barnala";
		    	    		break;
		    	    	case 'D20' :
		    	    		$district ="Patiala";
		    	    		break;	
		    	    	case 'D21' :
		    	    		$district ="Pathankot";
		    	    		break;
		    	    	case 'D22' :
		    	    		$district ="Fazilka";
		    	    		break;		
		    	    }
                ?>		
         		
         		
         		

         		<td><?php echo $district; ?></td>
		    	
		    	<td><?php echo $fund ->funds_division; ?></td>
		    	<td><?php echo $fund ->funds_cen_normal; ?></td>
		    	<td><?php echo $fund ->funds_cen_sustain; ?></td>
		    	<td><?php echo $fund ->funds_cen_normal; ?></td>
		    	<td><?php echo $fund ->funds_cen_sustain; ?></td>
		    	<td><a href="#">Update</a></td>


			</tr>
			<?php  endforeach;  ?>
		</tbody>
	</table>
</div>		

<div class="container">
	<table class="table table-striped">
		<thead>
			<th>Sr.</th>
			<th>Id</th>
			<th>Wing_ID</th>
			<th>Circle_Id</th>
			<th>District</th>
			<th>Districtsn</th>
			<th>Remarks</th>
		</thead>
		<tbody>
			<?php foreach ($districts as $district) : ?>
			<tr>
				<td><?php echo $district ->id; ?> </td>
		    	<td><?php echo $district ->wing_id; ?></td>
		    	<td><?php echo $district ->circleid; ?></td>
		    	<td><?php echo $district ->district_name; ?></td>
		    	<td><?php echo $district ->district_sname; ?></td>

		    	<td><a href="#">Update</a></td>


			</tr>
			<?php  endforeach;  ?>
		</tbody>
	</table>
</div>		
