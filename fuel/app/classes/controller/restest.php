<?php
class Controller_Restest extends Controller_Rest
{
	public function get_list()
	{
		return $this->response(array(
			'foo' => Input::get('foo'),
			'baz' => array(
				1,45,43,32
				),
			'empty' => null	
			));
	}

}


?>