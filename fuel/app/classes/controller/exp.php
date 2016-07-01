<?php
	class Controller_Exp extends Controller_Template{
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
				$result['q'] =DB::select('*')
					->from('nrdwp_exp')
					->join('divisions','LEFT')
					->on('divisions.division_id', '=', 'nrdwp_exp.division_id')
					->join('districts','LEFT')
					->on('districts.id', '=', 'nrdwp_exp.district_id')
					->where('nrdwp_exp.deleted','=',0)
					->order_by('exp_date','asc')
					->order_by('district_name','asc')
					->order_by('division_name','asc')
					->as_object()
					->execute();
		}

        $this->template->title = 'EXPENDITURE REPORTED ON IMIS';
        $this->template->content = View::forge('exp/index', $result, false);
	}

	public function action_nrdwp()
	{
        $result['q'] =DB::select('*')
					->from('districts')
					->order_by('district_name','asc')
					->as_object()
					->execute();
    	$this->template->title = 'NRDWP EXPENDITURE';
       	$this->template->content = View::forge('exp/nrdwp', $result, false);
	}

	public function action_save()
	{
		if(Input::post('save')){
			$expen = Input::all();
			//var_dump($order);
			$data =array(
					'exp_date' 		=> $expen['letter_date'],
					'exp_type' 		=> 1,
					'exp_year' 		=> $expen['financialyear'],
					'district_id' 	=> $expen['district'],
					'division_id' 	=> $expen['division'],
					'normal' 	    => $expen['normal'],
					'sustain'       => $expen['sustain'],
					'earmark'       => $expen['earmark'],
					'omfunds' 		=> $expen['omfunds'],
			);
			$result = DB::insert('nrdwp_exp',array_keys($data))
				->values(array_values($data))
				->execute();
			session::set_flash('success','Expenditure Added Successully');
			Response::redirect('exp');			
		}
	}
	public function action_edit($id)
	{
 		$result['q'] =DB::select('*')
					->from('nrdwp_exp')
					->join('divisions','LEFT')
					->on('divisions.division_id', '=', 'nrdwp_exp.division_id')
					->join('districts','LEFT')
					->on('districts.id', '=', 'nrdwp_exp.district_id')
					->where('nrdwp_id','=' , $id)
					->as_object()
					->execute()
					->current();
     	$this->template->title = 'EXPENDITURE REPORTED UNDER NRDWP';
       	$this->template->content = View::forge('exp/edit', $result, false);
	}

	public function action_delete($id)
	{
		if(isset($id) and $id != 'all' and $id != 'list' and $id !== false ){
			#	$result = DB::delete('releases')
			#		->where('funds_id','=', $id)
			#		->execute();
			$data =array(
					'deleted' 		=> 1
			);

			$result = DB::update('releases')
					->set($data)
					->where('funds_id','=', $id)
					->execute();
	 
			Session::set_flash('success','Record Deleted');
			Response::redirect('funds', 'refresh');
		}
	}
	public function action_update()
	{
			$exupdate = Input::all();
			
					$data =array(
						'normal' 	    => $exupdate['normal'],
						'sustain'       => $exupdate['sustain'],
						'earmark'       => $exupdate['earmark'],
						'omfunds' 		=> $exupdate['omfunds'],
					);
			
			$result = DB::update('nrdwp_exp')
					->set($data)
					->where('nrdwp_id', $exupdate['id'])
					->execute();
		
			


			session::set_flash('success','Expenditure Updated Successully');
			Response::redirect('exp');	
			
		
	}

	public function action_sfunds_add()
	{
      
    	$this->template->title = 'NRDWP Funds Release';
       	$this->template->content = View::forge('funds/state/sfunds_add' );
	}

	public function action_rpt_wing()
	{	$code ='0';
		$result['q'] =DB::query("Select wings.wing_name,releases.wing_id,funds_type, 
			sum(releases.funds_cen_normal) as normal,
    		sum(releases.funds_cen_sustain) as sustain,
    		sum(releases.funds_cen_earmark) as earmark,
    		sum(releases.funds_cen_om) as om 
    		from releases
    		left join wings on
    		wings.id = releases.wing_id
    		where releases.deleted =0
    		group by wing_id
    		order by wing_name")
			->as_object()
			->execute();

        $this->template->title = 'Funds Released';
        $this->template->content = View::forge('funds/rpt_wing', $result, false);
	}	

	public function action_rpt_circle()
	{	$code ='0';
		$result['q'] =DB::query("Select circles.circle_name,releases.circle_id,funds_type, 
			sum(releases.funds_cen_normal) as normal,
    		sum(releases.funds_cen_sustain) as sustain,
    		sum(releases.funds_cen_earmark) as earmark,
    		sum(releases.funds_cen_om) as om 
    		from releases
    		left join circles on
    		circles.id = releases.circle_id
    		where releases.deleted =0
    		group by circle_id
    		order by circle_name")
			->as_object()
			->execute();

        $this->template->title = 'Funds Released';
        $this->template->content = View::forge('funds/rpt_circle', $result, false);
	}	

	public function action_rpt_district()
	{	$code ='0';
		$result['q'] =DB::query("Select districts.district_name,
			releases.circle_id,funds_type, 
			sum(releases.funds_cen_normal) as normal,
    		sum(releases.funds_cen_sustain) as sustain,
    		sum(releases.funds_cen_earmark) as earmark,
    		sum(releases.funds_cen_om) as om 
    		from releases
    		left join districts on
    		districts.id = releases.funds_district
    		where releases.deleted =0
    		group by funds_district
    		order by district_name")
			->as_object()
			->execute();

        $this->template->title = 'Funds Released';
        $this->template->content = View::forge('funds/rpt_district', $result, false);
	}	

	public function action_rpt_division()
	{	$code ='0';
		$result['q'] =DB::query("Select divisions.division_name,
			releases.funds_division,funds_type, 
			sum(releases.funds_cen_normal) as normal,
    		sum(releases.funds_cen_sustain) as sustain,
    		sum(releases.funds_cen_earmark) as earmark,
    		sum(releases.funds_cen_om) as om 
    		from releases
    		left join divisions on
    		divisions.division_id = releases.funds_division
    		where releases.deleted =0
    		group by funds_division
    		order by division_name")
			->as_object()
			->execute();

        $this->template->title = 'Funds Released';
        $this->template->content = View::forge('funds/rpt_division', $result, false);
	}	

}   