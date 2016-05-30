<h1>Edit Post</h1>
<?php
	// returns <form action="http://mydomain.com/uri/to/form" accept-charset="utf-8" method="post">
	echo Form::open('posts/edit'); 
?>
<h1>This is my Edit Test Fill</h1>
<div class="container">
	<table class="table">
		<thead>
			<th>#</th>
			<th>Wing</th>
			<th>Circle</th>
			<th>District</th>
			<th>Block</th>
			<th>Panchayat</th>
		</thead>
		<tbody>
			<tr class="success">
				<td>1</td>
				<td>Central</td>
				<td>Amritsar</td>
				<td>Amritsar</td>
				<td>Baba Bakala</td>
				<td>Abdulpur</td>
			</tr>

		</tbody>
	</table>
</div>

<?php echo Form::close(); ?>