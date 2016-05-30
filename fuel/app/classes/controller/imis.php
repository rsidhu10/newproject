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

				$result['q'] =DB::select('*')
					->from('mappedvillages')
					->join('villages','LEFT')
					->on('mappedvillages.misid','=', 'villages.village_misid' )
					->join('sangrur','LEFT')
					->on('mappedvillages.imisid','=', 'sangrur.imisvillageid' )
					->where('mappedvillages.deleted','=',0)
					->as_object()
					->execute();





		}


        $this->template->title = 'MAPPING MIS VILLAGE WITH IMIS';
        $this->template->content = View::forge('imis/test', $result, false);
	}

		public function action_save()
	{
		if(Input::post('save')){
			$village = Input::all();
			//var_dump($order);
			$data =array(
					'imisid'	=> $village['imis_village'],
					'misid' 		=> $village['mis_village'],
			);
			$result = DB::insert('mappedvillages',array_keys($data))
				->values(array_values($data))
				->execute();		
						$funds = Input::all();
	
			$data2 =array(
					'mapped' 		=> 1,
			);
			$result = DB::update('villages')
					->set($data2)
					->where('village_misid', $village['mis_village'])
					->execute();
			$data3 =array(
					'mapped' 		=> 1,
			);
			$result = DB::update('sangrur')
					->set($data3)
					->where('imisvillageid', $village['imis_village'])
					->execute();			
	}
			session::set_flash('success','Village Mapped Successully');
			Response::redirect('imis/test','refresh');
	}

	public function action_delete($id)
	{
		if(isset($id) and $id != 'all' and $id != 'list' and $id !== false ){
			#	$result = DB::delete('releases')
			#		->where('funds_id','=', $id)
			#		->execute();
			$data =array(
					'deleted' 		=> 1);

			$result = DB::update('mappedvillages')
					->set($data)
					->where('id','=', $id)
					->execute();
 
			Session::set_flash('success','Village Unmapped Successfully');
			Response::redirect('imis/test', 'refresh');
		}
	}
}