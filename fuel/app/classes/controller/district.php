<?php
/**
* 
*/
class Controller_Districts extends Controller_CommonRest
{

	public function get_district()
	{
		$id = $this->param("id");//Release ID
		if(isset($id) and $id != 'all' and $id != 'list' and $id !== false ){
			$result =\Model_District::find('first', array(
				'where' => array(
					array('funds_id', '=', $id)
				),
				
			));
	
		$district = array('posts'  => $posts);
        $this->template->title = 'Blog Posts';
        $this->template->content = View::forge('funds/Release', $data, false);

		return $panchayat_ids;
	}

	public function action_addfunds(){


		$districts  = Model_Release::find('all');
		$data 	= array('district'  => $districts);
     	$this->template->title = 'Blog Posts';
       	$this->template->content = View::forge('funds/addfunds', $data, false);

		//return Response::forge(View::forge('funds/addfunds'));
	}






}//main function close 
?>
