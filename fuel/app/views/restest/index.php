<body>
	<center>
<!--		<h3>Department of Water Supply & Sanitation Punjab </h3>-->
		<h4>FINANCIAL REPORT - STATE FUNDS RELEASED (DURING 2016-17) </h4> 
	</center>
	<div class="container-fluid container_main">
		<footer class="bottombar">
        	<hr>
        	<p>© PunjabWater.net 2016</p>
    	</footer>
	</div>
	<script data-main="assets/js/main" src="assets/js/libs/require.js"></script>
	<?php if(Session::get_flash('success')) :  ?>
	    <div class="alert alert-success"><?php echo Session::get_flash('success');?>
		</div>
	<?php elseif(Session::get_flash('error')) : ?>
	    <div class="alert alert-danger"><?php echo Session::get_flash('error');?></div>
	<?php endif; ?>
	<div class="container">
	<table>
		<td><a class="btn btn-default" href="/statefunds/addsfunds" >Add New</a></td>
	</table>
	
	<table class="table table-striped">
		
	<td style="text-align: center;">
		<a class="btn btn-default" href="/restest/list/.json?foo">Update</a>
	</td>


	</table>
</div>		