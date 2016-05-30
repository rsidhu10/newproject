<div class="navbar navbar-inverse navbar-fixed-top" id="content_topbar"></div>
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
<script data-main="assets/js/main" src="assets/js/libs/require.js"></script>

<?php if(Session::get_flash('success')) :  ?>
	<div class="alert alert-success"> 
		<?php echo Session::get_flash('success'); ?>
	</div>
<?php endif; ?>

<?php if(Session::get_flash('error')) :  ?>
	<div class="alert alert-danger">
		<?php echo Session::get_flash('error'); ?>
	</div>
<?php endif; ?>
<?php
	// returns <form action="http://mydomain.com/uri/to/form" accept-charset="utf-8" method="post">
	echo Form::open('posts/zonewise_status'); 
?>

<div class="container">
	<?php $num=1 ; ?>
	
	<table >
		<thead>
			<th colspan="4">Funds Release Record</th>
		</thead>
		<div class="form-group">
		<tbody>
			<tr>
				<td>
					<?php echo Form::label('Funds Type', 'category');  ?>
				</td>
				<td  width="10">
					:
				</td>
		    	<td>
					<?php echo Form::Select('category', '0', array(
						'0'	=> 'Select Funds',
						'1' => 'Central Funds',
						'2' => 'State Funds',
					), array('class' => 'form-control')); ?>

					


		    	</td>
			</tr>
						</div>
			<div class="actions">
			<tr>
				<td colspan="3" >
					<?php echo Form::button('name', 'Update', array('style' => 'border: 2px;'));; ?>
				</td>
			</tr>
			
		</tbody>
	</table>
	<?php echo Form::close(); ?>

</div>		