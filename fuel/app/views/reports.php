<!DOCTYPE html>
<html>
<head>
	<title></title>
	<?php echo Asset::css('bootstrap.css'); ?>
	<?php echo Asset::css('jquery-ui.css'); ?>
	<?php echo Asset::js('jquery.js'); ?>
	<?php echo Asset::js('jquery-ui.js'); ?>	
	<?php echo Asset::css('bootstrap.css') ?>
</head>
<body>
	<div class="container">
		<table class="table">
			<tr>
				<td>
					<fieldset>
						<legend>Basic Data</legend>
						<li><a href="/village/wingwise_status_habs" >Basic Habitation Informtion</a></li>
						<li>Test2</li>	
					</fieldset>		
				</td>
				<td>
					<fieldset>
						<legend>Physical Reports</legend>
						<li>Test</li>
						<li>Test2</li>	
					</fieldset>		
				</td>
			</tr>
			<tr>
				<td>
					<fieldset>
						<legend>Financial Reports</legend>
							<li>
								<a href="#" >Report-F1-Funds Released under NRDWP Central
								</a>	
							</li>
							<li>
								<a href="#" >Report-F2-Funds Released under NRDWP State
								</a>	
							</li>
							<li>
								<a href="/statefunds/rpt_circle" >Report-F3-Funds Released under World Bank 						</a>
							</li>
							<li>
								<a href="#" >Report-F4-Funds Released under NABARD
								</a>
							</li>
							<li>
								<a href="/village/wingwise_status_habs" >Report-F5-Test2
								</a>
							</li>	
					</fieldset>		
				</td>
				<td>
					<fieldset>
						<legend>Survey Reports</legend>
						<li>Test</li>
						<li>Test2</li>	
					</fieldset>		
				</td>
			</tr>
		</table>	
	</div>

</body>
</html>