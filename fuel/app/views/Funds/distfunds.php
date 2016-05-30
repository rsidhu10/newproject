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
<script data-main="assets/js/main" src="assets/js/libs/require.js"></script><?php if(Session::get_flash('success')) :  ?>

    <div class="alert alert-success"> <?php echo Session::get_flash('success'); ?></div>

<?php endif; ?>

<?php if(Session::get_flash('error')) :  ?>

    <div class="alert alert-danger"><?php echo Session::get_flash('error'); ?></div>

<?php endif; ?>
<div class="container">
	<a class="btn btn-default" href="/funds/addfunds" >Add New</a>
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
			<?php foreach ($funds as $fund) : ?>
			<?php $total = $fund->funds_cen_om + $fund->funds_cen_sustain 
				+ $fund->funds_cen_earmark + $fund->funds_cen_normal; ?>
			<tr>
			<?php if($fund->funds_type==1 ){
				$ftype ="Central";
			}else
			{
				$ftype ="State";
			}
			$newDate = date("d-m-Y", strtotime($fund->funds_date));
			switch ($fund->funds_district) {
				case 'D01':
					 $fdistrict = "Gurdaspur";
					break;
				case 'D02':
					 $fdistrict = "Amritsar";
					break;
				case 'D03':
					 $fdistrict = "Tarn Taran";
					break;
				case 'D04':
					 $fdistrict = "Kapurthala";
					break;
				case 'D05':
					 $fdistrict = "Jalandhar";
					break;
				case 'D06':
					 $fdistrict = "Hoshiarpur";
					break;
				case 'D07':
					 $fdistrict = "SBS Nagar";
					break;
				case 'D08':
					 $fdistrict = "Rupnagar";
					break;
				case 'D09':
					 $fdistrict = "SAS Nagar";
					break;	
				case 'D10':
					 $fdistrict = "Fatehgarh Sahib";
					break;
				case 'D11':
					 $fdistrict = "Ludhiana";
					break;
				case 'D12':
					 $fdistrict = "Moga";
					break;	
				case 'D13':
					 $fdistrict = "Ferozepur";
					break;
				case 'D14':
					 $fdistrict = "Muktsar";
					break;
				case 'D15':
					 $fdistrict = "Faridkot";
					break;	
				case 'D16':
					 $fdistrict = "Bathinda";
					break;	
				case 'D17':
					 $fdistrict = "Mansa";
					break;
				case 'D18':
					 $fdistrict = "Sangrur";
					break;
				case 'D19':
					 $fdistrict = "Barnala";
					break;
				case '20':
					 $fdistrict = "Patiala";
					break;		
				case '21':
					 $fdistrict = "Pathankot";
					break;		
				case '22':
					 $fdistrict = "Fazilka";
					break;		
			}


			?>
				<td><?php echo $num; ?> </td>
		    	<td align="center"><?php echo $fund ->funds_num; ?></td>
		    	<td><?php echo $fdistrict; ?></td>
		    	<td align="right"><?php echo $english_format_number = number_format($fund->funds_cen_normal, 3, '.', ''); ?></td>
		    	<td align="right"><?php echo $english_format_number = number_format($fund->funds_cen_sustain, 3, '.', ''); ?></td>
		    	<td align="right"><?php echo $english_format_number = number_format($fund->funds_cen_earmark, 3, '.', ''); ?></td>
		    	<td align="right"><?php echo $english_format_number = number_format($fund->funds_cen_om, 3, '.', ''); ?></td>
		    	<td align="right"><?php echo $english_format_number = number_format($total, 3, '.', ''); ?></td>
		    	

		    	<td><a class="btn btn-default" href="/#/<?php echo $fund->id; ?>" >Update</a> <a class="btn btn-danger" href=" #" >Delete</a></td>

			</tr>
			<?php $num = $num+1; ?>
			<?php  endforeach;  ?>
		</tbody>
	</table>
</div>		