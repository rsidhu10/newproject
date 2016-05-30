<?php
/**
* 
*/
class Controller_Release extends Controller_CommonRest
{
	
	public function get_index()
	{
		$id = $this->param("id");//Release ID
		if(isset($id) and $id != 'all' and $id != 'list' and $id !== false ){
			$result =\Model_Release::find('first', array(
				'where' => array(
					array('funds_id', '=', $id)
				),
				'related' => array('division')
			));
			if(isset($result)){
				$funds_type_string = "";
				\Log::Debug("Funds Type :" . $result->funds_type);
				if(intval($result->funds_type) == 1){
					$funds_type_string ="Central";
				} else
					$funds_type_string = "State";
			}
			$result['funds_type_string'] = $funds_type_string
			$result['funds_date_dmy'] = date('d-m-y', strtotime($result->funds_date));
			$this->response($result,200);
		} else {
			$this->response(array('empty' => true, 'message' => 'No records found.'), 204);
		}

	}
	/**
	* get function ends here
	*/

	/**
	* put function starts from here
	*/

	public function put_index()
	{
		Log::debug("Controller_Release ::put_index): updating Release Amount!");
	/*	if($this->authenticated){ */
		try{
			$model =json_decode(Input::put('model'),true);
			Log::debug("Model: " . print_r($model, true));
			$rel_funds_id 	=inval($model['funds_id']);
			$rel_funds_num 	=inval($model['funds_num']);
			$rel_funds_date =date('Y-m-d H:i:s', strtotime($model['funds_date']));
			$rel_funds_type =inval($model['funds_type']);
			$rel_funds_year = $model['funds_year'];
			$rel_funds_district = $model['funds_district'];
			$rel_funds_division = $model['funds_year'];
			$rel_funds_cen_normal = $model['rel_funds_cen_normal'];
			$rel_funds_cen_sustain= $model['rel_funds_cen_sustain'];
			$rel_funds_cen_earmark= $model['funds_cen_earmark'];

			//find district
			$district =\Model_District::find($rel_funds_district);
			if(!isset($district)){
				Log::debug("Controller_Release :: post_index): District $rel_funds_district not found! ");
				$result =array('result' => "ok", 'message' => "District $rel_funds_district not found");
				$this->response('District not found', 500);
				return;
			}

			//find division
			$division = \Model_Division::find($rel_funds_division);
			if(!isset($division)){
				Log::debug("Controller_Release :: post_index): Division $rel_funds_division not found! ");
				$result = array('result' => "ok", 'message' => "Division $rel_funds_division not found");
				$this->response('Division not found',500);
				return;
			}

			//find the Release

			$funds_rel = \Model_Release::find('first', array(
					'where' => array(
					array('funds_id', '=',$rel_funds_id )
				)
			));

			if(!isset($funds_rel)){

			}


		}


	/*	} */

	}
	/**
	* put function ends here
	*/

	private function helper_get_villages($panchayat_id)
	{
		$panchayat = \Model_Panchayat::find($panchayat_id);
		$village_ids = array();
		if(isset($panchayat)){
			$villages = $panchayat->villages;
			foreach($villages as $village){
				$village_ids[] = $village->id;
			}
		}
		return $village_ids;
	}

	private function helper_get_panchayat($block_id)
	{
		$block = \Model_Block::find($block_id);
		$panchayat_ids = array();
		if(isset($block)){
			$panchayats = $block->panchayats;
			foreach($panchayats as $panchayat){
				$panchayat_ids[] = $panchayat->id;
			}
		}
		return $panchayat_ids;
	}



}//main function close 
?>
