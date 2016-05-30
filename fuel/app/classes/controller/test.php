<?php
	class Controller_imis extends Controller_Template{
	public function action_test()
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
				$result['0'] =DB::select('*')
					->from('villages')
					->join('blocks','LEFT')
					->on('blocks.block_id', '=', 'villages.block_id')
					->join('districts','LEFT')
					->on('districts.id', '=', 'villages.district_id')
					->where('districts.district_name','=','Sangrur')
					->where('villages.mapped','=',0)
					->order_by('block_name','asc')
					->order_by('village_name','asc')
					->as_object()
					->execute();
		}





        $this->template->title = 'MAPPING MIS VILLAGE WITH IMIS';
        $this->template->content = View::forge('imis/test', $result, false);
	}
}