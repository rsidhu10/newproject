<?php
/**
 * Fuel is a fast, lightweight, community driven PHP5 framework.
 *
 * @package    Fuel
 * @version    1.7
 * @author     Fuel Development Team
 * @license    MIT License
 * @copyright  2010 - 2015 Fuel Development Team
 * @link       http://fuelphp.com
 */


class Controller_multiple extends Controller
{
	public function action_form()
	{

		$q['r'] = DB::select('*')->from('product')->as_object()->execute();


		return View::forge('multiple/form', $q);
	}

	public function action_save()
	{
		$order = Input::all();
		//var_dump($order);
		$data =array(
			're_name' 		=> $order['re_name'],
			'date_order' 	=> $order['date_order'],
			);
#'date_order' 	=> $order['date_order']		
		$id = DB::insert('order',array_keys($data))
					->values(array_values($data))
					->execute();
			$lastid = reset($id);

#			if($id > 0)
#			{
				for($i=0 ; $i<count($order['product_id']); $i++)
				{

					$datas =array(
							'order_id' 		=> $lastid,
							'product_id' 	=> $order['product_id'][$i],
							'quantity' 		=> $order['quantity'][$i],
							'price' 		=> $order['price'][$i],
							'discount' 		=> $order['discount'][$i],
							'amount' 		=> $order['amount'][$i],
					);
					$id[0] = DB::insert('orderdetail',array_keys($datas))
								->values(array_values($datas))
								->execute();
				}
				Response::redirect('multiple/form');
#			}		
	}

}
