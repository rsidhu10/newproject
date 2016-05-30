<?php
	class Controller_sbm extends Controller_Template{
	public function action_index()
	{
		if(isset($id) and $id != 'all' and $id != 'list' and $id !== false ){
			$result['q'] =DB::select('*')
					->from('sbm_state')
					->join('divisions','LEFT')
					->on('divisions.division_id', '=', 'sbm_state.funds_division')
					->join('districts','LEFT')
					->on('districts.id', '=', 'sbm_state.funds_district')
					->where('sbm_state.deleted', '=',0)
					->order_by('funds_date','asc')
					->order_by('district_name','asc')
					->order_by('division_name','asc')
					->as_object()
					->execute();
		}else
		{
				$result['q'] =DB::select('*')
					->from('sbm_state')
					->join('divisions','LEFT')
					->on('divisions.division_id', '=', 'sbm_state.funds_division')
					->join('districts','LEFT')
					->on('districts.id', '=', 'sbm_state.funds_district')
					->where('sbm_state.deleted', '=',0)
					->order_by('funds_date','asc')
					->order_by('district_name','asc')
					->order_by('division_name','asc')
					->as_object()
					->execute();
		}
	    $this->template->title = 'SBM Funds Released';
        $this->template->content = View::forge('sbm/index', $result, false);
	
	}	

	public function action_addfunds()
	{
        $result['q'] =DB::select('*')
					->from('districts')
					->order_by('district_name','asc')
					->as_object()
					->execute();
    	$this->template->title = 'SBM Funds Release';
       	$this->template->content = View::forge('sbm/addfunds', $result, false);
	}
}