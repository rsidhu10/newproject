<?php
	class Controller_Targets extends Controller_Hybrid{

	public function before()
    {
        parent::before();
        Log::debug('Controller_REST Controller: ' . $this->request->controller);
        Log::debug('Controller_REST     Action: ' . $this->request->action);
    }    
	public function action_index()
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
			$result['q'] =DB::select("*")
					->from('division_stats')
					->join('divisions','left')
					->on('divisions.division_id','=','division_stats.division_id')
					->join('districts','LEFT')
					->on('divisions.district_id','=','districts.id')
					->order_by('district_name','asc')
					->order_by('division_name','asc')
					->as_object()
					->execute();

		}
        $this->template->title = 'MAPPING MIS VILLAGE WITH SURVEY';
        $this->template->content = View::forge('targets/index', $result, false);
	}

	public function action_reporthab()
	{
		if(isset($id) and $id != 'all' and $id != 'list' and $id !== false ){
			$result['q'] =DB::select('*')
					->from('releases')
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
        $this->template->title = 'MARK HABITATION COMMISSIONED ON IMIS';
        $this->template->content = View::forge('targets/reporthab', $result, false);
	}

	public function action_save()
	{
			$habs = Input::all();
			//var_dump($funds);
					$data =array(
					'imis_reported'	=> $habs['marked'],
					
			);
			$result = DB::update('phyprogress')
					->set($data)
					->where('miscode', $habs['habitation'])
					->execute();

			session::set_flash('success','Record Saved Successully');
			Response::redirect('targets/reporthab');	
			
		
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
	public function post_myhab()
	{
		\Log::Debug("In function Post in my Village:" . print_r($_POST,true));
		$id = \Input::post("divisionid");
		// $this->param("id");//District ID
		\Log::Debug("In function Post in myvill:" . $id);

		if(isset($id) and $id != 'all' and $id != 'list' and $id !== false ){
			
			$result =DB::select('*')
					->from('phyprogress')
					->join('villages','left')
					->on('phyprogress.miscode','=','villages.village_misid')
					->join('divisions','LEFT')
					->on('divisions.division_id', '=', 'villages.division_id')
					->where('villages.division_id','=',$id)
					->where('phyprogress.imis_reported','=',0)
					->order_by('village_name','asc')
					->as_assoc()
					->execute();
			
			$data['response'] = 'true';
			$data['vill'] = array();
			foreach($result as $model){
				\Log::Debug("Returning Model:" . print_r($model,true));
				$data['vill'][] = array('value' => $model['village_misid'],
										'text'  => $model['village_name'] );
			}		
			\Log::Debug("Returning data:" . print_r($data,true));
			$this->response($data);
		}	
	}

}