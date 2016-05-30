<?php
/**
* 
*/
class Controller_divisions extends Controller_Rest
{

	public function post_divns()
	{

		$id = \Input::post("term");
		// $this->param("id");//District ID
		var_dump($id);
		if(isset($id) and $id != 'all' and $id != 'list' and $id !== false ){
			
			$result['q'] =DB::select('*')
					->from('divisions')
					->join('districts','LEFT')
					->on('districts.id', '=', 'divisions.district_id')
					->join('circles','LEFT')
					->on('circles.id', '=', 'districts.circle_id')
					->where('divisions.district_id','=',$id)
					->order_by('division_name','asc')
					->as_object()
					->execute();
			
			$data['response'] = 'true';
			$data['message'] = array();
			foreach($q as $model){
				$data['message'][] = array('value' => $model['divsion_id'],
										'text' => $model['division_name'] );
			}		

			$this->response($data);
		
	}

	
}
