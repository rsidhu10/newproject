<!DOCTYPE html>
<html>
<head>
	<title>Order</title>
	<?php echo Asset::css('bootstrap.css'); ?>
	<?php echo Asset::css('jquery-ui.css'); ?>
	<?php echo Asset::js('jquery.js'); ?>
	<?php echo Asset::js('jquery-ui.js'); ?>
<!--	<link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.js" />
	 http://code.jquery.com/ui/1.9.1/themes/base/jquery-ui.css
	 <link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />-->
</head>
<body>
	<form action="<?php echo Uri::create('multiple/save') ?>" method="post">
		<div class="container">
			<thead>
				<tr>
					<td>ReceiptName</td>
					<td><input type="text" class="form-control" name="re_name" id="re_name"></td>
				</tr>
				<tr>
					<td>Date Order</td>
					<td><input type="text" class="form-control"  name="date_order" id="date_order"></td>
				</tr>
			</thead>
			<input type="submit" value="Order" name="save" class="btn btn-primary"></input>	
			<table class="table">
				<thead>
					<tr>
						<th>No</th>
						<th>ProductName</th>
						<th>Quantity</th>
						<th>Price</th>
						<th>Discount</th>
						<th>Amount</th>
						<th><input type="buttun" id="addnew" class="btn btn-primary" value="+"></th>
					</tr>
				</thead>
				<tbody class="detail">
				<tr>
					<th class="no">1</th>
					<td>
						<select name="product_id[]" class="form-control product_id">
							<?php 
								foreach ($r as $row) {
									?>
									<option value="<?php echo $row->id;?> "><?php echo $row->productname;?></option>
							<?php 
							}
							?>
						</select>
					</td>
					
					<td><input type="text" class="quantity form-control" name="quantity[]" id="product_id"></input></td>
					<td><input type="text" class="price form-control" name="price[]" id="price"></input></td>
					<td><input type="text" class="discount form-control" name="discount[]" id="discount"></input></td>
					<td><input type="text" class="amount form-control" name="amount[]" id="amount"></input></td>
					<td><a href="#" class="delete" >Remove</a> </td>
				</tr>	
				</tbody>
				<tfoot>
					<tr>
						<td colspan="5">Total Money</td>
						<td colspan="4">$<b class="totalamount"> </b></td>
					</tr>
					<tr>
						<td colspan="5">Get Money</td>
						<td colspan="4"><input type="text" class="form-control getmoney" placeholder="$"></td>
					</tr>
					<tr>
						<td colspan="5">Return Back Money</td>
						<td colspan="4"><input type="text" class="form-control payback" placeholder="$"></input></td>


					</tr>

				</tfoot>
				
			</table>	
		</div>


	</form>

</body>
</html>
<script type="text/javascript">
	$(function(){
		//alert(0);
		$('#date_order').datepicker({ dateFormat : 'yy-m-d'});
		$('#addnew').click(function(){
			addnewrow();
		});

		$('.getmoney').change(function(){
			var getmoney    = $(this).val();
			var totalmoney	= $('.totalamount').html();
			var amt 		= getmoney - totalmoney;
			$('.payback').val(amt).toFixed(2);

			//alert(totalmoney);


		});


		$('body').delegate('.delete','click',function(){
			$(this).parent().parent().remove();
		});
		
		$('.detail').delegate('.quantity,.price,.discount','keyup',function(){
			var tr = $(this).parent().parent();
			var quantity = tr.find('.quantity').val()-0;
			var price    = tr.find('.price').val()-0;
			var discount = tr.find('.discount').val()-0;
			var dis      = ((quantity * price * discount) / 100);
			var amt      = (quantity * price) - dis;
			//tr.find('.discount').val(dis);
			tr.find('.amount').val(amt);
			totalmoney();
			
		});

	});
function addnewrow()
{
	var productname =$('.product_id').html();
	var n =($('.detail tr').length-0)+1;
	var tr ='<tr>' +
					'<th class="no">'+n+'</th>' +
					'<td><select name="product_id[]" class="form-control product_id[]">'+productname +'</select></td>' +
					'<td><input type="text" class="quantity form-control" name="quantity[]" id="product_id"></input></td>' +
					'<td><input type="text" class="price form-control" name="price[]" id="price"></input></td>' +
					'<td><input type="text" class="discount form-control" name="discount[]" id="discount"></input></td>' +
					'<td><input type="text" class="amount form-control" name="amount[]" id="amount"></input></td>' +
					'<td><a href="#" class="delete" >Remove</a> </td>' +
				'</tr>';
	$('.detail').append(tr);			
}

function totalmoney(){
	var t =0;
	$('.amount').each(function(i,e)
	{
		var amt = $(this).val()-0;
		t += amt;
	});
	$('.totalamount').html(t);
}


</script>
