<?php
	class Controller_statefunds extends Controller_Template{
	public function action_index()
	{
		if(isset($id) and $id != 'all' and $id != 'list' and $id !== false ){
			$result['q'] =DB::select('*')
					->from('state_funds')
					->join('divisions','LEFT')
					->on('divisions.division_id', '=', 'state_funds.funds_division')
					->join('districts','LEFT')
					->on('districts.id', '=', 'state_funds.funds_district')
					->where('state_funds.deleted', '=',0)
					->order_by('funds_date','asc')
					->order_by('district_name','asc')
					->order_by('division_name','asc')
					->as_object()
					->execute();
		}else
		{
				$result['q'] =DB::select('*')
					->from('state_funds')
					->join('divisions','LEFT')
					->on('divisions.division_id', '=', 'state_funds.funds_division')
					->join('districts','LEFT')
					->on('districts.id', '=', 'state_funds.funds_district')
					->where('state_funds.deleted', '=',0)
					->order_by('funds_date','asc')
					->order_by('district_name','asc')
					->order_by('division_name','asc')
					->as_object()
					->execute();
		}

        $this->template->title = 'Funds Released';
        $this->template->content = View::forge('statefunds/index', $result, false);
	}

	public function action_addsfunds()
	{
        $result['q'] =DB::select('*')
					->from('districts')
					->order_by('district_name','asc')
					->as_object()
					->execute();
    	$this->template->title = 'NRDWP Funds Release';
       	$this->template->content = View::forge('statefunds/addsfunds', $result, false);
	}

	public function action_save()
	{
		if(Input::post('save')){
			$funds = Input::all();
			//var_dump($funds);
			$funds_num 		= $funds['letter_num'];
			$funds_date 	= $funds['letter_date'];
			$funds_year 	= $funds['financialyear'];
			$wing_id 		= $funds['wing_id'];
			$funds_district = $funds['district'];
			$funds_division = $funds['division'];

    		$result =DB::select('*')
				->from('state_funds')
				->where('wing_id', '=', $wing_id)
				->where('funds_district', '=', $funds_district)
				->where('funds_division','=', $funds_division)
				->where('funds_num','=', $funds_num)
				->where('funds_date','=',$funds_date)
				->execute();

				$num_rows = count($result);
				if($num_rows >0)	
				{
				Session::set_flash('error','Record EXIST');		
				}else {

				$data =array(
					'funds_num' 	=> $funds['letter_num'],
					'funds_date' 	=> $funds['letter_date'],
					'funds_type' 	=> 2,
					'funds_year' 	=> $funds['financialyear'],
					'wing_id' 		=> $funds['wing_id'],
					'circle_id' 	=> $funds['circle_id'],
					'funds_district'=> $funds['district'],
					'funds_division'=> $funds['division'],
					'funds_1a' 		=> $funds['wb_1a'],
					'funds_2a' 		=> $funds['wb_2a'],
					'funds_2b' 		=> $funds['wb_2b'],
					'funds_com4' 	=> $funds['component4'],
					);
			
					$result = DB::insert('state_funds',array_keys($data))
						->values(array_values($data))
						->execute();
					session::set_flash('success','Funds Added Successully');
				}	
     		
			Response::redirect('statefunds/addsfunds' );
			#Response::redirect('statefunds/index');			
		}
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

			$result = DB::update('state_funds')
					->set($data)
					->where('funds_id','=', $id)
					->execute();
	 
			Session::set_flash('success','Record Deleted');
			Response::redirect('statefunds', 'refresh');
		}
	}
	public function action_editsfunds($id)
	{
 		$result['q'] =DB::select('*')
					->from('state_funds')
					->join('divisions','LEFT')
					->on('divisions.division_id', '=', 'state_funds.funds_division')
					->join('districts','LEFT')
					->on('districts.id', '=', 'state_funds.funds_district')
					->where('funds_id','=' , $id)
					->as_object()
					->execute()
					->current();
     	$this->template->title = 'NRDWP Funds Update';
       	$this->template->content = View::forge('statefunds/editsfunds', $result, false);
	}
	public function action_update()
	{
			$funds = Input::all();
			//var_dump($funds);
					$data =array(
					'funds_num' 	=> $funds['letter_num'],
					'funds_date' 	=> $funds['letter_date'],
					'funds_1a' 		=> $funds['wbank1a'],
					'funds_2a' 		=> $funds['wbank2a'],
					'funds_2b' 		=> $funds['wbank1b'],
					'funds_com4'	=> $funds['component4'],
			);
			$result = DB::update('state_funds')
					->set($data)
					->where('funds_id', $funds['id'])
					->execute();

			session::set_flash('success','Funds Updated Successully');
			Response::redirect('statefunds/index');			
	}

	public function action_report_num()
	{
		$result['q'] =DB::query("select state_funds.funds_num,state_funds.funds_date, state_funds.funds_type, 
			sum(state_funds.funds_1a) as funds_1a, 
			sum(state_funds.funds_2a) as funds_2a, 
			sum(state_funds.funds_2b) as funds_2b, 
			sum(state_funds.funds_com4) as funds_com4 
			from state_funds
			where deleted =0
			group by funds_num
			order by funds_date,funds_num")
			->as_object()
			->execute();

        $this->template->title = 'Funds Released';
        $this->template->content = View::forge('statefunds/report_num', 
        	$result, false);
	}
	public function action_rpt_division()
	{
		$result['q'] =DB::query("select division_name,state_funds.funds_type, 
			sum(state_funds.funds_1a) as funds_1a, 
			sum(state_funds.funds_2a) as funds_2a, 
			sum(state_funds.funds_2b) as funds_2b, 
			sum(state_funds.funds_com4) as funds_com4 
			from state_funds
			left join divisions on
			divisions.division_id = state_funds.funds_division
			where deleted =0
			group by funds_division
			order by division_name")
			->as_object()
			->execute();


        $this->template->title = 'Funds Released';
        $this->template->content = View::forge('statefunds/rpt_division', $result, false);
	}


	public function action_rpt_district()
	{
		$result['q'] =DB::query("select district_name,state_funds.funds_type, 
			sum(state_funds.funds_1a) as funds_1a, 
			sum(state_funds.funds_2a) as funds_2a, 
			sum(state_funds.funds_2b) as funds_2b, 
			sum(state_funds.funds_com4) as funds_com4 
			from state_funds
			left join districts on
			districts.id = state_funds.funds_district
			where deleted =0
			group by funds_district 
			order by district_name")
			->as_object()
			->execute();


        $this->template->title = 'Funds Released';
        $this->template->content = View::forge('statefunds/rpt_district', $result, false);
	}

	public function action_rpt_circle()
	{
		$result['q'] =DB::query("select circle_name,
			funds_type,sum(funds_1a) as funds_1a, 
			sum(funds_2a) as funds_2a, sum(funds_2b) as funds_2b, 
			sum(funds_com4) as funds_com4 from state_funds
     		left join circles on
    		circles.id = state_funds.circle_id
    		where deleted =0 
    		group by circle_id 
    		order by circles.circle_name")
			->as_object()
			->execute();


        $this->template->title = 'Funds Released';
        $this->template->content = View::forge('statefunds/rpt_circle', $result, false);
	}

	public function action_rpt_wing()
	{	$code ='0';
		$result['q'] =DB::query("select wing_name,wing_id,count(circle_id) as ncircle,
			funds_type,sum(funds_1a) as funds_1a, 
			sum(funds_2a) as funds_2a, sum(funds_2b) as funds_2b, 
			sum(funds_com4) as funds_com4 from state_funds
     		left join wings on
    		wings.id = state_funds.wing_id
    		where deleted =0 
			group by wing_id
			order by wings.wing_name,'asc'")
			->as_object()
			->execute();

        $this->template->title = 'Funds Released';
        $this->template->content = View::forge('statefunds/rpt_wing', $result, false);
	}

}   