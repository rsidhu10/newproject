<?php
#function load_district()  
#    foreach ($districts as $district):
#    {
#       $output .= '<option value="'.$district["id"].'">'.$district["district_name"].'</option>'; 
#    }
#    endforeach;  
#    return $output;  
# }  
?>

<h2 align="center">Edit Funds Release</h2>
<?php echo Form::open('funds/editfunds/<?php echo $post->$id; ?>'); ?>
<table align="center" width="40%">
	<tr>
		<div class="form-group">
			<td>
				<?php echo Form::label('Financial Year', 'Funds_Year'); ?>
			</td>	
			<td>:</td>
			<td>
				<?php echo Form::select('Input_Financial_Year', Input::post('Funds_Year', isset($post) ? $post->Funds_Year : '1') , array(
					'0' => 'Select Financial Year',
					'1' => '2016-17',
				), array('class' => 'form-control')); ?>
			</td>
		</div>
	</tr>
	<tr>		
		<div class="form-group">
			<td>
				<?php echo Form::label('District', 'Funds_District'); ?>
			</td>
			<td>:</td>
			<td>
			<?php echo Form::select('Input_Funds_District', Input::post('Funds_District', isset($post) ? $post->Funds_District : ''), array(
					'0' => 'Select District',
					'D02' => 'Amritsar',
					'D19' => 'Barnala',
					'D16' => 'Bathinda',
					'D15' => 'Faridkot',
					'D10' => 'Fatehgarh Sahib',
					'D22' => 'Fazilka',
					'D13' => 'Ferozepur',
					'D01' => 'Gurdaspur',
					'D06' => 'Hoshiarpur',
					'D05' => 'Jalandhar',
					'D04' => 'Kapurthala',
					'D11' => 'Ludhiana',
					'D17' => 'Mansa',
					'D12' => 'Moga',
					'D14' => 'Muktsar',
					'D21' => 'Pathankot',
					'D20' => 'Patiala',
					'D08' => 'Rupnagar',
					'D18' => 'Sangrur',
					'D09' => 'SAS Nagar',
					'D07' => 'SBS Nagar',
					'D03' => 'Tarn Taran',
				),array('class' => 'form-control')); ?>			
			</td>
		</div>
	</tr>
	<tr>		
		<div class="form-group">
			<td>
				<?php echo Form::label('Division', 'Funds_Division'); ?>
			</td>
			
			
			<td>:</td>
			<td>
				<?php echo Form::select('Input_Funds_Division', '0' , array(
					'0' => 'Select Division',
					'DIV05' => 'Amritsar No1',
					'DIV06' => 'Amritsar No2',
					'Div07' => 'Amritsar No3',
					'D' => 'Faridkot',
					'D' => 'Fatehgarh Sahib',
					'D' => 'Fazilka',
					'D' => 'Ferozepur',
					'D' => 'Gurdaspur',
					'D' => 'Hoshiarpur',
					'D' => 'Jalandhar',
					'D' => 'Kapurthala',
					'D' => 'Ludhiana',
					'D' => 'Mansa',
					'D' => 'Moga',
					'D' => 'Muktsar',
					'D' => 'Pathankot',
					'D' => 'Patiala',
					'D' => 'Rupnagar',
					'D' => 'Sangrur',
					'D' => 'SAS Nagar',
					'D' => 'SBS Nagar',
					'D' => 'Tarn Taran',
				), array('class' => 'form-control')); ?>

			</td>
		</div>
	</tr>
	<tr>		
		<div class="form-group">
			<td>
				<?php echo Form::label('Funds Type', 'Funds_Type'); ?>
			</td>
			<td>:</td>
			<td>
				<?php echo Form::select('FundsType', Input::post('Funds_type', isset($post) ? $post->Funds_type : '') , array(
					'0' => 'Select Funds Type',
					'1' => 'Central',
					'2' => 'State',
				), array('class' => 'form-control')); ?>

			</td>
		</div>
	</tr>
	<tr>		
		<div class="form-group">
			<td>
				<?php echo Form::label('Letter No.', 'Funds_num'); ?>
			</td>
			<td>:</td>
			<td>
				<?php echo Form::input('LetterNum',Input::post('Funds_Num', isset($post) ? $post->Funds_Num : ''), array('class' => 'form-control')); ?>
			</td>
		</div>
	</tr>
	<tr>		
		<div class="form-group">
			<td>
				<?php echo Form::label('Letter Date', 'Funds_Date'); ?>
			</td>
			<td>:</td>
			<td>
				<?php echo Form::input('FundsDate',Input::post('Funds_Date', isset($post) ? $post->Funds_Date : ''), array('class' => 'form-control')); ?>
			</td>
		</div>
	</tr>
	<tr>		
		<div class="form-group">
			<td>
				<?php echo Form::label('Normal + QA', 'Funds_Normal'); ?>
			</td>
			<td>:</td>
			<td text-align="right">
				<?php echo Form::input('FundsNormal', Input::post('Funds_cen_Normal', isset($post) ? $post->Funds_cen_Normal : '0.000'), array('class' => 'form-control')); ?>
			</td>
		</div>
	</tr>
	<tr>		
		<div class="form-group">
			<td>
				<?php echo Form::label('Sustainability', 'Funds_Sustain'); ?>
			</td>
			<td>:</td>
			<td>
				<?php echo Form::input('FundsSustain', Input::post('Funds_cen_Sustain', isset($post) ? $post->Funds_cen_Sustain : '0.000'), array('class' => 'form-control')); ?>
			</td>
		</div>
	</tr>
	<tr>		
		<div class="form-group">
			<td>
				<?php echo Form::label('Earmark', 'Funds_EarMark'); ?>
			</td>
			<td>:</td>
			<td>
				<?php echo Form::input('FundsEarMark', Input::post('Funds_cen_Earmark', isset($post) ? $post->Funds_cen_Earmark : '0.000')  , array('class' => 'form-control')); ?>			
			</td>
		</div>
	</tr>
	<tr>		
		<div class="form-group">
			<td>
				<?php echo Form::label('O & M', 'Funds_OM'); ?>
			</td>
			<td>:</td>
			<td>
				<?php echo Form::input('FundOm', Input::post('Funds_cen_om', isset($post) ? $post->Funds_cen_om : '0.000'), array('class' => 'form-control')); ?>
			</td>
		</div>
	</tr>
	<tr>
		<td colspan="3" height="20px"></td>
	</tr>
	<tr>		
		<div class="actions">
			<td colspan="3" align="center" >
				<?php echo Form::submit("send"); ?>
			</td>
		</div>
	</tr>


<?php echo form::close(); ?>