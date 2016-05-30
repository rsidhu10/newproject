<?php
function load_village()  
 {  
      $connect = mysqli_connect("localhost", "root", "dwss", "dwsspb");  
      $output = '';  
      $sql = "SELECT sangrur.imisvillageid as id,sangrur.imisvillage as village FROM `sangrur` 
left join
mappedvillages on
sangrur.imisvillageid = mappedvillages.imisid
where (mappedvillages.deleted is null or mappedvillages.deleted = 1)
and sangrur.blockid =4045 order by sangrur.imisvillage";  
      $result = mysqli_query($connect, $sql);  
      $count =0;
      while($row = mysqli_fetch_array($result))  
      {  
      		$count++;
           $output .= '<option value="'.$row["id"].'">'.$count. '->  ' .$row["village"].'</option>';  

      }  
      return $output;  
 }  

function load_misvillage()  
 {  
      $connect = mysqli_connect("localhost", "root", "dwss", "dwsspb");  
      $output = '';  
      $sql = "select villages.village_misid,villages.village_name  
      			from villages
      			left join mappedvillages on
				villages.village_misid = mappedvillages.misid  
				where (mappedvillages.id IS NULL or mappedvillages.deleted = 1)
				and block_id = 'D18B03' 
				ORDER BY village_name";  
      $result = mysqli_query($connect, $sql);  
      $count =0;
      while($row = mysqli_fetch_array($result))  
      {  
      		$count++;
           $output .= '<option value="'.$row["village_misid"].'">'.$count. '->  ' .$row["village_name"].'</option>';  

      }  
      return $output;  
 }  


?>

<!DOCTYPE html>
<html>
<head>
	<title>DWSS Punjab</title>
	<?php echo Asset::js('funds.js'); ?>
	<?php echo Asset::css('bootstrap.css'); ?>
	<?php echo Asset::css('jquery-ui.css'); ?>
	<?php echo Asset::css('datepicker.css'); ?>
	<?php echo Asset::js('jquery.js'); ?>
	<?php echo Asset::js('jquery-ui.js'); ?>
	



</head>
<body>
	<?php if(Session::get_flash('success')) :  ?>
	    <div class="alert alert-success"><?php echo Session::get_flash('success');?>
		</div>
	<?php elseif(Session::get_flash('error')) : ?>
	    <div class="alert alert-danger"><?php echo Session::get_flash('error');?></div>
	<?php endif; ?>
<form action="<?php echo Uri::create('imis/save'); ?>" method="post">
	<div class="container">
		<table class="table table-condensed">
			<thead>
				<th colspan="10">
					<center>MAPPING IMIS VILLAGES WITH MIS VILLAGES
					</center>
				</th>
				<fieldset>
	
					<tr>
						
						<th>Survey VILLAGE</th>
						<th>
							<select name="imis_village" id = "imis_village" class="form-control imisvillage">
								<option value="">Select Village</option>
								
								<?php echo load_village(); ?>


							</select>
						</th>

						<th>MIS VILLAGE</th>
						<th>
							<select name="mis_village" id = "mis_village" class="form-control misvillage">
							<option  value="0">Select MIS Village</option>
							<?php echo load_misvillage(); ?>	
							</select>
						</th>
						<th><input type="submit" value="MAP" name="save" class="btn btn-primary" style="width: 100px" ></input>	
					</th>
						
				</tr>	
			</fieldset>
		</table>
		<table class="table table-condensed">
		<thead>
			<th></th>
			<th>Sr.</th>
			<th>CODE</th>
			<th>Survey VILLAGE</th>
			<th>MIS CODE</th>
			<th>MIS VILLAGE</th>
			<th style="text-align: center;">ACTION</th>
		</thead>
		<?php $num = 1; ?>
		<tbody>
			<?php foreach ($q as $model) : ?>

			<tr>
				<td><input type="hidden" value="<?php echo $model->id; ?>"></input></td>
				<td><?php echo $num; ?> </td>
		    	<td><?php echo $model->imisid; ?></td>
		    	<td><?php echo $model->imisvillage; ?></td>
		    	<td><?php echo $model->village_misid; ?></td>
		    	<td><?php echo $model->village_name; ?></td>
		    	<td  style="text-align: center;"><a class="btn btn-danger" href="/imis/delete/<?php echo $model->id; ?>" >Unmap</a></td>

			</tr>
			<?php $num++ ; ?>
			<?php  endforeach;  ?>
		</tbody>
		
	</table>
	</div>

</body>
</html>
<script type="text/javascript">

	$(function(){
		//alert(0);
		$('#letter_date').datepicker({ dateFormat : 'yy-m-d',
			changeMonth: true,
			changeYear: true}
		);
		
		$('#letter_date').datepicker( "bounce", "showAnim", $( this ).val() 
		);



	function mynormal(){
    	
    var x = document.getElementById("#normal");
    alert("gotit");
    //x.value = x.value.toUpperCase();
    }
});
</script>		
