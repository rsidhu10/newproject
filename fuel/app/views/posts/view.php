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


<div class="container">
	<?php $num=1 ; ?>
	<table class="table table-striped">
		<thead>
			<th>Sr.</th>
			<th>Circle</th>
			<th>District</th>
			<th>Block</th>
			<th>Panchayat</th>
			<th>Village</th>
			<th>Habitations</th>
			<th>Status</th>
			<th>Remarks</th>
		</thead>
		<tbody>
			<?php foreach ($posts as $post) : ?>
			<tr>
				<td><?php echo $num; ?></td>
		    	<td><?php echo $post ->circle_name; ?></td>
		    	<td><?php echo $post ->circle_district; ?></td>
		    	<td><?php echo $post ->circle_block; ?></td>
		    	<td><?php echo $post ->circle_panchayat; ?></td>
		    	<td><?php echo $post ->circle_village; ?></td>
			</tr>
			<?php $num =$num+1; ?>
			<?php  endforeach;  ?>
		</tbody>
	</table>
</div>		