<?php
	class Controller_Survey extends Controller_Hybrid{
	public function before()
    {
        parent::before();
        Log::debug('Controller_REST Controller: ' . $this->request->controller);
        Log::debug('Controller_REST     Action: ' . $this->request->action);
    }    
	public function action_map()
	{
		if(isset($id) and $id != 'all' and $id != 'list' and $id !== false ){
			$result['q'] =DB::select('*')
					->from('releases')
					->join('divisions','LEFT')
					->on('divisions.division_id', '=', 'releases.funds_division')
					->join('districts','LEFT')
					->on('districts.id', '=', 'releases.funds_district')
					->where('releases.deleted','=',0)
					->order_by('funds_date','asc')
					->order_by('district_name','asc')
					->order_by('division_name','asc')
					->as_object()
					->execute();
		}else
		{

				$result['q'] =DB::select('mappedsurvey.id','mappedsurvey.surveycode','mappedsurvey.misid','villages.village_name','survey.village')
					->from('mappedsurvey') 
					->join('villages','LEFT')
					->on('mappedsurvey.misid','=', 'villages.village_misid' )
					->join('survey','LEFT')
					->on('mappedsurvey.surveycode','=', 'survey.vcode' )
					->where('mappedsurvey.deleted','=',0)
					->where('district_id','=','D05')
					->order_by('id', 'desc')
					->as_object()
					->execute();

		}
        $this->template->title = 'MAPPING MIS VILLAGE WITH SURVEY';
        $this->template->content = View::forge('survey/map', $result, false);
	}

		public function action_save()
	{
		if(Input::post('save')){

			$village = Input::all();
			//var_dump($order);
            Log::debug('action_save: t1: ' . microtime(true));
			$data =array(
					'surveycode'	=> $village['imis_village'],
					'misid' 		=> $village['mis_village'],
			);
			
				$result = DB::insert('mappedsurvey',array_keys($data))
					->values(array_values($data))
					->execute();		
            Log::debug('action_save: t2: ' . microtime(true));
			 
			$funds = Input::all();
	
			$data2 =array(
					'survey_mapped' 		=> 1,
			);
            Log::debug('action_save: t3: ' . microtime(true));
			$result = DB::update('villages')
					->set($data2)
					->where('village_misid', $village['mis_village'])
					->execute();
            Log::debug('action_save: t4: ' . microtime(true));
			$data3 =array(
					'mapped' 		=> 1,
			);
			$result = DB::update('survey')
					->set($data3)
					->where('vcode', $village['imis_village'])
					->execute();			
            Log::debug('action_save: t5: ' . microtime(true));
	}
			session::set_flash('success','Village Mapped Successully');
			Response::redirect('survey/chog','refresh');
	}

	public function action_delete($id)
	{
		if(isset($id) and $id != 'all' and $id != 'list' and $id !== false ){
				$result = DB::delete('mappedsurvey')
					->where('id','=', $id)
					->execute();
			// $data =array(
			// 		'deleted' 		=> 1);

			// $result = DB::update('mappedsurvey')
			// 		->set($data)
			// 		->where('id','=', $id)
			// 		->execute();
 
			Session::set_flash('success','Village Unmapped Successfully');
			Response::redirect('survey/chog', 'refresh');
		}
	}

	public function action_chog()
	{
		if(isset($id) and $id != 'all' and $id != 'list' and $id !== false ){
			$result['q'] =DB::select('*')
					->from('releases')
					->join('divisions','LEFT')
					->on('divisions.division_id', '=', 'releases.funds_division')
					->join('districts','LEFT')
					->on('districts.id', '=', 'releases.funds_district')
					->where('releases.deleted','=',0)
					->order_by('funds_date','asc')
					->order_by('district_name','asc')
					->order_by('division_name','asc')
					->as_object()
					->execute();
		}else
		{

				$result['q'] =DB::select('mappedsurvey.id','mappedsurvey.surveycode','mappedsurvey.misid','villages.village_name','survey.village')
					->from('mappedsurvey') 
					->join('villages','LEFT')
					->on('mappedsurvey.misid','=', 'villages.village_misid' )
					->join('survey','LEFT')
					->on('mappedsurvey.surveycode','=', 'survey.vcode' )
					->where('mappedsurvey.deleted','=',0)
					->where('villages.district_id','=','D04')
					->order_by('id', 'desc')
					->as_object()
					->execute();

		}
        $this->template->title = 'MAPPING MIS VILLAGE WITH SURVEY';
        $this->template->content = View::forge('survey/chog', $result, false);
	}

	public function action_survey_input()
	{
		if(isset($id) and $id != 'all' and $id != 'list' and $id !== false ){
			$result['q'] =DB::select('*')
					->from('releases')
					->join('divisions','LEFT')
					->on('divisions.division_id', '=', 'releases.funds_division')
					->join('districts','LEFT')
					->on('districts.id', '=', 'releases.funds_district')
					->where('releases.deleted','=',0)
					->order_by('funds_date','asc')
					->order_by('district_name','asc')
					->order_by('division_name','asc')
					->as_object()
					->execute();
		}else
		{

				$result['q'] =DB::select('*')
					->from('districts')
					->order_by('district_name')
					->as_object()
					->execute();
		}
        $this->template->title = 'MAPPING MIS VILLAGE WITH SURVEY';
        $this->template->content = View::forge('survey/survey_input', $result, false);
	}

	public function action_test()
	{

				$result['q'] =DB::select('*')
					->from('villages')
					->order_by('district_id')
					->order_by('block_id')
					->order_by('village_name','asc')
					->where('block_id','=','D16B02')
					->as_object()
					->execute();
	   $this->template->title = 'MAPPING MIS VILLAGE WITH SURVEY';
        $this->template->content = View::forge('survey/test', $result, false);
	}

	public function action_save_survey()
	{
		if(Input::post('save_survey')){
			$survey = Input::all();
			//var_dump($funds);
			$wing_id 		= $survey['wing_id'];
			$circle_id		= $survey['circle_id'];
			$district_id 	= $survey['district'];
			$division_id 	= $survey['division'];
			$habitation_id	= $survey['habitation'];


    		$result =DB::select('*')
				->from('service_level')
				->where('wing_id', '=', $wing_id)
				->where('circle_id', '=', $circle_id)
				->where('district_id', '=', $district_id)
				->where('division_id','=', $division_id)
				->where('village_id','=', $habitation_id)
				->execute();

				$num_rows = count($result);
				if($num_rows >0)	
				{
				Session::set_flash('error','Record Already EXIST');		
				}else {

			$data =array(
					'wing_id'			=> $survey['wing_id'],
					'circle_id'			=> $survey['circle_id'],
					'district_id'		=> $survey['district'],
					'division_id'		=> $survey['division'],
					'village_id'		=> $survey['habitation'],
					'component'			=> $survey['component'],
					'supply_hours'		=> $survey['supply_hr'],
					'cost_recovery'		=> $survey['recovery'],
					// 'coverage_status'	=> $survey['coverage'],
					// 'house_connections' => $survey['connections'],
			);

			
					$result = DB::insert('service_level',array_keys($data))
						->values(array_values($data))
						->execute();
					session::set_flash('success','Data Added Successully');
				}	
     		
			Response::redirect('survey/survey_input' );
			#Response::redirect('statefunds/index');			
		}
	}

	public function action_slevel()
	{
	
    	$result['q'] =DB::select('*')
			->from('circle_component_2a')
			->join('circles','LEFT')
			->on('circle_component_2a.circle_id', '=', 'circles.id')
			->join('wings','LEFT')
			->on('circle_component_2a.wing_id', '=', 'wings.id')
			->order_by('wing_name','asc')
			->order_by('circle_name','asc')					
			->as_object()
			->execute();
		
		$this->template->content = View::forge('survey/slevel', $result, false);
	}

	public function get_items()
    {
        $this->xml_basenode = 'other_basenode';

        return $this->response(array(
            'foo' => Input::get('foo'),
            'baz' => array(
                1, 50, 219
            ),
            'empty' => null
        ));
    }	
    public function action_surveyrpt()
	{
		
				$result['q'] =DB::select('*')
					->from('service_level')
					->join('villages','left')
					->on('villages.village_misid','=','service_level.village_id')
					->join('divisions','LEFT')
					->on('divisions.division_id', '=', 'service_level.division_id')
					->join('districts','LEFT')
					->on('districts.id', '=', 'service_level.district_id')
					->where('service_level.deleted', '=',0)
					->order_by('district_name','asc')
					->order_by('division_name','asc')
					->order_by('village_name','asc')
					->as_object()
					->execute();
		

        $this->template->title = 'Funds Released';
        $this->template->content = View::forge('survey/surveyrpt', $result, false);
	}
	public function get_mydivn()
	{
		\Log::Debug("In function GET inmydivn:");
		
		$this->response(array("test" => "hello"));
	}
	public function post_mydivn()
	{
		\Log::Debug("In function Post inmydivn:" . print_r($_POST,true));
		$id = \Input::post("districtid");
		// $this->param("id");//District ID
		\Log::Debug("In function Post inmydivn:" . $id);

		if(isset($id) and $id != 'all' and $id != 'list' and $id !== false ){
			
			$result =DB::select('*')
					->from('divisions')
					->join('districts','LEFT')
					->on('districts.id', '=', 'divisions.district_id')
					->join('circles','LEFT')
					->on('circles.id', '=', 'districts.circle_id')
					->where('divisions.district_id','=',$id)
					->order_by('division_name','asc')
					->as_assoc()
					->execute();
			
			$data['response'] = 'true';
			$data['message'] = array();
			foreach($result as $model){
				\Log::Debug("Returning Model:" . print_r($model,true));
				$data['message'][] = array('value' => $model['division_id'],
										   'text'  => $model['division_name'] );
			}		
			\Log::Debug("Returning data:" . print_r($data,true));
			$this->response($data);
		}	
	}
	public function post_myvill()
	{
		\Log::Debug("In function Post in my Village:" . print_r($_POST,true));
		$id = \Input::post("divisionid");
		// $this->param("id");//District ID
		\Log::Debug("In function Post in myvill:" . $id);

		if(isset($id) and $id != 'all' and $id != 'list' and $id !== false ){
			
			$result =DB::select('*')
					->from('villages')
					->join('divisions','LEFT')
					->on('divisions.division_id', '=', 'villages.division_id')
					->where('villages.division_id','=',$id)
					->order_by('village_name','asc')
					->as_assoc()
					->execute();
			
			$data['response'] = 'true';
			$data['vill'] = array();
			foreach($result as $model){
				\Log::Debug("Returning Model:" . print_r($model,true));
				$data['vill'][] = array('value' => $model['village_id'],
										   'text'  => $model['village_name'] );
			}		
			\Log::Debug("Returning data:" . print_r($data,true));
			$this->response($data);
		}	
	}


}
