<h1>Add Post</h1>
<?php
	// returns <form action="http://mydomain.com/uri/to/form" accept-charset="utf-8" method="post">
	echo Form::open('posts/add'); 
?>




<div class="form-group">
	<?php echo Form::label('Title', 'Title');  ?>
	<?php echo Form::input('title', Input::post('title', isset($post) ? $post->title : ''), array('class' => 'form-control')); ?>
</div>

<div class="form-group">
	<?php echo Form::label('Category', 'category');  ?>
	<?php echo Form::Select('category', '0', array(
		'0'			  => 'Select Category',
		'Web Design'  => 'Web Design',
		'Computers'	  => 'Computers',
		'Electronics' => 'Electronics'
	), array('class' => 'form-control')); ?>
</div>

<div class="form-group">
	<?php echo Form::label('Body', 'body');  ?>
	<?php echo Form::textarea('body', Input::post('body',isset($post) ? $post->body : ''), array('class' => 'form-control')); ?>
</div>

<div class="form-group">
	<?php echo Form::label('Tags', 'tags');  ?>
	<?php echo Form::input('tags', Input::post('tags',isset($post) ? $post->tags : ''), array('class' => 'form-control')); ?>
</div>
<div class="actions">
<?php echo Form::submit('Send'); ?>



</div>



<?php echo Form::close(); ?>

