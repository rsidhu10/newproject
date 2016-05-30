<?php
/**
* 
*/
class Controller_fillDistrict extends Controller_CommonRest
{


	public function action_filldistrict(){


		$fdistricts  = Model_District::find('all');
		$data 		= array('district'  => $districts);
     	$this->template->title = 'Release';
       	$this->template->content = View::forge('funds/addfunds', $data, false);

		//return Response::forge(View::forge('funds/addfunds'));
	}






}//main function close 
?>
