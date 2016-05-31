<?php
//var_dump($q);
function load_village()  
 {  
      $connect = mysqli_connect("localhost", "root", "dwss", "dwsspb");  
      $output = '';  
      $sql = "SELECT survey.vcode as id, survey.village as village from survey
left join
mappedsurvey on
survey.vcode = mappedsurvey.surveycode
where (mappedsurvey.deleted is null or mappedsurvey.deleted = 1)
and survey.block = 'Jal. east' order by survey.village";  
      
      $result = mysqli_query($connect, $sql);  
      $count =0;
      while($row = mysqli_fetch_array($result))  
      {  
      		$count++;
           $output .= '<option value="'.$row["id"].'">'.$count. '->  ' .$row["village"].'</option>';  

      }  
      return $output;  
 }  
// test mail
function load_misvillage()  
 {  
      $connect = mysqli_connect("localhost", "root", "dwss", "dwsspb");  
      $output = '';  
      $sql = "select villages.village_misid,villages.village_name  
      			from villages
      			left join mappedsurvey on
				villages.village_misid = mappedsurvey.misid  
				where (mappedsurvey.id IS NULL or mappedsurvey.deleted = 1)
				and block_id = 'D05B06' and habtype =0 
				ORDER BY village_name";  // talwandi sabo b03
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
	<?php echo Asset::js('jquery-1.8.0.min.js'); ?>
	<?php echo Asset::js('jquery-ui.js'); ?>
	



</head>
<body>
	<?php if(Session::get_flash('success')) :  ?>
	    <div class="alert alert-success"><?php echo Session::get_flash('success');?>
		</div>
	<?php elseif(Session::get_flash('error')) : ?>
	    <div class="alert alert-danger"><?php echo Session::get_flash('error');?></div>
	<?php endif; ?>
<form action="<?php echo Uri::create('survey/save'); ?>" method="post">
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
						<th><input type="submit" value="MAP" name="save" id="save" class="btn btn-primary" style="width: 100px" ></input>	
					</th>
						
				</tr>	
			</fieldset>
		</table>
		<table class="table table-hover">
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
		    	<td><?php echo $model->surveycode; ?></td>
		    	<td><?php echo $model->village; ?></td>
		    	<td><?php echo $model->misid; ?></td>
		    	<td><?php echo $model->village_name; ?></td>
		    	<td  style="text-align: center;"><a class="btn btn-danger" href="/survey/delete/<?php echo $model->id; ?>" >Unmap</a></td>

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

<script type="text/javascript">
	function checkdata(){
		
		var $village1 = document.getElementById("imis_village").value;
		var $village2 = document.getElementById("mis_village").value;
		
		var total = $wb_1a_ent + $wb_2a_ent + $wb_2b_ent + $wb_com4_ent;

		if($village1 =="0"){
			document.getElementById('mess_village1').innerHTML ="*(required)";
			document.getElementById('imis_village').focus();
			return
		}else if($village2 =='0')
		{
			document.getElementById('mess_village2').innerHTML ="*(required)";
			document.getElementById('mis_village').focus();
			return
		}


</script>


