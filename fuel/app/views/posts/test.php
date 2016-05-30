<h2>Add Test</h2>
<?php echo form::open('/posts/test'); ?>
<div class="form-group">
	<!--\// more to be added -->
	<?php echo Form::label('First Name', 'FirstName'); ?>
	<?php echo Form::input('InputFirstName', Input::post('FirstName', isset($post) ? $post->'FirstName' : ''), array('class' => 'form-control')); ?>
</div> <!-- Div Class Group Ends here -->

<div class="form-group">
	<!--\// more to be added -->
	<?php echo Form::label('Last Name', 'LastName'); ?>
	<?php echo Form::input('InputLastName', Input::post('LastName', isset($post) ? $post->'LastName' : ''), array('class' => 'form-control')); ?>
</div> <!-- Div Class Group Ends here -->

<div class="form-group">
	<!--\// more to be added -->
	<?php echo Form::label('Record Deleted', 'Deleted'); ?>
	<?php echo Form::select('Status', '0', array(
		'0' => 'Not Deleted',
		'1' => 'Deleted',
		), array('class' => 'form-control')); ?>
</div> <!-- Div Class Group Ends here -->

<div class="actions">
	<!--\// more to be added -->
	<?php echo Form::button('name', 'value', array('style' => 'border: 2px;')); ?>
	
</div> <!-- Div Class Group Ends here -->




	


	




<?php echo form::close(); ?>