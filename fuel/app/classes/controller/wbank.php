<?php
	class Controller_wbank extends Controller_Template{
    
    public function action_serlevel()
	{
		
				$result['q'] =DB::select('*')
					->from('service_level')
					->join('villages','left')
					->on('villages.village_misid','=','service_level.village_id')
					->join('divisions','LEFT')
					->on('divisions.division_id', '=', 'service_level.division_id')
					->join('districts','LEFT')
					->on('districts.id', '=', 'service_level.district_id')
					->join('circles','LEFT')
					->on('circles.id', '=', 'service_level.circle_id')
					->join('wings','LEFT')
					->on('wings.id', '=', 'service_level.wing_id')
					->where('service_level.deleted', '=',0)
					->order_by('district_name','asc')
					->order_by('division_name','asc')
					->order_by('village_name','asc')
					->as_object()
					->execute();
		

        $this->template->title = 'Funds Released';
        $this->template->content = View::forge('wbank/serlevel', $result, false);
	}
	

	public function action_delete($id)
	{
		if(isset($id) and $id != 'all' and $id != 'list' and $id !== false ){
				$result = DB::delete('service_level')
					->where('slevel_id','=', $id)
					->execute();
			// $data =array(
			// 		'deleted' 		=> 1);

			// $result = DB::update('mappedsurvey')
			// 		->set($data)
			// 		->where('id','=', $id)
			// 		->execute();
 
			Session::set_flash('success','Entery Deleted Successfully');
			Response::redirect('wbank/serlevel', 'refresh');
		}
	}

	public function action_addnew()
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
        $this->template->title = 'SERVICE LEVEL SURVEY';
        $this->template->content = View::forge('wbank/addnew', $result, false);
	}

	public function action_save()
	{
		if(Input::post('save')){
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
     		
			Response::redirect('wbank/addnew' );
			#Response::redirect('statefunds/index');			
		}
	}

	public function action_report()
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
		
		$this->template->content = View::forge('wbank/report', $result, false);
	}


}