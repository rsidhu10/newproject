<!--NRDWP -->
<!DOCTYPE html>
<html>
<head>
	<title>NRDWP Funds</title>
	<?php echo Asset::css('bootstrap.css'); ?>
	<?php echo Asset::css('jquery-ui.css'); ?>
	<?php echo Asset::js('jquery.js'); ?>
	<?php echo Asset::js('jquery-ui.js'); ?>
</head>
<body>
	<form action="<?php echo Uri::create('funds/nsave') ?>" method="post" >
		<div class="container">
			<table class="table">
				<fieldset>
					<legend>Select</legend>
						<thead class="detail">
							<tr>
								<th>Circle</th>
								<th>:</th>
								<th>
									<select placeholder ="Select" name="circlename" id="circlename" class="form-control circlename"  >
										<option value="44" >Select Circle</option>
										<?php 
											foreach ($r  as $row) 
											{
										?>		
										<option value="<?php echo $row->id; ?>"><?php echo $row->circle_name ; ?></option>
										<?php
											}
										?>
									</select>		
								</th>
								<th>Division</th>
								<th>:<th>
									
									<select placeholder ="Select" name="divisionname" id="divisionname" class="form-control divisionname" >
										<option value="44">Select Division</option>
										<?php 
											foreach ($dr  as $myrow) 
											{
										?>		
										<option value="<?php echo $myrow->id; ?>"><?php echo $myrow->division_name ; ?></option>
										<?php
											}
										?>
									</select>		
								</th>

							</tr>	
					</thead>
				</fieldset>				
				
			</table>
		</div>	
	</form>
</body>
</html>

<script type="text/javascript">
 $(document).ready(function(){  
      alert(4);
     $('#circlename').change(function(){  
           var circle_val = $(this).val();
           //alert(cir);
           $.ajax({
           	url:".",
           	method:"post",
           	data:{circle_id:circle_val},
           	dataType:"text",
//           	success:function(data)
//           	{
//           		$('#divisionname').html(data);
//           	}

//        	});

    });   
});				

</script>
<script type="text/javascript">
	$(function(){
		
		alert(8);
	});

	


</script>